import { strict as assert } from "node:assert";
import { test } from "node:test";
import { GUIDES } from "@/content";
import { COUNTRIES, people } from "@/content/countries";
import { IMMIGRATION_OFFICES, PLACES, splitPaths } from "@/lib/places";
import { TOOLS } from "@/lib/tools";
import { TRACKS, TRACK_INFO } from "@/lib/tracks";
import { isIndexableCity, isIndexableListing } from "@/lib/listing";
import { pathLabel, relatedForCountry, relatedForGuide, relatedForProvider, relatedForTool, relatedForTrack, trackGuides, type RelGroup } from "./related";
import { routes } from "./routes";

// Contextual inbound links each page gets from the related blocks of other pages (nav and footer excluded).
function inbound() {
  const pages: [string, RelGroup[]][] = [
    ...GUIDES.map((g) => [routes.guide(g.slug), relatedForGuide(g.slug)] as [string, RelGroup[]]),
    ...TRACKS.map((t) => [routes.rule(TRACK_INFO[t].slug), [...relatedForTrack(t), { title: "Related guides", links: trackGuides(t).map((g) => ({ href: routes.guide(g.slug), label: g.title })) }]] as [string, RelGroup[]]),
    ...TOOLS.map((t) => [routes.tool(t.slug), relatedForTool(t.slug)] as [string, RelGroup[]]),
    ...COUNTRIES.map((c) => [routes.country(c.slug), relatedForCountry(c.slug)] as [string, RelGroup[]]),
  ];
  const counts = new Map<string, number>();
  for (const [src, groups] of pages)
    for (const href of new Set(groups.flatMap((g) => [...g.links, ...(g.more ? [g.more] : [])].map((l) => l.href))))
      if (href !== src) counts.set(href, (counts.get(href) ?? 0) + 1);
  return { pages, counts };
}

test("no related block links a page to itself", () => {
  for (const [src, groups] of inbound().pages) for (const g of groups) for (const l of g.links) assert.notEqual(l.href, src, `${src} links to itself`);
});

test("every guide, visa, tool and nationality page gets contextual links from at least 3 other pages", () => {
  const { counts } = inbound();
  const targets = [...GUIDES.map((g) => routes.guide(g.slug)), ...TRACKS.map((t) => routes.rule(TRACK_INFO[t].slug)), ...TOOLS.map((t) => routes.tool(t.slug)), ...COUNTRIES.map((c) => routes.country(c.slug))];
  const weak = targets.filter((t) => (counts.get(t) ?? 0) < 3).map((t) => `${t} (${counts.get(t) ?? 0})`);
  assert.deepEqual(weak, []);
});

test("every related block has at least 3 links", () => {
  for (const [src, groups] of inbound().pages) assert.ok(groups.reduce((n, g) => n + g.links.length, 0) >= 3, src);
});

test("anchors are page names, never bare paths", () => {
  for (const [, groups] of inbound().pages) for (const g of groups) for (const l of g.links) assert.ok(!l.label.startsWith("/"), l.label);
  const texts = [...PLACES.flatMap((p) => [p.immigrationOffice.note, ...p.bestFor, ...p.notIdealFor, ...p.visaNotes]), ...IMMIGRATION_OFFICES.flatMap((o) => [...o.tips, ...o.recentChanges])];
  for (const t of texts) for (const part of splitPaths(t)) if (typeof part !== "string") assert.ok(!pathLabel(part.href).startsWith("/"), `no label for ${part.href}`);
});

test("provider pages link to visa rules, guides and the place they are in", () => {
  const groups = relatedForProvider({ provider_type: "language_school", city_slug: "chiang-mai" }, []);
  const hrefs = groups.flatMap((g) => g.links.map((l) => l.href));
  assert.ok(hrefs.includes(routes.rule("education-visa")));
  assert.ok(hrefs.includes(routes.guide("dtv-vs-ed-visa")));
  assert.ok(hrefs.some((h) => h.startsWith("/places/")));
});

test("nationality plurals read naturally", () => {
  const names = COUNTRIES.map(people);
  assert.ok(names.includes("Americans") && names.includes("British citizens") && names.includes("Swiss citizens"));
  assert.ok(!names.some((n) => /(sh|ch|ss|se)s$/.test(n)), names.join(", "));
});

test("indexable listings: verified, described, or 3+ facts; never suspended", () => {
  assert.equal(isIndexableListing({ status: "unverified", facts: [1, 2, 3] }), true);
  assert.equal(isIndexableListing({ status: "unverified", facts: [1, 2] }), false);
  assert.equal(isIndexableListing({ status: "unverified", description_en: "x" }), true);
  assert.equal(isIndexableListing({ status: "verified" }), true);
  assert.equal(isIndexableListing({ status: "suspended", facts: [1, 2, 3] }), false);
});

test("city pages index at 5 indexable listings, verified or not (D28)", () => {
  const rich = { status: "unverified", facts: [1, 2, 3] };
  assert.equal(isIndexableCity(Array(5).fill(rich)), true);
  assert.equal(isIndexableCity(Array(4).fill(rich)), false);
  assert.equal(isIndexableCity([...Array(4).fill(rich), { status: "unverified", facts: [1] }]), false);
});
