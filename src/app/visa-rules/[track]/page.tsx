import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { ReviewNote } from "@/components/blocks/review-note";
import { RuleTable } from "@/components/blocks/rule-table";
import { CtaBand } from "@/components/marketing/cta-band";
import { Toc } from "@/components/marketing/toc";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { RelatedLinks } from "@/components/seo/related-links";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Button, Card, Container } from "@/components/ui/primitives";
import { VISA_CONTENT } from "@/content";
import { md } from "@/content/render";
import { visaFacts } from "@/lib/visa-facts";
import { EmailCapture } from "@/components/blocks/email-capture";
import { getPrograms, getRules, latestDate, type Rule } from "@/lib/data";
import { fmtValue } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { relatedForTrack, trackGuides } from "@/lib/seo/related";
import { routes } from "@/lib/seo/routes";
import { firstFit } from "@/lib/seo/text";
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
    title: firstFit(`${trackName(track)}: requirements and cost (${year})`, `${trackName(track)}: requirements, cost (${year})`),
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

const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

// Superscript link to a numbered source at the foot of the page.
const Fn = ({ n }: { n?: number }) => (n ? <a href={`#src-${n}`} className="ml-0.5 align-super text-xs font-bold leading-none text-primary no-underline" aria-label={`Source ${n}`}>{n}</a> : null);

export default async function TrackPage({ params }: P) {
  const { track: slug } = await params;
  const track = trackBySlug(slug);
  if (!track) notFound();
  const [rules, programs] = await Promise.all([getRules(track), getPrograms({ track })]);
  const c = VISA_CONTENT[track];
  const suits = rules.find((r) => r.key === "summary.suits");
  const docs = rules.find((r) => r.key === "docs.required");
  const updated = latestDate(rules);
  const name = trackName(track);
  const short = trackName(track, true);
  const f = visaFacts(rules, track);
  const guides = trackGuides(track);
  const faqs = [...faqFrom(rules, track), ...(c?.faqs ?? [])];
  const get = (k: string) => rules.find((r) => r.key === k);

  // One numbered source list: rule sources first (the key facts cite them), then editorial sources.
  const sources = [...new Map([
    ...rules.filter((r) => r.source_url).map((r) => [r.source_url!, { url: r.source_url!, label: host(r.source_url!) }] as const),
    ...(c?.sources ?? []).map((s) => [s.url, { url: s.url, label: s.label }] as const),
  ]).values()];
  const srcNo = (k: string) => { const u = get(k)?.source_url; const i = u ? sources.findIndex((s) => s.url === u) : -1; return i >= 0 ? i + 1 : undefined; };

  const facts = [
    { label: "Money test", value: f.money, note: f.moneyNote, n: srcNo("eligibility.min_funds") },
    { label: "Minimum age", value: f.age, n: srcNo("eligibility.min_age") },
    { label: "Each stay", value: f.stay, n: srcNo("stay.per_entry_days") },
    { label: "Valid for", value: f.validity, n: srcNo("validity.years") },
    { label: "Visa fee", value: f.fee ?? "Varies by embassy", n: srcNo("fee.visa") },
    { label: "Can work", value: f.work, n: srcNo("allows.work") },
  ].filter((x) => x.value);

  const toc = [
    c ? { id: "who", label: "Who it suits" } : null,
    { id: "requirements", label: "Requirements" },
    docs ? { id: "documents", label: "Documents" } : null,
    c?.steps.length ? { id: "apply", label: "How to apply" } : null,
    c?.costs?.length ? { id: "costs", label: "Costs" } : null,
    ...(c?.sections ?? []).map((s) => ({ id: s.id, label: s.heading })),
    c?.mistakes.length ? { id: "mistakes", label: "Common mistakes" } : null,
    { id: "faq", label: "Questions" },
    sources.length ? { id: "sources", label: "Sources" } : null,
  ].filter(Boolean) as { id: string; label: string }[];

  const H2 = ({ id, children }: { id: string; children: ReactNode }) => <h2 id={id} className="sec mb-6 scroll-mt-24 text-[1.75rem] leading-tight">{children}</h2>;

  return (
    <>
      <div className="bg-mesh">
        <Container className="grid max-w-7xl gap-x-12 gap-y-8 pb-6 pt-8 sm:pt-10 [grid-template-areas:'head'_'facts'_'body'] lg:grid-cols-[minmax(0,1fr)_19rem] lg:[grid-template-areas:'head_facts'_'body_facts'] xl:grid-cols-[12rem_minmax(0,1fr)_19rem] xl:[grid-template-areas:'toc_head_facts'_'toc_body_facts']">
          {/* Left: on this page */}
          <aside className="hidden [grid-area:toc] xl:block">
            <div className="sticky top-24 pt-1"><Toc items={toc} /></div>
          </aside>

          {/* Head */}
          <header className="[grid-area:head]">
            <Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Visas", path: routes.rules() }, { name, path: routes.rule(slug) }]} />
            <h1 className="text-[2.4rem] leading-[1.05] tracking-[-0.025em] sm:text-[3.25rem]">{name}</h1>
            <div className="mt-5 text-lg leading-relaxed text-ink-2 sm:text-[19px]">
              <AnswerBlock answer={suits && typeof suits.value_json === "string" ? `${TRACK_INFO[track].desc.split(".")[0]}. Best for ${suits.value_json.charAt(0).toLowerCase()}${suits.value_json.slice(1)}` : TRACK_INFO[track].desc} checkedAt={updated} />
            </div>
            <div className="mt-6 border-y border-line py-4"><ReviewNote rules={rules} /></div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href={routes.checker()}>Check if I qualify <ArrowRight className="size-5" aria-hidden /></Link></Button>
              {track === "ed" || track === "dtv" ? <Button asChild size="lg" variant="secondary"><Link href={{ pathname: routes.providers(), query: { track } }}>{track === "ed" ? "Find a school" : "Find a camp or provider"}</Link></Button> : null}
            </div>
          </header>

          {/* Right: key facts, sticky on desktop */}
          <aside className="[grid-area:facts]">
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <section aria-labelledby="facts-h" className="rounded-card border border-line bg-surface p-5 shadow-lift">
                <h2 id="facts-h" className="text-[19px] font-semibold tracking-normal">Key facts</h2>
                <dl className="mt-3 grid grid-cols-[7rem_1fr] gap-x-4 gap-y-3 text-[15px]">
                  {facts.map((x) => (
                    <div key={x.label} className="contents">
                      <dt className="text-ink-2">{x.label}</dt>
                      <dd className="font-semibold tabular-nums">{x.value}<Fn n={x.n} />{x.note ? <span className="block text-sm font-normal text-ink-2">{x.note}</span> : null}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <Button asChild size="lg" className="hidden w-full lg:inline-flex"><Link href={routes.checker()}>Check if this route fits you</Link></Button>
              {guides.length ? (
                <nav aria-label="Related guides" className="hidden rounded-card border border-line bg-surface p-5 text-[15px] lg:block">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-ink-2">Related guides</p>
                  <ul className="space-y-2.5">{guides.map((g) => <li key={g!.slug}><Link href={routes.guide(g!.slug)} className="text-ink hover:text-primary">{g!.title}</Link></li>)}</ul>
                </nav>
              ) : null}
            </div>
          </aside>

          {/* Body */}
          <article className="numbered min-w-0 space-y-16 pb-10 pt-4 [grid-area:body]">
            {c ? (
              <section>
                <H2 id="who">Who the {short} visa suits</H2>
                <p className="text-lg leading-relaxed text-ink-2">{c.intro}</p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <Card className="border-verified/25"><h3 className="text-lg tracking-normal">Good fit if you</h3><ul className="mt-4 space-y-3">{c.whoFor.map((x) => <li key={x} className="flex gap-3 text-[15px] text-ink-2"><Check className="mt-0.5 size-5 shrink-0 text-verified" aria-hidden />{x}</li>)}</ul></Card>
                  <Card className="border-suspended/20"><h3 className="text-lg tracking-normal">Look elsewhere if you</h3><ul className="mt-4 space-y-3">{c.notFor.map((x) => <li key={x} className="flex gap-3 text-[15px] text-ink-2"><X className="mt-0.5 size-5 shrink-0 text-suspended" aria-hidden />{x}</li>)}</ul></Card>
                </div>
              </section>
            ) : null}

            <section>
              <H2 id="requirements">{short} requirements</H2>
              {rules.length ? <RuleTable rules={rules} /> : <Card className="text-muted">Rules for this visa are being compiled.</Card>}
            </section>

            {docs && Array.isArray(docs.value_json) ? (
              <section>
                <H2 id="documents">Documents you will need</H2>
                <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">{(docs.value_json as string[]).map((d) => <li key={d} className="flex gap-3 px-5 py-4"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-[1.5px] border-line-strong" aria-hidden /><span className="text-ink-2">{d}</span></li>)}</ul>
                {docs.note_en ? <p className="mt-3 text-sm text-ink-2">{docs.note_en}</p> : null}
              </section>
            ) : null}

            {c?.steps.length ? (
              <section>
                <H2 id="apply">How to apply, step by step</H2>
                <ol className="relative space-y-8 border-l-2 border-line pl-8">
                  {c.steps.map((s, i) => (
                    <li key={s.title} className="relative">
                      <span className="absolute -left-[2.85rem] flex size-9 items-center justify-center rounded-full border-4 border-bg bg-primary text-sm font-semibold text-primary-ink">{i + 1}</span>
                      <h3 className="text-lg font-semibold tracking-normal">{s.title}</h3>
                      <div className="prose-sl mt-1" dangerouslySetInnerHTML={{ __html: md(s.body) }} />
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {c?.costs?.length ? (
              <section>
                <H2 id="costs">What it costs</H2>
                <dl className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface text-[15px]">
                  {c.costs.map((x) => (
                    <div key={x.item} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <dt className="font-medium text-ink">{x.item}{x.note ? <span className="mt-1 block text-sm font-normal text-ink-2">{x.note}</span> : null}</dt>
                      <dd className="text-lg font-semibold tabular-nums sm:max-w-[45%] sm:text-right">{x.amount}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {c?.sections.length ? (
              <div className="prose-sl">
                {c.sections.map((s) => <section key={s.id}><h2 id={s.id} className="sec">{s.heading}</h2><div dangerouslySetInnerHTML={{ __html: md(s.body) }} /></section>)}
              </div>
            ) : null}

            {c?.mistakes.length ? (
              <section>
                <H2 id="mistakes">Common mistakes to avoid</H2>
                <ul className="grid gap-3 md:grid-cols-2">{c.mistakes.map((m) => <li key={m} className="flex gap-3 rounded-[10px] bg-suspended-soft/60 p-4 text-[15px] text-ink-2"><X className="mt-0.5 size-5 shrink-0 text-suspended" aria-hidden />{m}</li>)}</ul>
              </section>
            ) : null}

            {programs.length ? (
              <section>
                <h2 className="mb-6 text-[1.75rem] leading-tight">Programs that support this visa</h2>
                <ul className="grid gap-3 sm:grid-cols-2">{programs.slice(0, 8).map((g) => <li key={g.id}><Link href={routes.provider(g.provider_slug)} className="block rounded-card border border-line bg-surface p-5 font-semibold transition-colors hover:border-primary/50">{g.name_en}</Link></li>)}</ul>
              </section>
            ) : null}

            <EmailCapture title={`Get ${short} rule alerts`} body={`We email you the day a ${short} requirement changes, with the official source. Plus a printable document checklist.`} leadMagnet={`visa_alerts_${track}`} button="Alert me" tracks={[track]} />

            <Faq title={`${short} visa questions`} items={faqs} />

            {sources.length ? (
              <section id="sources" className="scroll-mt-24 border-t border-line pt-6 text-sm">
                <h2 className="text-lg font-semibold tracking-normal">Sources</h2>
                <ol className="mt-3 space-y-1.5">{sources.map((s, i) => <li key={s.url} id={`src-${i + 1}`} className="scroll-mt-28 text-ink-2"><b className="mr-1.5 tabular-nums text-ink">{i + 1}</b><a href={s.url} rel="noopener nofollow" target="_blank" className="text-primary underline underline-offset-2">{s.label}</a>{s.label !== host(s.url) ? <span> · {host(s.url)}</span> : null}</li>)}</ol>
              </section>
            ) : null}
          </article>
        </Container>
      </div>

      <RelatedLinks groups={relatedForTrack(track)} />
      <CtaBand title={`Not sure the ${short} is right?`} body="The checker scores all eight long-stay routes against your age, savings, income and purpose." primary={{ href: routes.checker(), label: "Run the visa checker" }} secondary={{ href: routes.rules(), label: "Compare all visas" }} />
      {updated ? <JsonLd data={graph(articleSchema({ path: routes.rule(slug), headline: name, description: TRACK_INFO[track].desc, publishedAt: rules.map((r) => r.effective_from).sort()[0] ?? updated, updatedAt: c?.updated && c.updated > updated ? c.updated : updated, authorName: "Staylong", citations: sources.map((s) => s.url) }))} /> : null}
    </>
  );
}
