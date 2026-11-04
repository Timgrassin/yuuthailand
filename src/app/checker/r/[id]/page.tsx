import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy } from "@/lib/copy";
import { CheckerResults } from "@/components/blocks/checker-results";
import { LeadForm } from "@/components/blocks/lead-form";
import { Card, Container, SectionHeading } from "@/components/ui/primitives";
import { answersSchema, evaluate } from "@/lib/checker/engine";
import { getRules, getRulesVersion, getUsdRate } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { publicDb } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

type P = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> };

// Q4: recompute saved answers with current rules; flag when the rules moved.
export default async function SavedResult({ params, searchParams }: P) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const db = publicDb();
  if (!db) notFound();
  const { data: rows } = await db.rpc("get_checker_result", { p_id: id });
  const data = (rows as { answers: unknown; rules_version: number; created_at: string }[] | null)?.[0];
  if (!data) notFound();
  const parsed = answersSchema.safeParse(data.answers);
  if (!parsed.success) notFound();
  const [rules, fx, version, { saved }] = await Promise.all([getRules(), getUsdRate(), getRulesVersion(), searchParams]);
  const t = copy.checker;
  const results = evaluate(parsed.data, rules, fx.rate);
  const top = results.find((r) => r.verdict !== "unlikely")?.track;
  return (
    <Container className="py-10">
      <SectionHeading as="h1" title={t.title} intro={`${"Checked on"} ${fmtDate(data.created_at)}`} />
      {saved ? <p role="status" className="mb-4 rounded-card bg-verified-soft p-4 font-semibold text-verified">{t.saved}</p> : null}
      {version > Number(data.rules_version) ? <p role="alert" className="mb-4 rounded-card bg-accent-soft p-4 font-semibold text-accent">{t.rulesChanged}</p> : null}
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <CheckerResults results={results} labels={{ likely: t.likely, maybe: t.maybe, unlikely: t.unlikely, seeRules: t.seeRules }} />
        <Card className="self-start"><LeadForm checkerResultId={id} track={top} /></Card>
      </div>
      <p className="mt-4 text-xs text-muted">{t.disclaimer}</p>
    </Container>
  );
}
