import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, CalendarClock, ClipboardCheck, Landmark, Plane, Receipt, Timer } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, itemListSchema } from "@/lib/seo/schema";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = pageMetadata({ path: routes.tools(), title: "Free Thailand visa tools and calculators", description: "Free calculators for long stays in Thailand: visa costs, 800k bank dates, 90-day reports, visa exemption days, tax residency, overstay fines and the DTV checklist." });

const ICONS: Record<string, typeof Calculator> = {
  "long-stay-cost-calculator": Calculator, "retirement-800k-planner": Landmark, "90-day-report-calculator": CalendarClock,
  "visa-exemption-calculator": Plane, "tax-residency-counter": Timer, "overstay-fine-calculator": Receipt, "dtv-document-checklist": ClipboardCheck,
};

export default function ToolsHub() {
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Staylong", path: "/" }, { name: "Tools", path: routes.tools() }]} />} eyebrow="Free tools" title="Calculators and planners for a long stay in Thailand." lead="Built on the same dated, sourced rules as the rest of Staylong. Free, no sign-up, nothing stored unless you ask us to email you." />
      <Container className="grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <Link href={routes.checker()} className="group sm:col-span-2 lg:col-span-1">
          <Card className="flex h-full flex-col bg-primary text-primary-ink"><ClipboardCheck className="size-7 text-accent" aria-hidden /><p className="mt-5 font-display text-2xl">Visa checker</p><p className="mt-2 text-white/80">Six questions. See which of the eight long-stay visas fits you.</p><span className="mt-auto inline-flex items-center gap-1 pt-5 font-semibold">Start <ArrowRight className="size-4" aria-hidden /></span></Card>
        </Link>
        {TOOLS.map((t) => {
          const Icon = ICONS[t.slug] ?? Calculator;
          return (
            <Link key={t.slug} href={routes.tool(t.slug)} className="group">
              <Card className="flex h-full flex-col transition-all group-hover:-translate-y-0.5 group-hover:shadow-lift">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary"><Icon className="size-5" aria-hidden /></span>
                <p className="mt-5 font-display text-xl leading-snug">{t.name}</p>
                <p className="mt-2 text-sm text-ink-2">{t.short}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-primary">Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
              </Card>
            </Link>
          );
        })}
      </Container>
      <JsonLd data={graph(itemListSchema("Free Thailand visa tools", TOOLS.map((t) => ({ name: t.name, path: routes.tool(t.slug) }))))} />
    </>
  );
}
