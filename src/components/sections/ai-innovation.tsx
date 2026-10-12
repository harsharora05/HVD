import { ArrowRight, ShieldCheck } from "lucide-react";
import { aiCapabilities } from "@/content/company";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Spotlight } from "@/components/ui/spotlight";

export function AIInnovation() {
  return (
    <section id="solutions" className="relative isolate overflow-hidden bg-navy-900 py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade" aria-hidden="true" />
      <div className="absolute -right-40 top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-violet-400/20 blur-[130px]" aria-hidden="true" />
      <div className="absolute -left-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-brand-500/20 blur-[130px]" aria-hidden="true" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            tone="dark"
            eyebrow="AI & innovation"
            title={
              <>
                Make intelligent technology <span className="text-gradient motion-safe:animate-gradient">work for you.</span>
              </>
            }
          />
          <Reveal variant="right" as="p" className="text-lg leading-relaxed text-slate-300">
            AI is most valuable when it quietly removes friction: fewer repetitive tasks, faster answers, better-informed decisions. We
            focus on practical applications you can measure — built securely on your own data.
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiCapabilities.map((capability, index) => (
            <Reveal as="li" key={capability.title} variant="fall" delay={(index % 3) * 100}>
              <Spotlight
                color="rgb(167 139 250 / 0.14)"
                className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-500 hover:border-white/20 sm:p-8"
              >
              <span className="flex h-11 w-11 transition-all duration-500 group-hover:border-brand-400/40 group-hover:bg-brand-500/15 group-hover:text-white items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-300">
                <Icon name={capability.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{capability.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{capability.benefit}</p>
              </Spotlight>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="flex items-start gap-3 text-slate-300">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-white">Responsible by design.</strong> Grounded answers with sources, human approval for
              important actions, and your data kept under your control.
            </span>
          </p>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href="/solutions" variant="secondary">
              Browse solutions
            </ButtonLink>
            <ButtonLink href="/services/ai-solutions">
              Explore AI solutions <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
