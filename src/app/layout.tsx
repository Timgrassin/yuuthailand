import type { Metadata, Viewport } from "next";
import { Anuphan } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { SITE_NAME, SITE_TAGLINE_EN } from "@/lib/seo/site";
import "./globals.css";

// Anuphan covers Thai and Latin in one family.
const anuphan = Anuphan({ variable: "--font-anuphan", subsets: ["latin", "thai"], display: "swap" });

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${SITE_NAME}: ${SITE_TAGLINE_EN}`,
    description: "Find verified long-stay visa schools and providers in Thailand. Check your visa options against current, dated rules.",
    path: "/",
  }),
  title: { default: `${SITE_NAME}: ${SITE_TAGLINE_EN}`, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
    languages: { en: "/", th: "/th" },
    types: { "application/rss+xml": "/visa-rules/changes/feed.xml", "text/plain": "/llms.txt" },
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${anuphan.variable} antialiased`}>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        {children}
      </body>
    </html>
  );
}
