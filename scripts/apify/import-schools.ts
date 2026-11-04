// Step 2: upsert data/schools/listings.json into providers via import_providers (migration 0030).
// New rows start Unverified. Existing status, partner fields and editor copy are never overwritten.
import { readFileSync } from "node:fs";
import { env, rpc } from "./lib";

async function main() {
  const rows = JSON.parse(readFileSync("data/schools/listings.json", "utf8")) as unknown[];
  const token = env("STAYLONG_IMPORT_TOKEN");
  let n = 0;
  for (let i = 0; i < rows.length; i += 100) n += await rpc<number>("import_providers", { p_token: token, p_rows: rows.slice(i, i + 100) });
  console.log(`Imported ${n} of ${rows.length} listings`);
}

main().catch((e) => { console.error(e); process.exit(1); });
