import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * HVD monogram: two pillars (H) joined by a converging chevron (V) whose apex
 * is a node — people and ideas connecting into one engineered point. The right
 * pillar's rounded cap nods to the D.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const id = useId();
  const gradient = `hvd-g-${id}`;
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <linearGradient id={gradient} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F7CFF" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="#0B1020" />
      <rect x="1" y="1" width="38" height="38" rx="11" fill="none" stroke={`url(#${gradient})`} strokeOpacity="0.55" strokeWidth="1.5" />
      <path d="M11 10v20" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M29 10v20" stroke={`url(#${gradient})`} strokeWidth="3" strokeLinecap="round" />
      <path d="M11 14.5 20 24l9-9.5" fill="none" stroke={`url(#${gradient})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="24" r="2.6" fill="#fff" />
      <circle cx="11" cy="10" r="1.6" fill="#fff" />
      <circle cx="29" cy="30" r="1.6" fill="#A78BFA" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const onDark = tone === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[17px] font-semibold tracking-[0.08em]", onDark ? "text-white" : "text-ink")}>HVD</span>
        <span className={cn("mt-1 text-[10px] font-medium uppercase tracking-[0.28em]", onDark ? "text-slate-400" : "text-muted")}>
          Technologies
        </span>
      </span>
    </span>
  );
}
