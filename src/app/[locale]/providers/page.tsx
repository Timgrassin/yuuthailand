import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProviderCard } from "@/components/blocks/provider-card";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, EmptyState, SectionHeading } from "@/components/ui/primitives";
import { getCities, getPrograms, getProviders } from "@/lib/data";
import { pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, itemListSchema } from "@/lib/seo/schema";
import type { Locale } from "@/lib/seo/site";
import { TRACKS, trackName } from "@/lib/tracks";

export const dynamic = "force-dynamic";

type P = { params: Promise<{ locale: Locale }>; searchParams: Promise<{ city?: string; track?: string; q?: string }> };

export async function generateMetadata({ params, searchParams }: P): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  return pageMetadata({
    locale,
    path: routes.providers(),
    title: pick(locale, "Verified visa schools and providers in Thailand", "โรงเรียนและผู้ให้บริการวีซ่าในไทยที่ผ่านการตรวจสอบ"),
    description: pick(locale, "Language schools, Muay Thai camps and visa providers in Thailand with a verification status and the date we last checked.", "โรงเรียนสอนภาษา ค่ายมวยไทย และผู้ให้บริการวีซ่าในไทย พร้อมสถานะการตรวจสอบและวันที่ตรวจล่าสุด"),
    // Filtered views are duplicates of city pages: keep them out of the index.
    noindex: Boolean(sp.city || sp.track || sp.q),
  });
}

export default async function ProvidersPage({ params, searchParams }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { city, track, q } = await searchParams;
  const [all, cities, programs] = await Promise.all([getProviders({ city }), getCities(), track ? getPrograms({ track }) : Promise.resolve([])]);
  const withTrack = track ? new Set(programs.map((g) => g.provider_id)) : null;
  const needle = q?.trim().toLowerCase();
  const list = all.filter((p) => (!withTrack || withTrack.has(p.id)) && (!needle || `${p.name_en} ${p.name_th ?? ""} ${p.ref_code}`.toLowerCase().includes(needle)));

  return (
    <Container className="py-10">
      <Breadcrumbs locale={locale} items={[{ name: "Yuu", path: "/" }, { name: pick(locale, "Providers", "ผู้ให้บริการ"), path: routes.providers() }]} />
      <SectionHeading as="h1" title={pick(locale, "Visa schools and providers in Thailand", "โรงเรียนและผู้ให้บริการวีซ่าในไทย")} />
      <AnswerBlock locale={locale} answer={pick(locale, "Every provider on Yuu carries a status: Verified means we checked its licence, address and visa support documents. Contacted means checks are in progress. Unverified means listed from public records only. Each card shows the date of our last check.", "ผู้ให้บริการทุกรายบน Yuu มีสถานะ: ตรวจสอบแล้ว หมายถึงเราตรวจใบอนุญาต ที่อยู่ และเอกสารรองรับวีซ่าแล้ว ติดต่อแล้ว หมายถึงกำลังตรวจสอบ ยังไม่ตรวจสอบ หมายถึงข้อมูลจากแหล่งสาธารณะเท่านั้น")} />

      <form className="mt-8 grid gap-3 rounded-card border border-line bg-surface p-4 sm:grid-cols-4" role="search">
        <label className="flex flex-col text-sm font-semibold">{pick(locale, "City", "เมือง")}
          <select name="city" defaultValue={city ?? ""} className="mt-1 h-11 rounded-sm border border-line bg-bg px-3 font-normal">
            <option value="">{pick(locale, "All cities", "ทุกเมือง")}</option>
            {cities.map((c) => <option key={c.id} value={c.slug}>{pick(locale, c.name_en, c.name_th)}</option>)}
          </select>
        </label>
        <label className="flex flex-col text-sm font-semibold">{pick(locale, "Visa type", "ประเภทวีซ่า")}
          <select name="track" defaultValue={track ?? ""} className="mt-1 h-11 rounded-sm border border-line bg-bg px-3 font-normal">
            <option value="">{pick(locale, "All", "ทั้งหมด")}</option>
            {TRACKS.map((t) => <option key={t} value={t}>{trackName(t, locale, true)}</option>)}
          </select>
        </label>
        <label className="flex flex-col text-sm font-semibold">{pick(locale, "Name or ref", "ชื่อหรือรหัส")}
          <input name="q" defaultValue={q ?? ""} className="mt-1 h-11 rounded-sm border border-line bg-bg px-3 font-normal" />
        </label>
        <button className="h-11 self-end rounded-full bg-primary px-5 font-semibold text-primary-ink">{pick(locale, "Filter", "กรอง")}</button>
      </form>

      <div className="mt-8">
        {list.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProviderCard key={p.id} p={p} locale={locale} />)}</div>
        ) : (
          <EmptyState>{pick(locale, "No providers match yet. We add and verify providers every week.", "ยังไม่มีผู้ให้บริการที่ตรงเงื่อนไข เราเพิ่มและตรวจสอบผู้ให้บริการทุกสัปดาห์")}</EmptyState>
        )}
      </div>
      {list.length ? <JsonLd data={graph(itemListSchema(pick(locale, "Visa providers in Thailand", "ผู้ให้บริการวีซ่าในไทย"), list.map((p) => ({ name: p.name_en, path: routes.provider(p.slug) })), locale))} /> : null}
    </Container>
  );
}
