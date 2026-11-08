import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { RelatedLinks } from "@/components/seo/related-links";
import { BankPlanner } from "@/components/tools/bank-planner";
import { CostCalculator } from "@/components/tools/cost-calculator";
import { DtvChecklist } from "@/components/tools/dtv-checklist";
import { ExemptionCalculator } from "@/components/tools/exemption";
import { NinetyDayCalculator } from "@/components/tools/ninety-day";
import { OverstayCalculator } from "@/components/tools/overstay";
import { TaxResidencyCounter } from "@/components/tools/tax-residency";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Container } from "@/components/ui/primitives";
import { COUNTRIES } from "@/content/countries";
import { getRules, latestDate } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { relatedForTool } from "@/lib/seo/related";
import { routes } from "@/lib/seo/routes";
import { graph, webAppSchema } from "@/lib/seo/schema";
import { TOOLS, getTool } from "@/lib/tools";

export const revalidate = 3600;
export const dynamicParams = false;
export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const t = getTool((await params).slug);
  if (!t) return {};
  return pageMetadata({ path: routes.tool(t.slug), title: t.metaTitle, description: t.description });
}

export default async function ToolPage({ params }: P) {
  const t = getTool((await params).slug);
  if (!t) notFound();
  const rules = await getRules();
  const n = (track: string, key: string) => rules.find((r) => r.track === track && r.key === key);
  const hold = n("retirement", "eligibility.funds_hold_days")?.value_json as { before_filing_months?: number; after_grant_months?: number; min_balance_after_thb?: number } | undefined;

  const tool = {
    "long-stay-cost-calculator": <CostCalculator rules={rules.map((r) => ({ key: r.key, track: r.track, value_num: r.value_num }))} />,
    "retirement-800k-planner": <BankPlanner beforeMonths={hold?.before_filing_months ?? 2} afterMonths={hold?.after_grant_months ?? 3} floor={hold?.min_balance_after_thb ?? 400000} amount={Number(n("retirement", "eligibility.min_funds")?.value_num ?? 800000)} />,
    "90-day-report-calculator": <NinetyDayCalculator />,
    "visa-exemption-calculator": <ExemptionCalculator />,
    "tax-residency-counter": <TaxResidencyCounter />,
    "overstay-fine-calculator": <OverstayCalculator />,
    "dtv-document-checklist": <DtvChecklist countries={COUNTRIES.map((c) => ({ slug: c.slug, name: c.name, dtv: c.dtv }))} />,
  }[t.slug];

  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Tools", path: routes.tools() }, { name: t.name, path: routes.tool(t.slug) }]} />} eyebrow="Free tool" title={t.name} lead={<AnswerBlock answer={t.answer} checkedAt={latestDate(rules)} />} />
      <Container className="py-12">{tool}</Container>
      <Container className="max-w-4xl pb-8">
        <Faq title="Questions about this tool" items={t.faqs} />
      </Container>
      <RelatedLinks groups={relatedForTool(t.slug)} />
      <CtaBand title="Which visa fits you?" body="The checker scores all eight long-stay routes against your situation." primary={{ href: routes.checker(), label: "Run the visa checker" }} secondary={{ href: routes.tools(), label: "All tools" }} />
      <JsonLd data={graph(webAppSchema({ path: routes.tool(t.slug), name: t.name, description: t.description }))} />
    </>
  );
}
