import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, projects } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "./project-card";

export function FeaturedProjects() {
  const list = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);
  const hasDemos = list.some((project) => project.kind === "demo");
  return (
    <section id="work" className="bg-white py-24 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Featured work"
            title="Turning ambitious ideas into reality."
            description="A look at the kinds of products we design and build — from the business challenge to the solution and the outcomes it targets."
          />
          <Link href="/work" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
            See all work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((project, index) => (
            <Reveal key={project.slug} variant="fall" delay={index * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        {hasDemos && (
          <p className="mt-8 text-sm text-muted">
            Projects marked <span className="font-medium text-violet-500">Demonstration project</span> are concept builds that show our
            approach. They are not client engagements, and their outcomes are goals rather than measured results.
          </p>
        )}
      </Container>
    </section>
  );
}
