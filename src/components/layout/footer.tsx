import Link from "next/link";
import { Rss } from "lucide-react";
import { copy } from "@/lib/copy";
import { routes } from "@/lib/seo/routes";
import { TRACKS, TRACK_INFO } from "@/lib/tracks";
import { Container } from "@/components/ui/primitives";
import { Logo } from "./header";

export async function Footer() {
  const t = copy.footer;
  return (
    <footer className="mt-8 border-t border-line bg-sunken/60">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t.tagline} Every rule is dated and sourced. Every provider shows when we last checked it.</p>
          <a href="/feeds/rule-changes.xml" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"><Rss className="size-4" aria-hidden />Rule change feed</a>
        </div>
        <FooterCol title="Visas" links={TRACKS.map((tr) => ({ href: routes.rule(TRACK_INFO[tr].slug), label: TRACK_INFO[tr].short === "Education" ? "Education (ED)" : TRACK_INFO[tr].short }))} />
        <FooterCol title="Tools" links={[{ href: routes.checker(), label: "Visa checker" }, { href: routes.rules(), label: "Compare all visas" }, { href: routes.ruleChanges(), label: "Rule change log" }, { href: routes.embassies(), label: "Thai embassies" }]} />
        <FooterCol title="Directory" links={[{ href: routes.providers(), label: "All providers" }, { href: routes.city("bangkok"), label: "Bangkok" }, { href: routes.city("chiang-mai"), label: "Chiang Mai" }, { href: routes.city("phuket"), label: "Phuket" }, { href: routes.methodology(), label: "How we verify" }]} />
      </Container>
      <Container className="border-t border-line py-6 text-xs leading-relaxed text-muted">
        <p>{t.disclaimer}</p>
        <p className="mt-2">© {new Date().getFullYear()} Staylong</p>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">{links.map((l) => <li key={l.href}><Link href={l.href} className="text-ink-2 hover:text-primary">{l.label}</Link></li>)}</ul>
    </div>
  );
}
