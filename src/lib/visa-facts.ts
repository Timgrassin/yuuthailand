import type { Rule } from "@/lib/data";
import { fmtNumber, fmtValue } from "@/lib/format";

// The headline numbers for a visa, computed from rules so they never drift from the source table.
export type VisaFacts = { money?: string; moneyNote?: string; stay?: string; fee?: string; age?: string; validity?: string; work?: string };

export function visaFacts(rules: Rule[], track: string): VisaFacts {
  const r = rules.filter((x) => x.track === track);
  const get = (k: string) => r.find((x) => x.key === k);
  const f: VisaFacts = {};
  const funds = get("eligibility.min_funds");
  const income = get("eligibility.min_income_month");
  if (track === "work") {
    f.money = "Thai employer"; f.moneyNote = "plus a work permit";
  } else if (funds?.value_num != null) {
    f.money = `${fmtNumber(Number(funds.value_num))} THB`;
    if (income?.value_num != null) f.moneyNote = `or ${fmtNumber(Number(income.value_num))} THB a month`;
  } else if (track === "ltr") {
    const p = get("eligibility.min_income_year.wealthy_pensioner");
    f.money = p?.value_num != null ? `$${fmtNumber(Number(p.value_num))} a year` : undefined;
    f.moneyNote = "income, or $1M in assets";
  } else if (track === "privilege") {
    const fees = r.filter((x) => x.key.startsWith("fee.membership.") && x.value_num != null && x.confidence !== "low").map((x) => Number(x.value_num));
    if (fees.length) { f.money = `${fmtNumber(Math.min(...fees))} THB`; f.moneyNote = "one-off membership"; }
  } else if (track === "ed") {
    f.money = "Course fees"; f.moneyNote = "no fixed savings test";
  }
  const stay = get("stay.per_entry_days");
  if (stay?.value_num != null) {
    const d = Number(stay.value_num);
    f.stay = d >= 365 ? "1 year" : `${d} days`;
  } else if (stay) f.stay = fmtValue(stay);
  if (track === "ltr") f.stay = "5 + 5 years";
  const fee = get("fee.visa");
  if (fee?.value_num != null) f.fee = `${fmtNumber(Number(fee.value_num))} THB`;
  const age = get("eligibility.min_age");
  f.age = age?.value_num != null ? `${age.value_num}+` : track === "ltr" ? "50+ (pensioner)" : "Any";
  const v = get("validity.years");
  if (v?.value_num != null) f.validity = `${v.value_num} years`;
  const w = get("allows.work") ?? get("allows.work.highly_skilled");
  if (w) f.work = fmtValue(w);
  return f;
}
