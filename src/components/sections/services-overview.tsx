import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceVisual } from "@/components/visuals/service-visual";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/cn";

export function ServicesOverview({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="services" className="bg-white py-24 sm:py-28">
      <Container>
        {showHeading && (
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Services"
              title="Everything you need to build what's next."
              description="Four disciplines, one team. We design, build and scale digital products end to end — so you have one accountable partner from idea to launch and beyond."
            />
            <Link href="/services" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
              View all services <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        <div className={cn("grid gap-6 lg:grid-cols-2", showHeading && "mt-16")}>
          {services.map((service, index) => (
            <Reveal key={service.slug} variant={index % 2 ? "right" : "left"} delay={(index % 2) * 100}>
              <Spotlight
                as="article"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-2 transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-[0_24px_60px_-30px_rgb(11_16_32/0.35)]"
              >
                <div className="overflow-hidden rounded-2xl">
                  <ServiceVisual slug={service.slug} className="h-60 transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-600">
                    0{index + 1} · {service.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                    <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{service.summary}</p>
                  <ul className="mt-6 grid gap-2 text-sm text-ink sm:grid-cols-2">
                    {service.keyCapabilities.map((capability) => (
                      <li key={capability} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                    Explore {service.shortTitle.toLowerCase() === "ai" ? "AI solutions" : service.title.toLowerCase()}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
