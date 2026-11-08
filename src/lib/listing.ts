// Decision 2026-11-06 (founder to-do item 8.2, option A): unverified scraped listings with no
// quoted facts and no description are kept in the database but hidden from public lists and the
// MCP find_providers tool. Their own pages still resolve (noindex, see D14/D23).
export type ListingLike = { status: string; facts?: unknown[] | null; description_en?: string | null };

export const isListed = (p: ListingLike) =>
  p.status !== "suspended" && (p.status !== "unverified" || (p.facts?.length ?? 0) > 0 || !!p.description_en);

// D14/D23: a listing page is indexable once verified, given a description, or enriched with 3+ quoted facts.
// The provider page's robots tag and the sitemap both use this, so they never disagree.
export const isIndexableListing = (p: ListingLike) =>
  p.status !== "suspended" && (p.status === "verified" || (p.facts?.length ?? 0) >= 3 || !!p.description_en);

// D28 (replaces the city part of D14): a city page is indexable once it lists at least 5 indexable listings,
// verified or not. Used by the city page's robots tag and the sitemap.
export const CITY_MIN_INDEXABLE = 5;
export const isIndexableCity = (listings: ListingLike[]) => listings.filter(isIndexableListing).length >= CITY_MIN_INDEXABLE;
