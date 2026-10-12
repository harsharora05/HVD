import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { mainNav, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { CurrentYear } from "./current-year";
import { SocialLinks } from "./social-links";

export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-slate-400">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" aria-hidden="true" />
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="HVD Technologies — home" className="inline-block rounded-lg">
              <Logo />
            </Link>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">{siteConfig.fullForm}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{siteConfig.philosophy}</p>
            <SocialLinks className="mt-6" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-sm font-semibold text-white">Services</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="transition-colors hover:text-white">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Company</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {mainNav.slice(1).map((item) => (
                  <li key={item.page}>
                    <Link href={item.page} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Get in touch</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.phone && (
                  <li>
                    <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                      <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.location && (
                  <li className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {contact.location}
                  </li>
                )}
              </ul>
              <Link href="/contact" className="mt-6 inline-flex text-sm font-medium text-brand-300 hover:text-brand-200">
                Start a project →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. {siteConfig.tagline}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
