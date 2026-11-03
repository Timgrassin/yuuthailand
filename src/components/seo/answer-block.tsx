// Answer-first block: a 40-60 word self-contained answer AI engines can lift verbatim.
// Every indexable template opens with one, plus a visible "Last checked" date and sources.
type Props = {
  question?: string;
  answer: string;
  checkedAt?: string;
  sources?: { label: string; url: string }[];
};

export function AnswerBlock({ question, answer, checkedAt, sources = [] }: Props) {
  const t = { checked: "Last checked", sources: "Sources" };
  return (
    <section aria-label={question ?? "Summary"} data-answer-block>
      {question ? <h2>{question}</h2> : null}
      <p>{answer}</p>
      {checkedAt ? (
        <p>
          {t.checked}: <time dateTime={checkedAt}>{new Date(checkedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time>
        </p>
      ) : null}
      {sources.length ? (
        <p>
          {t.sources}:{" "}
          {sources.map((s, i) => (
            <span key={s.url}>
              {i ? ", " : ""}
              <a href={s.url} rel="noopener" target="_blank">{s.label}</a>
            </span>
          ))}
        </p>
      ) : null}
    </section>
  );
}
