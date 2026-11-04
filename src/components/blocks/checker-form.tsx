"use client";
import { Briefcase, GraduationCap, Heart, Laptop, Landmark, Palmtree, type LucideIcon } from "lucide-react";
import { useActionState, useMemo, useState } from "react";
import { copy } from "@/lib/copy";
import { saveCheckerResult, type SaveState } from "@/lib/actions/checker";
import { evaluate, PURPOSES, type Answers, type RuleLike } from "@/lib/checker/engine";
import { CheckerResults } from "./checker-results";

const ICON: Record<(typeof PURPOSES)[number], LucideIcon> = { remote_work: Laptop, study: GraduationCap, retire: Palmtree, family: Heart, local_job: Briefcase, invest: Landmark };

function Money({ label, unit, value, onChange, step }: { label: string; unit: string; value: number; onChange: (n: number) => void; step: number }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <span className="mt-1.5 flex h-12 items-center rounded-sm border border-line-strong bg-surface focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
        <input type="number" min={0} step={step} value={value || ""} placeholder="0" onChange={(e) => onChange(Number(e.target.value))} inputMode="numeric" className="h-full min-w-0 flex-1 bg-transparent px-4 outline-none" />
        <span className="pr-4 text-sm font-medium text-muted">{unit}</span>
      </span>
    </label>
  );
}

export function CheckerForm({ rules, usdRate }: { rules: RuleLike[]; usdRate: number }) {
  const t = copy.checker;
  const [a, setA] = useState<Answers>({ age: 35, purposes: ["remote_work"], fundsThb: 0, incomeThbMonth: 0, assetsUsd: 0, marriedThai: false, jobOffer: false });
  const [shown, setShown] = useState(false);
  const results = useMemo(() => evaluate(a, rules, usdRate), [a, rules, usdRate]);
  const [state, save, saving] = useActionState<SaveState, FormData>(saveCheckerResult, {});
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((x) => ({ ...x, [k]: v }));
  const togglePurpose = (p: (typeof PURPOSES)[number]) => set("purposes", a.purposes.includes(p) ? (a.purposes.filter((x) => x !== p).length ? a.purposes.filter((x) => x !== p) : a.purposes) : [...a.purposes, p]);
  const likely = results.filter((r) => r.verdict === "likely").length;

  return (
    <div className="grid gap-8 lg:grid-cols-[24rem_1fr]">
      <form className="grid content-start gap-6 rounded-card border border-line bg-surface p-6 shadow-card lg:sticky lg:top-24" onSubmit={(e) => { e.preventDefault(); setShown(true); document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
        <fieldset>
          <legend className="text-sm font-semibold">{t.purpose}</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {PURPOSES.map((p) => {
              const Icon = ICON[p];
              const on = a.purposes.includes(p);
              return (
                <label key={p} className={`flex cursor-pointer items-start gap-2 rounded-sm border p-3 text-sm leading-snug transition-colors ${on ? "border-primary bg-primary-soft text-ink" : "border-line-strong text-ink-2 hover:border-ink-2"}`}>
                  <input type="checkbox" checked={on} onChange={() => togglePurpose(p)} className="sr-only" />
                  <Icon className={`mt-0.5 size-4 shrink-0 ${on ? "text-primary" : "text-muted"}`} aria-hidden />
                  {t.purposes[p]}
                </label>
              );
            })}
          </div>
        </fieldset>
        <label className="block">
          <span className="text-sm font-semibold">{t.age}</span>
          <input type="number" min={16} max={110} value={a.age} onChange={(e) => set("age", Number(e.target.value))} className="mt-1.5 h-12 w-full rounded-sm border border-line-strong bg-surface px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
        </label>
        <Money label="Savings you can show" unit="THB" step={10000} value={a.fundsThb} onChange={(n) => set("fundsThb", n)} />
        <Money label="Monthly income" unit="THB / month" step={1000} value={a.incomeThbMonth} onChange={(n) => set("incomeThbMonth", n)} />
        <Money label="Total assets" unit="USD" step={10000} value={a.assetsUsd} onChange={(n) => set("assetsUsd", n)} />
        <div className="grid gap-3 text-sm">
          {([["marriedThai", t.marriedThai], ["jobOffer", t.jobOffer]] as const).map(([k, label]) => (
            <label key={k} className="flex cursor-pointer items-center justify-between gap-3 rounded-sm border border-line-strong px-4 py-3">
              {label}
              <input type="checkbox" checked={a[k]} onChange={(e) => set(k, e.target.checked)} className="peer sr-only" />
              <span className="relative h-6 w-11 shrink-0 rounded-full bg-line-strong transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-primary peer-checked:after:translate-x-5" aria-hidden />
            </label>
          ))}
        </div>
        <button className="h-12 rounded-full bg-primary font-semibold text-primary-ink shadow-card hover:bg-primary-2">{t.submit}</button>
      </form>

      <section id="results" aria-live="polite" className="scroll-mt-24">
        {shown ? (
          <>
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-3xl">{likely ? `${likely} likely ${likely === 1 ? "fit" : "fits"}` : "No clear fit yet"}</h2>
              <p className="text-sm text-muted">Updates as you change your answers</p>
            </div>
            <CheckerResults results={results} labels={{ likely: t.likely, maybe: t.maybe, unlikely: t.unlikely, seeRules: t.seeRules }} />
            <form action={save} className="mt-6 flex flex-wrap items-center gap-3">
              <input type="hidden" name="answers" value={JSON.stringify(a)} />
              <button disabled={saving} className="h-11 rounded-full border border-line-strong bg-surface px-5 font-semibold hover:border-ink disabled:opacity-50">{t.save}</button>
              {state.error ? <p role="alert" className="text-sm text-suspended">Saving is not available right now. The result above still stands.</p> : null}
            </form>
            <p className="mt-4 text-xs text-muted">{t.disclaimer}</p>
          </>
        ) : (
          <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-card border border-dashed border-line-strong bg-surface/50 p-10 text-center">
            <p className="font-display text-2xl">Your options appear here</p>
            <p className="mt-2 max-w-sm text-muted">{t.intro}</p>
          </div>
        )}
      </section>
    </div>
  );
}
