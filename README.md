# HVD Technologies — Website

**Human-centric Visionary Development** · *Engineering tomorrow's digital solutions.*

Marketing website built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 and Lucide icons.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

## Editing content

All copy and data live in plain TypeScript files — no component changes needed.

| What | File |
| --- | --- |
| Company name, tagline, **email / phone / WhatsApp / location**, social links | `src/config/site.ts` |
| Navigation | `src/config/site.ts` (`mainNav`) |
| Services + service pages (capabilities, FAQs, tech) | `src/content/services.ts` |
| Portfolio / case studies | `src/content/projects.ts` |
| Values, AI capabilities, process, tech stack, solutions, form options | `src/content/company.ts` |

Empty contact or social values are hidden automatically.

### Portfolio honesty rules

Every project has `kind: "client"` or `kind: "demo"`. The four bundled projects are **demonstration projects**: the site labels them that way and frames their outcomes as *target outcomes*. Add real client work with `kind: "client"` only when you have permission, and publish only results you can substantiate. To use a real screenshot, put it in `public/work/` and set `image: { src, alt }`.

## Contact form

`src/app/actions/contact.ts` is a Server Action. It validates on the server using the same rules as the client (`src/lib/contact.ts`) and delivers leads through `src/lib/deliver-lead.ts`:

- **Resend**: set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`, plus `CONTACT_FROM_EMAIL` on a verified domain.
- **Webhook**: set `CONTACT_WEBHOOK_URL` (receives JSON).

If no provider is configured, the form shows an error and points visitors to the email address. It never reports success for a lead that was not delivered.

Spam protection: a honeypot field, a minimum fill time, and a per-IP rate limit. The rate limiter is in-memory; on multi-instance or serverless hosting, swap in Redis/Upstash (`src/lib/rate-limit.ts`).

## Before launch checklist

- [ ] Replace the placeholder email in `src/config/site.ts`; add phone, WhatsApp and social links
- [ ] Set `NEXT_PUBLIC_SITE_URL` and a contact delivery provider in production env
- [ ] Have `/privacy` and `/terms` reviewed by a legal professional
- [ ] Replace or add to the demo projects with genuine work when available
- [ ] Confirm the tech stack in `src/content/company.ts` matches what the team supports

## Structure

```
src/
  app/            routes, metadata, sitemap.ts, robots.ts, opengraph-image.tsx, server action
  components/
    brand/        HVD logo + monogram
    layout/       navbar, footer, social links
    sections/     homepage & page sections
    visuals/      SVG/HTML illustrations (hero, services, project mockups)
    contact/      contact form + details
    ui/           buttons, headings, badges, reveal animation
  config/         site-wide settings
  content/        editable content
  lib/            helpers (validation, delivery, rate limit, metadata)
```
