import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom token colors, or it treats text-primary-ink as a font size and drops it.
const COLORS = ["sunken", "ink-2", "line-strong", "primary-2", "night", "bg", "surface", "ink", "muted", "line", "primary", "primary-ink", "primary-soft", "accent", "accent-soft", "verified", "verified-soft", "contacted", "contacted-soft", "unverified", "unverified-soft", "suspended", "suspended-soft"];
const twMerge = extendTailwindMerge({ extend: { theme: { color: COLORS } } });

export const cn = (...v: ClassValue[]) => twMerge(clsx(v));
