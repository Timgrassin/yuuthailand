import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl, isIndexable, siteUrl } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
  updatedAt?: string;
};

// Every page builds metadata through this. Canonical + OG come for free.
export function pageMetadata(m: PageMeta): Metadata {
  return {
    metadataBase: new URL(siteUrl()),
    title: m.title,
    description: m.description,
    alternates: { canonical: m.path },
    robots: m.noindex || !isIndexable() ? { index: false, follow: false } : { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: m.title,
      description: m.description,
      url: absoluteUrl(m.path),
      locale: "en_US",
      images: m.ogImage ? [{ url: m.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
    other: m.updatedAt ? { "article:modified_time": m.updatedAt } : undefined,
  };
}
