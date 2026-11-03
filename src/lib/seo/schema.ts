// JSON-LD builders. One per page type so every template ships structured data.
import { SITE_NAME, SITE_TAGLINE_EN, absoluteUrl, siteUrl, type Locale } from "./site";
import { routes } from "./routes";

type Thing = Record<string, unknown>;
const ORG_ID = () => `${siteUrl()}/#organization`;
const SITE_ID = () => `${siteUrl()}/#website`;

export function organizationSchema(): Thing {
  return {
    "@type": "Organization",
    "@id": ORG_ID(),
    name: SITE_NAME,
    url: siteUrl(),
    description: SITE_TAGLINE_EN,
    logo: `${siteUrl()}/logo.png`,
    areaServed: { "@type": "Country", name: "Thailand" },
    // Add LINE OA, Facebook, YouTube, Wikidata once they exist: entity disambiguation for AI engines.
    sameAs: [] as string[],
  };
}

export function websiteSchema(): Thing {
  return {
    "@type": "WebSite",
    "@id": SITE_ID(),
    name: SITE_NAME,
    url: siteUrl(),
    inLanguage: ["en", "th"],
    publisher: { "@id": ORG_ID() },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl()}${routes.providers()}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], locale: Locale = "en"): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path, locale) })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): Thing | null {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

type ProviderInput = {
  slug: string; name: string; description?: string | null; providerType: string; city: string;
  address?: string | null; lat?: number | null; lng?: number | null; website?: string | null; phone?: string | null;
  email?: string | null; verifiedAt?: string | null; updatedAt: string; refCode: string; showCtas: boolean;
  programs?: { name: string; priceThb?: number | null; durationMonths?: number | null }[];
};

// Schools map to EducationalOrganization; other provider types to LocalBusiness.
export function providerSchema(p: ProviderInput, locale: Locale = "en"): Thing {
  const isSchool = /school|university|academy|institute|language/i.test(p.providerType);
  return {
    "@type": isSchool ? "EducationalOrganization" : "LocalBusiness",
    "@id": `${absoluteUrl(routes.provider(p.slug), locale)}#provider`,
    name: p.name,
    description: p.description ?? undefined,
    url: absoluteUrl(routes.provider(p.slug), locale),
    identifier: { "@type": "PropertyValue", propertyID: "Yuu ref", value: p.refCode },
    address: p.address ? { "@type": "PostalAddress", streetAddress: p.address, addressLocality: p.city, addressCountry: "TH" } : undefined,
    geo: p.lat != null && p.lng != null ? { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng } : undefined,
    sameAs: p.showCtas && p.website ? [p.website] : undefined,
    telephone: p.showCtas ? p.phone ?? undefined : undefined,
    email: p.showCtas ? p.email ?? undefined : undefined,
    hasOfferCatalog: p.programs?.length
      ? {
          "@type": "OfferCatalog",
          name: "Programs",
          itemListElement: p.programs.map((g) => ({
            "@type": "Offer",
            itemOffered: { "@type": isSchool ? "Course" : "Service", name: g.name, provider: { "@id": `${absoluteUrl(routes.provider(p.slug), locale)}#provider` } },
            price: g.priceThb ?? undefined,
            priceCurrency: g.priceThb != null ? "THB" : undefined,
          })),
        }
      : undefined,
    // Verification is our unique, citable data point.
    subjectOf: p.verifiedAt ? { "@type": "WebPage", name: `Verified by ${SITE_NAME}`, dateModified: p.verifiedAt, url: absoluteUrl(routes.methodology(), locale) } : undefined,
  };
}

export function itemListSchema(name: string, items: { name: string; path: string }[], locale: Locale = "en"): Thing {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path, locale) })),
  };
}

export function embassySchema(e: { slug: string; name: string; city: string; country: string; address?: string | null; website?: string | null; phone?: string | null }, locale: Locale = "en"): Thing {
  return {
    "@type": "GovernmentOffice",
    name: e.name,
    url: absoluteUrl(routes.embassy(e.slug), locale),
    address: { "@type": "PostalAddress", streetAddress: e.address ?? undefined, addressLocality: e.city, addressCountry: e.country },
    sameAs: e.website ? [e.website] : undefined,
    telephone: e.phone ?? undefined,
  };
}

// Guides and rule pages: dated, authored, sourced.
export function articleSchema(a: { path: string; headline: string; description: string; publishedAt: string; updatedAt: string; authorName: string; authorRole?: string; citations?: string[] }, locale: Locale = "en"): Thing {
  return {
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    url: absoluteUrl(a.path, locale),
    inLanguage: locale,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    author: { "@type": "Person", name: a.authorName, jobTitle: a.authorRole },
    publisher: { "@id": ORG_ID() },
    citation: a.citations,
  };
}

export function graph(...nodes: (Thing | null | undefined)[]): Thing {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
