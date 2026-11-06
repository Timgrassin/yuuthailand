// Decision 2026-11-06 (founder to-do item 8.2, option A): unverified scraped listings with no
// quoted facts and no description are kept in the database but hidden from public lists and the
// MCP find_providers tool. Their own pages still resolve (noindex, see D14/D23).
export type ListingLike = { status: string; facts?: unknown[] | null; description_en?: string | null };

export const isListed = (p: ListingLike) =>
  p.status !== "suspended" && (p.status !== "unverified" || (p.facts?.length ?? 0) > 0 || !!p.description_en);
