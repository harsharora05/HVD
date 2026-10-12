import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden bg-navy-900 pt-24">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade" aria-hidden="true" />
      <Container className="text-center">
        <p className="text-gradient font-mono text-sm font-medium">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">This page doesn&apos;t exist.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-slate-300">The link may be broken or the page may have moved.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
