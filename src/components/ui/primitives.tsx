import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...p }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)} {...p} />;
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-ink hover:bg-primary/90",
        secondary: "bg-surface text-ink border border-line hover:border-primary",
        ghost: "text-primary hover:bg-primary-soft",
        accent: "bg-accent text-white hover:bg-accent/90",
      },
      size: { sm: "h-9 px-4 text-sm", md: "h-11 px-5", lg: "h-13 px-7 text-lg" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };
export function Button({ className, variant, size, asChild, ...p }: ButtonProps) {
  const C = asChild ? Slot : "button";
  return <C className={cn(buttonVariants({ variant, size }), className)} {...p} />;
}

export function Card({ className, ...p }: ComponentProps<"div">) {
  return <div className={cn("rounded-card border border-line bg-surface p-5", className)} {...p} />;
}

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", {
  variants: {
    tone: {
      verified: "bg-verified-soft text-verified",
      contacted: "bg-contacted-soft text-contacted",
      unverified: "bg-unverified-soft text-unverified",
      suspended: "bg-suspended-soft text-suspended",
      partner: "bg-accent-soft text-accent",
      neutral: "bg-primary-soft text-primary",
      warn: "bg-accent-soft text-accent",
    },
  },
  defaultVariants: { tone: "neutral" },
});
export function Badge({ tone, className, ...p }: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...p} />;
}

export function SectionHeading({ eyebrow, title, intro, as: H = "h2" }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; as?: "h1" | "h2" }) {
  return (
    <div className="mb-6 max-w-3xl">
      {eyebrow ? <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-accent">{eyebrow}</p> : null}
      <H className={H === "h1" ? "text-3xl font-bold leading-tight sm:text-4xl" : "text-2xl font-bold leading-snug"}>{title}</H>
      {intro ? <p className="mt-3 text-lg text-muted">{intro}</p> : null}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="rounded-card border border-dashed border-line p-8 text-center text-muted">{children}</div>;
}
