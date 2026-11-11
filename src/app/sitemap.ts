import type { MetadataRoute } from "next";
import { routes } from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/site";
import { publicDb } from "@/lib/supabase/public";
import { all, getRuleChanges } from "@/lib/data";
import { isIndexableCity, isIndexableListing } from "@/lib/listing";
import { TRACKS, TRACK_INFO } from "@/lib/tracks";
import { GUIDES } from "@/content";
import { COUNTRIES } from "@/content/countries";
import { TOOLS } from "@/lib/tools";
import { IMMIGRATION_OFFICES, PLACES } from "@/lib/places";

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

// lastModified is left out when no real date is known: a date that changes on every build teaches Google to ignore it.
function entry(path: string, lastModified?: string | Date, priority = 0.5): Entry {
  return { url: absoluteUrl(path), ...(lastModified ? { lastModified } : {}), priority };
}

const newest = (dates: (string | null | undefined)[]) => dates.filter((d): d is string => !!d).sort().at(-1);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = publicDb();
  type Row = { slug: string; updated_at: string; status: string; city_slug: string; facts: unknown[] | null; description_en: string | null };
  const [providers, cities, embassies, ruleChanges] = db
    ? await Promise.all([
        // Every row, not the first 1,000 (PostgREST's page size).
        all<Row>((d, from, to) => d.from("public_providers").select("slug, updated_at, status, city_slug, facts, description_en").order("id").range(from, to)),
        db.from("cities").select("slug, updated_at"),
        db.from("embassies").select("slug, updated_at, address, last_checked_at"),
        getRuleChanges(1),
      ])
    : [[] as Row[], { data: [] }, { data: [] }, []];

  const rulesDate = ruleChanges[0]?.changed_at;
  const guidesDate = newest(GUIDES.map((g) => g.updated));
  const providersDate = newest(providers.map((p) => p.updated_at));

  const out: Entry[] = [
    entry(routes.home(), newest([rulesDate, guidesDate, providersDate]), 1),
    entry(routes.checker(), rulesDate, 0.9),
    entry(routes.rules(), rulesDate, 0.9),
    entry(routes.ruleChanges(), rulesDate, 0.7),
    entry(routes.providers(), providersDate, 0.9),
    entry(routes.embassies(), newest((embassies.data ?? []).map((e: { updated_at: string }) => e.updated_at)), 0.6),
    entry(routes.methodology(), undefined, 0.6),
    entry(routes.about(), undefined, 0.5),
    entry(routes.forProviders(), undefined, 0.5),
    entry(routes.disclosures(), undefined, 0.3),
    entry(routes.privacy(), undefined, 0.3),
    entry(routes.terms(), undefined, 0.3),
    ...TRACKS.map((t) => entry(routes.rule(TRACK_INFO[t].slug), rulesDate, 0.9)),
    entry(routes.guides(), guidesDate, 0.7),
    entry(routes.tools(), undefined, 0.8),
    ...TOOLS.map((t) => entry(routes.tool(t.slug), undefined, 0.8)),
    entry(routes.faq(), "2026-11-04", 0.8),
    entry(routes.countries(), newest(COUNTRIES.map((c) => c.updated)), 0.7),
    ...COUNTRIES.map((c) => entry(routes.country(c.slug), c.updated, 0.7)),
    entry("/mcp-server", "2026-11-04", 0.6),
    entry(routes.places(), "2026-11-04", 0.8),
    ...PLACES.map((p) => entry(routes.place(p.slug), p.updated, 0.8)),
    entry(routes.offices(), "2026-11-04", 0.7),
    ...IMMIGRATION_OFFICES.map((o) => entry(routes.office(o.slug), o.updated, 0.7)),
    ...GUIDES.map((g) => entry(routes.guide(g.slug), g.updated, g.kind === "change" ? 0.9 : 0.8)),
  ];

  // Only listings whose page is indexable (same rule as the page's robots tag, D14/D23).
  for (const p of providers) if (isIndexableListing(p)) out.push(entry(routes.provider(p.slug), p.updated_at, p.status === "verified" ? 0.8 : 0.5));
  // Same index rules as the pages: cities need 5 indexable listings (D28), embassies need an address and a check date.
  const byCity = new Map<string, Row[]>();
  for (const p of providers) if (p.status !== "suspended") byCity.set(p.city_slug, [...(byCity.get(p.city_slug) ?? []), p]);
  for (const c of cities.data ?? []) if (isIndexableCity(byCity.get(c.slug) ?? [])) out.push(entry(routes.city(c.slug), c.updated_at, 0.8));
  for (const e of embassies.data ?? []) if (e.address && e.last_checked_at) out.push(entry(routes.embassy(e.slug), e.updated_at, 0.5));
  return out;
}
