import "server-only";
import { siteConfig } from "@/config/site";
import type { ContactFields } from "./contact";

/**
 * Delivers a contact-form lead using whichever provider is configured:
 *  1. Resend (RESEND_API_KEY + CONTACT_TO_EMAIL) — emails the lead to your inbox.
 *  2. CONTACT_WEBHOOK_URL — POSTs JSON to any webhook (Zapier, Make, Slack workflow, CRM…).
 * Both may be configured; the submission succeeds if at least one delivery succeeds.
 * If neither is configured the submission fails — we never report success for a lead
 * that was not delivered.
 */
export async function deliverLead(lead: ContactFields & { submittedAt: string }) {
  const tasks: Promise<void>[] = [];

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (resendKey && to) tasks.push(sendWithResend(lead, resendKey, to));

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) tasks.push(sendToWebhook(lead, webhook));

  if (tasks.length === 0) {
    throw new LeadDeliveryNotConfiguredError();
  }

  const results = await Promise.allSettled(tasks);
  const failures = results.filter((result): result is PromiseRejectedResult => result.status === "rejected");
  failures.forEach((failure) => console.error("[contact] delivery failed:", failure.reason));
  if (failures.length === results.length) throw new Error("All lead delivery providers failed");
}

export class LeadDeliveryNotConfiguredError extends Error {
  constructor() {
    super("Contact form delivery is not configured. Set RESEND_API_KEY + CONTACT_TO_EMAIL or CONTACT_WEBHOOK_URL.");
  }
}

const labels: Record<keyof ContactFields, string> = {
  name: "Name",
  email: "Email",
  company: "Company",
  service: "Service",
  budget: "Budget",
  timeline: "Timeline",
  details: "Project details",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

async function sendWithResend(lead: ContactFields & { submittedAt: string }, apiKey: string, to: string) {
  const entries = (Object.keys(labels) as (keyof ContactFields)[]).map((key) => [labels[key], lead[key] || "—"] as const);
  const text = `${entries.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nSubmitted: ${lead.submittedAt}`;
  const html = `<h2>New project enquiry</h2><table cellpadding="6">${entries
    .map(([label, value]) => `<tr><td valign="top"><strong>${label}</strong></td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
    .join("")}</table><p style="color:#666">Submitted ${lead.submittedAt} via ${escapeHtml(siteConfig.url)}</p>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || `${siteConfig.name} Website <onboarding@resend.dev>`,
      to: to.split(",").map((address) => address.trim()),
      reply_to: lead.email,
      subject: `New enquiry: ${lead.service} — ${lead.company}`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

async function sendToWebhook(lead: ContactFields & { submittedAt: string }, url: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: siteConfig.url, ...lead }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
}
