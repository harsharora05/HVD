import { ArrowRight, Bot, Code2, Globe, Smartphone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroVisual } from "@/components/visuals/hero-visual";
import { ParallaxGroup } from "@/components/ui/parallax";

const pillars = [
  { label: "Web", Icon: Globe },
  { label: "Mobile", Icon: Smartphone },
  { label: "AI", Icon: Bot },
  { label: "Custom software", Icon: Code2 },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-900 pb-20 pt-32 sm:pt-40 lg:pb-28">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade" aria-hidden="true" />
      <div className="absolute -top-48 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px] motion-safe:animate-pulse-soft" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" aria-hidden="true" />
      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full motion-safe:animate-enter border border-white/10 bg-white/5 py-1 pl-1 pr-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-brand-200 sm:text-xs">
            <span className="rounded-full bg-gradient-to-r from-brand-500 to-violet-400 px-2 py-0.5 text-[10px] text-white">HVD</span>
            {siteConfig.fullForm}
          </p>
          <h1 className="mt-7 text-balance motion-safe:animate-enter [animation-delay:80ms] text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
            Engineering <span className="text-gradient motion-safe:animate-gradient">tomorrow&apos;s</span> digital solutions.
          </h1>
          <p className="mt-6 max-w-xl text-pretty motion-safe:animate-enter [animation-delay:180ms] text-lg leading-relaxed text-slate-300">
            We build modern websites, mobile applications, AI-powered solutions, and custom software that turn ambitious ideas into
            meaningful business outcomes.
          </p>
          <div className="mt-9 flex flex-col gap-3 motion-safe:animate-enter [animation-delay:280ms] sm:flex-row">
            <ButtonLink href="#contact" size="lg">
              Let&apos;s Build Together
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#services" size="lg" variant="secondary">
              Explore Our Services
            </ButtonLink>
          </div>
          <ul className="mt-12 flex flex-wrap motion-safe:animate-enter [animation-delay:380ms] gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-400" aria-label="What we build">
            {pillars.map(({ label, Icon }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-brand-300" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="motion-safe:animate-enter-scale [animation-delay:250ms]">
          <ParallaxGroup>
            <HeroVisual />
          </ParallaxGroup>
        </div>
      </Container>
    </section>
  );
}
