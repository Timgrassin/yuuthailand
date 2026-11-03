"use client";
import { useTranslations } from "next-intl";
import { useActionState, useMemo, useState } from "react";
import { saveCheckerResult, type SaveState } from "@/lib/actions/checker";
import { evaluate, PURPOSES, type Answers, type RuleLike } from "@/lib/checker/engine";
import { CheckerResults } from "./checker-results";

const field = "mt-1 h-11 w-full rounded-sm border border-line bg-bg px-3 font-normal";

export function CheckerForm({ rules, usdRate, locale }: { rules: RuleLike[]; usdRate: number; locale: string }) {
  const t = useTranslations("checker");
  const [a, setA] = useState<Answers>({ age: 35, purposes: ["remote_work"], fundsThb: 0, incomeThbMonth: 0, assetsUsd: 0, marriedThai: false, jobOffer: false });
  const [shown, setShown] = useState(false);
  const results = useMemo(() => evaluate(a, rules, usdRate), [a, rules, usdRate]);
  const [state, save, saving] = useActionState<SaveState, FormData>(saveCheckerResult, {});
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((x) => ({ ...x, [k]: v }));
  const togglePurpose = (p: (typeof PURPOSES)[number]) => set("purposes", a.purposes.includes(p) ? (a.purposes.filter((x) => x !== p).length ? a.purposes.filter((x) => x !== p) : a.purposes) : [...a.purposes, p]);

  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <form className="grid content-start gap-4 rounded-card border border-line bg-surface p-5 text-sm" onSubmit={(e) => { e.preventDefault(); setShown(true); }}>
        <label className="font-semibold">{t("age")}<input type="number" min={16} max={110} value={a.age} onChange={(e) => set("age", Number(e.target.value))} className={field} /></label>
        <fieldset>
          <legend className="font-semibold">{t("purpose")}</legend>
          <div className="mt-2 grid gap-2">
            {PURPOSES.map((p) => (
              <label key={p} className="flex items-start gap-2"><input type="checkbox" checked={a.purposes.includes(p)} onChange={() => togglePurpose(p)} className="mt-1" />{t(`purposes.${p}`)}</label>
            ))}
          </div>
        </fieldset>
        <label className="font-semibold">{t("funds")}<input type="number" min={0} step={10000} value={a.fundsThb || ""} onChange={(e) => set("fundsThb", Number(e.target.value))} className={field} inputMode="numeric" /></label>
        <label className="font-semibold">{t("income")}<input type="number" min={0} step={1000} value={a.incomeThbMonth || ""} onChange={(e) => set("incomeThbMonth", Number(e.target.value))} className={field} inputMode="numeric" /></label>
        <label className="font-semibold">{t("assets")}<input type="number" min={0} step={10000} value={a.assetsUsd || ""} onChange={(e) => set("assetsUsd", Number(e.target.value))} className={field} inputMode="numeric" /></label>
        <label className="flex gap-2"><input type="checkbox" checked={a.marriedThai} onChange={(e) => set("marriedThai", e.target.checked)} />{t("marriedThai")}</label>
        <label className="flex gap-2"><input type="checkbox" checked={a.jobOffer} onChange={(e) => set("jobOffer", e.target.checked)} />{t("jobOffer")}</label>
        <button className="h-11 rounded-full bg-primary font-semibold text-primary-ink">{t("submit")}</button>
      </form>

      <section aria-live="polite">
        {shown ? (
          <>
            <CheckerResults results={results} locale={locale} labels={{ likely: t("likely"), maybe: t("maybe"), unlikely: t("unlikely"), seeRules: t("seeRules") }} />
            <form action={save} className="mt-6">
              <input type="hidden" name="answers" value={JSON.stringify(a)} />
              <input type="hidden" name="locale" value={locale} />
              <button disabled={saving} className="h-11 rounded-full border border-line bg-surface px-5 font-semibold hover:border-primary disabled:opacity-50">{t("save")}</button>
              {state.error ? <p role="alert" className="mt-2 text-sm text-suspended">{locale === "th" ? "บันทึกไม่ได้ในขณะนี้ ผลลัพธ์ด้านบนยังใช้ได้" : "Saving is not available right now. The result above still stands."}</p> : null}
            </form>
            <p className="mt-4 text-xs text-muted">{t("disclaimer")}</p>
          </>
        ) : (
          <p className="rounded-card border border-dashed border-line p-8 text-muted">{t("intro")}</p>
        )}
      </section>
    </div>
  );
}
