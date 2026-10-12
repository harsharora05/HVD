import { budgetOptions, serviceOptions, timelineOptions } from "@/content/company";

/** Shared between the client form (instant feedback) and the server action (source of truth). */
export type ContactFields = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors; values?: ContactFields };

export const contactLimits = {
  name: 100,
  email: 254,
  company: 120,
  details: 5000,
  detailsMin: 20,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readContactFields(formData: FormData): ContactFields {
  const get = (key: string) => String(formData.get(key) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    service: get("service"),
    budget: get("budget"),
    timeline: get("timeline"),
    details: get("details"),
  };
}

export function validateContact(values: ContactFields): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!values.name) errors.name = "Please enter your full name.";
  else if (values.name.length > contactLimits.name) errors.name = `Please keep your name under ${contactLimits.name} characters.`;

  if (!values.email) errors.email = "Please enter your business email.";
  else if (values.email.length > contactLimits.email || !EMAIL_PATTERN.test(values.email))
    errors.email = "Please enter a valid email address, like name@company.com.";

  if (!values.company) errors.company = "Please enter your company name.";
  else if (values.company.length > contactLimits.company) errors.company = `Please keep this under ${contactLimits.company} characters.`;

  if (!values.service) errors.service = "Please choose the service you need.";
  else if (!(serviceOptions as readonly string[]).includes(values.service)) errors.service = "Please choose a service from the list.";

  if (values.budget && !(budgetOptions as readonly string[]).includes(values.budget)) errors.budget = "Please choose a budget from the list.";
  if (values.timeline && !(timelineOptions as readonly string[]).includes(values.timeline))
    errors.timeline = "Please choose a timeline from the list.";

  if (!values.details) errors.details = "Please tell us a little about your project.";
  else if (values.details.length < contactLimits.detailsMin)
    errors.details = `Please add a bit more detail (at least ${contactLimits.detailsMin} characters).`;
  else if (values.details.length > contactLimits.details)
    errors.details = `Please keep project details under ${contactLimits.details} characters.`;

  return errors;
}
