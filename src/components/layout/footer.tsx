import { copy } from "@/lib/copy";
import Link from "next/link";
import { routes } from "@/lib/seo/routes";
import { Container } from "@/components/ui/primitives";

export async function Footer() {
  const t = copy.footer;
  const n = copy.nav;
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <Container className="grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold text-primary">Staylong</p>
          <p className="mt-2 text-sm text-muted">{t.tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          <Link href={routes.checker()}>{n.checker}</Link>
          <Link href={routes.providers()}>{n.providers}</Link>
          <Link href={routes.rules()}>{n.rules}</Link>
          <Link href={routes.ruleChanges()}>{t.changes}</Link>
          <Link href={routes.embassies()}>{n.embassies}</Link>
          <Link href={routes.methodology()}>{n.method}</Link>
          <a href="/feeds/rule-changes.xml">{t.feed}</a>
        </nav>
        <p className="text-xs text-muted">{t.disclaimer}</p>
      </Container>
    </footer>
  );
}
