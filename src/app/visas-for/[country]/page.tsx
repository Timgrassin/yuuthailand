import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { EmailCapture } from "@/components/blocks/email-capture";
import { CtaBand } from "@/components/marketing/cta-band";
import { KeyFacts } from "@/components/marketing/key-facts";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Card, Container } from "@/components/ui/primitives";
import { COUNTRIES, COUNTRY_SHARED_SOURCES } from "@/content/countries";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { articleSchema, graph } from "@/lib/seo/schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

type P = { params: Promise<{ country: string }> };
const get = (slug: string) => COUNTRIES.find((c) => c.slug === slug);

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = get((await params).country);
  if (!c) return {};
  return pageMetadata({
    path: routes.country(c.slug),
    title: `Thailand long-stay visas for ${c.demonym}s (2026)`,
    description: `How ${c.demonym}s apply for the DTV, retirement and other Thai long-stay visas: which mission, police certificate, income proof and visa-free days.`,
    updatedAt: c.updated,
  });
}

export default async function CountryPage({ params }: P) {
  const c = get((await params).country);
  if (!c) notFound();
  const faqs = [
    { question: `How long can ${c.demonym}s stay in Thailand without a visa?`, answer: c.exemptionDays ? `${c.exemptionDays} days on the visa exemption. ${c.exemptionNote}` : c.exemptionNote },
    { question: `Where do ${c.demonym}s apply for a DTV?`, answer: `At the Thai embassy or consulate covering your area of ${c.name}${c.usesThaiEvisa ? ", through the thaievisa.go.th e-visa portal" : ""}. Since 31 August 2026 you must apply in your country of nationality or permanent residence.` },
    { question: `Which police certificate do ${c.demonym}s need for a DTV?`, answer: `${c.dtv.policeCertificate}${c.dtv.certificateMaxAge ? ` ${c.dtv.certificateMaxAge}.` : ""}` },
    { question: `How do ${c.demonym} retirees prove income in Thailand?`, answer: c.retirement.incomeProof },
    { question: `Does ${c.name} have a tax treaty with Thailand?`, answer: c.taxTreaty === true ? `Yes. ${c.name} has a double tax agreement with Thailand. Ask a tax adviser how it applies to you.` : c.taxTreaty === false ? `No double tax agreement was found between ${c.name} and Thailand.` : "Check the Thai Revenue Department's list of double tax agreements." },
  ];
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "By nationality", path: routes.countries() }, { name: c.name, path: routes.country(c.slug) }]} />}
        eyebrow={`For ${c.demonym}s`}
        title={`Thailand long-stay visas for ${c.demonym}s`}
        lead={<AnswerBlock answer={`${c.demonym}s get ${c.exemptionDays ?? "a limited number of"} days visa-free. To stay longer, most use the DTV (apply at a Thai mission in ${c.name} with a ${c.dtv.policeCertificate.split(".")[0]}) or, at 50+, the retirement visa. ${c.retirement.incomeProof.split(".")[0]}.`} checkedAt={c.updated} sources={c.sources.slice(0, 3)} />}
      />
      <Container className="-mt-8 relative">
        <KeyFacts facts={[
          { label: "Visa-free stay", value: c.exemptionDays ? `${c.exemptionDays} days` : "Check" },
          { label: "Thai missions", value: String(c.missions.length), note: c.usesThaiEvisa ? "via thaievisa.go.th" : undefined },
          { label: "DTV fee", value: c.dtv.fee ?? "Varies", note: "local currency" },
          { label: "Tax treaty", value: c.taxTreaty === true ? "Yes" : c.taxTreaty === false ? "No" : "Check" },
        ]} />
      </Container>
      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_20rem]">
        <article className="min-w-0 space-y-14">
          {c.confidence === "low" ? <p className="flex gap-3 rounded-sm border border-accent/30 bg-accent-soft p-4 text-sm text-[#7a4b09]"><AlertTriangle className="size-5 shrink-0" aria-hidden />Some details for {c.name} are not yet confirmed by the missions. Check the linked mission pages before you apply.</p> : null}
          <section>
            <h2 className="mb-5 text-3xl">Where to apply in {c.name}</h2>
            <div className="grid gap-3 sm:grid-cols-2">{c.missions.map((m) => <a key={m.url} href={m.url} rel="noopener nofollow" target="_blank"><Card className="h-full hover:border-primary/40"><p className="font-semibold">{m.name}</p><p className="text-sm text-muted">{m.city}</p><p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Visa page <ExternalLink className="size-3.5" aria-hidden /></p></Card></a>)}</div>
          </section>
          <section>
            <h2 className="mb-5 text-3xl">DTV for {c.demonym}s</h2>
            <Card className="p-0"><dl className="divide-y divide-line text-[15px]">
              {[["Police certificate", `${c.dtv.policeCertificate}${c.dtv.certificateMaxAge ? ` ${c.dtv.certificateMaxAge}.` : ""}`], ["Proof of residence", c.dtv.residenceProof], ["Fee", c.dtv.fee ?? "Check with your mission"]].map(([k, v]) => <div key={k} className="grid gap-1 px-6 py-4 sm:grid-cols-[12rem_1fr]"><dt className="font-semibold">{k}</dt><dd className="text-ink-2">{v}</dd></div>)}
            </dl></Card>
            {c.dtv.quirks.length ? <ul className="mt-5 space-y-2 text-ink-2">{c.dtv.quirks.map((q) => <li key={q} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-2" />{q}</li>)}</ul> : null}
            <p className="mt-5 text-sm"><Link href={routes.tool("dtv-document-checklist")} className="font-semibold text-primary underline">Build your DTV checklist for {c.name}</Link> · <Link href={routes.rule("dtv")} className="text-primary underline">Full DTV rules</Link></p>
          </section>
          <section>
            <h2 className="mb-5 text-3xl">Retiring in Thailand as a {c.demonym}</h2>
            <p className="text-ink-2">{c.retirement.incomeProof}</p>
            {c.retirement.notes.length ? <ul className="mt-4 space-y-2 text-ink-2">{c.retirement.notes.map((q) => <li key={q} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-2" />{q}</li>)}</ul> : null}
            <p className="mt-5 text-sm"><Link href={routes.rule("retirement-visa")} className="text-primary underline">Retirement visa rules</Link> · <Link href={routes.tool("retirement-800k-planner")} className="text-primary underline">800k bank planner</Link></p>
          </section>
          {c.notes.length ? (
            <section>
              <h2 className="mb-5 text-3xl">What {c.demonym}s often run into</h2>
              <ul className="space-y-3">{c.notes.map((q) => <li key={q} className="rounded-sm border border-line bg-surface p-4 text-ink-2">{q}</li>)}</ul>
            </section>
          ) : null}
          <Faq title={`Questions from ${c.demonym}s`} items={faqs} />
          <section className="rounded-card border border-line bg-surface p-6 text-sm">
            <h2 className="text-xl">Sources</h2>
            <ol className="mt-4 list-decimal space-y-1.5 pl-5">{[...c.sources, ...COUNTRY_SHARED_SOURCES].map((s) => <li key={s.url}><a href={s.url} rel="noopener nofollow" target="_blank" className="text-primary underline underline-offset-2">{s.label}</a></li>)}</ol>
          </section>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <EmailCapture title={`Rule alerts for ${c.demonym}s`} body={`Get an email when the rules for ${c.demonym} applicants change.`} leadMagnet={`country_${c.slug}`} button="Alert me" meta={{ country: c.slug }} />
        </aside>
      </Container>
      <CtaBand title="Which visa fits you?" body="Six questions, checked against current rules." primary={{ href: routes.checker(), label: "Run the visa checker" }} />
      <JsonLd data={graph(articleSchema({ path: routes.country(c.slug), headline: `Thailand long-stay visas for ${c.demonym}s`, description: `Long-stay visa guidance for ${c.demonym}s`, publishedAt: c.updated, updatedAt: c.updated, authorName: "Staylong", citations: c.sources.map((s) => s.url) }))} />
    </>
  );
}
