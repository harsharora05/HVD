import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "btn-shine bg-brand-500 text-white shadow-[0_8px_24px_-8px_rgb(79_124_255/0.6)] hover:bg-brand-600 hover:shadow-[0_10px_28px_-8px_rgb(79_124_255/0.75)]",
  secondary: "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10",
  ghost: "text-ink hover:bg-ink/5",
  light: "border border-line bg-white text-ink hover:border-ink/20 hover:bg-surface",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
