"use server";

import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import { readContactFields, validateContact, type ContactState } from "@/lib/contact";
import { deliverLead, LeadDeliveryNotConfiguredError } from "@/lib/deliver-lead";
import { rateLimit } from "@/lib/rate-limit";

const MIN_FILL_TIME_MS = 3000;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = readContactFields(formData);

  // Spam protection 1: honeypot field that real users never see or fill.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "error", message: "We couldn't send your message. Please email us directly.", values };
  }

  // Spam protection 2: bots tend to submit instantly after page load.
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return { status: "error", message: "That was quick! Please take a moment to review your details, then submit again.", values };
  }

  // Spam protection 3: per-IP rate limit.
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (!rateLimit(`contact:${ip}`).allowed) {
    return { status: "error", message: "Too many submissions from your network. Please try again later or email us directly.", values };
  }

  const fieldErrors = validateContact(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please correct the highlighted fields.", fieldErrors, values };
  }

  try {
    await deliverLead({ ...values, submittedAt: new Date().toISOString() });
  } catch (error) {
    if (error instanceof LeadDeliveryNotConfiguredError) {
      console.error(`[contact] ${error.message}`);
    }
    return {
      status: "error",
      message: `Sorry — we couldn't send your message right now. Please try again, or email us at ${siteConfig.contact.email}.`,
      values,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${values.name.split(" ")[0]}! Your message has been sent. ${siteConfig.contact.responseTime}`,
  };
}
