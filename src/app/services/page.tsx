import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/sections/page-header";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { CTABand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Web development, mobile application development, AI solutions and custom software — one accountable team from idea to launch and beyond.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything you need to build what's next."
        description="Web development. Mobile applications. AI solutions. Custom software. Four disciplines, one team that designs, builds and supports your product end to end."
      >
        <ButtonLink href="/contact" size="lg">
          Discuss your project <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </PageHeader>
      <ServicesOverview showHeading={false} />
      <Process />
      <TechStack />
      <CTABand title="Not sure which service you need?" description="Tell us about the problem you're solving. We'll recommend the simplest approach that gets you there." />
    </>
  );
}
