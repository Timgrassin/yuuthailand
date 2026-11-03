import { routes } from "@/lib/seo/routes";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";
import { publicDb } from "@/lib/supabase/public";

export const revalidate = 900;

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

// Freshness signal: a public RSS feed of rule changes that crawlers and agents can poll.
export async function GET() {
  const db = publicDb();
  const rows = db
    ? (await db.from("public_rule_changes").select("id, rule_key, track, summary_en, changed_at").order("changed_at", { ascending: false }).limit(50)).data ?? []
    : [];
  const link = absoluteUrl(routes.ruleChanges());
  const items = rows
    .map((r) => `<item><title>${esc(r.summary_en ?? `${r.track}: ${r.rule_key} updated`)}</title><link>${link}#change-${r.id}</link><guid isPermaLink="false">yuu-rule-change-${r.id}</guid><pubDate>${new Date(r.changed_at).toUTCString()}</pubDate></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE_NAME} visa rule changes</title><link>${link}</link><description>Dated changes to Thailand long-stay visa rules tracked by ${SITE_NAME}.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
