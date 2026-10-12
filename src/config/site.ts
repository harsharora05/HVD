/**
 * Central company configuration.
 *
 * Update contact details, social profiles and navigation here — every page,
 * the footer, the contact page and SEO metadata read from this file.
 * Leave a value as an empty string to hide it from the site.
 */

type SiteConfig = {
  name: string;
  shortName: string;
  fullForm: string;
  tagline: string;
  statement: string;
  description: string;
  philosophy: string;
  url: string;
  contact: { email: string; phone: string; whatsapp: string; location: string; responseTime: string };
  social: { linkedin: string; github: string; x: string; instagram: string };
};

export const siteConfig: SiteConfig = {
  name: "HVD Technologies",
  shortName: "HVD",
  fullForm: "Human-centric Visionary Development",
  tagline: "Engineering tomorrow's digital solutions.",
  statement: "Web development. Mobile applications. AI solutions. Custom software.",
  description:
    "HVD Technologies builds modern websites, mobile applications, AI-powered solutions and custom software that turn ambitious ideas into meaningful business outcomes.",
  philosophy:
    "We combine human-centered thinking, visionary ideas, and engineering excellence to build digital solutions that help businesses innovate, operate efficiently, and grow.",

  /** Canonical URL used for SEO, sitemap and Open Graph. Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  contact: {
    // TODO: replace with the company's real inbox before launch.
    email: "hello@hvdtechnologies.com",
    /** Display format, e.g. "+91 98765 43210". Empty hides it. */
    phone: "",
    /** International format digits only, e.g. "919876543210". Empty hides WhatsApp links. */
    whatsapp: "",
    /** Free-text location or "Remote-first". Empty hides it. */
    location: "",
    responseTime: "We usually reply within one business day.",
  },

  /** Empty strings are hidden automatically. */
  social: {
    linkedin: "",
    github: "",
    x: "",
    instagram: "",
  },
};

/**
 * `section` is the homepage section id the link scrolls to (and highlights while
 * that section is in view). `page` is the dedicated page whose URLs also mark the
 * link active when browsing outside the homepage.
 */
export type NavItem = { label: string; section: string; page: string };

export const mainNav: NavItem[] = [
  { label: "Home", section: "top", page: "/" },
  { label: "Services", section: "services", page: "/services" },
  { label: "Solutions", section: "solutions", page: "/solutions" },
  { label: "Our Work", section: "work", page: "/work" },
  { label: "About Us", section: "about", page: "/about" },
  { label: "Contact", section: "contact", page: "/contact" },
];

export function navHref(item: NavItem) {
  return item.section === "top" ? "/" : `/#${item.section}`;
}

export function whatsappLink(message = "Hi HVD Technologies, I'd like to discuss a project.") {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : "";
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
