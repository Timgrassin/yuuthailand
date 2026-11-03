import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AnswerBlock } from "@/components/seo/answer-block";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import { pick } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import type { Locale } from "@/lib/seo/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: routes.methodology(), title: pick(locale, "How Yuu verifies visa schools and providers", "Yuu ตรวจสอบโรงเรียนและผู้ให้บริการวีซ่าอย่างไร"), description: pick(locale, "What each status means, what we check, how often, and how partners are kept separate from verification.", "ความหมายของแต่ละสถานะ สิ่งที่เราตรวจ ความถี่ และการแยกพาร์ทเนอร์ออกจากการตรวจสอบ") });
}

const STEPS: [string, string][] = [
  ["Licence: we match the provider against its Ministry of Education or Department of Business Development registration.", "ใบอนุญาต: เราตรวจผู้ให้บริการกับทะเบียนกระทรวงศึกษาธิการหรือกรมพัฒนาธุรกิจการค้า"],
  ["Address: we confirm the premises exist and operate at the listed address.", "ที่อยู่: เรายืนยันว่าสถานที่มีอยู่จริงและเปิดดำเนินการตามที่อยู่ที่ระบุ"],
  ["Visa support: we check the provider can issue the documents the visa needs, such as an enrolment letter and school approval letter.", "การรองรับวีซ่า: เราตรวจว่าผู้ให้บริการออกเอกสารที่วีซ่าต้องใช้ได้ เช่น หนังสือตอบรับและหนังสืออนุมัติโรงเรียน"],
  ["Prices: we record published prices in THB and the date we saw them.", "ราคา: เราบันทึกราคาที่เผยแพร่เป็นบาทและวันที่เราพบ"],
  ["Re-check: we re-check verified providers at least every six months and after any complaint.", "ตรวจซ้ำ: เราตรวจผู้ให้บริการที่ผ่านการตรวจสอบซ้ำอย่างน้อยทุกหกเดือนและหลังมีข้อร้องเรียน"],
];

export default async function MethodPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Container className="max-w-3xl py-10">
      <Breadcrumbs locale={locale} items={[{ name: "Yuu", path: "/" }, { name: pick(locale, "How we verify", "วิธีการตรวจสอบ"), path: routes.methodology() }]} />
      <SectionHeading as="h1" title={pick(locale, "How Yuu verifies providers", "Yuu ตรวจสอบผู้ให้บริการอย่างไร")} />
      <AnswerBlock locale={locale} answer={pick(locale, "Yuu gives a provider the Verified status only after checking its licence, address, visa support documents and prices. Verification cannot be bought. Partner is a separate commercial label, shown only while a provider stays Verified, and it is removed if the provider is suspended.", "Yuu ให้สถานะตรวจสอบแล้วหลังจากตรวจใบอนุญาต ที่อยู่ เอกสารรองรับวีซ่า และราคาเท่านั้น การตรวจสอบซื้อไม่ได้ พาร์ทเนอร์เป็นป้ายเชิงพาณิชย์แยกต่างหาก แสดงเฉพาะเมื่อผู้ให้บริการยังผ่านการตรวจสอบ และจะถูกนำออกหากถูกระงับ")} />
      <div className="prose-yu mt-8">
        <h2>{pick(locale, "What each status means", "ความหมายของแต่ละสถานะ")}</h2>
        <ul className="!list-none !pl-0 space-y-3">
          <li><StatusBadge status="verified" /> {pick(locale, "All checks below passed. The date of the last check is on the listing.", "ผ่านการตรวจทุกข้อด้านล่าง วันที่ตรวจล่าสุดแสดงในรายการ")}</li>
          <li><StatusBadge status="contacted" /> {pick(locale, "We reached the provider and checks are in progress.", "เราติดต่อผู้ให้บริการแล้ว และกำลังตรวจสอบ")}</li>
          <li><StatusBadge status="unverified" /> {pick(locale, "Listed from public records. We have not checked it yet.", "แสดงจากข้อมูลสาธารณะ ยังไม่ได้ตรวจสอบ")}</li>
          <li><StatusBadge status="suspended" /> {pick(locale, "A check failed or a serious complaint is open. Contact details and the Partner label are hidden.", "การตรวจไม่ผ่านหรือมีข้อร้องเรียนร้ายแรง ข้อมูลติดต่อและป้ายพาร์ทเนอร์ถูกซ่อน")}</li>
        </ul>
        <h2>{pick(locale, "What we check", "สิ่งที่เราตรวจ")}</h2>
        <ol>{STEPS.map(([en, th]) => <li key={en}>{pick(locale, en, th)}</li>)}</ol>
        <h2>{pick(locale, "How visa rules are kept current", "เรารักษากฎวีซ่าให้เป็นปัจจุบันอย่างไร")}</h2>
        <p>{pick(locale, "Every rule has a value, an effective date and a link to the official source, such as the Ministry of Foreign Affairs, the Immigration Bureau or the Board of Investment. Every change is logged publicly with its date.", "ทุกกฎมีค่า วันที่มีผล และลิงก์ไปยังแหล่งทางการ เช่น กระทรวงการต่างประเทศ สำนักงานตรวจคนเข้าเมือง หรือ BOI ทุกการเปลี่ยนแปลงถูกบันทึกต่อสาธารณะพร้อมวันที่")}</p>
      </div>
    </Container>
  );
}
