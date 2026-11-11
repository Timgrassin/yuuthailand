import type { RuleChange } from "@/lib/data";

export type ChangeGroup = { key: string; summary: string; changed_at: string; tracks: string[]; rule_keys: string[] };

// One edit often touches several rules with the same summary (the LTR 2025 relaxations moved five).
// Readers see one entry per summary and day; the seed load ("Initial rule set published") is not news.
export function groupChanges(rows: RuleChange[], { skipInitial = true } = {}): ChangeGroup[] {
  const out = new Map<string, ChangeGroup>();
  for (const c of rows) {
    const summary = c.summary_en?.trim() || c.rule_key;
    if (skipInitial && /^initial rule set/i.test(summary)) continue;
    const key = `${c.changed_at.slice(0, 10)}|${summary}`;
    const g = out.get(key);
    if (g) {
      if (!g.tracks.includes(c.track)) g.tracks.push(c.track);
      g.rule_keys.push(c.rule_key);
    } else out.set(key, { key, summary, changed_at: c.changed_at, tracks: [c.track], rule_keys: [c.rule_key] });
  }
  return [...out.values()];
}
