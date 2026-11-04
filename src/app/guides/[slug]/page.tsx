import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/marketing/cta-band";
import { KeyFacts } from "@/components/marketing/key-facts";
import { PageHero } from "@/components/marketing/page-hero";
import { Toc } from "@/components/marketing/toc";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { EmailCapture } from "@/components/blocks/email-capture";
import { Button, Card, Container } from "@/components/ui/primitives";
import { GUIDES, getGuide } from "@/content";
import { md } from "@/content/render";
import { fmtDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { articleSchema, graph } from "@/lib/seo/schema";
import { TRACK_INFO, trackName, type Track } from "@/lib/tracks";

export const dynamicParams = false;
export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return pageMetadata({ path: routes.guide(g.slug), title: g.metaTitle, description: g.description, updatedAt: g.updated });
}

const KIND_LABEL = { guide: "Guide", comparison: "Comparison", change: "Rule change", checklist: "Checklist" } as const;

export default async function GuidePage({ params }: P) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const related = (g.related ?? []).map(getGuide).filter(Boolean);
  const toc = [...g.sections.map((s) => ({ id: s.id, label: s.heading })), ...(g.faqs.length ? [{ id: "faq", label: "Questions" }] : [])];

  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Guides", path: routes.guides() }, { name: g.title, path: routes.guide(g.slug) }]} />}
        eyebrow={g.eyebrow ?? KIND_LABEL[g.kind]}
        title={g.title}
        lead={<AnswerBlock answer={g.answer} checkedAt={g.updated} sources={g.sources.slice(0, 3).map((s) => ({ label: s.label, url: s.url }))} />}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[1fr_18rem]">
        <article className="min-w-0">
          {g.confidence === "low" ? (
            <p className="mb-8 flex gap-3 rounded-sm border border-accent/30 bg-accent-soft p-4 text-sm text-[#7a4b09]"><AlertTriangle className="size-5 shrink-0" aria-hidden />Some details on this page are still being confirmed with official sources. Check the linked sources before you act.</p>
          ) : null}
          {g.keyFacts?.length ? <div className="mb-12"><KeyFacts facts={g.keyFacts} /></div> : null}
          <div className="prose-sl">
            {g.sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>{s.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: md(s.body) }} />
              </section>
            ))}
          </div>
          <div className="mt-14"><EmailCapture title="Get rule-change alerts" body="We email you when the rules on this page change, with the official source and what it means for you." leadMagnet={`guide_${g.slug}`} button="Alert me" tracks={g.tracks} /></div>
          <Faq title="Questions people ask" items={g.faqs} />
          <section className="mt-14 rounded-card border border-line bg-surface p-6">
            <h2 className="text-xl">Sources</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">{g.sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener nofollow" target="_blank" className="text-primary underline underline-offset-2">{s.label}</a></li>)}</ol>
            <p className="mt-4 text-xs text-muted">Published {fmtDate(g.published)} · Last checked {fmtDate(g.updated)} · Pending expert review</p>
          </section>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Toc items={toc} />
          <Card className="bg-primary text-primary-ink">
            <p className="font-display text-xl">Not sure which visa fits?</p>
            <p className="mt-2 text-sm text-white/80">Six questions, checked against current rules.</p>
            <Button asChild variant="light" size="sm" className="mt-4"><Link href={routes.checker()}>Run the checker <ArrowRight className="size-4" aria-hidden /></Link></Button>
          </Card>
          {g.tracks.length ? (
            <div className="text-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Visa rules</p>
              <ul className="space-y-2">{g.tracks.map((t) => <li key={t}><Link href={routes.rule(TRACK_INFO[t as Track].slug)} className="text-ink-2 hover:text-primary">{trackName(t)}</Link></li>)}</ul>
            </div>
          ) : null}
        </aside>
      </Container>
      {related.length ? (
        <Container className="pb-4">
          <h2 className="mb-6 text-2xl">Read next</h2>
          <div className="grid gap-4 md:grid-cols-3">{related.map((r) => <Link key={r!.slug} href={routes.guide(r!.slug)}><Card className="h-full hover:border-primary/40"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-2">{KIND_LABEL[r!.kind]}</p><p className="mt-2 font-display text-lg leading-snug">{r!.title}</p></Card></Link>)}</div>
        </Container>
      ) : null}
      <CtaBand title="Check your own situation." body="The checker scores all eight visas against the rules on this page." primary={{ href: routes.checker(), label: "Start the checker" }} />
      <JsonLd data={graph(articleSchema({ path: routes.guide(g.slug), headline: g.title, description: g.description, publishedAt: g.published, updatedAt: g.updated, authorName: "Staylong", citations: g.sources.map((s) => s.url) }))} />
    </>
  );
}
