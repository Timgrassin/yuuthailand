import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { copy } from "@/lib/copy";
import { CheckerForm } from "@/components/blocks/checker-form";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { getRules, getUsdRate, latestDate } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: routes.checker(),
    title: "Which Thai long-stay visa do I qualify for? Free checker",
    description: "Six questions. Compare DTV, education, retirement, LTR, Privilege, marriage and work visas against current Thai rules.",
  });
}

export default async function CheckerPage() {
  const t = copy.checker;
  const [rules, fx] = await Promise.all([getRules(), getUsdRate()]);
  return (
    <>
    <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: t.title, path: routes.checker() }]} />} eyebrow="Free tool" title={t.title} lead={<AnswerBlock answer={"The Staylong checker compares your age, purpose, savings and income against the current thresholds for eight Thai long-stay visas. Every threshold comes from a dated rule with an official source, so a rule change updates your result."} checkedAt={latestDate(rules)} />} />
    <Container className="py-12">
      <div className="mt-8">
        <CheckerForm usdRate={fx.rate} rules={rules.map((r) => ({ key: r.key, track: r.track, value_num: r.value_num, value_json: r.value_json, confidence: r.confidence }))} />
      </div>
    </Container>
    </>
  );
}
