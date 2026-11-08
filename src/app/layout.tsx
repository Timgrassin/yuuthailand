import type { Metadata, Viewport } from "next";
import { Anuphan } from "next/font/google";
import { Tracking } from "@/components/analytics/tracking";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { SITE_NAME, isIndexable, siteUrl } from "@/lib/seo/site";
import "./globals.css";

// D26: one variable font from the handoff, used for body and headings.
const body = Anuphan({ variable: "--font-body", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  robots: isIndexable() ? undefined : { index: false, follow: false },
  alternates: { types: { "application/rss+xml": "/feeds/rule-changes.xml", "text/plain": "/llms.txt" } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0F5246" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={body.variable}>
      <body className="antialiased">
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {isIndexable() ? <Tracking /> : null}
      </body>
    </html>
  );
}
