// JSON-LD builders. One per page type so every template ships structured data.
import { SITE_NAME, SITE_TAGLINE, absoluteUrl, siteUrl } from "./site";
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
    description: SITE_TAGLINE,
    logo: `${siteUrl()}/logo.png`,
    areaServed: { "@type": "Country", name: "Thailand" },
    // Add sameAs with LINE OA, Facebook, YouTube and Wikidata once they exist: entity disambiguation for AI engines.
  };
}

export function websiteSchema(): Thing {
  return {
    "@type": "WebSite",
    "@id": SITE_ID(),
    name: SITE_NAME,
    url: siteUrl(),
    inLanguage: "en",
    publisher: { "@id": ORG_ID() },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl()}${routes.providers()}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
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
export function providerSchema(p: ProviderInput): Thing {
  const isSchool = /school|university|academy|institute|language/i.test(p.providerType);
  return {
    "@type": isSchool ? "EducationalOrganization" : "LocalBusiness",
    "@id": `${absoluteUrl(routes.provider(p.slug))}#provider`,
    name: p.name,
    description: p.description ?? undefined,
    url: absoluteUrl(routes.provider(p.slug)),
    identifier: { "@type": "PropertyValue", propertyID: "Staylong ref", value: p.refCode },
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
            itemOffered: { "@type": isSchool ? "Course" : "Service", name: g.name, provider: { "@id": `${absoluteUrl(routes.provider(p.slug))}#provider` } },
            price: g.priceThb ?? undefined,
            priceCurrency: g.priceThb != null ? "THB" : undefined,
          })),
        }
      : undefined,
    // Verification is our unique, citable data point.
    subjectOf: p.verifiedAt ? { "@type": "WebPage", name: `Verified by ${SITE_NAME}`, dateModified: p.verifiedAt, url: absoluteUrl(routes.methodology()) } : undefined,
  };
}

export function itemListSchema(name: string, items: { name: string; path: string }[], total = items.length): Thing {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: total,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}

export function embassySchema(e: { slug: string; name: string; city: string; country: string; address?: string | null; website?: string | null; phone?: string | null }): Thing {
  return {
    "@type": "GovernmentOffice",
    name: e.name,
    url: absoluteUrl(routes.embassy(e.slug)),
    address: { "@type": "PostalAddress", streetAddress: e.address ?? undefined, addressLocality: e.city, addressCountry: e.country },
    sameAs: e.website ? [e.website] : undefined,
    telephone: e.phone ?? undefined,
  };
}

// Guides and rule pages: dated, authored, sourced.
export function articleSchema(a: { path: string; headline: string; description: string; publishedAt: string; updatedAt: string; authorName: string; authorRole?: string; citations?: string[] }): Thing {
  return {
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    url: absoluteUrl(a.path),
    inLanguage: "en",
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    image: absoluteUrl("/og.png"),
    author: a.authorName === SITE_NAME ? { "@id": ORG_ID() } : { "@type": "Person", name: a.authorName, jobTitle: a.authorRole },
    publisher: { "@id": ORG_ID() },
    citation: a.citations,
  };
}

export function graph(...nodes: (Thing | null | undefined)[]): Thing {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}

// Free tool pages: WebApplication rich result.
export function webAppSchema(t: { path: string; name: string; description: string }): Thing {
  return {
    "@type": "WebApplication",
    name: t.name,
    description: t.description,
    url: absoluteUrl(t.path),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": ORG_ID() },
  };
}

// Place pages: a destination with coordinates, contained in its city.
export function placeSchema(p: { path: string; name: string; city: string; description: string; lat: number; lng: number }): Thing {
  return {
    "@type": "Place",
    name: p.name,
    description: p.description,
    url: absoluteUrl(p.path),
    geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng },
    containedInPlace: { "@type": "City", name: p.city, containedInPlace: { "@type": "Country", name: "Thailand" } },
  };
}

// schema.org wants "Mo-Fr 08:30-16:30". Free-text hours that do not follow the weekday pattern are left out.
export function schemaHours(hours: string | null | undefined): string[] | undefined {
  const m = hours?.match(/^Mon to Fri ((?:\d\d:\d\d to \d\d:\d\d(?: and )?)+)/);
  return m ? [...m[1].matchAll(/(\d\d:\d\d) to (\d\d:\d\d)/g)].map((h) => `Mo-Fr ${h[1]}-${h[2]}`) : undefined;
}

// Thai immigration offices.
export function officeSchema(o: { path: string; name: string; city: string; address: string; lat: number; lng: number; phone?: string | null; website?: string | null; hours?: string | null; exactGeo: boolean }): Thing {
  return {
    "@type": "GovernmentOffice",
    name: o.name,
    url: absoluteUrl(o.path),
    address: { "@type": "PostalAddress", streetAddress: o.address, addressLocality: o.city, addressCountry: "TH" },
    geo: o.exactGeo ? { "@type": "GeoCoordinates", latitude: o.lat, longitude: o.lng } : undefined,
    telephone: o.phone ?? undefined,
    sameAs: o.website ? [o.website] : undefined,
    openingHours: schemaHours(o.hours),
    parentOrganization: { "@type": "GovernmentOrganization", name: "Immigration Bureau, Royal Thai Police", url: "https://www.immigration.go.th/en/" },
  };
}
