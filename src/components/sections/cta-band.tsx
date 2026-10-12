import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CTABand({
  title = "Have an idea worth building?",
  description = "Tell us where you want to go. We'll help you find the clearest, most practical way to get there.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-navy-900 px-6 py-16 text-center sm:px-16 sm:py-20">
          <div className="absolute inset-0 -z-10 bg-grid mask-fade" aria-hidden="true" />
          <div className="absolute -top-24 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/30 blur-[100px]" aria-hidden="true" />
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">{description}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Let&apos;s Build Together <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/work" size="lg" variant="secondary">
              See our work
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
