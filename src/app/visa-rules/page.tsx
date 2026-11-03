import type { Metadata } from "next";
import { ReviewNote } from "@/components/blocks/review-note";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, SectionHeading } from "@/components/ui/primitives";
import Link from "next/link";
import { getRules, latestDate, type Rule } from "@/lib/data";
import { fmtValue } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, itemListSchema } from "@/lib/seo/schema";
import { TRACKS, TRACK_INFO, trackName } from "@/lib/tracks";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: routes.rules(),
    title: "Thailand long-stay visa rules compared (2026)",
    description: "DTV, education, retirement, O-A, LTR, Privilege, marriage and work visas side by side: money, age, fees and stay length, each with an official source.",
  });
}

const COLS = [
  { key: "eligibility.min_age", label: "Min age" },
  { key: "eligibility.min_funds", label: "Money test" },
  { key: "fee.visa", label: "Visa fee" },
  { key: "stay.per_entry_days", label: "Stay per entry" },
  { key: "allows.work", label: "Can work" },
];

function cell(rules: Rule[], track: string, key: string): string {
  const r = rules.find((x) => x.track === track && x.key === key);
  if (r) return fmtValue(r);
  if (key === "eligibility.min_funds") {
    const alt = rules.find((x) => x.track === track && (x.key.startsWith("eligibility.min_income") || x.key.startsWith("eligibility.min_assets") || x.key.startsWith("fee.membership")) && x.value_num != null);
    if (alt) return `${alt.label_en}: ${fmtValue(alt)}`;
  }
  if (key === "fee.visa") {
    const fees = rules.filter((x) => x.track === track && x.key.startsWith("fee.membership.") && x.value_num != null);
    if (fees.length) return `${"from"} ${fmtValue(fees.sort((a, b) => Number(a.value_num) - Number(b.value_num))[0])}`;
  }
  return "–";
}

export default async function RulesPage() {
  const rules = await getRules();
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Visa rules", path: routes.rules() }]} />
      <SectionHeading as="h1" title={"Thailand long-stay visa rules compared"} />
      <AnswerBlock
        answer={"Thailand has eight main long-stay routes. The DTV needs 500,000 THB and suits remote workers. Retirement needs age 50 and 800,000 THB or 65,000 THB a month. LTR needs high income or assets. Privilege needs only a membership fee. Each route below links to its full rules and sources."}
        checkedAt={latestDate(rules)}
      />
      <div className="mt-4"><ReviewNote rules={rules} /></div>
      <div className="mt-8 overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-primary-soft text-primary">
            <tr>
              <th scope="col" className="p-3">{"Visa"}</th>
              {COLS.map((c) => <th key={c.key} scope="col" className="p-3">{c.label}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {TRACKS.map((t) => (
              <tr key={t} className="align-top">
                <th scope="row" className="p-3"><Link href={routes.rule(TRACK_INFO[t].slug)} className="font-semibold text-primary underline">{trackName(t)}</Link></th>
                {COLS.map((c) => <td key={c.key} className="p-3">{cell(rules, t, c.key)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm"><Link href={routes.ruleChanges()} className="text-primary underline">{"See every rule change, dated"}</Link></p>
      <JsonLd data={graph(itemListSchema("Thailand long-stay visas", TRACKS.map((t) => ({ name: trackName(t), path: routes.rule(TRACK_INFO[t].slug) }))))} />
    </Container>
  );
}
