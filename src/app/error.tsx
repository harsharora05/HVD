"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden bg-navy-900 pt-24">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade" aria-hidden="true" />
      <Container className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Something went wrong.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-slate-300">An unexpected error occurred. Please try again.</p>
        <button type="button" onClick={reset} className={buttonClasses({ size: "lg", className: "mt-9" })}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Try again
        </button>
      </Container>
    </section>
  );
}
