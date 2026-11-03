import type { MetadataRoute } from "next";
import { routes } from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/site";
import { publicDb } from "@/lib/supabase/public";
import { TRACKS, TRACK_INFO } from "@/lib/tracks";

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
  ];

  const db = publicDb();
  if (!db) return out;

  const [providers, cities, embassies] = await Promise.all([
    db.from("public_providers").select("slug, updated_at, status, city_slug"),
    db.from("cities").select("slug, updated_at"),
    db.from("embassies").select("slug, updated_at, address, last_checked_at"),
  ]);

  // Suspended providers stay reachable but drop out of the sitemap.
  for (const p of providers.data ?? []) if (p.status !== "suspended") out.push(entry(routes.provider(p.slug), p.updated_at, p.status === "verified" ? 0.8 : 0.5));
  // Same index rules as the pages: cities need 3 verified providers, embassies need an address and a check date.
  const verifiedByCity = new Map<string, number>();
  for (const p of providers.data ?? []) if (p.status === "verified") verifiedByCity.set(p.city_slug, (verifiedByCity.get(p.city_slug) ?? 0) + 1);
  for (const c of cities.data ?? []) if ((verifiedByCity.get(c.slug) ?? 0) >= 3) out.push(entry(routes.city(c.slug), c.updated_at, 0.8));
  for (const e of embassies.data ?? []) if (e.address && e.last_checked_at) out.push(entry(routes.embassy(e.slug), e.updated_at, 0.5));
  return out;
}
