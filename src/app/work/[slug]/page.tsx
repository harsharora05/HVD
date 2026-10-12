import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Target } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/sections/page-header";
import { DemoBadge } from "@/components/sections/project-card";
import { CTABand } from "@/components/sections/cta-band";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { ProjectMockup } from "@/components/visuals/project-mockup";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return createMetadata({ title: project.title, description: project.summary, path: `/work/${project.slug}` });
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const isDemo = project.kind === "demo";

  return (
    <>
      <PageHeader eyebrow={project.industry} title={project.title} description={project.summary}>
        <div className="flex flex-wrap items-center gap-3">
          {isDemo && <DemoBadge />}
          {project.client && <Badge tone="dark">Client: {project.client}</Badge>}
          {project.services.map((slug) => {
            const service = getService(slug);
            return (
              service && (
                <Link key={slug} href={`/services/${slug}`} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white">
                  {service.title}
                </Link>
              )
            );
          })}
        </div>
      </PageHeader>

      <section className="bg-white pb-24 pt-12 sm:pb-28">
        <Container>
          <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All work
          </Link>
          <ProjectMockup project={project} className="mt-8 aspect-[4/3] sm:aspect-[16/9]" priority />

          {isDemo && (
            <p className="mt-6 rounded-xl border border-violet-400/30 bg-violet-400/5 p-4 text-sm text-ink">
              This is a <strong>demonstration project</strong> showing how HVD Technologies would approach this problem. It is not a client
              engagement; the outcomes below are what the solution is designed to achieve, not measured results.
            </p>
          )}

          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_320px]">
            <div className="space-y-14">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-brand-600">The challenge</h2>
                <p className="mt-4 text-pretty text-xl leading-relaxed text-ink">{project.challenge}</p>
              </div>
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-brand-600">The solution</h2>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">{project.solution}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-[15px] text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-brand-600">{isDemo ? "Target outcomes" : "Outcomes"}</h2>
                <ul className="mt-6 space-y-4">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-brand-300">
                        <Target className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="pt-1.5 text-lg text-ink">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="h-fit rounded-2xl border border-line p-6 lg:sticky lg:top-28">
              <h2 className="text-sm font-semibold text-ink">Technologies</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="rounded-lg bg-surface px-2.5 py-1 font-mono text-xs text-muted">
                    {tech}
                  </li>
                ))}
              </ul>
              <h2 className="mt-8 text-sm font-semibold text-ink">Industry</h2>
              <p className="mt-2 text-sm text-muted">{project.industry}</p>
            </aside>
          </div>
        </Container>
      </section>
      <CTABand title="Facing a similar challenge?" description="Let's talk about what a solution could look like for your business." />
    </>
  );
}
