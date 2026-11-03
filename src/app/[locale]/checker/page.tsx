import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckerForm } from "@/components/blocks/checker-form";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { getRules, getUsdRate, latestDate } from "@/lib/data";
import { pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import type { Locale } from "@/lib/seo/site";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: routes.checker(),
    title: pick(locale, "Which Thai long-stay visa do I qualify for? Free checker", "ฉันมีสิทธิ์ขอวีซ่าพำนักระยะยาวแบบไหน เครื่องมือตรวจสอบฟรี"),
    description: pick(locale, "Six questions. Compare DTV, education, retirement, LTR, Privilege, marriage and work visas against current Thai rules.", "หกคำถาม เปรียบเทียบ DTV วีซ่าการศึกษา เกษียณ LTR พริวิเลจ แต่งงาน และทำงาน กับกฎปัจจุบันของไทย"),
  });
}

export default async function CheckerPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checker");
  const [rules, fx] = await Promise.all([getRules(), getUsdRate()]);
  return (
    <Container className="py-10">
      <Breadcrumbs locale={locale} items={[{ name: "Yuu", path: "/" }, { name: t("title"), path: routes.checker() }]} />
      <SectionHeading as="h1" title={t("title")} />
      <AnswerBlock locale={locale} answer={pick(locale, "The Yuu checker compares your age, purpose, savings and income against the current thresholds for eight Thai long-stay visas. Every threshold comes from a dated rule with an official source, so a rule change updates your result.", "เครื่องมือของ Yuu เปรียบเทียบอายุ วัตถุประสงค์ เงินออม และรายได้ของคุณกับเกณฑ์ปัจจุบันของวีซ่าพำนักระยะยาวแปดแบบ ทุกเกณฑ์มาจากกฎที่ระบุวันที่และแหล่งทางการ")} checkedAt={latestDate(rules)} />
      <div className="mt-8">
        <CheckerForm locale={locale} usdRate={fx.rate} rules={rules.map((r) => ({ key: r.key, track: r.track, value_num: r.value_num, value_json: r.value_json, confidence: r.confidence }))} />
      </div>
    </Container>
  );
}
