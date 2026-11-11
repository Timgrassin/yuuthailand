import { strict as assert } from "node:assert";
import { test } from "node:test";
import { groupChanges } from "./rule-changes";

const row = (id: number, track: string, rule_key: string, summary_en: string, changed_at = "2026-11-04 14:07:21+00") => ({ id, track, rule_key, action: "update", summary_en, changed_at });

test("merges rules changed together under one summary", () => {
  const g = groupChanges([row(1, "ltr", "a", "LTR relaxations"), row(2, "ltr", "b", "LTR relaxations"), row(3, "dtv", "c", "DTV funds note")]);
  assert.equal(g.length, 2);
  assert.deepEqual(g[0].rule_keys, ["a", "b"]);
  assert.deepEqual(g[0].tracks, ["ltr"]);
});

test("skips the initial seed load", () => assert.deepEqual(groupChanges([row(1, "dtv", "a", "Initial rule set published")]), []));

test("keeps the same summary on different days apart", () =>
  assert.equal(groupChanges([row(1, "dtv", "a", "Fee", "2026-11-04 10:00:00+00"), row(2, "dtv", "a", "Fee", "2026-11-05 10:00:00+00")]).length, 2));
