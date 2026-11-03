import { strict as assert } from "node:assert";
import { test } from "node:test";
import { evaluate, type RuleLike } from "./engine";

const rules: RuleLike[] = [
  { key: "eligibility.min_funds", track: "dtv", value_num: 500000, value_json: null, confidence: "high" },
  { key: "eligibility.min_age", track: "dtv", value_num: 20, value_json: null, confidence: "low" },
  { key: "eligibility.min_age", track: "retirement", value_num: 50, value_json: null, confidence: "high" },
  { key: "eligibility.min_funds", track: "retirement", value_num: 800000, value_json: null, confidence: "high" },
  { key: "eligibility.min_income_month", track: "retirement", value_num: 65000, value_json: null, confidence: "high" },
  { key: "fee.membership.gold", track: "privilege", value_num: 900000, value_json: null, confidence: "medium" },
];
const base = { age: 30, purposes: ["remote_work" as const], fundsThb: 0, incomeThbMonth: 0, assetsUsd: 0, marriedThai: false, jobOffer: false };
const v = (r: ReturnType<typeof evaluate>, t: string) => r.find((x) => x.track === t)!.verdict;

test("remote worker with 600k THB is likely DTV", () => assert.equal(v(evaluate({ ...base, fundsThb: 600000 }, rules, 33), "dtv"), "likely"));
test("remote worker with 100k THB is unlikely DTV", () => assert.equal(v(evaluate({ ...base, fundsThb: 100000 }, rules, 33), "dtv"), "unlikely"));
test("55-year-old retiree with 70k a month is likely retirement", () => assert.equal(v(evaluate({ ...base, age: 55, purposes: ["retire"], incomeThbMonth: 70000 }, rules, 33), "retirement"), "likely"));
test("combination 500k + 30k/month passes retirement", () => assert.equal(v(evaluate({ ...base, age: 60, purposes: ["retire"], fundsThb: 500000, incomeThbMonth: 30000 }, rules, 33), "retirement"), "likely"));
test("45-year-old is unlikely retirement", () => assert.equal(v(evaluate({ ...base, age: 45, purposes: ["retire"], fundsThb: 900000 }, rules, 33), "retirement"), "unlikely"));
test("not married is unlikely marriage", () => assert.equal(v(evaluate({ ...base, purposes: ["family"], fundsThb: 500000 }, rules, 33), "marriage"), "unlikely"));
test("rule change moves the verdict", () => {
  const strict = rules.map((r) => (r.track === "dtv" && r.key === "eligibility.min_funds" ? { ...r, value_num: 700000 } : r));
  assert.equal(v(evaluate({ ...base, fundsThb: 600000 }, strict, 33), "dtv"), "unlikely");
});
