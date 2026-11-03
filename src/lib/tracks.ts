// Long-stay visa tracks. Keys match rules.track and programs.track.
export const TRACKS = ["dtv", "ed", "retirement", "retirement_oa", "ltr", "privilege", "marriage", "work"] as const;
export type Track = (typeof TRACKS)[number];

type TrackInfo = { slug: string; name: string; short: string; desc: string };

export const TRACK_INFO: Record<Track, TrackInfo> = {
  dtv: { slug: "dtv", name: "Destination Thailand Visa (DTV)", short: "DTV", desc: "5-year visa for remote workers and soft-power activities such as Muay Thai." },
  ed: { slug: "education-visa", name: "Education visa (Non-ED)", short: "Education", desc: "For students at approved language schools, universities and accredited courses." },
  retirement: { slug: "retirement-visa", name: "Retirement visa (Non-O)", short: "Retirement", desc: "Yearly extension for people aged 50+ with 800,000 THB or 65,000 THB monthly income." },
  retirement_oa: { slug: "o-a-visa", name: "Long-stay retirement visa (O-A)", short: "O-A", desc: "One-year retirement visa applied for abroad, with health insurance." },
  ltr: { slug: "ltr-visa", name: "Long-Term Resident visa (LTR)", short: "LTR", desc: "10-year BOI visa for high earners, wealthy pensioners, investors and skilled professionals." },
  privilege: { slug: "thailand-privilege", name: "Thailand Privilege (Elite)", short: "Privilege", desc: "Paid membership visa from 5 to 20 years, no income or age test." },
  marriage: { slug: "marriage-visa", name: "Marriage visa (Non-O)", short: "Marriage", desc: "Yearly extension for people married to a Thai national." },
  work: { slug: "work-visa", name: "Work visa (Non-B)", short: "Work", desc: "For people hired by a Thai company, with a work permit." },
};

export function trackBySlug(slug: string): Track | undefined {
  return TRACKS.find((t) => TRACK_INFO[t].slug === slug);
}

export function trackName(t: string, short = false): string {
  const i = TRACK_INFO[t as Track];
  if (!i) return t;
  return short ? i.short : i.name;
}
