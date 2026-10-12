"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { mainNav, navHref, type NavItem } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { findSection, scrollToSection } from "@/lib/scroll-to-section";

/** Distance from the top of the viewport at which a section counts as "current". */
const SPY_OFFSET = 140;

function activeFromPath(pathname: string) {
  const match = [...mainNav].reverse().find((item) => item.page !== "/" && (pathname === item.page || pathname.startsWith(`${item.page}/`)));
  return match?.section ?? (pathname === "/" ? "top" : "");
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const pendingSection = useRef<string | null>(null);
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [spySection, setSpySection] = useState("top");
  const active = isHome ? spySection : activeFromPath(pathname);

  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const lockUntil = useRef(0);

  // Close the mobile menu when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Scroll state: solid header, progress bar and (on the homepage) scroll-spy.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { scrollY, innerHeight } = window;
      const max = document.documentElement.scrollHeight - innerHeight;
      setScrolled(scrollY > 12);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;

      if (!isHome || Date.now() < lockUntil.current) return;
      // The current section is the one whose top most recently passed under the header
      // (document order may differ from nav order).
      let current = "top";
      let closest = -Infinity;
      for (const item of mainNav) {
        const top = findSection(item.section)?.getBoundingClientRect().top;
        if (top !== undefined && top - SPY_OFFSET <= 0 && top > closest) {
          closest = top;
          current = item.section;
        }
      }
      if (scrollY >= max - 4) current = mainNav[mainNav.length - 1].section;
      setSpySection(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // Slide the highlight pill under the active link. Positions are measured relative to
  // the list, and re-measured when its size changes (viewport resize, web font swap).
  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;
    const place = () => {
      const link = list.querySelector<HTMLElement>(`[data-section="${active}"]`);
      if (!link) {
        indicator.style.opacity = "0";
        return;
      }
      const listRect = list.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      indicator.style.opacity = "1";
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.transform = `translateX(${linkRect.left - listRect.left}px)`;
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    document.fonts?.ready.then(place);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // On the homepage, scroll smoothly to the section instead of navigating.
  function goToSection(section: string) {
    if (section !== "top" && !findSection(section)) return false;
    setOpen(false);
    document.body.style.overflow = "";
    setSpySection(section);
    // Keep the clicked link active while the page glides there; release when scrolling ends.
    lockUntil.current = Date.now() + 2000;
    window.addEventListener("scrollend", () => (lockUntil.current = 0), { once: true });
    scrollToSection(section);
    history.replaceState(history.state, "", section === "top" ? "/" : `#${section}`);
    return true;
  }

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, item: NavItem) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (isHome) {
      if (goToSection(item.section)) event.preventDefault();
      return;
    }
    // From another page: go home without the browser's own hash jump, then scroll
    // precisely once the homepage has rendered (see the effect below).
    event.preventDefault();
    setOpen(false);
    // The section also travels in the URL hash, so it survives a full page load.
    pendingSection.current = item.section;
    if (item.section === "top") router.push("/");
    else router.push(`/#${item.section}`, { scroll: false });
  }

  // Any other in-page link on the homepage ("#contact", "/#services" buttons) gets the same
  // precise scrolling, and a URL that arrives with a hash is aligned exactly once laid out.
  const goToSectionRef = useRef(goToSection);
  useLayoutEffect(() => {
    goToSectionRef.current = goToSection;
  });
  useEffect(() => {
    if (!isHome) return;
    const onClick = (event: globalThis.MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href");
      const match = href === "/" ? ["", "top"] : href?.match(/^\/?#([\w-]+)$/);
      if (match && goToSectionRef.current(match[1])) {
        // Capture phase on window: runs before Next's <Link> handler, which would otherwise
        // perform its own (imprecise) hash scroll.
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener("click", onClick, { capture: true });
    // Arrived with a section to show: from another page via the navbar, or a URL with a hash.
    const section = pendingSection.current ?? (window.location.hash.slice(1) || null);
    pendingSection.current = null;
    let frame = 0;
    let attempts = 0;
    const align = () => {
      if (!section || section === "top") return;
      if (!findSection(section)) {
        if (++attempts < 30) frame = requestAnimationFrame(align); // wait for the page to render
        return;
      }
      setSpySection(section);
      scrollToSection(section, { smooth: false });
      history.replaceState(history.state, "", `#${section}`);
    };
    frame = requestAnimationFrame(align);
    return () => {
      window.removeEventListener("click", onClick, { capture: true });
      cancelAnimationFrame(frame);
    };
  }, [isHome]);

  const contactItem = mainNav[mainNav.length - 1];
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-b border-white/[0.08] bg-navy-950/90 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-md bg-white px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="HVD Technologies — home" className="rounded-lg" onClick={(event) => handleNavClick(event, mainNav[0])}>
          <Logo />
        </Link>

        <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex">
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute left-0 top-0 h-full rounded-full border border-white/10 bg-white/[0.08] opacity-0 transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-brand-400 to-violet-400" />
          </span>
          {mainNav.map((item) => {
            const isActive = active === item.section;
            return (
              <li key={item.section} className="relative">
                <Link
                  href={navHref(item)}
                  data-section={item.section}
                  aria-current={isActive ? (isHome ? "location" : "page") : undefined}
                  onClick={(event) => handleNavClick(event, item)}
                  className={cn(
                    "relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                    isActive ? "text-white" : "text-slate-400 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={navHref(contactItem)}
            onClick={(event) => handleNavClick(event, contactItem)}
            className={buttonClasses({ className: "max-sm:hidden" })}
          >
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Reading progress */}
      <span
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brand-500 via-brand-400 to-violet-400"
      />

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-navy-900 lg:hidden"
      >
        <ul className="flex flex-col gap-1 px-5 py-6 sm:px-8">
          {mainNav.map((item, index) => {
            const isActive = active === item.section;
            return (
              <li key={item.section} className="motion-safe:animate-enter" style={{ animationDelay: `${index * 40}ms` }}>
                <Link
                  href={navHref(item)}
                  aria-current={isActive ? (isHome ? "location" : "page") : undefined}
                  onClick={(event) => handleNavClick(event, item)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3.5 text-lg transition-colors",
                    isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 opacity-50" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="px-5 sm:px-8">
          <Link
            href={navHref(contactItem)}
            onClick={(event) => handleNavClick(event, contactItem)}
            className={buttonClasses({ size: "lg", className: "w-full" })}
          >
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
