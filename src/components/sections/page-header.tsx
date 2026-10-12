import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

/** Dark intro band used at the top of every inner page (sits under the transparent navbar). */
export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pb-20 pt-36 sm:pb-24 sm:pt-44">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade" aria-hidden="true" />
      <div className="absolute -top-40 right-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-500/25 blur-[120px]" aria-hidden="true" />
      <div className="absolute -bottom-40 left-10 -z-10 h-80 w-80 rounded-full bg-violet-400/15 blur-[120px]" aria-hidden="true" />
      <Container>
        <p className="mb-5 inline-flex motion-safe:animate-enter items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-300">
          <span className="h-px w-6 bg-brand-300/60" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="max-w-4xl motion-safe:animate-enter [animation-delay:80ms] text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
          {title}
        </h1>
        {description && <p className="mt-6 max-w-2xl motion-safe:animate-enter [animation-delay:160ms] text-pretty text-lg leading-relaxed text-slate-300">{description}</p>}
        {children && <div className="mt-9 motion-safe:animate-enter [animation-delay:240ms]">{children}</div>}
      </Container>
    </section>
  );
}
