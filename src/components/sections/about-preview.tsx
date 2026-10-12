import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LogoMark } from "@/components/brand/logo";
import { Reveal } from "@/components/ui/reveal";

const commitments = [
  ["Engineering quality", "Clean, tested, documented code that your team can own."],
  ["Practical innovation", "New technology applied where it creates real value."],
  ["Collaboration", "You work directly with the people building your product."],
  ["Sustainable value", "Solutions designed to keep paying off long after launch."],
];

export function AboutPreview() {
  return (
    <section id="about" className="bg-white py-24 sm:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal variant="left" className="relative order-last overflow-hidden rounded-3xl bg-navy-900 p-10 sm:p-14 lg:order-first">
          <div className="absolute inset-0 bg-grid mask-fade" aria-hidden="true" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <div className="relative h-16 w-16">
              <span className="absolute -inset-3 rounded-[1.4rem] border border-dashed border-brand-400/40 motion-safe:animate-spin-slow" aria-hidden="true" />
              <LogoMark className="relative h-16 w-16" />
            </div>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-brand-300">Our philosophy</p>
            <blockquote className="mt-4 text-pretty text-2xl font-medium leading-snug text-white sm:text-3xl">
              &ldquo;{siteConfig.philosophy}&rdquo;
            </blockquote>
          </div>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="About us"
            title="Visionary thinking. Thoughtful engineering."
            description="HVD Technologies brings people, ideas and technology together to create useful digital experiences. We pair curiosity about your business with disciplined engineering — so what we build works well, lasts, and makes a difference."
          />
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {commitments.map(([title, description]) => (
              <div key={title} className="border-l-2 border-brand-500/60 pl-4 transition-colors duration-300 hover:border-violet-400">
                <dt className="font-semibold text-ink">{title}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-muted">{description}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href="/about" variant="light" className="mt-10">
            More about HVD <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
