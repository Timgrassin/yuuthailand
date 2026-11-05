// Local dry run of apply-facts: reports which extracted facts survive the exact-quote check. No secrets.
// Usage: pnpm tsx scripts/apify/check-facts.ts [place_id ...]
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { verifiedFacts, type ExtractedFact } from "./lib";

const dir = "data/schools/facts";
const ids = process.argv.slice(2).length ? process.argv.slice(2) : existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)) : [];
let kept = 0, dropped = 0, indexable = 0;
for (const id of ids) {
  const site = readFileSync(`data/schools/sites/${id}.txt`, "utf8");
  const data = JSON.parse(readFileSync(`${dir}/${id}.json`, "utf8")) as { facts: ExtractedFact[] };
  const ok = verifiedFacts(data.facts, site);
  const bad = data.facts.filter((f) => !ok.includes(f));
  kept += ok.length; dropped += bad.length; if (ok.length >= 3) indexable++;
  console.log(`${id}: kept ${ok.length}, dropped ${bad.length}${bad.length ? ` -> ${bad.map((b) => JSON.stringify(b.quote.slice(0, 60))).join(" | ")}` : ""}`);
}
console.log(`TOTAL kept ${kept}, dropped ${dropped}, providers with 3+ facts ${indexable}/${ids.length}`);
