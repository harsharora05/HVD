"use client";

import { useActionState, useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { budgetOptions, serviceOptions, timelineOptions } from "@/content/company";
import { contactLimits, validateContact, type ContactFieldErrors, type ContactFields, type ContactState } from "@/lib/contact";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const emptyValues: ContactFields = { name: "", email: "", company: "", service: "", budget: "", timeline: "", details: "" };
const fieldOrder: (keyof ContactFields)[] = ["name", "email", "company", "service", "budget", "timeline", "details"];

/** Remounting via `key` resets the form after a successful submission. */
export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [instance, setInstance] = useState(0);
  return <ContactFormInner key={instance} defaultService={defaultService} onReset={() => setInstance((n) => n + 1)} />;
}

function ContactFormInner({ defaultService, onReset }: { defaultService?: string; onReset: () => void }) {
  const [state, formAction, isPending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });
  const [values, setValues] = useState<ContactFields>(() => ({
    ...emptyValues,
    service: defaultService && (serviceOptions as readonly string[]).includes(defaultService) ? defaultService : "",
  }));
  // Client-side errors override server errors for a field once the user edits or re-submits.
  const [clientErrors, setClientErrors] = useState<Partial<Record<keyof ContactFields, string | undefined>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAtRef = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const serverErrors: ContactFieldErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const errorFor = (key: keyof ContactFields) => (key in clientErrors ? clientErrors[key] : serverErrors[key]);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const key = event.target.name as keyof ContactFields;
    const next = { ...values, [key]: event.target.value };
    setValues(next);
    if (errorFor(key)) {
      setClientErrors((current) => ({ ...current, [key]: validateContact({ ...next, [key]: next[key].trim() })[key] }));
    }
  }

  function handleBlur(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const key = event.target.name as keyof ContactFields;
    if (!values[key].trim()) return; // don't nag about empty fields until submit
    setClientErrors((current) => ({ ...current, [key]: validateContact(trimAll(values))[key] }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const errors = validateContact(trimAll(values));
    setClientErrors(Object.fromEntries(fieldOrder.map((key) => [key, errors[key]])));
    const firstInvalid = fieldOrder.find((key) => errors[key]);
    if (firstInvalid) {
      event.preventDefault();
      (formRef.current?.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
    }
  }

  // Attach the mount time so the server can reject instant (bot) submissions.
  function submit(formData: FormData) {
    formData.set("startedAt", String(mountedAtRef.current));
    formAction(formData);
  }

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center outline-none sm:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
        <h3 className="mt-5 text-2xl font-semibold text-ink">Message sent</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">{state.message}</p>
        <button type="button" onClick={onReset} className={buttonClasses({ variant: "light", className: "mt-8" })}>
          Send another message
        </button>
      </div>
    );
  }

  const hasErrors = fieldOrder.some((key) => errorFor(key));

  return (
    <form ref={formRef} action={submit} onSubmit={handleSubmit} noValidate aria-busy={isPending} className="space-y-6">
      {state.status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 outline-none"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{state.message}</p>
        </div>
      )}

      {/* Spam protection: honeypot (hidden from people and assistive tech) + fill-time check. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errorFor("name")}>
          <input {...inputProps("name")} type="text" autoComplete="name" maxLength={contactLimits.name} placeholder="Jane Doe" />
        </Field>
        <Field id="email" label="Business email" required error={errorFor("email")}>
          <input {...inputProps("email")} type="email" autoComplete="email" inputMode="email" maxLength={contactLimits.email} placeholder="jane@company.com" />
        </Field>
        <Field id="company" label="Company name" required error={errorFor("company")}>
          <input {...inputProps("company")} type="text" autoComplete="organization" maxLength={contactLimits.company} placeholder="Company Inc." />
        </Field>
        <Field id="service" label="Service required" required error={errorFor("service")}>
          <select {...inputProps("service")}>
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Budget" optional error={errorFor("budget")}>
          <select {...inputProps("budget")}>
            <option value="">Select a range</option>
            {budgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field id="timeline" label="Project timeline" optional error={errorFor("timeline")}>
          <select {...inputProps("timeline")}>
            <option value="">Select a timeline</option>
            {timelineOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="details"
        label="Project details"
        required
        error={errorFor("details")}
        hint={`${values.details.length}/${contactLimits.details}`}
      >
        <textarea
          {...inputProps("details")}
          rows={6}
          maxLength={contactLimits.details}
          placeholder="What are you building, who is it for, and what would success look like?"
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          By submitting, you agree to our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
            privacy policy
          </a>
          . We&apos;ll only use your details to respond to your enquiry.
        </p>
        <button type="submit" disabled={isPending} className={buttonClasses({ size: "lg", className: "shrink-0" })}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {isPending ? "Sending your message" : hasErrors ? "Some fields need attention" : ""}
      </p>
    </form>
  );

  function inputProps(key: keyof ContactFields) {
    const error = errorFor(key);
    return {
      id: key,
      name: key,
      value: values[key],
      onChange: handleChange,
      onBlur: handleBlur,
      disabled: isPending,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${key}-error` : undefined,
      className: cn(
        "block w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink shadow-sm transition-colors placeholder:text-slate-400",
        "focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 disabled:bg-surface",
        error ? "border-red-400" : "border-line hover:border-slate-300",
      ),
    };
  }
}

function trimAll(values: ContactFields): ContactFields {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()])) as ContactFields;
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
          {required && (
            <span className="text-red-500" aria-hidden="true">
              {" "}
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
          {optional && <span className="font-normal text-muted"> (optional)</span>}
        </label>
        {hint && <span className="text-xs tabular-nums text-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
