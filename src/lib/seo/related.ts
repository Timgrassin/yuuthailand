// Internal linking (docs/seo.md, "Internal links"). Every template builds its "Related on Staylong" block
// from here, so links stay topical, anchors stay descriptive and no page is left without inbound links.
import { GUIDES, VISA_CONTENT, getGuide, guidesForTrack } from "@/content";
import { COUNTRIES, people } from "@/content/countries";
import { IMMIGRATION_OFFICES, PLACES } from "@/lib/places";
import { TOOLS, getTool } from "@/lib/tools";
import { TRACKS, TRACK_INFO, trackBySlug, type Track } from "@/lib/tracks";
import { routes } from "./routes";

export type RelLink = { href: string; label: string; sub?: string };
export type RelGroup = { title: string; links: RelLink[]; more?: RelLink };

const isTrack = (t: string): t is Track => (TRACKS as readonly string[]).includes(t);

// Tracks whose rules differ by nationality: the /visas-for pages cover the DTV and retirement routes.
export const COUNTRY_TRACKS: Track[] = ["dtv", "retirement", "retirement_oa"];

// Default tracks per provider type, used when a listing has no programs on file.
const PROVIDER_TYPE_TRACKS: Record<string, Track[]> = {
  language_school: ["ed", "dtv"],
  muay_thai_camp: ["dtv"],
  cooking_school: ["dtv"],
  massage_school: ["dtv"],
  visa_agent: ["dtv", "retirement", "ltr"],
};
const PROVIDER_TYPE_GUIDES: Record<string, string[]> = {
  language_school: ["dtv-vs-ed-visa"],
  muay_thai_camp: ["dtv-new-rules-august-2026"],
  cooking_school: ["dtv-new-rules-august-2026"],
  massage_school: ["dtv-new-rules-august-2026"],
  visa_agent: ["thai-visa-agent-scams", "how-to-stay-in-thailand-long-term"],
};

export const providerTracks = (type: string, programTracks: string[] = []) =>
  [...new Set([...programTracks.filter(isTrack), ...(PROVIDER_TYPE_TRACKS[type] ?? [])])];
export const providerGuides = (type: string) => PROVIDER_TYPE_GUIDES[type] ?? [];

// Human anchor text for a bare site path found in editorial text ("See /visa-rules/dtv.").
export function pathLabel(path: string): string {
  const [, section, slug] = path.split("#")[0].split("/");
  if (section === "visa-rules") {
    if (!slug) return "all eight visas compared";
    if (slug === "changes") return "the rule change log";
    const t = trackBySlug(slug);
    return t ? `${TRACK_INFO[t].name} rules` : path;
  }
  if (section === "guides") return slug ? getGuide(slug)?.title ?? path : "all guides";
  if (section === "tools") return slug ? getTool(slug)?.name ?? path : "the free tools";
  if (section === "visas-for") {
    const c = COUNTRIES.find((x) => x.slug === slug);
    return c ? `Thailand visas for ${people(c)}` : "visas by nationality";
  }
  if (section === "faq") return "the Thailand visa FAQ";
  if (section === "checker") return "the visa checker";
  if (section === "providers") return slug ? path : "the school and provider directory";
  return path;
}

// Lists longer than a block rotate by the page they appear on, so every target is linked from some pages
// instead of the first few being linked from all of them.
function rotate<T>(items: T[], seed = ""): T[] {
  if (!seed || items.length < 2) return items;
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const k = h % items.length;
  return [...items.slice(k), ...items.slice(0, k)];
}

const trackLinks = (tracks: string[], exclude?: string): RelLink[] =>
  tracks.filter(isTrack).filter((t) => t !== exclude).map((t) => ({ href: routes.rule(TRACK_INFO[t].slug), label: TRACK_INFO[t].name }));

function guideLinks(opts: { tracks: string[]; prefer?: string[]; exclude?: string; max?: number; seed?: string }): RelLink[] {
  const byTrack = rotate([...new Set(opts.tracks.flatMap((t) => guidesForTrack(t).map((g) => g.slug)))], opts.seed);
  const slugs = [...new Set([...(opts.prefer ?? []), ...byTrack])].filter((s) => s !== opts.exclude);
  return slugs.map(getGuide).filter((g) => !!g).slice(0, opts.max ?? 4).map((g) => ({ href: routes.guide(g.slug), label: g.title }));
}

function toolLinks(opts: { tracks: string[]; guide?: string; exclude?: string; max?: number }): RelLink[] {
  const score = (t: (typeof TOOLS)[number]) => (opts.guide && t.related.includes(opts.guide) ? 10 : 0) + t.tracks.filter((x) => opts.tracks.includes(x)).length - (t.tracks.length === TRACKS.length ? 0.5 : 0);
  return TOOLS.filter((t) => t.slug !== opts.exclude && score(t) > 0).sort((a, b) => score(b) - score(a)).slice(0, opts.max ?? 3).map((t) => ({ href: routes.tool(t.slug), label: t.name, sub: t.short }));
}

function countryLinks(exclude?: string, max = COUNTRIES.length, seed?: string): RelLink[] {
  return rotate(COUNTRIES.filter((c) => c.slug !== exclude), seed).slice(0, max).map((c) => ({ href: routes.country(c.slug), label: `Thailand visas for ${people(c)}` }));
}

const moreGuides: RelLink = { href: routes.guides(), label: "All guides" };
const moreTools: RelLink = { href: routes.tools(), label: "All free tools" };
const moreCountries: RelLink = { href: routes.countries(), label: "All nationalities" };
const moreVisas: RelLink = { href: routes.rules(), label: "Compare all eight visas" };
const faqLink: RelLink = { href: routes.faq(), label: "Thailand long-stay visa FAQ" };

const nonEmpty = (groups: (RelGroup | false | undefined)[]) => groups.filter((g): g is RelGroup => !!g && g.links.length > 0);

export function relatedForGuide(slug: string): RelGroup[] {
  const g = getGuide(slug);
  if (!g) return [];
  const countries = g.tracks.some((t) => COUNTRY_TRACKS.includes(t as Track));
  return nonEmpty([
    { title: "Visa rules", links: trackLinks(g.tracks).slice(0, 4), more: moreVisas },
    { title: "Free tools", links: toolLinks({ tracks: g.tracks, guide: slug }), more: moreTools },
    // The page's own "Read next" cards already show g.related, so this column adds different guides.
    { title: "More guides", links: [...guideLinks({ tracks: g.tracks.length ? g.tracks : ["dtv", "retirement"], exclude: slug, max: 8, seed: slug }).filter((l) => !(g.related ?? []).some((r) => l.href === routes.guide(r))).slice(0, 3), faqLink], more: moreGuides },
    countries && { title: "By nationality", links: countryLinks(undefined, 5, slug), more: moreCountries },
  ]);
}

// Sidebar "Related guides" on a visa page: the visa's editorial picks, then every guide tagged with the track.
export function trackGuides(track: Track) {
  return [...new Set([...(VISA_CONTENT[track]?.related ?? []), ...guidesForTrack(track).map((g) => g.slug)])].map(getGuide).filter((g) => !!g).slice(0, 6);
}

export function relatedForTrack(track: Track): RelGroup[] {
  const others = TRACKS.filter((t) => t !== track);
  return nonEmpty([
    COUNTRY_TRACKS.includes(track) && { title: "Apply from your country", links: countryLinks(), more: moreCountries },
    { title: "Free tools for this visa", links: toolLinks({ tracks: [track], max: 4 }), more: moreTools },
    { title: "Other long-stay visas", links: trackLinks(others), more: moreVisas },
    { title: "Questions", links: [faqLink, { href: routes.ruleChanges(), label: "Thai visa rule change log" }] },
  ]);
}

export function relatedForTool(slug: string): RelGroup[] {
  const t = getTool(slug);
  if (!t) return [];
  const tracks = t.tracks.length === TRACKS.length ? ["dtv", "retirement", "ltr", "privilege"] : t.tracks;
  return nonEmpty([
    { title: "Visa rules", links: trackLinks(tracks).slice(0, 4), more: moreVisas },
    { title: "Read the guide", links: guideLinks({ tracks: [], prefer: t.related, max: 4 }), more: moreGuides },
    { title: "More free tools", links: toolLinks({ tracks: t.tracks, exclude: slug, max: 4 }), more: moreTools },
    t.tracks.includes("dtv") && t.tracks.length < 3 && { title: "DTV by nationality", links: countryLinks(), more: moreCountries },
  ]);
}

export function relatedForCountry(slug: string): RelGroup[] {
  return nonEmpty([
    { title: "Visa rules", links: trackLinks(["dtv", "retirement", "retirement_oa", "ltr"]), more: moreVisas },
    { title: "Guides", links: guideLinks({ tracks: [], prefer: ["dtv-new-rules-august-2026", "dtv-rejected-reasons", "retirement-visa-800k-bank-rules", "thailand-visa-exemption-30-days"], max: 4 }), more: moreGuides },
    { title: "Other nationalities", links: countryLinks(slug, 6, slug), more: moreCountries },
    { title: "Before you apply", links: [{ href: routes.tool("dtv-document-checklist"), label: "DTV document checklist" }, { href: routes.tool("visa-exemption-calculator"), label: "Visa exemption calculator" }, { href: routes.embassies(), label: "Thai embassies and consulates" }] },
  ]);
}

export function relatedForProvider(p: { provider_type: string; city_slug: string }, programTracks: string[]): RelGroup[] {
  const tracks = providerTracks(p.provider_type, programTracks);
  const places = PLACES.filter((x) => x.citySlug === p.city_slug).slice(0, 4).map((x) => ({ href: routes.place(x.slug), label: `Living in ${x.name}` }));
  const offices = IMMIGRATION_OFFICES.filter((o) => o.citySlug === p.city_slug).slice(0, 2).map((o) => ({ href: routes.office(o.slug), label: o.name }));
  return nonEmpty([
    { title: "Visa rules for this provider", links: trackLinks(tracks).slice(0, 3), more: moreVisas },
    { title: "Guides", links: guideLinks({ tracks, prefer: providerGuides(p.provider_type), max: 3, seed: p.city_slug }), more: moreGuides },
    { title: "Living here", links: [...places, ...offices], more: { href: routes.places(), label: "All places" } },
  ]);
}

// Every guide slug is referenced by at least one other guide, tool or visa page (checked in related.test.ts).
export const ALL_GUIDE_SLUGS = GUIDES.map((g) => g.slug);
