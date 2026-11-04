import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CalendarClock, Check, CircleDollarSign, Clock, UserRound, X } from "lucide-react";
import { ReviewNote } from "@/components/blocks/review-note";
import { RuleTable } from "@/components/blocks/rule-table";
import { CtaBand } from "@/components/marketing/cta-band";
import { KeyFacts } from "@/components/marketing/key-facts";
import { PageHero } from "@/components/marketing/page-hero";
import { Toc } from "@/components/marketing/toc";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Button, Card, Container } from "@/components/ui/primitives";
import { VISA_CONTENT, getGuide, guidesForTrack } from "@/content";
import { md } from "@/content/render";
import { visaFacts } from "@/lib/visa-facts";
import { EmailCapture } from "@/components/blocks/email-capture";
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
    title: `${trackName(track)}: requirements and cost (${year})`,
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
  const c = VISA_CONTENT[track];
  const suits = rules.find((r) => r.key === "summary.suits");
  const docs = rules.find((r) => r.key === "docs.required");
  const updated = latestDate(rules);
  const ruleSources = [...new Set(rules.map((r) => r.source_url).filter(Boolean) as string[])];
  const name = trackName(track);
  const f = visaFacts(rules, track);
  const guides = [...new Set([...(c?.related ?? []), ...guidesForTrack(track).map((g) => g.slug)])].map(getGuide).filter(Boolean).slice(0, 6);
  const faqs = [...faqFrom(rules, track), ...(c?.faqs ?? [])];
  const toc = [
    c ? { id: "who", label: "Who it suits" } : null,
    { id: "requirements", label: "Requirements" },
    docs ? { id: "documents", label: "Documents" } : null,
    c?.steps.length ? { id: "apply", label: "How to apply" } : null,
    c?.costs?.length ? { id: "costs", label: "Costs" } : null,
    ...(c?.sections ?? []).map((s) => ({ id: s.id, label: s.heading })),
    c?.mistakes.length ? { id: "mistakes", label: "Common mistakes" } : null,
    { id: "faq", label: "Questions" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Visas", path: routes.rules() }, { name, path: routes.rule(slug) }]} />}
        eyebrow="Visa guide"
        title={<>{name}</>}
        lead={<AnswerBlock answer={suits && typeof suits.value_json === "string" ? `${TRACK_INFO[track].desc.split(".")[0]}. Best for ${suits.value_json.charAt(0).toLowerCase()}${suits.value_json.slice(1)}` : TRACK_INFO[track].desc} checkedAt={updated} sources={[...new Map(ruleSources.map((u) => [new URL(u).hostname.replace(/^www\./, ""), u])).entries()].slice(0, 3).map(([label, url]) => ({ label, url }))} />}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><Link href={routes.checker()}>Check if I qualify <ArrowRight className="size-4" aria-hidden /></Link></Button>
          {track === "ed" || track === "dtv" ? <Button asChild size="lg" variant="secondary"><Link href={{ pathname: routes.providers(), query: { track } }}>{track === "ed" ? "Find a school" : "Find a camp or provider"}</Link></Button> : null}
        </div>
      </PageHero>

      <Container className="-mt-8 relative">
        <KeyFacts facts={[
          { label: "Money test", value: f.money ?? "–", note: f.moneyNote, icon: CircleDollarSign },
          { label: "Minimum age", value: f.age ?? "Any", icon: UserRound },
          { label: "Stay per entry", value: f.stay ?? "–", note: f.validity ? `visa valid ${f.validity}` : undefined, icon: Clock },
          { label: "Visa fee", value: f.fee ?? "Varies", note: "varies by embassy", icon: CalendarClock },
        ]} />
      </Container>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_17rem]">
        <article className="min-w-0 space-y-16">
          {c ? (
            <section id="who" className="scroll-mt-24">
              <p className="max-w-3xl text-lg leading-relaxed text-ink-2">{c.intro}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Card><h2 className="text-xl">Good fit if you</h2><ul className="mt-4 space-y-3">{c.whoFor.map((x) => <li key={x} className="flex gap-3 text-[15px] text-ink-2"><Check className="mt-0.5 size-5 shrink-0 text-verified" aria-hidden />{x}</li>)}</ul></Card>
                <Card><h2 className="text-xl">Look elsewhere if you</h2><ul className="mt-4 space-y-3">{c.notFor.map((x) => <li key={x} className="flex gap-3 text-[15px] text-ink-2"><X className="mt-0.5 size-5 shrink-0 text-suspended" aria-hidden />{x}</li>)}</ul></Card>
              </div>
            </section>
          ) : null}

          <section id="requirements" className="scroll-mt-24">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl">{name} requirements</h2>
              <ReviewNote rules={rules} />
            </div>
            {rules.length ? <RuleTable rules={rules} /> : <Card className="text-muted">Rules for this visa are being compiled.</Card>}
          </section>

          {docs && Array.isArray(docs.value_json) ? (
            <section id="documents" className="scroll-mt-24">
              <h2 className="mb-6 text-3xl">Documents you will need</h2>
              <Card className="p-0"><ul className="divide-y divide-line">{(docs.value_json as string[]).map((d, i) => <li key={d} className="flex gap-4 px-6 py-4"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">{i + 1}</span><span className="pt-0.5 text-ink-2">{d}</span></li>)}</ul></Card>
              {docs.note_en ? <p className="mt-3 text-sm text-muted">{docs.note_en}</p> : null}
            </section>
          ) : null}

          {c?.steps.length ? (
            <section id="apply" className="scroll-mt-24">
              <h2 className="mb-8 text-3xl">How to apply, step by step</h2>
              <ol className="relative space-y-8 border-l-2 border-line pl-8">
                {c.steps.map((s, i) => (
                  <li key={s.title} className="relative">
                    <span className="absolute -left-[2.85rem] flex size-9 items-center justify-center rounded-full border-2 border-bg bg-primary font-semibold text-primary-ink">{i + 1}</span>
                    <h3 className="font-sans text-lg font-semibold">{s.title}</h3>
                    <div className="prose-sl mt-1" dangerouslySetInnerHTML={{ __html: md(s.body) }} />
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {c?.costs?.length ? (
            <section id="costs" className="scroll-mt-24">
              <h2 className="mb-6 text-3xl">What it costs</h2>
              <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
                <table className="w-full text-left text-[15px]">
                  <tbody className="divide-y divide-line">{c.costs.map((x) => <tr key={x.item}><th scope="row" className="p-5 font-medium text-ink-2">{x.item}{x.note ? <span className="mt-1 block text-sm font-normal text-muted">{x.note}</span> : null}</th><td className="p-5 text-right font-display text-lg whitespace-nowrap">{x.amount}</td></tr>)}</tbody>
                </table>
              </div>
            </section>
          ) : null}

          {c?.sections.length ? (
            <div className="prose-sl">
              {c.sections.map((s) => <section key={s.id}><h2 id={s.id}>{s.heading}</h2><div dangerouslySetInnerHTML={{ __html: md(s.body) }} /></section>)}
            </div>
          ) : null}

          {c?.mistakes.length ? (
            <section id="mistakes" className="scroll-mt-24">
              <h2 className="mb-6 text-3xl">Common mistakes to avoid</h2>
              <div className="grid gap-3 md:grid-cols-2">{c.mistakes.map((m) => <div key={m} className="flex gap-3 rounded-sm border border-suspended/20 bg-suspended-soft/50 p-4 text-[15px] text-ink-2"><X className="mt-0.5 size-5 shrink-0 text-suspended" aria-hidden />{m}</div>)}</div>
            </section>
          ) : null}

          {programs.length ? (
            <section>
              <h2 className="mb-6 text-3xl">Programs that support this visa</h2>
              <ul className="grid gap-3 sm:grid-cols-2">{programs.slice(0, 8).map((g) => <li key={g.id}><Link href={routes.provider(g.provider_slug)}><Card className="hover:border-primary/40"><p className="font-semibold">{g.name_en}</p></Card></Link></li>)}</ul>
            </section>
          ) : null}

          <EmailCapture title={`Get ${trackName(track, true)} rule alerts`} body={`We email you the day a ${trackName(track, true)} requirement changes, with the official source. Plus a printable document checklist.`} leadMagnet={`visa_alerts_${track}`} button="Alert me" tracks={[track]} />

          <Faq title={`${trackName(track, true)} visa questions`} items={faqs} />

          {c?.sources.length ? (
            <section className="rounded-card border border-line bg-surface p-6 text-sm">
              <h2 className="text-xl">Sources</h2>
              <ol className="mt-4 list-decimal space-y-1.5 pl-5">{[...new Map([...c.sources, ...ruleSources.map((u) => ({ label: new URL(u).hostname, url: u }))].map((s) => [s.url, s])).values()].map((s) => <li key={s.url}><a href={s.url} rel="noopener nofollow" target="_blank" className="text-primary underline underline-offset-2">{s.label}</a></li>)}</ol>
            </section>
          ) : null}
        </article>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <Toc items={toc} />
          <Card className="bg-primary text-primary-ink">
            <p className="font-display text-xl">Do you qualify?</p>
            <p className="mt-2 text-sm text-white/80">Compare this visa with the other seven in two minutes.</p>
            <Button asChild variant="light" size="sm" className="mt-4"><Link href={routes.checker()}>Run the checker</Link></Button>
          </Card>
          {guides.length ? (
            <div className="text-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Related guides</p>
              <ul className="space-y-2.5">{guides.map((g) => <li key={g!.slug}><Link href={routes.guide(g!.slug)} className="text-ink-2 hover:text-primary">{g!.title}</Link></li>)}</ul>
            </div>
          ) : null}
        </aside>
      </Container>

      <CtaBand title={`Not sure the ${trackName(track, true)} is right?`} body="The checker scores all eight long-stay routes against your age, savings, income and purpose." primary={{ href: routes.checker(), label: "Run the visa checker" }} secondary={{ href: routes.rules(), label: "Compare all visas" }} />
      {updated ? <JsonLd data={graph(articleSchema({ path: routes.rule(slug), headline: name, description: TRACK_INFO[track].desc, publishedAt: rules.map((r) => r.effective_from).sort()[0] ?? updated, updatedAt: c?.updated && c.updated > updated ? c.updated : updated, authorName: "Staylong", citations: ruleSources }))} /> : null}
    </>
  );
}
