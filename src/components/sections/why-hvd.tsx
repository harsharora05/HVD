import { principles } from "@/content/company";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Spotlight } from "@/components/ui/spotlight";

export function WhyHVD() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-28">
      <div className="absolute inset-0 bg-grid-light mask-fade" aria-hidden="true" />
      <Container className="relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:self-start lg:pt-2">
          <SectionHeading
            eyebrow="Why HVD Technologies"
            title="Built around people. Driven by innovation."
            description="Technology only matters when it helps people do something better. That belief shapes how we listen, how we design, and how we engineer."
          />
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {[
              ["H", "Human-centric"],
              ["V", "Visionary"],
              ["D", "Development"],
            ].map(([letter, word]) => (
              <div key={letter}>
                <dt className="text-gradient text-4xl font-semibold motion-safe:animate-gradient">{letter}</dt>
                <dd className="mt-1 text-sm text-muted">{word}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal as="li" key={principle.title} variant="fall" delay={(index % 2) * 100 + Math.floor(index / 2) * 60}>
              <Spotlight className="group h-full rounded-2xl border border-line bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgb(11_16_32/0.35)] sm:p-7">
              <span className="flex h-11 w-11 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-400 text-white">
                <Icon name={principle.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{principle.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{principle.description}</p>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
