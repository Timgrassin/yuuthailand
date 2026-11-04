import { CalendarCheck, Link2 } from "lucide-react";
import { fmtDate } from "@/lib/format";

// Answer-first block: a 40-60 word self-contained answer AI engines can lift verbatim,
// with a visible "Last checked" date and sources.
type Props = { question?: string; answer: string; checkedAt?: string; sources?: { label: string; url: string }[]; tone?: "plain" | "card" };

export function AnswerBlock({ question, answer, checkedAt, sources = [], tone = "plain" }: Props) {
  return (
    <section aria-label={question ?? "Summary"} data-answer-block className={tone === "card" ? "rounded-card border border-line bg-surface p-6 shadow-card" : ""}>
      {question ? <h2 className="mb-3 text-2xl">{question}</h2> : null}
      <p className="leading-relaxed">{answer}</p>
      {checkedAt || sources.length ? (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          {checkedAt ? <span className="inline-flex items-center gap-1.5"><CalendarCheck className="size-4 text-primary-2" aria-hidden />Last checked <time dateTime={checkedAt} className="font-medium text-ink-2">{fmtDate(checkedAt)}</time></span> : null}
          {sources.length ? (
            <span className="inline-flex flex-wrap items-center gap-1.5">
              <Link2 className="size-4 text-primary-2" aria-hidden />Sources:
              {sources.map((s, i) => <span key={s.url}>{i ? ", " : ""}<a href={s.url} rel="noopener nofollow" target="_blank" className="font-medium text-ink-2 underline decoration-line-strong underline-offset-2 hover:text-primary">{s.label}</a></span>)}
            </span>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
