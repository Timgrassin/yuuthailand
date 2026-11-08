import type { MetadataRoute } from "next";
import { routes } from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/site";
import { publicDb } from "@/lib/supabase/public";
import { all } from "@/lib/data";
import { isIndexableListing } from "@/lib/listing";
import { TRACKS, TRACK_INFO } from "@/lib/tracks";
import { GUIDES } from "@/content";
import { COUNTRIES } from "@/content/countries";
import { TOOLS } from "@/lib/tools";
import { IMMIGRATION_OFFICES, PLACES } from "@/lib/places";

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

function entry(path: string, lastModified?: string | Date, priority = 0.5): Entry {
  return {
    url: absoluteUrl(path),
    lastModified: lastModified ?? new Date(),
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const out: Entry[] = [
    entry(routes.home(), undefined, 1),
    entry(routes.checker(), undefined, 0.9),
    entry(routes.rules(), undefined, 0.9),
    entry(routes.ruleChanges(), undefined, 0.7),
    entry(routes.providers(), undefined, 0.9),
    entry(routes.embassies(), undefined, 0.6),
    entry(routes.methodology(), undefined, 0.6),
    ...TRACKS.map((t) => entry(routes.rule(TRACK_INFO[t].slug), undefined, 0.9)),
    entry(routes.guides(), undefined, 0.7),
    entry(routes.tools(), undefined, 0.8),
    ...TOOLS.map((t) => entry(routes.tool(t.slug), undefined, 0.8)),
    entry(routes.faq(), "2026-11-04", 0.8),
    entry(routes.countries(), undefined, 0.7),
    ...COUNTRIES.map((c) => entry(routes.country(c.slug), c.updated, 0.7)),
    entry("/mcp-server", "2026-11-04", 0.6),
    entry(routes.places(), "2026-11-04", 0.8),
    ...PLACES.map((p) => entry(routes.place(p.slug), p.updated, 0.8)),
    entry(routes.offices(), "2026-11-04", 0.7),
    ...IMMIGRATION_OFFICES.map((o) => entry(routes.office(o.slug), o.updated, 0.7)),
    ...GUIDES.map((g) => entry(routes.guide(g.slug), g.updated, g.kind === "change" ? 0.9 : 0.8)),
  ];

  const db = publicDb();
  if (!db) return out;

  type Row = { slug: string; updated_at: string; status: string; city_slug: string; facts: unknown[] | null; description_en: string | null };
  const [providers, cities, embassies] = await Promise.all([
    // Every row, not the first 1,000 (PostgREST's page size).
    all<Row>((d, from, to) => d.from("public_providers").select("slug, updated_at, status, city_slug, facts, description_en").order("id").range(from, to)),
    db.from("cities").select("slug, updated_at"),
    db.from("embassies").select("slug, updated_at, address, last_checked_at"),
  ]);

  // Only listings whose page is indexable (same rule as the page's robots tag, D14/D23).
  for (const p of providers) if (isIndexableListing(p)) out.push(entry(routes.provider(p.slug), p.updated_at, p.status === "verified" ? 0.8 : 0.5));
  // Same index rules as the pages: cities need 3 verified providers, embassies need an address and a check date.
  const verifiedByCity = new Map<string, number>();
  for (const p of providers) if (p.status === "verified") verifiedByCity.set(p.city_slug, (verifiedByCity.get(p.city_slug) ?? 0) + 1);
  for (const c of cities.data ?? []) if ((verifiedByCity.get(c.slug) ?? 0) >= 3) out.push(entry(routes.city(c.slug), c.updated_at, 0.8));
  for (const e of embassies.data ?? []) if (e.address && e.last_checked_at) out.push(entry(routes.embassy(e.slug), e.updated_at, 0.5));
  return out;
}
