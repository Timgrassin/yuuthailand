// MCP tools served at /mcp. All read-only, no auth. Every answer carries the canonical staylong.co URL
// so assistants cite the page, not just the fact.
import { z } from "zod";
import { answersSchema, evaluate } from "@/lib/checker/engine";
import { getProviders, getRuleChanges, getRules, getUsdRate } from "@/lib/data";
import { IMMIGRATION_OFFICES, PLACES, distanceKm } from "@/lib/places";
import { routes } from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/site";
import { TRACKS, TRACK_INFO, trackBySlug } from "@/lib/tracks";
import { corpus, getDoc, search } from "./corpus";

type Json = Record<string, unknown>;
export type ToolDef = {
  name: string; title: string; description: string;
  inputSchema: Json; outputSchema?: Json;
  run: (args: Json) => Promise<Json>;
};

export const SERVER_INFO = { name: "staylong", title: "Staylong: Thailand long-stay visas", version: "1.0.0", websiteUrl: absoluteUrl("/") };
const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
const KINDS = ["guide", "visa", "faq", "nationality", "place", "immigration_office", "tool"];
const trackSlugs = TRACKS.map((t) => TRACK_INFO[t].slug);
const resolveTrack = (s: string) => (TRACKS as readonly string[]).includes(s) ? s : trackBySlug(s);
// Added to every tool result by the route.
export const DISCLAIMER = "Information, not legal advice. Rules change: confirm with the Thai embassy or Immigration Bureau before you apply.";

export const TOOL_DEFS: ToolDef[] = [
  {
    name: "search",
    title: "Search Staylong",
    description: "Search Staylong's Thailand long-stay content: visa guides, rules, 150 FAQs, nationality pages, place guides, immigration offices and tools. Returns ids for the fetch tool.",
    inputSchema: { type: "object", properties: { query: { type: "string", description: "Natural-language query, e.g. 'DTV bank balance' or '90-day report Chiang Mai'" }, kind: { type: "string", enum: KINDS, description: "Optional filter" } }, required: ["query"] },
    run: async (a) => {
      const query = String(a.query ?? "").trim();
      if (query.length < 2) throw new Error("query is required: describe what you want, e.g. 'DTV bank balance' or '90-day report Chiang Mai'");
      if (a.kind !== undefined && !KINDS.includes(String(a.kind))) throw new Error(`Unknown kind. Use one of ${KINDS.join(", ")}`);
      const results = search(query, { kind: typeof a.kind === "string" ? a.kind : undefined }).map((d) => ({ id: d.id, title: d.title, url: d.url, text: d.summary }));
      return { results };
    },
  },
  {
    name: "fetch",
    title: "Fetch a Staylong document",
    description: "Get the full text of a Staylong document by id from search (e.g. 'guide:tm30-thailand', 'place:chiang-mai-nimman', 'office:phuket-town').",
    inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
    run: async (a) => {
      const d = getDoc(String(a.id ?? ""));
      if (!d) throw new Error(`Unknown id. Use search first. Ids look like ${corpus().slice(0, 2).map((x) => x.id).join(", ")}`);
      return { id: d.id, title: d.title, text: d.text, url: d.url, metadata: { kind: d.kind, updated: d.updated ?? null, source: "Staylong (staylong.co)" } };
    },
  },
  {
    name: "get_visa_rules",
    title: "Current Thai visa rules",
    description: `Current thresholds for a Thai long-stay visa (money, age, income, fees, stay length) from Staylong's live rules table, each with effective date, official source URL and confidence. Tracks: ${trackSlugs.join(", ")}.`,
    inputSchema: { type: "object", properties: { track: { type: "string", enum: trackSlugs } }, required: ["track"] },
    run: async (a) => {
      const track = resolveTrack(String(a.track ?? ""));
      if (!track) throw new Error(`Unknown track. Use one of ${trackSlugs.join(", ")}`);
      const rules = await getRules(track);
      return {
        track: TRACK_INFO[track as keyof typeof TRACK_INFO].name, url: absoluteUrl(routes.rule(TRACK_INFO[track as keyof typeof TRACK_INFO].slug)),
        rules: rules.map((r) => ({ key: r.key, label: r.label_en, value: r.value_num ?? r.value_json, unit: r.unit, note: r.note_en, effective_from: r.effective_from, source: r.source_url, confidence: r.confidence, expert_reviewed: !!r.reviewed_at })),
      };
    },
  },
  {
    name: "check_visa_eligibility",
    title: "Thai visa eligibility check",
    description: "Score every Thai long-stay visa (DTV, ED, retirement, O-A, LTR, Privilege, marriage, work) against a person's age, purpose, savings, income and assets, using current rules. Amounts in THB except assets in USD.",
    inputSchema: {
      type: "object",
      properties: {
        age: { type: "integer", minimum: 16, maximum: 110 },
        purposes: { type: "array", items: { type: "string", enum: ["remote_work", "study", "retire", "family", "local_job", "invest"] }, minItems: 1 },
        fundsThb: { type: "number", description: "Savings available, THB" },
        incomeThbMonth: { type: "number", description: "Monthly income, THB" },
        assetsUsd: { type: "number", description: "Investable assets, USD" },
        marriedThai: { type: "boolean" },
        jobOffer: { type: "boolean", description: "Has a job offer from a Thai employer" },
      },
      required: ["age", "purposes"],
    },
    run: async (a) => {
      const parsed = answersSchema.safeParse(a);
      if (!parsed.success) throw new Error(`Invalid answers: ${z.prettifyError(parsed.error)}`);
      const [rules, usd] = await Promise.all([getRules(), getUsdRate()]);
      const results = evaluate(parsed.data, rules, usd.rate).map((r) => ({ visa: TRACK_INFO[r.track].name, verdict: r.verdict, score: r.score, reasons: r.reasons.map((x) => `${x.ok === true ? "Meets" : x.ok === false ? "Fails" : "Check"}: ${x.text}`), url: absoluteUrl(routes.rule(TRACK_INFO[r.track].slug)) }));
      return { results, checker: absoluteUrl(routes.checker()) };
    },
  },
  {
    name: "find_immigration_office",
    title: "Find a Thai immigration office",
    description: "Find the immigration office for a Thai city, area or coordinates, with address, hours, services and tips for 90-day reports, extensions and TM30.",
    inputSchema: { type: "object", properties: { city: { type: "string", description: "City, island or area, e.g. 'Rawai' or 'Koh Phangan'" }, lat: { type: "number" }, lng: { type: "number" } } },
    run: async (a) => {
      const q = String(a.city ?? "").toLowerCase().trim();
      let offices = IMMIGRATION_OFFICES.filter((o) => q && [o.city, o.name, ...o.servesAreas].some((s) => s.toLowerCase().includes(q)));
      if (!offices.length && q) {
        const place = PLACES.find((p) => [p.name, p.city, p.slug].some((s) => s.toLowerCase().includes(q)));
        if (place) offices = IMMIGRATION_OFFICES.filter((o) => o.citySlug === place.citySlug);
      }
      if (!offices.length && typeof a.lat === "number" && typeof a.lng === "number") {
        const here = { lat: a.lat, lng: a.lng };
        offices = [...IMMIGRATION_OFFICES].sort((x, y) => distanceKm(here, x) - distanceKm(here, y)).slice(0, 2);
      }
      return {
        offices: offices.map((o) => ({ name: o.name, city: o.city, address: o.address, hours: o.hours, phone: o.phone, website: o.website, services: o.services, appointment: o.appointmentSystem, tips: [...new Set(o.tips)], serves: o.servesAreas, confidence: o.confidence, url: absoluteUrl(routes.office(o.slug)) })),
        all_offices: absoluteUrl(routes.offices()),
        note: offices.length ? "Offices move and hours change. Confirm before you travel." : "No match. Try a province or city name, or pass lat and lng.",
      };
    },
  },
  {
    name: "list_places",
    title: "Where to live in Thailand",
    description: "List Staylong's long-stay places (neighbourhoods, towns, islands) with who each suits, cost level and immigration office. Filter by city or by what the person wants.",
    inputSchema: { type: "object", properties: { city: { type: "string" }, kind: { type: "string", enum: ["neighbourhood", "town", "island"] } } },
    run: async (a) => {
      const city = String(a.city ?? "").toLowerCase();
      const places = PLACES.filter((p) => (!city || p.city.toLowerCase().includes(city) || p.citySlug.includes(city)) && (!a.kind || p.kind === a.kind));
      return { places: places.map((p) => ({ id: `place:${p.slug}`, name: p.name, city: p.city, kind: p.kind, tagline: p.tagline, best_for: p.bestFor, cost_level: p.costLevel, immigration_office: p.immigrationOffice.name, url: absoluteUrl(routes.place(p.slug)) })), map: absoluteUrl(routes.places()) };
    },
  },
  {
    name: "find_providers",
    title: "Find schools, camps and visa agents",
    description: "List language schools, Muay Thai camps, Thai cooking and massage schools and visa agents in a Thai city with Staylong's verification status (verified, contacted, unverified).",
    inputSchema: { type: "object", properties: { city: { type: "string", description: "City slug, e.g. bangkok, chiang-mai, phuket" }, type: { type: "string", enum: ["language_school", "muay_thai_camp", "visa_agent", "cooking_school", "massage_school"] }, verified_only: { type: "boolean" } } },
    run: async (a) => {
      const rows = await getProviders({ city: typeof a.city === "string" ? a.city.toLowerCase().replace(/\s+/g, "-") : undefined });
      const list = rows.filter((p) => p.status !== "suspended" && (!a.type || p.provider_type === a.type) && (!a.verified_only || p.status === "verified"));
      return { providers: list.slice(0, 50).map((p) => ({ name: p.name_en, ref: p.ref_code, type: p.provider_type, city: p.city_name_en, status: p.status, partner: p.is_partner, google_rating: p.google_rating ?? null, website: p.website, url: absoluteUrl(routes.provider(p.slug)) })), how_we_verify: absoluteUrl(routes.methodology()) };
    },
  },
  {
    name: "list_rule_changes",
    title: "Recent Thai visa rule changes",
    description: "The latest changes to Thai long-stay visa rules logged by Staylong, newest first, with dates.",
    inputSchema: { type: "object", properties: { limit: { type: "integer", minimum: 1, maximum: 50 } } },
    run: async (a) => {
      const rows = await getRuleChanges(Math.min(Number(a.limit ?? 20) || 20, 50));
      return { changes: rows.map((r) => ({ date: r.changed_at, track: r.track, rule: r.rule_key, action: r.action, summary: r.summary_en })), log: absoluteUrl(routes.ruleChanges()), feed: absoluteUrl("/feeds/rule-changes.xml") };
    },
  },
];

export const TOOL_LIST = TOOL_DEFS.map(({ name, title, description, inputSchema }) => ({ name, title, description, inputSchema, annotations: { title, ...READ_ONLY } }));
