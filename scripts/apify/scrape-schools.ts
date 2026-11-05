// Step 1: scrape Google Maps listings for schools, camps, cooking and massage schools and visa agents
// with Apify (actor compass/crawler-google-places, the same actor as the RoxSkin gym scraper) and write
// data/schools/listings.json. One actor run per area, every search phrase in each run. locationQuery
// makes the actor tile the whole area, so a search is not cut off at Google's ~120 results.
// Needs APIFY_TOKEN.
// Usage: pnpm tsx scripts/apify/scrape-schools.ts [--cities bangkok,phuket] [--max 300] [--parallel 3]
import { mkdirSync, writeFileSync } from "node:fs";
import { AREAS, SEARCHES, classify, cleanName, env, slugify } from "./lib";

type ApifyPlace = {
  placeId?: string; title?: string; categoryName?: string; categories?: string[]; address?: string; website?: string;
  phone?: string; location?: { lat: number; lng: number }; totalScore?: number; reviewsCount?: number; url?: string;
  openingHours?: { day: string; hours: string }[]; permanentlyClosed?: boolean; temporarilyClosed?: boolean; searchString?: string;
};

const args = process.argv.slice(2);
const arg = (k: string) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const only = arg("--cities")?.split(",").map((s) => s.trim()).filter(Boolean);
const areas = only?.length ? AREAS.filter((a) => only.includes(a.city)) : AREAS;
const max = Number(arg("--max") || 300);
const parallel = Number(arg("--parallel") || 3);

// Not a provider even when Google matches the search.
const DROP = /stadium|arena|store|shop|hotel|hostel|resort|restaurant|embassy|consulate|police|travel agency|tour operator|tour agency|spa\b|day spa|massage spa|beauty salon/i;

const API = "https://api.apify.com/v2";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`${API}${path}`, { ...init, headers: { Authorization: `Bearer ${env("APIFY_TOKEN")}`, "Content-Type": "application/json", ...init.headers } });
    if (res.ok) return (await res.json()) as T;
    if (attempt >= 3 || (res.status < 500 && res.status !== 429)) throw new Error(`Apify ${path} ${res.status}: ${(await res.text()).slice(0, 300)}`);
    await sleep(5000 * (attempt + 1));
  }
}

async function scrapeArea(location: string): Promise<ApifyPlace[]> {
  const input = {
    searchStringsArray: SEARCHES.map((s) => s.q), locationQuery: location, maxCrawledPlacesPerSearch: max,
    language: "en", maxReviews: 0, maxImages: 0, scrapePlaceDetailPage: false, skipClosedPlaces: true,
  };
  const run = (await api<{ data: { id: string; defaultDatasetId: string } }>("/acts/compass~crawler-google-places/runs", { method: "POST", body: JSON.stringify(input) })).data;
  console.log(`${location}: run ${run.id} started`);
  let status = "RUNNING";
  while (["READY", "RUNNING"].includes(status)) {
    await sleep(20000);
    status = (await api<{ data: { status: string } }>(`/actor-runs/${run.id}`)).data.status;
  }
  if (status !== "SUCCEEDED") throw new Error(`${location}: run ${run.id} ended ${status}`);
  const items: ApifyPlace[] = [];
  for (let offset = 0; ; offset += 1000) {
    const page = await api<ApifyPlace[]>(`/datasets/${run.defaultDatasetId}/items?clean=true&format=json&offset=${offset}&limit=1000`);
    items.push(...page);
    if (page.length < 1000) break;
  }
  console.log(`${location}: ${items.length} results`);
  return items;
}

async function main() {
  env("APIFY_TOKEN");
  console.log(`Scraping ${areas.length} areas x ${SEARCHES.length} searches, up to ${max} places each, ${parallel} at a time`);
  const results: { city: string; items: ApifyPlace[] }[] = [];
  const failed: string[] = [];
  const queue = [...areas];
  await Promise.all(Array.from({ length: parallel }, async () => {
    for (let a = queue.shift(); a; a = queue.shift()) {
      try { results.push({ city: a.city, items: await scrapeArea(a.location) }); }
      catch (e) { failed.push(a.location); console.error(String(e)); }
    }
  }));

  const seen = new Map<string, Record<string, unknown>>();
  let raw = 0;
  const byType: Record<string, number> = {};
  for (const { city, items } of results) {
    for (const it of items) {
      raw++;
      if (!it.placeId || !it.title || it.permanentlyClosed || seen.has(it.placeId)) continue;
      const cats = [it.categoryName, ...(it.categories ?? [])].filter(Boolean) as string[];
      if (DROP.test(it.categoryName ?? "") || /stadium|\bimmigration (office|bureau|division)\b|^immigration\b/i.test(it.title)) continue;
      const fallback = SEARCHES.find((s) => s.q.toLowerCase() === (it.searchString ?? "").toLowerCase())?.type ?? "language_school";
      const type = classify(cats, it.title, fallback);
      if (!type) continue;
      // Government offices ("Chiang Rai Immigration") and tour companies that also sell visas.
      if (/\bimmigration\b/i.test(it.title) && !/service|agent|agency|consult|lawyer|law\b|visa/i.test(it.title.replace(/immigration/i, ""))) continue;
      if (type === "visa_agent" && /\b(tour|tours|travel)\b/i.test(it.title)) continue;
      const name = cleanName(it.title);
      if (name.length < 3 || !/[A-Za-z]/.test(name)) continue;
      const base = slugify(name);
      const cs = slugify(city);
      seen.set(it.placeId, {
        google_place_id: it.placeId, name, slug: base.includes(cs) ? base : `${base}-${cs}`, city_slug: city, provider_type: type,
        address: it.address ?? "", website: it.website ?? "", phone: it.phone ?? "",
        lat: it.location?.lat ?? "", lng: it.location?.lng ?? "", google_rating: it.totalScore ?? "", google_reviews: it.reviewsCount ?? "",
        google_maps_url: it.url ?? "", opening_hours: it.openingHours?.length ? it.openingHours : null,
        categories: [...new Set(cats)], data_source: "apify_google_maps",
      });
      byType[type] = (byType[type] ?? 0) + 1;
    }
  }
  mkdirSync("data/schools", { recursive: true });
  writeFileSync("data/schools/listings.json", JSON.stringify([...seen.values()], null, 1) + "\n");
  console.log(`Kept ${seen.size} of ${raw} results: ${JSON.stringify(byType)}`);
  if (failed.length) console.log(`Failed areas (rerun with --cities): ${failed.join("; ")}`);
  if (!seen.size) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
