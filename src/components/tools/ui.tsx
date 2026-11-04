"use client";
import type { ReactNode } from "react";

export const inputCls = "h-12 w-full rounded-sm border border-line-strong bg-surface px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function NumberInput({ value, onChange, unit, min = 0, step = 1 }: { value: number; onChange: (n: number) => void; unit?: string; min?: number; step?: number }) {
  return (
    <span className="flex h-12 items-center rounded-sm border border-line-strong bg-surface focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
      <input type="number" min={min} step={step} value={Number.isFinite(value) ? value : ""} onChange={(e) => onChange(Number(e.target.value))} inputMode="numeric" className="h-full min-w-0 flex-1 bg-transparent px-4 outline-none" />
      {unit ? <span className="pr-4 text-sm font-medium text-muted">{unit}</span> : null}
    </span>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-card border border-line bg-surface p-6 shadow-card ${className}`}>{children}</div>;
}

export function Stat({ label, value, note, big }: { label: string; value: string; note?: string; big?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className={`font-display mt-1 text-ink ${big ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{value}</p>
      {note ? <p className="mt-1 text-sm text-muted">{note}</p> : null}
    </div>
  );
}

export const thb = (n: number) => `${new Intl.NumberFormat("en-US").format(Math.round(n))} THB`;

// Dates are handled as local calendar days (no time zones in visa maths).
export const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const fromISO = (s: string) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, (m || 1) - 1, d || 1); };
export const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const addMonths = (d: Date, n: number) => { const x = new Date(d); x.setMonth(x.getMonth() + n); return x; };
export const longDate = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
export const todayISO = () => toISO(new Date());
