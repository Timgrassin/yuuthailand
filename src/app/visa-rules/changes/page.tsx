import type { Metadata } from "next";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, EmptyState, SectionHeading } from "@/components/ui/primitives";
import { getRuleChanges } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { trackName } from "@/lib/tracks";

export const revalidate = 900;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: routes.ruleChanges(),
    title: "Thailand visa rule changes log",
    description: "Every change to Thailand long-stay visa rules tracked by Staylong, dated, with RSS.",
  });
}

export default async function ChangesPage() {
  const changes = await getRuleChanges(200);
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Visa rules", path: routes.rules() }, { name: "Change log", path: routes.ruleChanges() }]} />
      <SectionHeading as="h1" title={"Visa rule change log"} />
      <AnswerBlock answer={"Every time a rule in Staylong changes, the change is logged here with the date. Saved checker results compare against this log and tell you when the rules moved since you checked."} checkedAt={changes[0]?.changed_at} />
      <p className="mt-3 text-sm"><a className="text-primary underline" href="/feeds/rule-changes.xml">RSS</a></p>
      {changes.length ? (
        <ol className="mt-8 divide-y divide-line rounded-card border border-line bg-surface">
          {changes.map((c) => (
            <li key={c.id} id={`change-${c.id}`} className="grid gap-1 p-4 text-sm sm:grid-cols-[10rem_1fr]">
              <time dateTime={c.changed_at} className="text-muted">{fmtDate(c.changed_at)}</time>
              <span><strong>{trackName(c.track, true)}</strong> · {c.summary_en ?? `${c.rule_key} ${c.action}`} <code className="text-xs text-muted">{c.rule_key}</code></span>
            </li>
          ))}
        </ol>
      ) : <div className="mt-8"><EmptyState>{"No changes logged yet."}</EmptyState></div>}
    </Container>
  );
}
