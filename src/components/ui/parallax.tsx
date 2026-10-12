"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-linked parallax for any descendant marked `data-parallax="<speed>"`
 * (positive = drifts down as you scroll, negative = rises) and optionally
 * `data-parallax-rotate="<deg per px>"`. Driven through the CSS `translate`/`rotate`
 * properties so it composes with existing `transform` animations, and it reverses
 * exactly when scrolling back up.
 */
export function ParallaxGroup({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = [...root.querySelectorAll<HTMLElement>("[data-parallax]")].map((el) => ({
      el,
      speed: Number(el.dataset.parallax) || 0,
      rotate: Number(el.dataset.parallaxRotate) || 0,
    }));
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, window.innerHeight * 1.5); // no work once it's off screen
      for (const { el, speed, rotate } of items) {
        el.style.translate = `0 ${(y * speed).toFixed(1)}px`;
        if (rotate) el.style.rotate = `${(y * rotate).toFixed(2)}deg`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
