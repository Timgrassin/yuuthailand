import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { ProvidersDirectory } from "./directory";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  path: routes.providers(),
  title: "Visa schools and long-stay providers in Thailand",
  description: "Language schools, Muay Thai camps and visa agents in Thailand. Every listing shows its verification status and where its facts come from.",
});

// The unfiltered directory is cached. Requests with ?city, ?track or ?q are rewritten to ./filtered (next.config.ts).
export default function ProvidersPage() {
  return <ProvidersDirectory />;
}
