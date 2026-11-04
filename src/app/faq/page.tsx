import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { FAQ, FAQ_CATEGORIES, FAQ_SOURCES } from "@/content/faq";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { faqSchema, graph } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({
  path: routes.faq(),
  title: `Thailand long-stay visa FAQ: ${FAQ.length} questions answered`,
  description: "The questions people ask most about living in Thailand long term: DTV, retirement, ED, LTR, 90-day reports, bank accounts, tax and more. Short answers, sourced.",
  updatedAt: "2026-11-04",
});

export default function FaqHub() {
  const popular = FAQ.filter((f) => f.popular);
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "FAQ", path: routes.faq() }]} />}
        eyebrow={`FAQ · ${FAQ.length} questions`}
        title="Thailand long-stay questions, answered."
        lead="The questions people ask most on forums and in our inbox, with a short answer. Each one links to the full guide, rule page or tool with the detail and sources."
      >
        <nav aria-label="FAQ topics" className="flex flex-wrap gap-2">
          {FAQ_CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="rounded-full border border-line-strong bg-surface px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary">{c.title.split(":")[0]}</a>
          ))}
        </nav>
      </PageHero>
      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-16">
          <section id="popular" className="scroll-mt-24">
            <h2 className="mb-6 flex items-center gap-2 text-3xl"><Flame className="size-7 text-accent" aria-hidden />Most asked</h2>
            <QaList items={popular} />
          </section>
          {FAQ_CATEGORIES.map((c) => {
            const items = FAQ.filter((f) => f.category === c.id && !f.popular);
            if (!items.length) return null;
            return (
              <section key={c.id} id={c.id} className="scroll-mt-24">
                <h2 className="text-3xl">{c.title}</h2>
                <p className="mb-6 mt-2 text-ink-2">{c.intro}</p>
                <QaList items={items} />
              </section>
            );
          })}
          <section className="rounded-card border border-line bg-surface p-6 text-sm">
            <h2 className="text-xl">Sources</h2>
            <ol className="mt-4 list-decimal space-y-1.5 pl-5">
              {FAQ_SOURCES.map((s) => <li key={s.url}><a href={s.url} rel="noopener nofollow" target="_blank" className="text-primary underline underline-offset-2">{s.label}</a></li>)}
            </ol>
            <p className="mt-4 text-xs text-muted">Last checked 4 Nov 2026 · Pending expert review</p>
          </section>
        </div>
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Topics</p>
          <ol className="space-y-2 border-l border-line text-sm">
            {[{ id: "popular", title: "Most asked" }, ...FAQ_CATEGORIES].map((c) => (
              <li key={c.id}><a href={`#${c.id}`} className="-ml-px block border-l-2 border-transparent pl-4 text-ink-2 hover:border-primary hover:text-primary">{c.title.split(":")[0]}</a></li>
            ))}
          </ol>
        </aside>
      </Container>
      <JsonLd data={graph(faqSchema(FAQ.map((f) => ({ question: f.question, answer: f.answer }))))} />
    </>
  );
}

function QaList({ items }: { items: typeof FAQ }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface shadow-card">
      {items.map((f) => (
        <article key={f.id} id={f.id} className="scroll-mt-24 px-6 py-5">
          <h3 className="font-sans text-base font-semibold text-ink">{f.question}</h3>
          <p className="mt-2 leading-relaxed text-ink-2">{f.answer}</p>
          {f.link ? <Link href={f.link} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Full answer <ArrowRight className="size-4" aria-hidden /></Link> : null}
        </article>
      ))}
    </div>
  );
}
