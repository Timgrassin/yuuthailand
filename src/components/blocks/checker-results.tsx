import type { TrackResult } from "@/lib/checker/engine";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/seo/routes";
import { TRACK_INFO, trackName } from "@/lib/tracks";

const tone = { likely: "border-verified bg-verified-soft", maybe: "border-accent bg-accent-soft", unlikely: "border-line bg-surface opacity-80" };

export function CheckerResults({ results, locale, labels }: { results: TrackResult[]; locale: string; labels: { likely: string; maybe: string; unlikely: string; seeRules: string } }) {
  return (
    <ol className="grid gap-3">
      {results.map((r) => (
        <li key={r.track} className={`rounded-card border p-4 ${tone[r.verdict]}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold">{trackName(r.track, locale)}</h3>
            <span className="text-sm font-semibold">{labels[r.verdict]}</span>
          </div>
          <ul className="mt-2 space-y-1 text-sm">
            {r.reasons.map((x) => (
              <li key={x.en} className="flex gap-2"><span aria-hidden>{x.ok === true ? "✓" : x.ok === false ? "✗" : "?"}</span><span>{locale === "th" ? x.th : x.en}</span></li>
            ))}
          </ul>
          <Link href={routes.rule(TRACK_INFO[r.track].slug)} className="mt-2 inline-block text-sm text-primary underline">{labels.seeRules}</Link>
        </li>
      ))}
    </ol>
  );
}
