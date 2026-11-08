"use client";
import { copy } from "@/lib/copy";
import { useActionState, useEffect } from "react";
import { track as trackEvent } from "@/lib/analytics";
import { submitLead, type LeadState } from "@/lib/actions/lead";

type Props = { providerId?: string; cityId?: string; track?: string; checkerResultId?: string; compact?: boolean };

const input = "mt-1 h-11 w-full rounded-sm border border-line bg-bg px-3 font-normal";

export function LeadForm({ providerId, cityId, track, checkerResultId, compact }: Props) {
  const t = copy.lead;
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, {});
  const source = providerId ? "provider" : checkerResultId ? "checker" : "other";
  useEffect(() => { if (state.ok) trackEvent("generate_lead", { source }); }, [state.ok, source]);
  if (state.ok) return <p role="status" className="font-semibold text-verified">{t.sent}</p>;
  const bad = (f: string) => state.fields?.includes(f);
  return (
    <form action={action} className="grid gap-3 text-sm" noValidate data-clarity-mask="true">
      <div>
        <h2 className="text-lg font-bold">{t.title}</h2>
        {!compact ? <p className="text-muted">{t.intro}</p> : null}
      </div>
      {providerId ? <input type="hidden" name="provider_id" value={providerId} /> : null}
      {cityId ? <input type="hidden" name="city_id" value={cityId} /> : null}
      {track ? <input type="hidden" name="track" value={track} /> : null}
      {checkerResultId ? <input type="hidden" name="checker_result_id" value={checkerResultId} /> : null}
      <input type="hidden" name="source_path" value={typeof window === "undefined" ? "" : window.location.pathname} />
      <div aria-hidden className="hidden"><label>Website<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="font-semibold">{t.name}<input name="full_name" required autoComplete="name" className={input} aria-invalid={bad("full_name")} /></label>
      <label className="font-semibold">{t.email}<input name="email" type="email" required autoComplete="email" className={input} aria-invalid={bad("email")} /></label>
      <label className="font-semibold">{t.phone}<input name="phone" type="tel" autoComplete="tel" className={input} /></label>
      <label className="font-semibold">{t.line}<input name="line_id" className={input} /></label>
      {!compact ? (
        <>
          <label className="font-semibold">{t.start}<input name="start_month" type="month" className={input} /></label>
          <label className="font-semibold">{t.message}<textarea name="message" rows={3} className="mt-1 w-full rounded-sm border border-line bg-bg p-3 font-normal" /></label>
        </>
      ) : null}
      <label className={`flex gap-2 ${bad("consent") ? "text-suspended" : ""}`}><input type="checkbox" name="consent" required className="mt-1" /> <span>{t.consent}</span></label>
      <label className="flex gap-2"><input type="checkbox" name="marketing" className="mt-1" /> <span>{t.marketing}</span></label>
      {state.error ? <p role="alert" className="text-suspended">{state.error === "unavailable" || state.error === "rate" ? t.unavailable : t.error}</p> : null}
      <button disabled={pending} className="h-11 rounded-full bg-primary px-5 font-semibold text-primary-ink disabled:opacity-50">{t.submit}</button>
    </form>
  );
}
