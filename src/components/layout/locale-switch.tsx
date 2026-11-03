"use client";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitch({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <Link href={pathname} locale={locale === "th" ? "en" : "th"} className="rounded-full border border-line px-3 py-1 text-sm font-semibold hover:border-primary" hrefLang={locale === "th" ? "en" : "th"}>
      {label}
    </Link>
  );
}
