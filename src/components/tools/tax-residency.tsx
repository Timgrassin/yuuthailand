"use client";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { Field, Panel, Stat, fromISO, inputCls } from "./ui";

type Trip = { from: string; to: string };
const year = new Date().getFullYear();

// Counts calendar days present in Thailand within one year, arrival and departure days included (cautious).
function countDays(trips: Trip[], y: number) {
  const days = new Set<string>();
  for (const t of trips) {
    if (!t.from || !t.to) continue;
    const a = fromISO(t.from), b = fromISO(t.to);
    for (let d = new Date(a); d <= b; d.setDate(d.getDate() + 1)) if (d.getFullYear() === y) days.add(d.toDateString());
  }
  return days.size;
}

export function TaxResidencyCounter() {
  const [y, setY] = useState(year);
  const [trips, setTrips] = useState<Trip[]>([{ from: `${year}-01-10`, to: `${year}-04-20` }]);
  const n = countDays(trips, y);
  const set = (i: number, k: keyof Trip, v: string) => setTrips((ts) => ts.map((t, j) => (j === i ? { ...t, [k]: v } : t)));
  return (
    <div className="grid gap-8 lg:grid-cols-[26rem_1fr]">
      <Panel className="grid content-start gap-4">
        <Field label="Tax year"><select value={y} onChange={(e) => setY(Number(e.target.value))} className={inputCls}>{[year - 1, year, year + 1].map((v) => <option key={v}>{v}</option>)}</select></Field>
        <p className="text-sm font-semibold">Your stays in Thailand</p>
        {trips.map((t, i) => (
          <div key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end gap-2">
            <Field label="Arrived"><input type="date" value={t.from} onChange={(e) => set(i, "from", e.target.value)} className={inputCls} /></Field>
            <Field label="Left"><input type="date" value={t.to} onChange={(e) => set(i, "to", e.target.value)} className={inputCls} /></Field>
            <button type="button" onClick={() => setTrips((ts) => ts.filter((_, j) => j !== i))} className="mb-1 flex size-10 items-center justify-center rounded-full text-muted hover:bg-sunken" aria-label="Remove stay"><Trash2 className="size-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => setTrips((ts) => [...ts, { from: "", to: "" }])} className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><Plus className="size-4" aria-hidden />Add a stay</button>
      </Panel>
      <div className="space-y-6">
        <Panel className="grid gap-6 sm:grid-cols-2">
          <Stat big label={`Days in Thailand in ${y}`} value={String(n)} note={n >= 180 ? "You meet the 180-day test." : `${180 - n} days until 180.`} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Status</p>
            <p className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${n >= 180 ? "bg-accent-soft text-warn" : "bg-verified-soft text-verified"}`}>{n >= 180 ? "Likely Thai tax resident" : "Below 180 days"}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-sunken"><div className="h-full bg-primary" style={{ width: `${Math.min(100, (n / 180) * 100)}%` }} /></div>
          </div>
        </Panel>
        <p className="text-sm text-muted">This counts arrival and departure days, the cautious approach. It is not tax advice. Talk to a Thai tax adviser about your situation.</p>
        <EmailCapture title="Track this for me" body="We email your day count and a reminder before you reach 180 days, plus any Thai tax rule changes." leadMagnet="tax_residency_tracker" meta={{ year: y, days: n }} />
      </div>
    </div>
  );
}
