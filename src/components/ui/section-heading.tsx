import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", tone = "light", as: Heading = "h2", className }: Props) {
  const dark = tone === "dark";
  return (
    <Reveal variant="blur" className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em]",
            dark ? "text-brand-300" : "text-brand-600",
          )}
        >
          <span className={cn("h-px w-6", dark ? "bg-brand-300/60" : "bg-brand-500/60")} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className={cn("mt-5 text-pretty text-lg leading-relaxed", dark ? "text-slate-300" : "text-muted")}>{description}</p>
      )}
    </Reveal>
  );
}
