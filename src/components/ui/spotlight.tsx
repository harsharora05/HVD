"use client";

import type { CSSProperties, ElementType, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Adds a soft glow that follows the cursor (see `.spotlight` in globals.css). */
export function Spotlight({
  as: Tag = "div",
  color,
  className,
  children,
}: {
  as?: ElementType;
  color?: string;
  className?: string;
  children: ReactNode;
}) {
  function onMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }
  return (
    <Tag onMouseMove={onMove} className={cn("spotlight", className)} style={color ? ({ "--spot-color": color } as CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
