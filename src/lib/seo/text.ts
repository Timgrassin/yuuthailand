// Search results cut titles near 60 characters and descriptions near 160, so they are fitted here (docs/seo.md).
export const TITLE_MAX = 60;
export const DESC_MAX = 160;
export const DESC_MIN = 70;

const LISTING_TAIL = "Listing status, location and nearest immigration office on Staylong.";

// The first candidate that fits, or the last one when none does.
export function firstFit(...candidates: string[]): string {
  return candidates.find((c) => c.length <= TITLE_MAX) ?? candidates[candidates.length - 1];
}

// Google shows the site name separately, so the brand is added only when there is room for it.
export function withBrand(title: string, brand: string): string {
  if (title.includes(brand)) return title;
  const full = `${title} | ${brand}`;
  return full.length <= TITLE_MAX ? full : title;
}

function cutAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  return text
    .slice(0, max + 1)
    .replace(/\s+\S*$/, "")
    .replace(/[\s,;:&/|(.–-]+$/, "")
    .replace(/\s+(and|or|of|for|the|in|at|with|by|to|a|an)$/i, "");
}

// Keeps whole sentences where it can, and cuts at a word only when one sentence is already too long.
export function fitDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= DESC_MAX) return clean;
  let kept = "";
  for (const sentence of clean.match(/[^.!?]+[.!?]+(?:\s|$)/g) ?? []) {
    if ((kept + sentence).trim().length > DESC_MAX) break;
    kept += sentence;
  }
  kept = kept.trim();
  return kept.length >= DESC_MIN ? kept : `${cutAtWord(clean, DESC_MAX - 1)}…`;
}

export function listingDescription(summary: string): string {
  const fitted = fitDescription(summary);
  return fitted.length >= DESC_MIN ? fitted : `${fitted.replace(/\.?$/, ".")} ${LISTING_TAIL}`;
}

// The last plain-English part of a Google-formatted address that is not the city: usually the district.
export function districtFromAddress(address: string | null | undefined, city: string): string | undefined {
  if (!address) return undefined;
  const parts = address.split(",").map((s) => s.trim());
  const named = parts.filter((s) => /^[A-Za-z][A-Za-z .'-]+$/.test(s) && !/^thailand$/i.test(s) && s.toLowerCase() !== city.toLowerCase());
  return named[named.length - 1]?.replace(/\s+District$/, "");
}

const TYPE_LABELS: Record<string, string> = { muay_thai_camp: "Muay Thai camp", visa_agent: "visa agent" };

type Listing = { name: string; city: string; type: string; slug: string; address?: string | null };

// Scraped names can be long ("X (School, Lessons, Rent) - Koh Phangan Center"). Shorten only as far as needed.
export function listingTitle({ name, city, type, slug, address }: Listing): string {
  const cityName = city.replace(/\s*\(.*\)\s*$/, "");
  // Branches with the same Google name get a slug suffix. The district keeps their titles distinct.
  const where = /-[0-9a-f]{4}$/.test(slug) ? districtFromAddress(address, cityName) ?? cityName : cityName;
  const place = (n: string) => (n.toLowerCase().includes(where.toLowerCase()) ? n : `${n}, ${where}`);

  const full = name.replace(/\s+/g, " ").trim();
  const noBrackets = full.replace(/\s*\([^)]*\)/g, "").replace(/,?\s*Thailand$/i, "").trim() || full;
  const firstPart = noBrackets.split(/\s+[-–/]\s+|\s*[|•]\s*/)[0].trim() || noBrackets;
  const shortened = cutAtWord(noBrackets, TITLE_MAX - where.length - 2);
  const placed = [full, noBrackets, firstPart].map(place).find((t) => t.length <= TITLE_MAX) ?? place(shortened);

  const label = TYPE_LABELS[type] ?? type.replace(/_/g, " ");
  const isGeneric = placed.toLowerCase().includes(label.split(" ")[0].toLowerCase());
  return firstFit(isGeneric ? placed : `${placed}: ${label}`, placed);
}
