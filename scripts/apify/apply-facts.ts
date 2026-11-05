// Step 4: read data/schools/facts/<place_id>.json (written by an agent following data/schools/brief.md),
// drop every fact whose quote is not an exact substring of the saved site text, then push the rest
// with import_provider_facts. Same rule as the RoxSkin gym enrichment: no quote, no fact.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { env, rpc, verifiedFacts, type ExtractedFact } from "./lib";

type Fact = ExtractedFact;
type File = { summary?: string; price_from_thb?: number | null; facts: Fact[] };


async function main() {
  const token = env("STAYLONG_IMPORT_TOKEN");
  const dir = "data/schools/facts";
  if (!existsSync(dir)) return console.log("No facts yet");
  let kept = 0, dropped = 0, updated = 0;
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".json"))) {
    const id = f.replace(/\.json$/, "");
    const sitePath = `data/schools/sites/${id}.txt`;
    if (!existsSync(sitePath)) continue;
    const site = readFileSync(sitePath, "utf8");
    const url = site.match(/^URL: (.+)$/m)?.[1] ?? "";
    const data = JSON.parse(readFileSync(`${dir}/${f}`, "utf8")) as File;
    const facts = verifiedFacts(data.facts, site).map((x) => ({ ...x, source_url: url }));
    kept += facts.length; dropped += data.facts.length - facts.length;
    // A price only counts if a kept fact quotes it.
    const price = data.price_from_thb != null && facts.some((x) => x.key.startsWith("price") && x.quote.replace(/[^0-9]/g, "").includes(String(data.price_from_thb))) ? data.price_from_thb : null;
    if (await rpc<boolean>("import_provider_facts", { p_token: token, p_google_place_id: id, p_facts: facts, p_summary: data.summary ?? null, p_price_from: price })) updated++;
  }
  console.log(`Facts kept ${kept}, dropped ${dropped} (quote not found), providers updated ${updated}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
