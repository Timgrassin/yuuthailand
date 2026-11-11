import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { ReviewNote } from "@/components/blocks/review-note";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button, Container } from "@/components/ui/primitives";
import Link from "next/link";
import { getRules, latestDate } from "@/lib/data";
import { visaFacts } from "@/lib/visa-facts";
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



export default async function RulesPage() {
  const rules = await getRules();
  return (
    <>
    <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Visa rules", path: routes.rules() }]} />} eyebrow="Compare" title={"Thailand long-stay visa rules compared"} lead={<AnswerBlock
        answer={"Thailand has eight main long-stay routes. The DTV needs 500,000 THB and suits remote workers. Retirement needs age 50 and 800,000 THB or 65,000 THB a month. LTR needs high income or assets. Privilege needs only a membership fee. Each route below links to its full rules and sources."}
        checkedAt={latestDate(rules)}
      />} />
    <Container className="py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[1.75rem] leading-tight sm:text-3xl">All eight routes, side by side</h2>
        <ReviewNote rules={rules} />
      </div>
      {/* Phones: one card per visa */}
      <ul className="grid gap-4 md:hidden">
        {TRACKS.map((t) => {
          const f = visaFacts(rules, t);
          return (
            <li key={t}>
              <Link href={routes.rule(TRACK_INFO[t].slug)} className="block rounded-card border border-line bg-surface p-5 transition-colors hover:border-primary/50">
                <span className="block text-lg font-semibold leading-snug">{trackName(t)}</span>
                <span className="mt-1 block text-sm text-ink-2">{TRACK_INFO[t].desc}</span>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 text-sm">
                  {[["Money test", f.money, f.moneyNote], ["Min age", f.age], ["Stay per entry", f.stay], ["Visa fee", f.fee ?? "Varies"]].map(([l, v, n]) => (
                    <div key={l}><dt className="text-ink-2">{l}</dt><dd className="text-base font-semibold tabular-nums">{v ?? "–"}</dd>{n ? <dd className="text-ink-2">{n}</dd> : null}</div>
                  ))}
                </dl>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Tablets and up: the full table */}
      <div className="hidden overflow-x-auto rounded-card border border-line bg-surface md:block">
        <table className="w-full min-w-[860px] text-left text-[15px]">
          <thead className="bg-sunken text-ink">
            <tr>{["Visa", "Money test", "Min age", "Stay per entry", "Visa fee", "Can work"].map((h) => <th key={h} scope="col" className="p-4 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-line">
            {TRACKS.map((t) => {
              const f = visaFacts(rules, t);
              return (
                <tr key={t} className="align-top transition-colors hover:bg-bg">
                  <th scope="row" className="max-w-[18rem] p-4"><Link href={routes.rule(TRACK_INFO[t].slug)} className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:text-primary">{trackName(t)}</Link><span className="mt-1 block text-sm font-normal text-ink-2">{TRACK_INFO[t].desc}</span></th>
                  <td className="p-4"><span className="font-semibold tabular-nums">{f.money ?? "–"}</span>{f.moneyNote ? <span className="block text-sm text-ink-2">{f.moneyNote}</span> : null}</td>
                  <td className="p-4 tabular-nums">{f.age}</td>
                  <td className="p-4 tabular-nums">{f.stay ?? "–"}</td>
                  <td className="p-4 tabular-nums">{f.fee ?? "Varies"}</td>
                  <td className="p-4">{f.work ?? "–"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg"><Link href={routes.checker()}>Check which fits me</Link></Button>
        <Button asChild size="lg" variant="secondary"><Link href={routes.guides()}>Read the comparisons</Link></Button>
      </div>
      <p className="mt-5 text-[15px]"><Link href={routes.ruleChanges()} className="font-semibold text-primary underline underline-offset-4">{"See every rule change, dated"}</Link></p>
      <JsonLd data={graph(itemListSchema("Thailand long-stay visas", TRACKS.map((t) => ({ name: trackName(t), path: routes.rule(TRACK_INFO[t].slug) }))))} />
    </Container>
    </>
  );
}
