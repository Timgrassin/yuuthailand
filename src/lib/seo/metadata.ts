import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl, isIndexable, localePath, siteUrl, type Locale } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  // Set false when a page has no Thai version yet, so hreflang never points at a 404.
  hasThai?: boolean;
  noindex?: boolean;
  ogImage?: string;
  updatedAt?: string;
};

// Every page builds metadata through this. Canonical + hreflang + OG come for free.
export function pageMetadata(m: PageMeta): Metadata {
  const locale = m.locale ?? "en";
  const hasThai = m.hasThai ?? true;
  const languages: Record<string, string> = { en: absoluteUrl(m.path, "en"), "x-default": absoluteUrl(m.path, "en") };
  if (hasThai) languages.th = absoluteUrl(m.path, "th");

  return {
    metadataBase: new URL(siteUrl()),
    title: m.title,
    description: m.description,
    alternates: { canonical: localePath(m.path, locale), languages },
    robots: m.noindex || !isIndexable() ? { index: false, follow: false } : { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: m.title,
      description: m.description,
      url: absoluteUrl(m.path, locale),
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? ["en_US"] : hasThai ? ["th_TH"] : [],
      images: m.ogImage ? [{ url: m.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
    other: m.updatedAt ? { "article:modified_time": m.updatedAt } : undefined,
  };
}
