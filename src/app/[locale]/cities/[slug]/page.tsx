import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProviderCard } from "@/components/blocks/provider-card";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, EmptyState, SectionHeading } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import { getCities, getCity, getProviders } from "@/lib/data";
import { pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { graph, itemListSchema } from "@/lib/seo/schema";
import type { Locale } from "@/lib/seo/site";
import { routing } from "@/i18n/routing";
import { TRACK_INFO, trackName } from "@/lib/tracks";

export const revalidate = 3600;

export async function generateStaticParams() {
  const cities = await getCities();
  return routing.locales.flatMap((locale) => cities.map((c) => ({ locale, slug: c.slug })));
}

type P = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = await getCity(slug);
  if (!c) return {};
  const providers = await getProviders({ city: slug });
  const name = pick(locale, c.name_en, c.name_th);
  return pageMetadata({
    locale,
    path: routes.city(slug),
    title: pick(locale, `Visa schools and long-stay providers in ${name}`, `โรงเรียนและผู้ให้บริการวีซ่าพำนักระยะยาวใน${name}`),
    description: pick(locale, `${providers.length} schools and providers in ${name} with verification status, programs and prices.`, `โรงเรียนและผู้ให้บริการ ${providers.length} รายใน${name} พร้อมสถานะการตรวจสอบ หลักสูตร และราคา`),
    // docs/seo.md: thin city pages stay out of the index until 3 verified providers.
    noindex: providers.filter((p) => p.status === "verified").length < 3,
  });
}

export default async function CityPage({ params }: P) {
  const { locale, slug } = await params;
  const c = await getCity(slug);
  if (!c) notFound();
  setRequestLocale(locale);
  const providers = await getProviders({ city: slug });
  const verified = providers.filter((p) => p.status === "verified").length;
  const name = pick(locale, c.name_en, c.name_th);
  return (
    <Container className="py-10">
      <Breadcrumbs locale={locale} items={[{ name: "Yuu", path: "/" }, { name: pick(locale, "Providers", "ผู้ให้บริการ"), path: routes.providers() }, { name, path: routes.city(slug) }]} />
      <SectionHeading as="h1" title={pick(locale, `Long-stay visa schools and providers in ${name}`, `โรงเรียนและผู้ให้บริการวีซ่าพำนักระยะยาวใน${name}`)} />
      <AnswerBlock locale={locale} answer={pick(locale, `Yuu lists ${providers.length} providers in ${name}, ${verified} of them verified. Each listing shows its visa programs, prices in THB and the date Yuu last checked it.`, `Yuu แสดงผู้ให้บริการ ${providers.length} รายใน${name} ผ่านการตรวจสอบแล้ว ${verified} ราย แต่ละรายการแสดงหลักสูตรวีซ่า ราคาเป็นบาท และวันที่ Yuu ตรวจล่าสุด`)} />
      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        {(["ed", "dtv", "retirement"] as const).map((t) => (
          <Link key={t} href={routes.rule(TRACK_INFO[t].slug)} className="rounded-full border border-line bg-surface px-3 py-1 hover:border-primary">{trackName(t, locale)}</Link>
        ))}
      </div>
      <div className="mt-8">
        {providers.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{providers.map((p) => <ProviderCard key={p.id} p={p} locale={locale} />)}</div> : <EmptyState>{pick(locale, `We are checking providers in ${name} now.`, `เรากำลังตรวจสอบผู้ให้บริการใน${name}`)}</EmptyState>}
      </div>
      {providers.length ? <JsonLd data={graph(itemListSchema(name, providers.map((p) => ({ name: p.name_en, path: routes.provider(p.slug) })), locale))} /> : null}
    </Container>
  );
}
