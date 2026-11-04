import Link from "next/link";
import { Menu } from "lucide-react";
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
  const items = [
    { href: routes.rules(), label: "Visas" },
    { href: routes.providers(), label: "Schools & providers" },
    { href: routes.guides(), label: "Guides" },
    { href: routes.ruleChanges(), label: "Rule changes" },
    { href: routes.methodology(), label: "How we verify" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2">{t.skip}</a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Staylong home"><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-medium text-ink-2 lg:flex">
          {items.map((i) => <Link key={i.href} href={i.href} className="transition-colors hover:text-ink">{i.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex"><Link href={routes.checker()}>Check my visa</Link></Button>
          <details className="group relative lg:hidden">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-line-strong bg-surface" aria-label={t.menu}><Menu className="size-5" aria-hidden /></summary>
            <nav aria-label="Mobile" className="absolute right-0 mt-2 flex w-64 flex-col rounded-card border border-line bg-surface p-2 shadow-lift">
              <Link href={routes.checker()} className="rounded-sm px-4 py-3 font-semibold text-primary hover:bg-primary-soft">Check my visa</Link>
              {items.map((i) => <Link key={i.href} href={i.href} className="rounded-sm px-4 py-3 hover:bg-sunken">{i.label}</Link>)}
              <Link href={routes.embassies()} className="rounded-sm px-4 py-3 hover:bg-sunken">{t.embassies}</Link>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
