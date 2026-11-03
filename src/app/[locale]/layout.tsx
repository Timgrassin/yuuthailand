import type { Metadata, Viewport } from "next";
import { Anuphan } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { routing } from "@/i18n/routing";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { SITE_NAME, isIndexable, siteUrl } from "@/lib/seo/site";
import "../globals.css";

const anuphan = Anuphan({ variable: "--font-anuphan", subsets: ["latin", "thai"], display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  robots: isIndexable() ? undefined : { index: false, follow: false },
  alternates: { types: { "application/rss+xml": "/feeds/rule-changes.xml", "text/plain": "/llms.txt" } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0f5c55" };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={`${anuphan.variable} antialiased`}>
        <NextIntlClientProvider>
          <JsonLd data={graph(organizationSchema(), websiteSchema())} />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
