import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/seo/routes";
import { Container } from "@/components/ui/primitives";
import { LocaleSwitch } from "./locale-switch";

export async function Header() {
  const t = await getTranslations("nav");
  const items = [
    { href: routes.checker(), label: t("checker") },
    { href: routes.providers(), label: t("providers") },
    { href: routes.rules(), label: t("rules") },
    { href: routes.embassies(), label: t("embassies") },
  ];
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2">{t("skip")}</a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-primary">Yuu</Link>
        <nav aria-label="Main" className="hidden gap-6 text-sm font-semibold md:flex">
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="hover:text-primary">{i.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitch label={t("language")} />
          <details className="relative md:hidden">
            <summary className="list-none rounded-full border border-line px-3 py-1 text-sm font-semibold">{t("menu")}</summary>
            <nav aria-label="Mobile" className="absolute right-0 mt-2 flex w-56 flex-col rounded-card border border-line bg-surface p-2 shadow-lg">
              {items.map((i) => (
                <Link key={i.href} href={i.href} className="rounded px-3 py-2 hover:bg-primary-soft">{i.label}</Link>
              ))}
              <Link href={routes.methodology()} className="rounded px-3 py-2 hover:bg-primary-soft">{t("method")}</Link>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
