import {
  Bot,
  Code2,
  FileText,
  Handshake,
  Layers,
  Lightbulb,
  Link2,
  MessageSquareText,
  MessagesSquare,
  Plug,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  bot: Bot,
  code: Code2,
  file: FileText,
  handshake: Handshake,
  layers: Layers,
  lightbulb: Lightbulb,
  link: Link2,
  message: MessageSquareText,
  messages: MessagesSquare,
  plug: Plug,
  refresh: RefreshCw,
  rocket: Rocket,
  search: Search,
  "shield-check": ShieldCheck,
  smartphone: Smartphone,
  sparkles: Sparkles,
  users: Users,
  workflow: Workflow,
};

/** Renders a Lucide icon by the string names used in /content. */
export function Icon({ name, className }: { name: string; className?: string }) {
  const Component = icons[name] ?? Sparkles;
  return <Component className={className} aria-hidden="true" strokeWidth={1.75} />;
}
