import Link from "next/link";
import { DesktopNav, MobileNav, type NavGroup } from "@/components/layout/nav-menus";
import { TOOLS } from "@/lib/tools";
import { TRACKS, TRACK_INFO } from "@/lib/tracks";
import { copy } from "@/lib/copy";
import { routes } from "@/lib/seo/routes";
import { Button, Container } from "@/components/ui/primitives";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <rect width="32" height="32" rx="9" fill="currentColor" className="text-primary" />
        <path d="M9 21c2.2 1.6 4.6 2.4 7.2 2.4 3.6 0 5.8-1.7 5.8-4.3 0-2.4-1.8-3.4-5.2-4.1l-1.6-.3c-1.9-.4-2.7-.9-2.7-1.9 0-1.1 1.1-1.8 2.9-1.8 1.9 0 3.6.6 5.1 1.7" fill="none" stroke="#fbefdb" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[1.35rem] font-semibold tracking-tight text-ink">Staylong</span>
    </span>
  );
}

export async function Header() {
  const t = copy.nav;
  const visas = TRACKS.map((tr) => ({ href: routes.rule(TRACK_INFO[tr].slug), label: TRACK_INFO[tr].name, sub: TRACK_INFO[tr].desc.split(/,\s/)[0] }));
  const tools = [{ href: routes.checker(), label: "Visa checker", sub: "Which visa fits you" }, ...TOOLS.map((x) => ({ href: routes.tool(x.slug), label: x.name.replace("Thailand ", "").replace(/^./, (c) => c.toUpperCase()), sub: x.short }))];
  const learn = [
    { href: routes.guides(), label: "All guides", sub: "Comparisons, rule changes, how-tos" },
    { href: routes.faq(), label: "FAQ", sub: "150 questions answered" },
    { href: routes.countries(), label: "By nationality", sub: "US, UK, Australia and more" },
    { href: routes.ruleChanges(), label: "Rule change log", sub: "Every change, dated" },
    { href: routes.guide("thailand-visa-exemption-30-days"), label: "30-day exemption", sub: "What changed in Sep 2026" },
    { href: routes.guide("how-to-stay-in-thailand-long-term"), label: "Stay long term", sub: "The eight legal routes" },
  ];
  const groups: NavGroup[] = [
    { label: "Visas", items: visas, footer: { href: routes.rules(), label: "Compare all eight visas" } },
    { label: "Free tools", items: tools, footer: { href: routes.tools(), label: "All tools" } },
    { label: "Learn", items: learn },
    { label: "Places", items: [{ href: routes.places(), label: "Where to live", sub: "28 places with maps" }, { href: routes.place("chiang-mai-nimman"), label: "Chiang Mai: Nimman", sub: "Cafes, coworking, schools" }, { href: routes.place("bangkok-sukhumvit"), label: "Bangkok: Sukhumvit", sub: "BTS, malls, hospitals" }, { href: routes.place("phuket-rawai-nai-harn"), label: "Phuket: Rawai", sub: "Beaches and Muay Thai" }, { href: routes.offices(), label: "Immigration offices", sub: "Hours, address, tips" }], footer: { href: routes.places(), label: "See every place on the map" } },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2">{t.skip}</a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Staylong home"><Logo /></Link>
        <DesktopNav groups={groups} extra={{ href: routes.providers(), label: "Schools & providers" }} />
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex"><Link href={routes.checker()}>Check my visa</Link></Button>
          <MobileNav groups={groups} menuLabel={t.menu} logo={<Logo />} primary={{ href: routes.checker(), label: "Check my visa" }} extras={[{ href: routes.providers(), label: "Schools & providers" }, { href: routes.ruleChanges(), label: "Rule changes" }, { href: routes.methodology(), label: "How we verify" }]} />
        </div>
      </Container>
    </header>
  );
}
