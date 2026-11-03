import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { SITE_NAME, isIndexable, siteUrl } from "@/lib/seo/site";
import "./globals.css";

// Placeholder type until the design's font from /handoff lands.
const sans = Inter({ variable: "--font-sans-yu", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  robots: isIndexable() ? undefined : { index: false, follow: false },
  alternates: { types: { "application/rss+xml": "/feeds/rule-changes.xml", "text/plain": "/llms.txt" } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0f5c55" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased`}>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
