import { siteConfig, whatsappLink } from "@/config/site";
import { cn } from "@/lib/cn";
import { GitHubIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon, XIcon } from "./social-icons";

export function getSocialLinks() {
  const { social } = siteConfig;
  return [
    { label: "LinkedIn", href: social.linkedin, Icon: LinkedInIcon },
    { label: "GitHub", href: social.github, Icon: GitHubIcon },
    { label: "X (Twitter)", href: social.x, Icon: XIcon },
    { label: "Instagram", href: social.instagram, Icon: InstagramIcon },
    { label: "WhatsApp", href: whatsappLink(), Icon: WhatsAppIcon },
  ].filter((link) => link.href);
}

/** Renders only the social profiles configured in config/site.ts. */
export function SocialLinks({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const links = getSocialLinks();
  if (links.length === 0) return null;
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} on ${label}`}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
              tone === "dark"
                ? "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                : "border-line text-muted hover:border-ink/20 hover:text-ink",
            )}
          >
            <Icon className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
