// Plain-text documents for the MCP `search` and `fetch` tools. Built from the same typed content
// modules the pages render, so agents and readers see the same facts (D18).
import { GUIDES, VISA_CONTENT } from "@/content";
import { COUNTRIES, people } from "@/content/countries";
import { FAQ } from "@/content/faq";
import { IMMIGRATION_OFFICES, PLACES, POI_META, POI_ORDER, poisFor } from "@/lib/places";
import { routes } from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/site";
import { TOOLS } from "@/lib/tools";
import { TRACKS, TRACK_INFO } from "@/lib/tracks";

export type Doc = { id: string; kind: string; title: string; url: string; summary: string; text: string; updated?: string };

const qa = (faqs: { question: string; answer: string }[]) => faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");
const src = (s: { label: string; url: string }[]) => (s.length ? `Sources:\n${s.map((x) => `- ${x.label}: ${x.url}`).join("\n")}` : "");
const list = (title: string, items: string[]) => (items.length ? `${title}:\n${items.map((i) => `- ${i}`).join("\n")}` : "");
const join = (...parts: (string | false | undefined | null)[]) => parts.filter(Boolean).join("\n\n");

function build(): Doc[] {
  const docs: Doc[] = [];
  for (const g of GUIDES) {
    docs.push({
      id: `guide:${g.slug}`, kind: "guide", title: g.title, url: absoluteUrl(routes.guide(g.slug)), summary: g.answer, updated: g.updated,
      text: join(g.answer, ...g.sections.map((s) => `## ${s.heading}\n${s.body}`), qa(g.faqs), src(g.sources)),
    });
  }
  for (const t of TRACKS) {
    const info = TRACK_INFO[t];
    const v = VISA_CONTENT[t];
    if (!v) continue;
    docs.push({
      id: `visa:${info.slug}`, kind: "visa", title: `${info.name}: requirements and how to apply`, url: absoluteUrl(routes.rule(info.slug)), summary: v.intro, updated: v.updated,
      text: join(v.intro, list("Who it is for", v.whoFor), list("Not for", v.notFor),
        `How to apply:\n${v.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`).join("\n")}`,
        v.costs?.length ? `Costs:\n${v.costs.map((c) => `- ${c.item}: ${c.amount}${c.note ? ` (${c.note})` : ""}`).join("\n")}` : null,
        list("Common mistakes", v.mistakes), ...v.sections.map((s) => `## ${s.heading}\n${s.body}`), qa(v.faqs), src(v.sources),
        "Exact thresholds (money, age, fees) are in the get_visa_rules tool, which reads the live rules table."),
    });
  }
  for (const f of FAQ) {
    docs.push({ id: `faq:${f.id}`, kind: "faq", title: f.question, url: absoluteUrl(`${routes.faq()}#${f.id}`), summary: f.answer, text: join(f.answer, f.link ? `More: ${absoluteUrl(f.link)}` : null) });
  }
  for (const c of COUNTRIES) {
    docs.push({
      id: `country:${c.slug}`, kind: "nationality", title: `Thailand long-stay visas for ${people(c)}`, url: absoluteUrl(routes.country(c.slug)), updated: c.updated,
      summary: `${c.exemptionDays ? `${c.exemptionDays} days visa-free. ` : ""}${c.exemptionNote}`,
      text: join(`Visa exemption: ${c.exemptionDays ?? "check"} days. ${c.exemptionNote}`,
        `Thai missions in ${c.name}:\n${c.missions.map((m) => `- ${m.name}, ${m.city}: ${m.url}`).join("\n")}`,
        `DTV: police certificate: ${c.dtv.policeCertificate}${c.dtv.certificateMaxAge ? ` ${c.dtv.certificateMaxAge}` : ""}. Proof of residence: ${c.dtv.residenceProof}. Fee: ${c.dtv.fee ?? "check with mission"}.`,
        list("DTV quirks", c.dtv.quirks), `Retirement income proof: ${c.retirement.incomeProof}`, list("Retirement notes", c.retirement.notes), list("Notes", c.notes), src(c.sources)),
    });
  }
  for (const p of PLACES) {
    const pois = poisFor(p.slug);
    const byCat = POI_ORDER.map((cat) => [cat, pois.filter((x) => x.cat === cat)] as const).filter(([, xs]) => xs.length);
    docs.push({
      id: `place:${p.slug}`, kind: "place", title: `Living in ${p.name}, ${p.city}`, url: absoluteUrl(routes.place(p.slug)), summary: p.answer, updated: p.updated,
      text: join(p.answer, `Type: ${p.kind}. Cost level: ${p.costLevel} for ${p.city}. Coordinates: ${p.lat}, ${p.lng}.`,
        list("Best for", p.bestFor), list("Not ideal for", p.notIdealFor), `Vibe: ${p.vibe}`, `Getting around: ${p.gettingAround}`,
        `Immigration office: ${p.immigrationOffice.name}. ${p.immigrationOffice.note}`, list("Visa notes", p.visaNotes), `Weather: ${p.climateNote}`,
        byCat.length ? `Nearby services (OpenStreetMap, unverified):\n${byCat.map(([cat, xs]) => `- ${POI_META[cat].plural}: ${xs.slice(0, 10).map((x) => x.name).join("; ")}`).join("\n")}` : null,
        qa(p.faqs), src(p.sources)),
    });
  }
  for (const o of IMMIGRATION_OFFICES) {
    docs.push({
      id: `office:${o.slug}`, kind: "immigration_office", title: o.name, url: absoluteUrl(routes.office(o.slug)), updated: o.updated,
      summary: `${o.address}. ${o.hours ?? "Hours not confirmed."}`,
      text: join(`Address: ${o.address}`, `City: ${o.city}. Serves: ${o.servesAreas.join(", ")}.`, `Hours: ${o.hours ?? "not confirmed, call before you go"}`,
        o.phone ? `Phone: ${o.phone}` : null, o.website ? `Website: ${o.website}` : null, list("Services", o.services),
        o.appointmentSystem ? `Queue and appointments: ${o.appointmentSystem}` : null, list("Tips", [...new Set(o.tips)]), list("Recent changes", o.recentChanges),
        `Data confidence: ${o.confidence}. Confirm the address and hours before travelling.`, src(o.sources)),
    });
  }
  for (const t of TOOLS) {
    docs.push({ id: `tool:${t.slug}`, kind: "tool", title: t.name, url: absoluteUrl(routes.tool(t.slug)), summary: t.answer, text: join(t.answer, t.description, `Use it at ${absoluteUrl(routes.tool(t.slug))}`) });
  }
  return docs;
}

let cached: Doc[] | null = null;
export const corpus = () => (cached ??= build());
export const getDoc = (id: string) => corpus().find((d) => d.id === id);

const STOP = new Set(["the", "a", "an", "in", "of", "for", "to", "and", "or", "is", "do", "i", "can", "how", "what", "my", "on", "with", "thailand", "thai"]);
const tokens = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));

export function search(query: string, opts: { kind?: string; limit?: number } = {}) {
  const q = tokens(query);
  if (!q.length) return [];
  const phrase = query.toLowerCase().trim();
  return corpus()
    .filter((d) => !opts.kind || d.kind === opts.kind)
    .map((d) => {
      const title = d.title.toLowerCase(), body = `${d.summary} ${d.text}`.toLowerCase();
      let score = 0;
      for (const w of q) {
        if (title.includes(w)) score += 4;
        const hits = body.split(w).length - 1;
        score += Math.min(hits, 6);
      }
      if (phrase.length > 4 && (title + body).includes(phrase)) score += 8;
      if (d.kind === "guide" || d.kind === "visa") score *= 1.15;
      return { d, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, opts.limit ?? 8)
    .map((x) => x.d);
}
