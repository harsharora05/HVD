import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";
import { SocialLinks } from "@/components/layout/social-links";
import { WhatsAppIcon } from "@/components/layout/social-icons";

/** Contact channels from config/site.ts; empty values are hidden. */
export function ContactDetails() {
  const { contact } = siteConfig;
  const whatsapp = whatsappLink();
  const items = [
    contact.email && { Icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { Icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}` },
    whatsapp && { Icon: WhatsAppIcon, label: "WhatsApp", value: "Chat with us", href: whatsapp, external: true },
    contact.location && { Icon: MapPin, label: "Location", value: contact.location },
  ].filter(Boolean) as { Icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; external?: boolean }[];

  return (
    <div className="space-y-8">
      <ul className="space-y-4">
        {items.map(({ Icon, label, value, href, external }) => (
          <li key={label} className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-300">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.14em] text-slate-500">{label}</span>
              {href ? (
                <a
                  href={href}
                  className="text-white hover:text-brand-200"
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {value}
                </a>
              ) : (
                <span className="text-white">{value}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-2 text-sm text-slate-400">
        <Clock className="h-4 w-4" aria-hidden="true" />
        {contact.responseTime}
      </p>
      <SocialLinks />
    </div>
  );
}
