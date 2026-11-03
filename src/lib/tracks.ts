// Long-stay visa tracks. Keys match rules.track and programs.track.
export const TRACKS = ["dtv", "ed", "retirement", "retirement_oa", "ltr", "privilege", "marriage", "work"] as const;
export type Track = (typeof TRACKS)[number];

type TrackInfo = { slug: string; en: string; th: string; shortEn: string; shortTh: string; descEn: string; descTh: string };

export const TRACK_INFO: Record<Track, TrackInfo> = {
  dtv: { slug: "dtv", en: "Destination Thailand Visa (DTV)", th: "วีซ่า Destination Thailand (DTV)", shortEn: "DTV", shortTh: "DTV", descEn: "5-year visa for remote workers and soft-power activities such as Muay Thai.", descTh: "วีซ่า 5 ปีสำหรับคนทำงานทางไกลและกิจกรรม Soft Power เช่น มวยไทย" },
  ed: { slug: "education-visa", en: "Education visa (Non-ED)", th: "วีซ่าการศึกษา (Non-ED)", shortEn: "Education", shortTh: "การศึกษา", descEn: "For students at approved language schools, universities and accredited courses.", descTh: "สำหรับนักเรียนในโรงเรียนสอนภาษา มหาวิทยาลัย และหลักสูตรที่ได้รับการรับรอง" },
  retirement: { slug: "retirement-visa", en: "Retirement visa (Non-O)", th: "วีซ่าเกษียณ (Non-O)", shortEn: "Retirement", shortTh: "เกษียณ", descEn: "Yearly extension for people aged 50+ with 800,000 THB or 65,000 THB monthly income.", descTh: "ต่ออายุรายปีสำหรับผู้มีอายุ 50 ปีขึ้นไป มีเงิน 800,000 บาท หรือรายได้ 65,000 บาทต่อเดือน" },
  retirement_oa: { slug: "o-a-visa", en: "Long-stay retirement visa (O-A)", th: "วีซ่าพำนักระยะยาว (O-A)", shortEn: "O-A", shortTh: "O-A", descEn: "One-year retirement visa applied for abroad, with health insurance.", descTh: "วีซ่าเกษียณหนึ่งปีที่ยื่นจากต่างประเทศ พร้อมประกันสุขภาพ" },
  ltr: { slug: "ltr-visa", en: "Long-Term Resident visa (LTR)", th: "วีซ่าผู้พำนักระยะยาว (LTR)", shortEn: "LTR", shortTh: "LTR", descEn: "10-year BOI visa for high earners, wealthy pensioners, investors and skilled professionals.", descTh: "วีซ่า 10 ปีจาก BOI สำหรับผู้มีรายได้สูง ผู้เกษียณที่มีฐานะ นักลงทุน และผู้เชี่ยวชาญ" },
  privilege: { slug: "thailand-privilege", en: "Thailand Privilege (Elite)", th: "ไทยแลนด์ พริวิเลจ (อีลิท)", shortEn: "Privilege", shortTh: "พริวิเลจ", descEn: "Paid membership visa from 5 to 20 years, no income or age test.", descTh: "วีซ่าแบบสมาชิก 5 ถึง 20 ปี ไม่มีเกณฑ์รายได้หรืออายุ" },
  marriage: { slug: "marriage-visa", en: "Marriage visa (Non-O)", th: "วีซ่าแต่งงาน (Non-O)", shortEn: "Marriage", shortTh: "แต่งงาน", descEn: "Yearly extension for people married to a Thai national.", descTh: "ต่ออายุรายปีสำหรับผู้ที่สมรสกับคนไทย" },
  work: { slug: "work-visa", en: "Work visa (Non-B)", th: "วีซ่าทำงาน (Non-B)", shortEn: "Work", shortTh: "ทำงาน", descEn: "For people hired by a Thai company, with a work permit.", descTh: "สำหรับผู้ที่ได้รับการจ้างงานจากบริษัทไทย พร้อมใบอนุญาตทำงาน" },
};

export function trackBySlug(slug: string): Track | undefined {
  return TRACKS.find((t) => TRACK_INFO[t].slug === slug);
}

export function trackName(t: string, locale: string, short = false): string {
  const i = TRACK_INFO[t as Track];
  if (!i) return t;
  return locale === "th" ? (short ? i.shortTh : i.th) : short ? i.shortEn : i.en;
}
