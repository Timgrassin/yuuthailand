import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { type ProviderFilters, ProvidersDirectory } from "../directory";

export const dynamic = "force-dynamic";

// Filtered views are duplicates of city pages: keep them out of the index.
export const metadata: Metadata = pageMetadata({
  path: routes.providers(),
  title: "Visa schools and long-stay providers in Thailand",
  description: "Language schools, Muay Thai camps and visa agents in Thailand. Every listing shows its verification status and where its facts come from.",
  noindex: true,
});

export default async function FilteredProvidersPage({ searchParams }: { searchParams: Promise<ProviderFilters> }) {
  return <ProvidersDirectory {...await searchParams} />;
}
