// Step 3: fetch each listing's own website and save its visible text to data/schools/sites/<place_id>.txt,
// so an agent can extract facts with exact quotes (see data/schools/brief.md).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

type L = { google_place_id: string; website?: string };
const UA = "staylong-directory/1.0 (+https://staylong.co)";

export function htmlToText(html: string) {
  return html
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>|<\/(p|div|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
}

async function main() {
  const rows = JSON.parse(readFileSync("data/schools/listings.json", "utf8")) as L[];
  mkdirSync("data/schools/sites", { recursive: true });
  let ok = 0;
  for (const r of rows) {
    if (!r.website || !/^https?:\/\//.test(r.website)) continue;
    const out = `data/schools/sites/${r.google_place_id}.txt`;
    if (existsSync(out)) { ok++; continue; }
    try {
      const res = await fetch(r.website, { headers: { "User-Agent": UA }, redirect: "follow", signal: AbortSignal.timeout(15000) });
      if (!res.ok || !(res.headers.get("content-type") ?? "").includes("html")) continue;
      const text = htmlToText(await res.text()).slice(0, 40000);
      if (text.length < 200) continue;
      writeFileSync(out, `URL: ${res.url}\n\n${text}\n`);
      ok++;
    } catch { /* unreachable site: skip */ }
  }
  console.log(`Saved text for ${ok} sites`);
}

main().catch((e) => { console.error(e); process.exit(1); });
