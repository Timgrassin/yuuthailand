// Pure, deterministic checker. Inputs: answers + current rules. Output: one verdict per track.
// Thresholds come from the rules table, never from code, so a rule change updates every verdict.
import { z } from "zod";
import type { Track } from "@/lib/tracks";

export const PURPOSES = ["remote_work", "study", "retire", "family", "local_job", "invest"] as const;

export const answersSchema = z.object({
  age: z.coerce.number().int().min(16).max(110),
  purposes: z.array(z.enum(PURPOSES)).min(1).max(PURPOSES.length),
  fundsThb: z.coerce.number().min(0).max(1e11).default(0),
  incomeThbMonth: z.coerce.number().min(0).max(1e10).default(0),
  assetsUsd: z.coerce.number().min(0).max(1e11).default(0),
  marriedThai: z.coerce.boolean().default(false),
  jobOffer: z.coerce.boolean().default(false),
});
export type Answers = z.infer<typeof answersSchema>;

export type RuleLike = { key: string; track: string; value_num: number | null; value_json: unknown; confidence: string };
export type Verdict = "likely" | "maybe" | "unlikely";
export type Reason = { ok: boolean | null; text: string };
export type TrackResult = { track: Track; verdict: Verdict; score: number; reasons: Reason[] };

const n = (v: number) => new Intl.NumberFormat("en-US").format(Math.round(v));

export function evaluate(a: Answers, rules: RuleLike[], usdRate: number): TrackResult[] {
  const get = (track: string, key: string) => rules.find((r) => r.track === track && r.key === key);
  const num = (track: string, key: string) => {
    const r = get(track, key);
    return r?.value_num != null ? Number(r.value_num) : undefined;
  };
  const has = (p: (typeof PURPOSES)[number]) => a.purposes.includes(p);
  const incomeUsdYear = (a.incomeThbMonth * 12) / usdRate;
  const out: TrackResult[] = [];

  const push = (track: Track, reasons: Reason[], purposeFit: boolean) => {
    const fails = reasons.filter((r) => r.ok === false).length;
    const unknown = reasons.filter((r) => r.ok === null).length;
    const verdict: Verdict = !purposeFit || fails > 0 ? "unlikely" : unknown > 0 ? "maybe" : "likely";
    const score = (purposeFit ? 10 : 0) - fails * 5 - unknown;
    out.push({ track, verdict, score, reasons });
  };

  const funds = (track: string, key = "eligibility.min_funds"): Reason | null => {
    const min = num(track, key);
    if (min == null) return null;
    return { ok: a.fundsThb >= min, text: `Savings of at least ${n(min)} THB (you: ${n(a.fundsThb)})` };
  };
  const age = (track: string, key = "eligibility.min_age"): Reason | null => {
    const r = get(track, key);
    const min = r?.value_num != null ? Number(r.value_num) : undefined;
    if (min == null) return null;
    const ok = a.age >= min;
    return { ok: ok ? true : r?.confidence === "low" ? null : false, text: `Age ${min}+ (you: ${a.age})` };
  };

  // DTV: remote work or soft-power study, 500k THB.
  {
    const r = [funds("dtv"), age("dtv")].filter(Boolean) as Reason[];
    r.unshift({ ok: has("remote_work") || has("study"), text: "Remote work for foreign clients, or a soft-power activity" });
    push("dtv", r, has("remote_work") || has("study"));
  }
  // ED: study.
  push("ed", [{ ok: has("study"), text: "Enrolment at an approved school" }], has("study"));

  // Retirement Non-O and O-A: age 50, 800k or 65k/month or combination.
  for (const t of ["retirement", "retirement_oa"] as const) {
    const minF = num(t, "eligibility.min_funds") ?? 800000;
    const minI = num(t, "eligibility.min_income_month") ?? 65000;
    const moneyOk = a.fundsThb >= minF || a.incomeThbMonth >= minI || a.fundsThb + a.incomeThbMonth * 12 >= minF;
    const r: Reason[] = [
      age(t) ?? { ok: null, text: "Age rule not loaded" },
      { ok: moneyOk, text: `${n(minF)} THB in a Thai bank, or ${n(minI)} THB a month, or both combined to ${n(minF)} THB a year` },
    ];
    if (t === "retirement_oa") r.push({ ok: null, text: "Health insurance of USD 100,000 for the whole stay" });
    push(t, r, has("retire") || a.age >= 50);
  }

  // Marriage: married to a Thai, 400k or 40k/month.
  {
    const minF = num("marriage", "eligibility.min_funds") ?? 400000;
    const minI = num("marriage", "eligibility.min_income_month") ?? 40000;
    push("marriage", [
      { ok: a.marriedThai, text: "Legally married to a Thai national" },
      { ok: a.fundsThb >= minF || a.incomeThbMonth >= minI, text: `${n(minF)} THB in a Thai bank or ${n(minI)} THB a month` },
    ], a.marriedThai || has("family"));
  }

  // Work: Thai job offer.
  push("work", [{ ok: a.jobOffer, text: "Job offer from a Thai-registered company" }], a.jobOffer || has("local_job"));

  // LTR: best of its four categories.
  {
    const pensioner = num("ltr", "eligibility.min_income_year.wealthy_pensioner") ?? 80000;
    const wft = num("ltr", "eligibility.min_income_year.work_from_thailand") ?? 80000;
    const assets = num("ltr", "eligibility.min_assets.wealthy_global_citizen") ?? 1000000;
    const r: Reason[] = [];
    let fit = false;
    if (a.age >= 50 && (has("retire") || has("invest"))) {
      fit = true;
      r.push({ ok: incomeUsdYear >= pensioner ? true : incomeUsdYear >= pensioner / 2 ? null : false, text: `Wealthy Pensioner: passive income of ${n(pensioner)} USD a year, or ${n(pensioner / 2)} USD plus a 250,000 USD Thai investment (you: about ${n(incomeUsdYear)} USD)` });
    }
    if (has("remote_work")) {
      fit = true;
      r.push({ ok: incomeUsdYear >= wft ? null : incomeUsdYear >= wft / 2 ? null : false, text: `Work-from-Thailand: ${n(wft)} USD a year and a large listed or 50M USD revenue employer (you: about ${n(incomeUsdYear)} USD)` });
    }
    if (has("invest") || a.assetsUsd > 0) {
      fit = true;
      r.push({ ok: a.assetsUsd >= assets ? null : false, text: `Wealthy Global Citizen: ${n(assets)} USD in assets and a 500,000 USD Thai investment (you: ${n(a.assetsUsd)} USD)` });
    }
    if (a.jobOffer) {
      fit = true;
      r.push({ ok: incomeUsdYear >= 80000 ? null : incomeUsdYear >= 40000 ? null : false, text: "Highly Skilled: Thai job in a target industry and 80,000 USD a year (40,000 USD with a master's)" });
    }
    // Any one passing category is enough.
    const best: Reason[] = r.some((x) => x.ok === true) ? r.filter((x) => x.ok === true) : r.some((x) => x.ok === null) ? r.filter((x) => x.ok !== false) : r;
    push("ltr", best.length ? best : [{ ok: false, text: "No LTR category matches your answers" }], fit);
  }

  // Privilege: no tests, just the fee.
  {
    const fees = rules.filter((x) => x.track === "privilege" && x.key.startsWith("fee.membership.") && x.value_num != null && x.confidence !== "low").map((x) => Number(x.value_num));
    const minFee = fees.length ? Math.min(...fees) : undefined;
    push("privilege", [minFee != null ? { ok: a.fundsThb >= minFee ? true : null, text: `Membership from ${n(minFee)} THB, paid upfront, no income or age test` } : { ok: null, text: "Membership fee, no income or age test" }], true);
  }

  const order: Record<Verdict, number> = { likely: 0, maybe: 1, unlikely: 2 };
  return out.sort((x, y) => order[x.verdict] - order[y.verdict] || y.score - x.score);
}
