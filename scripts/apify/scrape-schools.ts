// Step 1: scrape Google Maps listings for schools, camps and agents with Apify
// (actor compass/crawler-google-places, same input shape as the RoxSkin gym scraper)
// and write data/schools/listings.json. Needs APIFY_TOKEN.
// Usage: pnpm tsx scripts/apify/scrape-schools.ts [--cities bangkok,phuket] [--max 25]
import { mkdirSync, writeFileSync } from "node:fs";
import { CITIES, SEARCHES, cleanName, env, slugify } from "./lib";

type ApifyPlace = {
  placeId?: string; title?: string; categoryName?: string; categories?: string[]; address?: string; website?: string;
  phone?: string; location?: { lat: number; lng: number }; totalScore?: number; reviewsCount?: number; url?: string;
  openingHours?: { day: string; hours: string }[]; permanentlyClosed?: boolean; temporarilyClosed?: boolean; searchString?: string;
};

const args = process.argv.slice(2);
const arg = (k: string) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const cities = arg("--cities") ? CITIES.filter((c) => arg("--cities")!.split(",").includes(c.slug)) : CITIES;
const max = Number(arg("--max") ?? 25);

// Category filter: drops results Google matched loosely (hotels, restaurants, generic gyms).
const KEEP: Record<string, RegExp> = {
  language_school: /language|school|institute|academy|education|tutor|university|college/i,
  muay_thai_camp: /muay|boxing|martial|kickbox|gym|fitness|sports/i,
  visa_agent: /visa|immigration|consult|legal|law|service|agency/i,
};

// Not a provider even when Google matches the search (stadiums, shops, hotels, government offices).
const DROP = /stadium|arena|store|shop|hotel|hostel|resort|restaurant|embassy|consulate|police|travel agency|tour operator|tour agency/i;

async function main() {
  const token = env("APIFY_TOKEN");
  const startUrls = cities.flatMap((c) => SEARCHES.map((s) => ({ url: `https://www.google.com/maps/search/${encodeURIComponent(`${s.q} in ${c.query}, Thailand`)}` })));
  const input = { startUrls, maxCrawledPlacesPerSearch: max, language: "en", maxReviews: 0, maxImages: 0, scrapePlaceDetailPage: false, skipClosedPlaces: true };
  console.log(`Running ${startUrls.length} searches`);
  const res = await fetch(`https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?timeout=3000`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Apify ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const items = (await res.json()) as ApifyPlace[];

  const bySearch = (s?: string) => {
    const lower = (s ?? "").toLowerCase();
    const city = cities.find((c) => lower.includes(c.query.toLowerCase()));
    const search = SEARCHES.find((x) => lower.startsWith(x.q.toLowerCase()));
    return { city, search };
  };
  const seen = new Map<string, Record<string, unknown>>();
  for (const it of items) {
    if (!it.placeId || !it.title || it.permanentlyClosed) continue;
    const { city, search } = bySearch(it.searchString);
    if (!city || !search) continue;
    const cats = [it.categoryName, ...(it.categories ?? [])].filter(Boolean).join(" ");
    if (!KEEP[search.type].test(`${cats} ${it.title}`)) continue;
    if (DROP.test(it.categoryName ?? "") || /stadium|\bimmigration\b/i.test(it.title)) continue;
    const name = cleanName(it.title);
    if (name.length < 3 || !/[A-Za-z]/.test(name)) continue;
    if (seen.has(it.placeId)) continue;
    const base = slugify(name);
    seen.set(it.placeId, {
      google_place_id: it.placeId, name, slug: base.includes(slugify(city.query)) ? base : `${base}-${slugify(city.query)}`, city_slug: city.slug, provider_type: search.type,
      address: it.address ?? "", website: it.website ?? "", phone: it.phone ?? "",
      lat: it.location?.lat ?? "", lng: it.location?.lng ?? "", google_rating: it.totalScore ?? "", google_reviews: it.reviewsCount ?? "",
      google_maps_url: it.url ?? "", opening_hours: it.openingHours?.length ? it.openingHours : null,
      categories: [...new Set([it.categoryName, ...(it.categories ?? [])].filter(Boolean))], data_source: "apify_google_maps",
    });
  }
  mkdirSync("data/schools", { recursive: true });
  writeFileSync("data/schools/listings.json", JSON.stringify([...seen.values()], null, 1) + "\n");
  console.log(`Kept ${seen.size} of ${items.length} results`);
}

main().catch((e) => { console.error(e); process.exit(1); });
