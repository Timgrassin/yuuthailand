import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReviewNote } from "@/components/blocks/review-note";
import { RuleTable } from "@/components/blocks/rule-table";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Button, Card, Container, SectionHeading } from "@/components/ui/primitives";
import Link from "next/link";
import { getPrograms, getRules, latestDate, type Rule } from "@/lib/data";
import { fmtValue } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { articleSchema, graph } from "@/lib/seo/schema";
import { TRACKS, TRACK_INFO, trackBySlug, trackName } from "@/lib/tracks";

export const revalidate = 3600;

export function generateStaticParams() {
  return TRACKS.map((t) => ({ track: TRACK_INFO[t].slug }));
}

type P = { params: Promise<{ track: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { track: slug } = await params;
  const track = trackBySlug(slug);
  if (!track) return {};
  const rules = await getRules(track);
  const funds = rules.find((r) => r.key === "eligibility.min_funds");
  const year = new Date().getFullYear();
  return pageMetadata({
    path: routes.rule(slug),
    title: `${trackName(track)} requirements ${year}`,
    description: `${TRACK_INFO[track].desc}${funds ? ` Money test: ${fmtValue(funds)}.` : ""} Fees, stay length, documents and official sources.`,
    updatedAt: latestDate(rules),
  });
}

function faqFrom(rules: Rule[], track: string) {
  const name = trackName(track, true);
  const get = (k: string) => rules.find((r) => r.key === k);
  const out: { question: string; answer: string }[] = [];
  const add = (r: Rule | undefined, question: string) => {
    if (!r) return;
    out.push({ question, answer: `${fmtValue(r)}. ${r.note_en ?? ""}`.trim() });
  };
  add(get("eligibility.min_funds"), `How much money do I need for the ${name} visa?`);
  add(get("eligibility.min_age"), `What is the minimum age for the ${name} visa?`);
  add(get("stay.per_entry_days"), `How long can I stay on the ${name} visa?`);
  add(get("fee.visa"), `How much does the ${name} visa cost?`);
  add(get("allows.work"), `Can I work on the ${name} visa?`);
  add(get("reporting.ninety_day"), `Do I need to do 90-day reporting on the ${name} visa?`);
  return out;
}

export default async function TrackPage({ params }: P) {
  const { track: slug } = await params;
  const track = trackBySlug(slug);
  if (!track) notFound();
  const [rules, programs] = await Promise.all([getRules(track), getPrograms({ track })]);
  const suits = rules.find((r) => r.key === "summary.suits");
  const docs = rules.find((r) => r.key === "docs.required");
  const updated = latestDate(rules);
  const sources = [...new Set(rules.map((r) => r.source_url).filter(Boolean) as string[])].slice(0, 4);
  const name = trackName(track);

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Yuu", path: "/" }, { name: "Visa rules", path: routes.rules() }, { name, path: routes.rule(slug) }]} />
      <SectionHeading as="h1" title={`${name}: requirements, fees and stay`} />
      <AnswerBlock
        answer={`${TRACK_INFO[track].desc} ${suits && typeof suits.value_json === "string" ? suits.value_json : ""}`.trim()}
        checkedAt={updated}
        sources={sources.map((u) => ({ label: new URL(u).hostname.replace(/^www\./, ""), url: u }))}
      />
      <div className="mt-4"><ReviewNote rules={rules} /></div>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">{"Requirements"}</h2>
        {rules.length ? <RuleTable rules={rules} /> : <Card className="text-muted">{"Rules for this visa are being compiled."}</Card>}
      </section>

      {docs && Array.isArray(docs.value_json) ? (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">{"Documents you will need"}</h2>
          <ol className="list-decimal space-y-1 pl-6">{(docs.value_json as string[]).map((d) => <li key={d}>{d}</li>)}</ol>
          {docs.note_en ? <p className="mt-2 text-sm text-muted">{docs.note_en}</p> : null}
        </section>
      ) : null}

      <section className="mt-10 rounded-card bg-primary-soft p-6">
        <h2 className="text-xl font-bold">{"Not sure this is the right visa?"}</h2>
        <p className="mt-1 text-muted">{"Answer six questions and compare all eight routes."}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild><Link href={routes.checker()}>{"Run the visa checker"}</Link></Button>
          {track === "ed" || track === "dtv" ? <Button asChild variant="secondary"><Link href={{ pathname: routes.providers(), query: { track } }}>{"Find verified schools"}</Link></Button> : null}
        </div>
      </section>

      {programs.length ? (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">{"Programs that support this visa"}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {programs.slice(0, 8).map((g) => (
              <li key={g.id}><Link href={routes.provider(g.provider_slug)}><Card className="hover:border-primary"><p className="font-semibold">{g.name_en}</p></Card></Link></li>
            ))}
          </ul>
        </section>
      ) : null}

      <Faq title={"Questions people ask"} items={faqFrom(rules, track)} />

      {updated ? (
        <JsonLd data={graph(articleSchema({ path: routes.rule(slug), headline: `${name}`, description: TRACK_INFO[track].desc, publishedAt: rules.map((r) => r.effective_from).sort()[0] ?? updated, updatedAt: updated, authorName: "Yuu", citations: sources }))} />
      ) : null}
    </Container>
  );
}
