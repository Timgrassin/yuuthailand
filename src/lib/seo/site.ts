// Single source for site identity and URL building. English only.
// Production URL comes from NEXT_PUBLIC_SITE_URL once the domain (Q2) is bought.
export const SITE_NAME = "Staylong";
export const SITE_TAGLINE = "Long-stay Thailand directory with a public status on every listing";

export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

// Only production on the real domain is indexable. Previews and local are noindex.
export function isIndexable(): boolean {
  return process.env.VERCEL_ENV === "production" && Boolean(process.env.NEXT_PUBLIC_SITE_URL);
}

export function absoluteUrl(path: string): string {
  return `${siteUrl()}${path === "/" ? "" : path}` || siteUrl();
}
