import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { getService, services } from "@/content/services";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectCard } from "@/components/sections/project-card";
import { ContactSection } from "@/components/sections/contact-section";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceVisual } from "@/components/visuals/service-visual";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createMetadata({ title: service.title, description: service.summary, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = projects.filter((project) => project.services.includes(service.slug)).slice(0, 2);
  const others = services.filter((item) => item.slug !== service.slug);
  const formService = service.title;

  return (
    <>
      <PageHeader eyebrow={service.eyebrow} title={service.headline} description={service.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#contact" size="lg">
            Start your project <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/work" size="lg" variant="secondary">
            See our work
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="bg-white py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={service.title} title="What we deliver" description={service.summary} />
            <ul className="mt-8 space-y-3">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-sm font-medium text-ink">Ideal for</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {service.idealFor.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ServiceVisual slug={service.slug} className="min-h-80" />
        </Container>
      </section>

      <section className="bg-surface py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Capabilities" title="How we can help" />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((capability, index) => (
              <Reveal as="li" key={capability.title} delay={(index % 3) * 80} className="rounded-2xl border border-line bg-white p-7">
                <p className="font-mono text-xs text-brand-600">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{capability.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{capability.description}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-12 rounded-2xl border border-line bg-white p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-brand-600">Technologies we use</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <li key={tech} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-24 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Related work" title="See the approach in action" />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {related.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-line bg-white py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Questions we often hear" />
          <div className="divide-y divide-line border-y border-line">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container>
          <h2 className="text-sm font-medium text-muted">Other services</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand-500/40"
                >
                  <span>
                    <span className="block font-semibold text-ink">{item.title}</span>
                    <span className="mt-1 block text-sm text-muted">{item.eyebrow}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-brand-600" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactSection defaultService={formService} />
    </>
  );
}
