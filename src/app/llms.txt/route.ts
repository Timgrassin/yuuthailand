import { routes } from "@/lib/seo/routes";
import { SITE_NAME, SITE_TAGLINE_EN, absoluteUrl } from "@/lib/seo/site";
import { publicDb } from "@/lib/supabase/public";
import { TRACKS, TRACK_INFO } from "@/lib/tracks";

export const revalidate = 3600;

// llms.txt (llmstxt.org): a plain-text map for AI answer engines.
export async function GET() {
  const db = publicDb();
  const providers = db
    ? (await db.from("public_providers").select("slug, name_en, city_name_en, status, is_partner").eq("status", "verified").order("name_en")).data ?? []
    : [];

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_TAGLINE_EN}. Yuu checks long-stay visa providers in Thailand and records when each one was last verified. Visa rules carry an effective date and a source link. Every rule change is logged publicly.`,
    "",
    "Content is in English (no prefix) and Thai (/th). Prices are in THB.",
    "",
    "## Core pages",
    `- [Visa eligibility checker](${absoluteUrl(routes.checker())}): answers a few questions and returns the long-stay options that fit.`,
    `- [Visa rules](${absoluteUrl(routes.rules())}): current requirements per track, with effective dates and official sources.`,
    `- [Rule change log](${absoluteUrl(routes.ruleChanges())}): every change to the rules, dated. RSS: ${absoluteUrl("/feeds/rule-changes.xml")}`,
    `- [Provider directory](${absoluteUrl(routes.providers())}): verified schools and providers with ref codes.`,
    `- [Thai embassies abroad](${absoluteUrl(routes.embassies())})`,
    `- [How we verify](${absoluteUrl(routes.methodology())}): the verification method behind every status.`,
    "",
    "## Visa routes",
    ...TRACKS.map((t) => `- [${TRACK_INFO[t].en}](${absoluteUrl(routes.rule(TRACK_INFO[t].slug))}): ${TRACK_INFO[t].descEn}`),
    "",
    "## Verified providers",
    ...providers.map((p) => `- [${p.name_en}](${absoluteUrl(routes.provider(p.slug))}): ${p.city_name_en}${p.is_partner ? ", partner" : ""}`),
    "",
    "## Optional",
    `- [Thai version](${absoluteUrl("/", "th")})`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" },
  });
}
