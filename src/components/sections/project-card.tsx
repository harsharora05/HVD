import Link from "next/link";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import type { Project } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { ProjectMockup } from "@/components/visuals/project-mockup";

export function DemoBadge() {
  return (
    <Badge tone="demo">
      <FlaskConical className="h-3 w-3" aria-hidden="true" />
      Demonstration project
    </Badge>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgb(11_16_32/0.35)]">
      <div className="overflow-hidden rounded-2xl">
        <ProjectMockup project={project} compact className="aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.kind === "demo" ? <DemoBadge /> : project.client && <Badge>{project.client}</Badge>}
          <Badge>{project.industry}</Badge>
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, 4).map((tech) => (
            <li key={tech} className="rounded-md bg-surface px-2 py-1 font-mono text-[11px] text-muted">
              {tech}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          View case study
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
