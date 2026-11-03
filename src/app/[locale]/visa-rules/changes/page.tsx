import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, EmptyState, SectionHeading } from "@/components/ui/primitives";
import { getRuleChanges } from "@/lib/data";
import { fmtDate, pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import type { Locale } from "@/lib/seo/site";
import { trackName } from "@/lib/tracks";

export const revalidate = 900;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: routes.ruleChanges(),
    title: pick(locale, "Thailand visa rule changes log", "บันทึกการเปลี่ยนแปลงกฎวีซ่าไทย"),
    description: pick(locale, "Every change to Thailand long-stay visa rules tracked by Yuu, dated, with RSS.", "ทุกการเปลี่ยนแปลงกฎวีซ่าพำนักระยะยาวของไทยที่ Yuu ติดตาม พร้อมวันที่และ RSS"),
  });
}

export default async function ChangesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const changes = await getRuleChanges(200);
  return (
    <Container className="py-10">
      <Breadcrumbs locale={locale} items={[{ name: "Yuu", path: "/" }, { name: pick(locale, "Visa rules", "กฎวีซ่า"), path: routes.rules() }, { name: pick(locale, "Change log", "บันทึกการเปลี่ยนแปลง"), path: routes.ruleChanges() }]} />
      <SectionHeading as="h1" title={pick(locale, "Visa rule change log", "บันทึกการเปลี่ยนแปลงกฎวีซ่า")} />
      <AnswerBlock locale={locale} answer={pick(locale, "Every time a rule in Yuu changes, the change is logged here with the date. Saved checker results compare against this log and tell you when the rules moved since you checked.", "ทุกครั้งที่กฎใน Yuu เปลี่ยน จะบันทึกไว้ที่นี่พร้อมวันที่ ผลการตรวจที่บันทึกไว้จะเทียบกับบันทึกนี้และแจ้งเมื่อกฎเปลี่ยนหลังจากที่คุณตรวจ")} checkedAt={changes[0]?.changed_at} />
      <p className="mt-3 text-sm"><a className="text-primary underline" href="/feeds/rule-changes.xml">RSS</a></p>
      {changes.length ? (
        <ol className="mt-8 divide-y divide-line rounded-card border border-line bg-surface">
          {changes.map((c) => (
            <li key={c.id} id={`change-${c.id}`} className="grid gap-1 p-4 text-sm sm:grid-cols-[10rem_1fr]">
              <time dateTime={c.changed_at} className="text-muted">{fmtDate(c.changed_at, locale)}</time>
              <span><strong>{trackName(c.track, locale, true)}</strong> · {pick(locale, c.summary_en ?? `${c.rule_key} ${c.action}`, c.summary_th)} <code className="text-xs text-muted">{c.rule_key}</code></span>
            </li>
          ))}
        </ol>
      ) : <div className="mt-8"><EmptyState>{pick(locale, "No changes logged yet.", "ยังไม่มีการเปลี่ยนแปลง")}</EmptyState></div>}
    </Container>
  );
}
