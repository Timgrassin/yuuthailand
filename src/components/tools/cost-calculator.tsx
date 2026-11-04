"use client";
import { useMemo, useState } from "react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { Field, NumberInput, Panel, Stat, thb } from "./ui";

type R = { key: string; track: string; value_num: number | null };
const ROUTES = [
  { id: "dtv", label: "DTV" }, { id: "retirement", label: "Retirement (Non-O)" }, { id: "retirement_oa", label: "Retirement (O-A)" },
  { id: "ed", label: "Education (ED)" }, { id: "marriage", label: "Marriage (Non-O)" }, { id: "work", label: "Work (Non-B)" },
  { id: "ltr", label: "LTR" }, { id: "privilege", label: "Privilege (Gold)" },
] as const;
const RE_SINGLE = 1000, RE_MULTI = 3800; // Bangkok Immigration re-entry permit fees

export function CostCalculator({ rules }: { rules: R[] }) {
  const n = (track: string, key: string, d: number) => Number(rules.find((r) => r.track === track && r.key === key)?.value_num ?? d);
  const [years, setYears] = useState(5);
  const [people, setPeople] = useState(1);
  const [trips, setTrips] = useState(2);
  const [course, setCourse] = useState(36000);
  const [insurance, setInsurance] = useState(60000);

  const rows = useMemo(() => {
    const ext = n("dtv", "fee.extension", 1900);
    const reentry = (yrs: number) => (trips === 0 ? 0 : trips === 1 ? RE_SINGLE * yrs : RE_MULTI * yrs);
    const calc: Record<string, { fees: number; show: string; notes: string }> = {
      dtv: { fees: n("dtv", "fee.visa", 10000) * Math.ceil(years / 5) + ext * years * Math.max(1, Math.min(2, trips || 1)), show: thb(n("dtv", "eligibility.min_funds", 500000)), notes: "One 5-year visa per 5 years, one 180-day extension per entry. No re-entry permit needed." },
      retirement: { fees: n("retirement", "fee.visa", 2000) + n("retirement", "fee.extension", 1900) * years + reentry(years), show: thb(n("retirement", "eligibility.min_funds", 800000)), notes: "One Non-O visa, then a yearly extension and re-entry permits for trips." },
      retirement_oa: { fees: n("retirement_oa", "fee.visa", 5000) + n("retirement_oa", "fee.extension", 1900) * Math.max(0, years - 1) + reentry(Math.max(0, years - 1)) + insurance * years, show: thb(n("retirement_oa", "eligibility.min_funds", 800000)), notes: "O-A visa, then yearly extensions. Includes your health insurance premium." },
      ed: { fees: (course + n("ed", "fee.visa", 2000) + n("ed", "fee.extension", 1900) * 3) * years, show: "No fixed amount", notes: "Course fees plus a visa and three 90-day extensions a year." },
      marriage: { fees: n("marriage", "fee.visa", 2000) + n("marriage", "fee.extension", 1900) * years + reentry(years), show: thb(n("marriage", "eligibility.min_funds", 400000)), notes: "One Non-O visa, then yearly extensions." },
      work: { fees: n("work", "fee.visa", 2000) + n("work", "fee.extension", 1900) * years + 3000 * years + reentry(years), show: "Employer-sponsored", notes: "Includes a reported 3,000 THB a year work permit fee." },
      ltr: { fees: n("ltr", "fee.visa", 50000) * Math.ceil(years / 5), show: "High income or assets", notes: "50,000 THB per 5-year stay. Annual report instead of 90-day reports." },
      privilege: { fees: n("privilege", "fee.membership.gold", 900000) * Math.ceil(years / 5), show: "None", notes: "Gold membership, 900,000 THB per 5 years. No income or age test." },
    };
    return ROUTES.map((r) => ({ ...r, ...calc[r.id], total: calc[r.id].fees * people })).sort((a, b) => a.total - b.total);
  }, [years, people, trips, course, insurance, rules]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <Panel className="grid content-start gap-5 lg:sticky lg:top-24">
        <Field label="How many years?"><input type="range" min={1} max={10} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-[var(--sl-primary)]" /><span className="text-sm font-semibold">{years} {years === 1 ? "year" : "years"}</span></Field>
        <Field label="People applying" hint="Each person pays their own fees."><NumberInput value={people} onChange={(v) => setPeople(Math.max(1, v))} min={1} /></Field>
        <Field label="Trips abroad a year" hint="Re-entry permits: 1 trip = single, 2+ = multiple."><NumberInput value={trips} onChange={setTrips} /></Field>
        <Field label="ED course fee a year"><NumberInput value={course} onChange={setCourse} unit="THB" step={1000} /></Field>
        <Field label="O-A health insurance a year" hint="Your own quote. Varies widely by age."><NumberInput value={insurance} onChange={setInsurance} unit="THB" step={1000} /></Field>
      </Panel>
      <div className="space-y-6">
        <Panel>
          <Stat big label={`Cheapest over ${years} ${years === 1 ? "year" : "years"}`} value={`${rows[0].label}: ${thb(rows[0].total)}`} note="Government fees only. Living costs not included." />
        </Panel>
        <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-sunken"><tr><th className="p-4">Visa</th><th className="p-4">Fees over {years} yrs</th><th className="hidden p-4 md:table-cell">Money to show</th></tr></thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.id} className="align-top"><th scope="row" className="p-4 font-semibold">{r.label}<span className="mt-1 block text-sm font-normal text-muted">{r.notes}</span></th><td className="p-4 font-display text-xl whitespace-nowrap">{thb(r.total)}</td><td className="hidden p-4 text-ink-2 md:table-cell">{r.show}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <EmailCapture title="Get this cost breakdown by email" body="Your numbers, the assumptions behind them, and an alert if any fee changes." leadMagnet="cost_calculator_report" tracks={[rows[0].id]} meta={{ years, people, trips, cheapest: rows[0].id }} />
      </div>
    </div>
  );
}
