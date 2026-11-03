import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckerResults } from "@/components/blocks/checker-results";
import { LeadForm } from "@/components/blocks/lead-form";
import { Card, Container, SectionHeading } from "@/components/ui/primitives";
import { answersSchema, evaluate } from "@/lib/checker/engine";
import { getRules, getRulesVersion, getUsdRate } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { adminDb } from "@/lib/supabase/admin";
import type { Locale } from "@/lib/seo/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

type P = { params: Promise<{ locale: Locale; id: string }>; searchParams: Promise<{ saved?: string }> };

// Q4: recompute saved answers with current rules; flag when the rules moved.
export default async function SavedResult({ params, searchParams }: P) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const db = adminDb();
  if (!db) notFound();
  const { data } = await db.from("checker_results").select("answers, rules_version, created_at").eq("id", id).single();
  if (!data) notFound();
  const parsed = answersSchema.safeParse(data.answers);
  if (!parsed.success) notFound();
  await db.from("checker_results").update({ last_viewed_at: new Date().toISOString() }).eq("id", id);
  const [rules, fx, version, { saved }] = await Promise.all([getRules(), getUsdRate(), getRulesVersion(), searchParams]);
  const t = await getTranslations("checker");
  const results = evaluate(parsed.data, rules, fx.rate);
  const top = results.find((r) => r.verdict !== "unlikely")?.track;
  return (
    <Container className="py-10">
      <SectionHeading as="h1" title={t("title")} intro={`${locale === "th" ? "ตรวจเมื่อ" : "Checked on"} ${fmtDate(data.created_at, locale)}`} />
      {saved ? <p role="status" className="mb-4 rounded-card bg-verified-soft p-4 font-semibold text-verified">{t("saved")}</p> : null}
      {version > Number(data.rules_version) ? <p role="alert" className="mb-4 rounded-card bg-accent-soft p-4 font-semibold text-accent">{t("rulesChanged")}</p> : null}
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <CheckerResults results={results} locale={locale} labels={{ likely: t("likely"), maybe: t("maybe"), unlikely: t("unlikely"), seeRules: t("seeRules") }} />
        <Card className="self-start"><LeadForm locale={locale} checkerResultId={id} track={top} /></Card>
      </div>
      <p className="mt-4 text-xs text-muted">{t("disclaimer")}</p>
    </Container>
  );
}
