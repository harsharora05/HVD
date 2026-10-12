import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutions } from "@/content/company";
import { getService } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/sections/page-header";
import { AIInnovation } from "@/components/sections/ai-innovation";
import { CTABand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = createMetadata({
  title: "Solutions",
  description:
    "Business-first technology solutions: launch new products, automate operations, put AI to work, modernize legacy systems and connect your tools.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="We start with the business problem."
        description="Technology is the means, not the goal. Here are the challenges we most often help businesses solve — and how we approach each one."
      >
        <ButtonLink href="/contact" size="lg">
          Talk about your challenge <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </PageHeader>

      <section className="bg-white py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Common challenges" title="Where we make the biggest difference" />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <Reveal as="li" key={solution.title} delay={(index % 3) * 80} className="flex flex-col rounded-3xl border border-line bg-surface p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-brand-300">
                  <Icon name={solution.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{solution.title}</h3>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">The challenge</p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink">{solution.problem}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">Our approach</p>
                <p className="mt-1 flex-1 text-[15px] leading-relaxed text-muted">{solution.approach}</p>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                  {solution.services.map((slug) => {
                    const service = getService(slug);
                    return (
                      service && (
                        <li key={slug}>
                          <Link href={`/services/${slug}`} className="rounded-full bg-white px-3 py-1 text-sm font-medium text-brand-600 ring-1 ring-line hover:ring-brand-500/40">
                            {service.title}
                          </Link>
                        </li>
                      )
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <AIInnovation />
      <div className="pt-24 sm:pt-28" />
      <CTABand />
    </>
  );
}
