import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl, isIndexable, siteUrl } from "./site";
import { fitDescription, withBrand } from "./text";

const DEFAULT_OG_IMAGE = "/og.png";

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
  const description = fitDescription(m.description);
  const image = { url: m.ogImage ?? DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: m.title };
  return {
    metadataBase: new URL(siteUrl()),
    title: { absolute: withBrand(m.title, SITE_NAME) },
    description,
    alternates: { canonical: m.path },
    // Thin public pages (cities, unverified listings, filtered lists) stay out of the index but pass link
    // equity on (noindex, follow), so the listings they link to are still discovered. Previews follow nothing.
    robots: !isIndexable() ? { index: false, follow: false } : m.noindex ? { index: false, follow: true } : { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: m.title,
      description,
      url: absoluteUrl(m.path),
      locale: "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: m.title, description, images: [image.url] },
    other: m.updatedAt ? { "article:modified_time": m.updatedAt } : undefined,
  };
}
