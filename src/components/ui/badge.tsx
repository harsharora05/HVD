import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark" | "demo"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "light" && "border border-line bg-surface text-muted",
        tone === "dark" && "border border-white/10 bg-white/5 text-slate-300",
        tone === "demo" && "border border-violet-400/40 bg-violet-400/10 text-violet-500",
        className,
      )}
    >
      {children}
    </span>
  );
}
