"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export type RevealVariant = "fall" | "up" | "left" | "right" | "scale" | "blur";

type Props = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Staggers siblings: a later element starts its motion a little further down the page. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

type Entry = { el: HTMLElement; variant: RevealVariant; delay: number; tilt: number };

/* ------------------------------------------------------------------------------------
 * One shared, scroll-scrubbed animation loop for every <Reveal>.
 * Progress is a pure function of the element's position in the viewport, so content
 * falls into place as you scroll down and lifts back out as you scroll up.
 * ---------------------------------------------------------------------------------- */
const entries = new Set<Entry>();
let frame = 0;
let listening = false;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The element's layout position, ignoring its own (animated) transform. Using
 * getBoundingClientRect() here would feed the animation back into itself, so the same
 * scroll position would give different results scrolling down vs. up.
 */
function layoutTop(el: HTMLElement) {
  let y = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) y += node.offsetTop;
  return y - window.scrollY;
}

function apply({ el, variant, delay, tilt }: Entry, vh: number, atBottom: boolean) {
  const top = layoutTop(el);
  // Starts as the element enters the bottom of the screen, settles ~30% of a screen later.
  const start = vh + delay * 0.25;
  const distance = vh * 0.3;
  // Content near the end of the page can't scroll any higher, so finish it at the bottom.
  const p = atBottom && top < vh ? 1 : Math.min(1, Math.max(0, (start - top) / distance));
  const e = easeOut(p);
  const r = 1 - e;

  let transform = "none";
  let filter = "none";
  switch (variant) {
    case "fall":
      transform = `translate3d(0, ${(-56 * r).toFixed(2)}px, 0) rotate(${(tilt * r).toFixed(2)}deg)`;
      break;
    case "up":
      transform = `translate3d(0, ${(40 * r).toFixed(2)}px, 0)`;
      break;
    case "left":
      transform = `translate3d(${(-64 * r).toFixed(2)}px, 0, 0)`;
      break;
    case "right":
      transform = `translate3d(${(64 * r).toFixed(2)}px, 0, 0)`;
      break;
    case "scale":
      transform = `translate3d(0, ${(24 * r).toFixed(2)}px, 0) scale(${(0.92 + 0.08 * e).toFixed(4)})`;
      break;
    case "blur":
      transform = `translate3d(0, ${(16 * r).toFixed(2)}px, 0)`;
      filter = r > 0.01 ? `blur(${(8 * r).toFixed(2)}px)` : "none";
      break;
  }
  el.style.opacity = e.toFixed(3);
  el.style.transform = e > 0.999 ? "none" : transform;
  el.style.filter = filter;
}

function update() {
  frame = 0;
  const vh = window.innerHeight;
  const atBottom = isAtBottom();
  for (const entry of entries) apply(entry, vh, atBottom);
}

function isAtBottom() {
  return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

function register(entry: Entry) {
  entries.add(entry);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  apply(entry, window.innerHeight, isAtBottom());
  return () => {
    entries.delete(entry);
    if (entries.size === 0 && listening) {
      listening = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }
  };
}

/**
 * Scroll-linked entrance. Content is fully visible without JavaScript and for visitors
 * who prefer reduced motion.
 */
export function Reveal({ children, as: Tag = "div", variant = "up", delay = 0, className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.static = "true";
      return;
    }
    // Alternate tilt direction so a row of falling cards doesn't look mechanical.
    const tilt = (el.parentElement ? [...el.parentElement.children].indexOf(el) : 0) % 2 ? 2.5 : -2.5;
    return register({ el, variant, delay, tilt });
  }, [variant, delay]);

  return (
    <Tag ref={ref} data-reveal={variant} className={className}>
      {children}
    </Tag>
  );
}
