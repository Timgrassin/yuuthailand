import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, Container, EmptyState, SectionHeading } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import { getEmbassies } from "@/lib/data";
import { pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import type { Locale } from "@/lib/seo/site";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: routes.embassies(), title: pick(locale, "Thai embassies and consulates for long-stay visas", "สถานทูตและสถานกงสุลไทยสำหรับวีซ่าพำนักระยะยาว"), description: pick(locale, "Where to apply for a Thai long-stay visa, by country, with e-visa support noted.", "สถานที่ยื่นขอวีซ่าพำนักระยะยาวของไทยแยกตามประเทศ พร้อมระบุการรองรับ e-Visa") });
}

export default async function EmbassiesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const embassies = await getEmbassies();
  const byCountry = embassies.reduce<Record<string, typeof embassies>>((m, e) => ((m[e.country_code] ??= []).push(e), m), {});
  const dn = new Intl.DisplayNames([locale], { type: "region" });
  return (
    <Container className="py-10">
      <Breadcrumbs locale={locale} items={[{ name: "Yuu", path: "/" }, { name: pick(locale, "Embassies", "สถานทูต"), path: routes.embassies() }]} />
      <SectionHeading as="h1" title={pick(locale, "Thai embassies and consulates", "สถานทูตและสถานกงสุลไทย")} />
      <AnswerBlock locale={locale} answer={pick(locale, "Most long-stay visas are applied for at the Thai embassy or consulate covering your country, usually through the thaievisa.go.th e-visa portal. From 31 August 2026 DTV applicants must apply in their country of nationality or permanent residence.", "วีซ่าพำนักระยะยาวส่วนใหญ่ยื่นที่สถานทูตหรือสถานกงสุลไทยที่ดูแลประเทศของคุณ โดยมากผ่านระบบ thaievisa.go.th ตั้งแต่ 31 สิงหาคม 2569 ผู้ขอ DTV ต้องยื่นในประเทศที่ถือสัญชาติหรือมีถิ่นพำนักถาวร")} sources={[{ label: "thaievisa.go.th", url: "https://www.thaievisa.go.th" }]} />
      <div className="mt-8">
        {embassies.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(byCountry).map(([cc, list]) => (
              <Card key={cc}>
                <h2 className="font-bold">{dn.of(cc) ?? cc}</h2>
                <ul className="mt-2 space-y-1 text-sm">{list.map((e) => <li key={e.id}><Link href={routes.embassy(e.slug)} className="text-primary underline">{pick(locale, e.name_en, e.name_th)}</Link> · {e.city}</li>)}</ul>
              </Card>
            ))}
          </div>
        ) : <EmptyState>{pick(locale, "The embassy directory is being compiled. Use thaievisa.go.th to find your mission.", "กำลังรวบรวมรายชื่อสถานทูต ใช้ thaievisa.go.th เพื่อค้นหาสถานทูตของคุณ")}</EmptyState>}
      </div>
    </Container>
  );
}
