// Fetches points of interest around every place in src/content/places.ts from OpenStreetMap (Nominatim)
// and writes src/content/data/pois.json. Runs in GitHub Actions (.github/workflows/pois.yml), monthly.
// Nominatim policy: max 1 request per second, identifying User-Agent, attribution. Data is ODbL.
import { writeFileSync } from "node:fs";
import { PLACES } from "../../src/content/places";

export const POI_CATEGORIES = {
  bank: "bank",
  hospital: "hospital",
  coworking: "coworking space",
  gym: "gym",
  muay_thai: "muay thai",
  language_school: "language school",
  international_school: "international school",
  supermarket: "supermarket",
} as const;
type Cat = keyof typeof POI_CATEGORIES;
type Hit = {
  osm_type: string; osm_id: number; lat: string; lon: string; name?: string; category?: string; type?: string;
  namedetails?: Record<string, string>; extratags?: Record<string, string>; address?: Record<string, string>;
};
// [category, name, lat, lng, street, website, osmRef]
export type PoiRow = [Cat, string, number, number, string, string, string];

const UA = "staylong-directory/1.0 (+https://staylong.co)";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const latin = /[A-Za-z]/;

async function search(q: string, [minLng, minLat, maxLng, maxLat]: number[]): Promise<Hit[]> {
  const u = new URL("https://nominatim.openstreetmap.org/search");
  u.search = new URLSearchParams({
    q, format: "jsonv2", limit: "40", bounded: "1", viewbox: `${minLng},${maxLat},${maxLng},${minLat}`,
    namedetails: "1", extratags: "1", addressdetails: "1", "accept-language": "en",
  }).toString();
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(u, { headers: { "User-Agent": UA } });
    if (res.ok) return (await res.json()) as Hit[];
    await sleep(5000 * (attempt + 1));
  }
  return [];
}

function pad([a, b, c, d]: [number, number, number, number]) {
  const dx = Math.max(0.012, (c - a) * 0.25), dy = Math.max(0.012, (d - b) * 0.25);
  return [a - dx, b - dy, c + dx, d + dy];
}

async function main() {
  const out: Record<string, PoiRow[]> = {};
  let total = 0;
  for (const place of PLACES) {
    const seen = new Set<string>();
    const rows: PoiRow[] = [];
    for (const [cat, q] of Object.entries(POI_CATEGORIES) as [Cat, string][]) {
      const hits = await search(q, pad(place.bbox));
      for (const h of hits) {
        const ref = `${h.osm_type}/${h.osm_id}`;
        const name = (h.namedetails?.["name:en"] || h.namedetails?.name || h.name || "").trim();
        if (!name || !latin.test(name) || seen.has(ref)) continue;
        seen.add(ref);
        const a = h.address ?? {};
        const street = [a.road, a.suburb || a.city_district || a.village || a.town].filter(Boolean).join(", ");
        const web = h.extratags?.website || h.extratags?.["contact:website"] || "";
        rows.push([cat, name.slice(0, 120), +(+h.lat).toFixed(5), +(+h.lon).toFixed(5), street, /^https?:\/\//.test(web) ? web : "", ref]);
      }
      await sleep(1100);
    }
    out[place.slug] = rows;
    total += rows.length;
    console.log(place.slug, rows.length);
  }
  const data = { source: "OpenStreetMap contributors via Nominatim", license: "ODbL 1.0", fetchedAt: new Date().toISOString().slice(0, 10), places: out };
  writeFileSync("src/content/data/pois.json", JSON.stringify(data) + "\n");
  console.log("TOTAL", total);
  if (total < 100) throw new Error("Too few POIs, refusing to overwrite with a thin dataset");
}

main().catch((e) => { console.error(e); process.exit(1); });
