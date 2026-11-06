import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...p }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...p} />;
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-150 active:scale-[.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-ink shadow-card hover:bg-primary-2",
        secondary: "border border-line-strong bg-surface text-ink hover:border-ink",
        ghost: "text-primary hover:bg-primary-soft",
        accent: "bg-accent text-ink shadow-card hover:brightness-105",
        light: "bg-white text-night hover:bg-white/90",
        outlineLight: "border border-white/30 text-white hover:bg-white/10",
      },
      size: { sm: "h-9 px-4 text-sm", md: "h-11 px-5 text-[15px]", lg: "h-13 px-7 text-base" },
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
  return <div className={cn("rounded-card border border-line bg-surface p-6 shadow-card", className)} {...p} />;
}

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-none whitespace-nowrap", {
  variants: {
    tone: {
      verified: "bg-verified-soft text-verified",
      contacted: "bg-contacted-soft text-contacted",
      unverified: "bg-unverified-soft text-unverified",
      suspended: "bg-suspended-soft text-suspended",
      partner: "bg-accent-soft text-warn",
      neutral: "bg-primary-soft text-primary",
      warn: "bg-accent-soft text-warn",
      dark: "bg-white/10 text-white ring-1 ring-white/15",
    },
  },
  defaultVariants: { tone: "neutral" },
});
export function Badge({ tone, className, ...p }: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...p} />;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-xs font-semibold uppercase tracking-[0.14em] text-primary-2", className)}>{children}</p>;
}

export function SectionHeading({ eyebrow, title, intro, as: H = "h2", className }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; as?: "h1" | "h2"; className?: string }) {
  return (
    <div className={cn("mb-8 max-w-3xl", className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <H className={H === "h1" ? "text-4xl leading-[1.08] sm:text-5xl" : "text-3xl leading-tight sm:text-[2.25rem]"}>{title}</H>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p> : null}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="rounded-card border border-dashed border-line-strong bg-surface/60 p-10 text-center text-muted">{children}</div>;
}

export function Section({ className, ...p }: ComponentProps<"section">) {
  return <section className={cn("py-16 sm:py-20", className)} {...p} />;
}
