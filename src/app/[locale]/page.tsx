import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Link } from "@/i18n/navigation";
import { Badge, Button, Card, Container, SectionHeading } from "@/components/ui/primitives";
import { getCities, getProviders, getRuleChanges, getRules } from "@/lib/data";
import { fmtDate, pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import type { Locale } from "@/lib/seo/site";
import { TRACKS, TRACK_INFO, trackName } from "@/lib/tracks";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/",
    // Thai headline needs a native speaker check (CLAUDE.md Open).
    title: pick(locale, "Yuu: Verified long-stay visa schools and rules in Thailand", "Yuu: โรงเรียนและกฎวีซ่าพำนักระยะยาวในไทยที่ผ่านการตรวจสอบ"),
    description: pick(locale, "Check which Thai long-stay visa fits you and find verified schools and providers. Every rule is dated and sourced.", "ตรวจสอบว่าวีซ่าพำนักระยะยาวแบบไหนเหมาะกับคุณ และค้นหาโรงเรียนที่ผ่านการตรวจสอบ ทุกกฎระบุวันที่และแหล่งที่มา"),
  });
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [providers, cities, changes, rules] = await Promise.all([getProviders({ status: "verified" }), getCities(), getRuleChanges(5), getRules()]);
  const lastRuleUpdate = rules.map((r) => r.updated_at).sort().at(-1);

  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <Badge tone="neutral">{pick(locale, "Rules checked against official sources", "ตรวจกฎกับแหล่งข้อมูลทางการ")}</Badge>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {pick(locale, "Stay longer in Thailand. Know the rules. Pick a provider you can trust.", "อยู่ไทยได้นานขึ้น รู้กฎชัดเจน เลือกผู้ให้บริการที่ไว้ใจได้")}
          </h1>
          <div className="mt-6 max-w-2xl text-lg text-muted">
            <AnswerBlock
              locale={locale}
              answer={pick(
                locale,
                "Yuu compares Thailand's eight long-stay visa routes, from the DTV to retirement and LTR, against current rules with official sources and dates. It lists schools and providers with a verification status and the date we last checked them.",
                "Yuu เปรียบเทียบเส้นทางวีซ่าพำนักระยะยาวของไทยทั้งแปดแบบ ตั้งแต่ DTV จนถึงวีซ่าเกษียณและ LTR กับกฎปัจจุบันพร้อมแหล่งทางการและวันที่ และแสดงรายชื่อโรงเรียนและผู้ให้บริการพร้อมสถานะการตรวจสอบและวันที่ตรวจล่าสุด",
              )}
              checkedAt={lastRuleUpdate}
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href={routes.checker()}>{pick(locale, "Check my visa options", "ตรวจสอบตัวเลือกวีซ่าของฉัน")}</Link></Button>
            <Button asChild size="lg" variant="secondary"><Link href={routes.providers()}>{pick(locale, "Browse verified providers", "ดูผู้ให้บริการที่ผ่านการตรวจสอบ")}</Link></Button>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <SectionHeading title={pick(locale, "Thailand long-stay visas compared", "เปรียบเทียบวีซ่าพำนักระยะยาวของไทย")} intro={pick(locale, "Eight routes. Each page shows the money, age and paperwork tests with a source on every line.", "แปดเส้นทาง แต่ละหน้าแสดงเกณฑ์เงิน อายุ และเอกสาร พร้อมแหล่งที่มาทุกบรรทัด")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRACKS.map((t) => (
            <Link key={t} href={routes.rule(TRACK_INFO[t].slug)} className="group">
              <Card className="h-full transition-colors group-hover:border-primary">
                <h3 className="font-bold">{trackName(t, locale)}</h3>
                <p className="mt-2 text-sm text-muted">{pick(locale, TRACK_INFO[t].descEn, TRACK_INFO[t].descTh)}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="pb-14">
        <SectionHeading title={pick(locale, "Verified providers", "ผู้ให้บริการที่ผ่านการตรวจสอบ")} intro={pick(locale, "We call, visit and check documents before a provider gets the Verified badge.", "เราโทร เยี่ยมชม และตรวจเอกสารก่อนให้ป้ายตรวจสอบแล้ว")} />
        {providers.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providers.slice(0, 6).map((p) => (
              <Link key={p.id} href={routes.provider(p.slug)}><Card className="h-full hover:border-primary"><p className="font-bold">{pick(locale, p.name_en, p.name_th)}</p><p className="text-sm text-muted">{pick(locale, p.city_name_en, p.city_name_th)}</p></Card></Link>
            ))}
          </div>
        ) : (
          <Card className="text-muted">{pick(locale, "The first verified providers are being checked now. Browse by city below.", "ผู้ให้บริการกลุ่มแรกกำลังอยู่ระหว่างการตรวจสอบ ดูตามเมืองด้านล่าง")}</Card>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          {cities.map((c) => (
            <Link key={c.id} href={routes.city(c.slug)} className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm hover:border-primary">{pick(locale, c.name_en, c.name_th)}</Link>
          ))}
        </div>
      </Container>

      <Container className="pb-6">
        <SectionHeading title={pick(locale, "Latest rule changes", "การเปลี่ยนแปลงกฎล่าสุด")} />
        <ul className="divide-y divide-line rounded-card border border-line bg-surface">
          {changes.map((c) => (
            <li key={c.id} className="flex flex-wrap justify-between gap-2 p-4 text-sm">
              <span><strong>{trackName(c.track, locale, true)}</strong>: {pick(locale, c.summary_en ?? c.rule_key, c.summary_th)}</span>
              <time dateTime={c.changed_at} className="text-muted">{fmtDate(c.changed_at, locale)}</time>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm"><Link href={routes.ruleChanges()} className="text-primary underline">{pick(locale, "Full change log", "บันทึกการเปลี่ยนแปลงทั้งหมด")}</Link></p>
      </Container>
    </>
  );
}
