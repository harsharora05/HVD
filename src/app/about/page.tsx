import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/sections/page-header";
import { WhyHVD } from "@/components/sections/why-hvd";
import { Process } from "@/components/sections/process";
import { CTABand } from "@/components/sections/cta-band";
import { LogoMark } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "HVD Technologies — Human-centric Visionary Development. We bring people, ideas and technology together to create useful digital experiences.",
  path: "/about",
});

const name = [
  {
    letter: "H",
    word: "Human-centric",
    description: "Every product is used by people. We design around their needs, habits and goals — and we work closely with yours.",
  },
  {
    letter: "V",
    word: "Visionary",
    description: "We look beyond the immediate brief to what your business will need next, and build with that future in mind.",
  },
  {
    letter: "D",
    word: "Development",
    description: "Ideas only matter when they ship. We turn them into reliable, secure, maintainable software.",
  },
];

const commitments = [
  ["Engineering quality", "Code reviews, automated tests, security practices and documentation are part of every engagement — not extras."],
  ["Practical innovation", "We recommend new technology, including AI, only where it creates clear and measurable value for you."],
  ["Collaboration", "Regular demos, shared roadmaps and direct access to the engineers building your product."],
  ["Sustainable value", "Architecture and handover that let your product keep improving long after launch — with or without us."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Visionary thinking. Thoughtful engineering."
        description="HVD Technologies is a technology company focused on bringing people, ideas and technology together to create useful digital experiences."
      />

      <section className="bg-white py-24 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Who we are" title="A technology partner that turns ideas into working products." />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                We work with startups, growing businesses and enterprises that want more than a vendor. Our team designs and engineers
                websites, mobile applications, AI solutions and custom software — and stays focused on the business outcome behind each one.
              </p>
              <p>{siteConfig.philosophy}</p>
            </div>
            <ButtonLink href="/contact" size="lg" className="mt-10">
              Work with us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 p-8 sm:p-12">
            <div className="absolute inset-0 bg-grid mask-fade" aria-hidden="true" />
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <LogoMark className="h-14 w-14" />
              <dl className="mt-10 space-y-8">
                {name.map((item) => (
                  <div key={item.letter} className="flex gap-5">
                    <dt className="text-gradient w-10 shrink-0 text-5xl font-semibold leading-none">{item.letter}</dt>
                    <dd>
                      <p className="text-lg font-semibold text-white">{item.word}</p>
                      <p className="mt-1 leading-relaxed text-slate-400">{item.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow="What we stand for" title="Our commitments to every client" />
          <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {commitments.map(([title, description]) => (
              <div key={title} className="bg-white p-8">
                <dt className="text-lg font-semibold text-ink">{title}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <WhyHVD />
      <Process />
      <div className="pt-24 sm:pt-28" />
      <CTABand />
    </>
  );
}
