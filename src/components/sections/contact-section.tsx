import { Check } from "lucide-react";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const nextSteps = [
  "We review your message and reply within one business day.",
  "A short discovery call to understand your goals and constraints.",
  "A clear proposal with scope, approach, timeline and estimate.",
];

export function ContactSection({ heading = true, defaultService }: { heading?: boolean; defaultService?: string }) {
  return (
    <section id="contact" className={`relative isolate overflow-hidden bg-navy-900 pb-20 sm:pb-28 ${heading ? "pt-24 sm:pt-28" : "pt-4"}`}>
      <div className="absolute inset-0 -z-10 bg-grid mask-fade" aria-hidden="true" />
      <div className="absolute -left-40 top-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand-500/20 blur-[130px]" aria-hidden="true" />
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          {heading && (
            <>
              <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-300">
                <span className="h-px w-6 bg-brand-300/60" aria-hidden="true" />
                Contact
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Let&apos;s engineer something <span className="text-gradient motion-safe:animate-gradient">extraordinary.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                Have a project in mind? Tell us about your goals, and let&apos;s explore how technology can help.
              </p>
            </>
          )}
          <div className={heading ? "mt-10" : ""}>
            <ContactDetails />
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">What happens next</h3>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              {nextSteps.map((step) => (
                <li key={step} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <Reveal variant="scale" className="relative rounded-3xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-10">
          <h3 className="text-xl font-semibold text-ink">Tell us about your project</h3>
          <p className="mb-8 mt-1 text-sm text-muted">Fields marked * are required.</p>
          <ContactForm defaultService={defaultService} />
        </Reveal>
      </Container>
    </section>
  );
}
