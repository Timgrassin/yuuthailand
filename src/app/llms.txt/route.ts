import { routes } from "@/lib/seo/routes";
import { SITE_NAME, SITE_TAGLINE, absoluteUrl } from "@/lib/seo/site";
import { publicDb } from "@/lib/supabase/public";
import { TRACKS, TRACK_INFO } from "@/lib/tracks";
import { GUIDES } from "@/content";
import { COUNTRIES, people } from "@/content/countries";
import { TOOLS } from "@/lib/tools";
import { IMMIGRATION_OFFICES, PLACES } from "@/lib/places";

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
    `> ${SITE_TAGLINE}. Staylong lists long-stay visa providers in Thailand and shows each one's verification status. Visa rules carry an effective date and a source link. Every rule change is logged publicly.`,
    "",
    "Content is in English. Prices are in THB.",
    "",
    "## MCP server",
    `- [Staylong MCP server](${absoluteUrl("/mcp-server")}): remote MCP endpoint ${absoluteUrl("/mcp")} (Streamable HTTP, no auth). Tools: search, fetch, get_visa_rules, check_visa_eligibility, find_immigration_office, list_places, find_providers, list_rule_changes.`,
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
    ...TRACKS.map((t) => `- [${TRACK_INFO[t].name}](${absoluteUrl(routes.rule(TRACK_INFO[t].slug))}): ${TRACK_INFO[t].desc}`),
    "",
    "## Free tools",
    ...TOOLS.map((t) => `- [${t.name}](${absoluteUrl(routes.tool(t.slug))}): ${t.answer}`),
    "",
    "## FAQ",
    `- [Thailand long-stay FAQ](${absoluteUrl(routes.faq())}): 150 short answers on visas, reports, money, tax and daily life.`,
    "",
    "## By nationality",
    ...COUNTRIES.map((c) => `- [Thailand long-stay visas for ${people(c)}](${absoluteUrl(routes.country(c.slug))})`),
    "",
    "## Where to live",
    `- [All long-stay places](${absoluteUrl(routes.places())}): neighbourhoods, towns and islands with immigration offices, banks and hospitals mapped.`,
    ...PLACES.map((p) => `- [${p.name}, ${p.city}](${absoluteUrl(routes.place(p.slug))}): ${p.tagline}`),
    "",
    "## Immigration offices",
    ...IMMIGRATION_OFFICES.map((o) => `- [${o.name}](${absoluteUrl(routes.office(o.slug))}): ${o.address}${o.hours ? `. ${o.hours}` : ""}`),
    "",
    "## Guides and comparisons",
    ...GUIDES.map((g) => `- [${g.title}](${absoluteUrl(routes.guide(g.slug))}): ${g.answer}`),
    "",
    "## Verified providers",
    ...providers.map((p) => `- [${p.name_en}](${absoluteUrl(routes.provider(p.slug))}): ${p.city_name_en}${p.is_partner ? ", partner" : ""}`),
    "",
    "## Optional",
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" },
  });
}
