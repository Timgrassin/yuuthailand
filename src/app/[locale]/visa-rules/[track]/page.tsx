import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ReviewNote } from "@/components/blocks/review-note";
import { RuleTable } from "@/components/blocks/rule-table";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Button, Card, Container, SectionHeading } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import { getPrograms, getRules, latestDate, type Rule } from "@/lib/data";
import { fmtValue, pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { articleSchema, graph } from "@/lib/seo/schema";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/seo/site";
import { TRACKS, TRACK_INFO, trackBySlug, trackName } from "@/lib/tracks";

export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => TRACKS.map((t) => ({ locale, track: TRACK_INFO[t].slug })));
}

type P = { params: Promise<{ locale: Locale; track: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, track: slug } = await params;
  const track = trackBySlug(slug);
  if (!track) return {};
  const rules = await getRules(track);
  const funds = rules.find((r) => r.key === "eligibility.min_funds");
  const year = new Date().getFullYear();
  return pageMetadata({
    locale,
    path: routes.rule(slug),
    title: pick(locale, `${trackName(track, locale)} requirements ${year}`, `เงื่อนไข ${trackName(track, locale)} ปี ${year + 543}`),
    description: pick(
      locale,
      `${TRACK_INFO[track].descEn}${funds ? ` Money test: ${fmtValue(funds, "en")}.` : ""} Fees, stay length, documents and official sources.`,
      `${TRACK_INFO[track].descTh}${funds ? ` เกณฑ์เงิน: ${fmtValue(funds, "th")}` : ""} ค่าธรรมเนียม ระยะพำนัก เอกสาร และแหล่งทางการ`,
    ),
    updatedAt: latestDate(rules),
  });
}

function faqFrom(rules: Rule[], track: string, locale: string) {
  const name = trackName(track, locale, true);
  const get = (k: string) => rules.find((r) => r.key === k);
  const out: { question: string; answer: string }[] = [];
  const add = (r: Rule | undefined, qEn: string, qTh: string) => {
    if (!r) return;
    out.push({ question: pick(locale, qEn, qTh), answer: `${fmtValue(r, locale)}. ${pick(locale, r.note_en ?? "", r.note_th ?? r.note_en ?? "")}`.trim() });
  };
  add(get("eligibility.min_funds"), `How much money do I need for the ${name} visa?`, `วีซ่า ${name} ต้องมีเงินเท่าไร`);
  add(get("eligibility.min_age"), `What is the minimum age for the ${name} visa?`, `วีซ่า ${name} ต้องอายุขั้นต่ำเท่าไร`);
  add(get("stay.per_entry_days"), `How long can I stay on the ${name} visa?`, `วีซ่า ${name} อยู่ได้นานแค่ไหน`);
  add(get("fee.visa"), `How much does the ${name} visa cost?`, `วีซ่า ${name} ค่าธรรมเนียมเท่าไร`);
  add(get("allows.work"), `Can I work on the ${name} visa?`, `วีซ่า ${name} ทำงานได้หรือไม่`);
  add(get("reporting.ninety_day"), `Do I need to do 90-day reporting on the ${name} visa?`, `วีซ่า ${name} ต้องรายงานตัว 90 วันหรือไม่`);
  return out;
}

export default async function TrackPage({ params }: P) {
  const { locale, track: slug } = await params;
  const track = trackBySlug(slug);
  if (!track) notFound();
  setRequestLocale(locale);
  const [rules, programs] = await Promise.all([getRules(track), getPrograms({ track })]);
  const suits = rules.find((r) => r.key === "summary.suits");
  const docs = rules.find((r) => r.key === "docs.required");
  const updated = latestDate(rules);
  const sources = [...new Set(rules.map((r) => r.source_url).filter(Boolean) as string[])].slice(0, 4);
  const name = trackName(track, locale);

  return (
    <Container className="py-10">
      <Breadcrumbs locale={locale} items={[{ name: "Yuu", path: "/" }, { name: pick(locale, "Visa rules", "กฎวีซ่า"), path: routes.rules() }, { name, path: routes.rule(slug) }]} />
      <SectionHeading as="h1" title={pick(locale, `${name}: requirements, fees and stay`, `${name}: เงื่อนไข ค่าธรรมเนียม และระยะพำนัก`)} />
      <AnswerBlock
        locale={locale}
        answer={`${pick(locale, TRACK_INFO[track].descEn, TRACK_INFO[track].descTh)} ${suits && typeof suits.value_json === "string" ? pick(locale, suits.value_json, null) : ""}`.trim()}
        checkedAt={updated}
        sources={sources.map((u) => ({ label: new URL(u).hostname.replace(/^www\./, ""), url: u }))}
      />
      <div className="mt-4"><ReviewNote rules={rules} locale={locale} /></div>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">{pick(locale, "Requirements", "เงื่อนไข")}</h2>
        {rules.length ? <RuleTable rules={rules} locale={locale} /> : <Card className="text-muted">{pick(locale, "Rules for this visa are being compiled.", "กำลังรวบรวมกฎของวีซ่านี้")}</Card>}
      </section>

      {docs && Array.isArray(docs.value_json) ? (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">{pick(locale, "Documents you will need", "เอกสารที่ต้องใช้")}</h2>
          <ol className="list-decimal space-y-1 pl-6">{(docs.value_json as string[]).map((d) => <li key={d}>{d}</li>)}</ol>
          {docs.note_en ? <p className="mt-2 text-sm text-muted">{pick(locale, docs.note_en, docs.note_th)}</p> : null}
        </section>
      ) : null}

      <section className="mt-10 rounded-card bg-primary-soft p-6">
        <h2 className="text-xl font-bold">{pick(locale, "Not sure this is the right visa?", "ไม่แน่ใจว่าวีซ่านี้เหมาะไหม")}</h2>
        <p className="mt-1 text-muted">{pick(locale, "Answer six questions and compare all eight routes.", "ตอบหกคำถามแล้วเปรียบเทียบทั้งแปดเส้นทาง")}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild><Link href={routes.checker()}>{pick(locale, "Run the visa checker", "ใช้เครื่องมือตรวจสอบวีซ่า")}</Link></Button>
          {track === "ed" || track === "dtv" ? <Button asChild variant="secondary"><Link href={{ pathname: routes.providers(), query: { track } }}>{pick(locale, "Find verified schools", "ค้นหาโรงเรียนที่ผ่านการตรวจสอบ")}</Link></Button> : null}
        </div>
      </section>

      {programs.length ? (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">{pick(locale, "Programs that support this visa", "หลักสูตรที่รองรับวีซ่านี้")}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {programs.slice(0, 8).map((g) => (
              <li key={g.id}><Link href={routes.provider(g.provider_slug)}><Card className="hover:border-primary"><p className="font-semibold">{pick(locale, g.name_en, g.name_th)}</p></Card></Link></li>
            ))}
          </ul>
        </section>
      ) : null}

      <Faq title={pick(locale, "Questions people ask", "คำถามที่พบบ่อย")} items={faqFrom(rules, track, locale)} />

      {updated ? (
        <JsonLd data={graph(articleSchema({ path: routes.rule(slug), headline: `${name}`, description: TRACK_INFO[track].descEn, publishedAt: rules.map((r) => r.effective_from).sort()[0] ?? updated, updatedAt: updated, authorName: "Yuu", citations: sources }, locale))} />
      ) : null}
    </Container>
  );
}
