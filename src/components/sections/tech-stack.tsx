import { techStack } from "@/content/company";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function TechStack() {
  const all = techStack.flatMap((group) => group.items);
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our technology stack"
          title="Proven tools, chosen for the problem."
          description="We work with mature, well-supported technologies so your product is reliable today and easy to hire for tomorrow."
        />
        <div className="marquee-mask mt-12 overflow-hidden py-2" aria-hidden="true">
          <ul className="marquee-track flex w-max gap-3 motion-safe:animate-marquee">
            {[...all, ...all].map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="whitespace-nowrap rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-sm"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-500 to-violet-400 align-middle" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group, index) => (
            <Reveal key={group.category} variant="fall" delay={(index % 3) * 90} className="rounded-2xl border border-line p-6 transition-colors duration-300 hover:border-brand-500/30 hover:bg-surface/60">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-brand-600">{group.category}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/40 hover:text-brand-600">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
