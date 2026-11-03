import type { MetadataRoute } from "next";
import { routes } from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/site";
import { publicDb } from "@/lib/supabase/public";

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

// Each URL is listed once with en + th alternates (hreflang in the sitemap).
function entry(path: string, lastModified?: string | Date, priority = 0.5, hasThai = true): Entry {
  return {
    url: absoluteUrl(path, "en"),
    lastModified: lastModified ?? new Date(),
    priority,
    alternates: hasThai ? { languages: { en: absoluteUrl(path, "en"), th: absoluteUrl(path, "th") } } : undefined,
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
    entry(routes.about(), undefined, 0.3),
  ];

  const db = publicDb();
  if (!db) return out;

  const [providers, cities, embassies] = await Promise.all([
    db.from("public_providers").select("slug, updated_at, status"),
    db.from("cities").select("slug, updated_at"),
    db.from("embassies").select("slug, updated_at"),
  ]);

  // Suspended providers stay reachable but drop out of the sitemap.
  for (const p of providers.data ?? []) if (p.status !== "suspended") out.push(entry(routes.provider(p.slug), p.updated_at, p.status === "verified" ? 0.8 : 0.5));
  for (const c of cities.data ?? []) out.push(entry(routes.city(c.slug), c.updated_at, 0.8));
  for (const e of embassies.data ?? []) out.push(entry(routes.embassy(e.slug), e.updated_at, 0.5));
  return out;
}
