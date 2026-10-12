import { processSteps } from "@/content/company";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <section className="bg-surface py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our process"
          title="A clear path from idea to impact."
          description="Six steps, no surprises. You always know what we're working on, what's next, and how it moves your goals forward."
        />
        <ol className="relative mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.title} variant="fall" delay={(index % 3) * 90} className="group relative rounded-2xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-[0_20px_50px_-30px_rgb(11_16_32/0.35)]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 transition-colors duration-500 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-violet-400 font-mono text-sm font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 origin-left bg-gradient-to-r from-brand-400/60 to-transparent transition-transform duration-700 group-hover:scale-x-110" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
