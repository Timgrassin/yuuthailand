import Link from "next/link";
import { ArrowRight, Check, HelpCircle, X } from "lucide-react";
import type { TrackResult } from "@/lib/checker/engine";
import { routes } from "@/lib/seo/routes";
import { TRACK_INFO, trackName } from "@/lib/tracks";

const STYLE = {
  likely: { card: "border-verified/30 bg-surface ring-1 ring-verified/20", pill: "bg-verified-soft text-verified" },
  maybe: { card: "border-accent/30 bg-surface", pill: "bg-accent-soft text-warn" },
  unlikely: { card: "border-line bg-surface/60", pill: "bg-unverified-soft text-unverified" },
};

export function CheckerResults({ results, labels }: { results: TrackResult[]; labels: { likely: string; maybe: string; unlikely: string; seeRules: string } }) {
  return (
    <ol className="grid gap-3">
      {results.map((r) => (
        <li key={r.track} className={`rounded-card border p-5 shadow-card ${STYLE[r.verdict].card}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl">{trackName(r.track)}</h3>
              <p className="mt-0.5 text-sm text-muted">{TRACK_INFO[r.track].desc}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STYLE[r.verdict].pill}`}>{labels[r.verdict]}</span>
          </div>
          <ul className="mt-4 space-y-2 text-[15px]">
            {r.reasons.map((x) => (
              <li key={x.text} className="flex gap-2.5">
                {x.ok === true ? <Check className="mt-0.5 size-4.5 shrink-0 text-verified" aria-label="Met" /> : x.ok === false ? <X className="mt-0.5 size-4.5 shrink-0 text-suspended" aria-label="Not met" /> : <HelpCircle className="mt-0.5 size-4.5 shrink-0 text-accent" aria-label="Check" />}
                <span className="text-ink-2">{x.text}</span>
              </li>
            ))}
          </ul>
          <Link href={routes.rule(TRACK_INFO[r.track].slug)} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{labels.seeRules} <ArrowRight className="size-4" aria-hidden /></Link>
        </li>
      ))}
    </ol>
  );
}
