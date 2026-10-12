import { FlaskConical } from "lucide-react";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectCard } from "@/components/sections/project-card";
import { CTABand } from "@/components/sections/cta-band";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata = createMetadata({
  title: "Our Work",
  description: "Portfolio and case studies from HVD Technologies — web platforms, mobile apps, AI solutions and custom software.",
  path: "/work",
});

export default function WorkPage() {
  const hasDemos = projects.some((project) => project.kind === "demo");
  return (
    <>
      <PageHeader
        eyebrow="Portfolio & case studies"
        title="Turning ambitious ideas into reality."
        description="Each case study walks through the business challenge, the solution we designed and the outcomes it was built to achieve."
      />
      <section className="bg-white py-24 sm:py-28">
        <Container>
          {hasDemos && (
            <div className="mb-12 flex items-start gap-3 rounded-2xl border border-violet-400/30 bg-violet-400/5 p-5 text-sm text-ink">
              <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" aria-hidden="true" />
              <p>
                <strong className="font-semibold">About demonstration projects.</strong> Projects labelled &ldquo;Demonstration project&rdquo; are
                concept builds that illustrate how we approach common business problems. They do not represent client engagements, and listed
                outcomes are design goals rather than measured results.
              </p>
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 2) * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CTABand title="Your project could be next." />
    </>
  );
}
