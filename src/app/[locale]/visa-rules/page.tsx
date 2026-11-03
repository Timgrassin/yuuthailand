import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ReviewNote } from "@/components/blocks/review-note";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import { getRules, latestDate, type Rule } from "@/lib/data";
import { fmtValue, pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, itemListSchema } from "@/lib/seo/schema";
import type { Locale } from "@/lib/seo/site";
import { TRACKS, TRACK_INFO, trackName } from "@/lib/tracks";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: routes.rules(),
    title: pick(locale, "Thailand long-stay visa rules compared (2026)", "เปรียบเทียบกฎวีซ่าพำนักระยะยาวของไทย (2026)"),
    description: pick(locale, "DTV, education, retirement, O-A, LTR, Privilege, marriage and work visas side by side: money, age, fees and stay length, each with an official source.", "เปรียบเทียบ DTV วีซ่าการศึกษา เกษียณ O-A LTR พริวิเลจ แต่งงาน และทำงาน: เงิน อายุ ค่าธรรมเนียม และระยะพำนัก พร้อมแหล่งทางการ"),
  });
}

const COLS = [
  { key: "eligibility.min_age", en: "Min age", th: "อายุขั้นต่ำ" },
  { key: "eligibility.min_funds", en: "Money test", th: "เกณฑ์เงิน" },
  { key: "fee.visa", en: "Visa fee", th: "ค่าวีซ่า" },
  { key: "stay.per_entry_days", en: "Stay per entry", th: "พำนักต่อครั้ง" },
  { key: "allows.work", en: "Can work", th: "ทำงานได้" },
];

function cell(rules: Rule[], track: string, key: string, locale: string): string {
  const r = rules.find((x) => x.track === track && x.key === key);
  if (r) return fmtValue(r, locale);
  if (key === "eligibility.min_funds") {
    const alt = rules.find((x) => x.track === track && (x.key.startsWith("eligibility.min_income") || x.key.startsWith("eligibility.min_assets") || x.key.startsWith("fee.membership")) && x.value_num != null);
    if (alt) return `${pick(locale, alt.label_en, alt.label_th)}: ${fmtValue(alt, locale)}`;
  }
  if (key === "fee.visa") {
    const fees = rules.filter((x) => x.track === track && x.key.startsWith("fee.membership.") && x.value_num != null);
    if (fees.length) return `${pick(locale, "from", "เริ่มต้น")} ${fmtValue(fees.sort((a, b) => Number(a.value_num) - Number(b.value_num))[0], locale)}`;
  }
  return "–";
}

export default async function RulesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const rules = await getRules();
  return (
    <Container className="py-10">
      <Breadcrumbs locale={locale} items={[{ name: "Yuu", path: "/" }, { name: pick(locale, "Visa rules", "กฎวีซ่า"), path: routes.rules() }]} />
      <SectionHeading as="h1" title={pick(locale, "Thailand long-stay visa rules compared", "เปรียบเทียบกฎวีซ่าพำนักระยะยาวของไทย")} />
      <AnswerBlock
        locale={locale}
        answer={pick(locale, "Thailand has eight main long-stay routes. The DTV needs 500,000 THB and suits remote workers. Retirement needs age 50 and 800,000 THB or 65,000 THB a month. LTR needs high income or assets. Privilege needs only a membership fee. Each route below links to its full rules and sources.", "ไทยมีเส้นทางพำนักระยะยาวหลักแปดแบบ DTV ต้องมีเงิน 500,000 บาทและเหมาะกับคนทำงานทางไกล วีซ่าเกษียณต้องอายุ 50 ปีและมีเงิน 800,000 บาทหรือรายได้ 65,000 บาทต่อเดือน LTR ต้องมีรายได้หรือทรัพย์สินสูง พริวิเลจต้องจ่ายค่าสมาชิกเท่านั้น")}
        checkedAt={latestDate(rules)}
      />
      <div className="mt-4"><ReviewNote rules={rules} locale={locale} /></div>
      <div className="mt-8 overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-primary-soft text-primary">
            <tr>
              <th scope="col" className="p-3">{pick(locale, "Visa", "วีซ่า")}</th>
              {COLS.map((c) => <th key={c.key} scope="col" className="p-3">{pick(locale, c.en, c.th)}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {TRACKS.map((t) => (
              <tr key={t} className="align-top">
                <th scope="row" className="p-3"><Link href={routes.rule(TRACK_INFO[t].slug)} className="font-semibold text-primary underline">{trackName(t, locale)}</Link></th>
                {COLS.map((c) => <td key={c.key} className="p-3">{cell(rules, t, c.key, locale)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm"><Link href={routes.ruleChanges()} className="text-primary underline">{pick(locale, "See every rule change, dated", "ดูการเปลี่ยนแปลงกฎทั้งหมดพร้อมวันที่")}</Link></p>
      <JsonLd data={graph(itemListSchema(pick(locale, "Thailand long-stay visas", "วีซ่าพำนักระยะยาวของไทย"), TRACKS.map((t) => ({ name: trackName(t, locale), path: routes.rule(TRACK_INFO[t].slug) })), locale))} />
    </Container>
  );
}
