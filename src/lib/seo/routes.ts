// Public route map used by sitemap, llms.txt, breadcrumbs and internal links.
// D1: the brief's routes win. Align these with START-HERE.md when /handoff lands.
export const routes = {
  home: () => "/",
  checker: () => "/checker",
  rules: () => "/visa-rules",
  rule: (trackSlug: string) => `/visa-rules/${trackSlug}`,
  ruleChanges: () => "/visa-rules/changes",
  providers: () => "/providers",
  provider: (slug: string) => `/providers/${slug}`,
  city: (slug: string) => `/cities/${slug}`,
  embassies: () => "/embassies",
  embassy: (slug: string) => `/embassies/${slug}`,
  checkerResult: (id: string) => `/checker/r/${id}`,
  guides: () => "/guides",
  guide: (slug: string) => `/guides/${slug}`,
  tools: () => "/tools",
  tool: (slug: string) => `/tools/${slug}`,
  faq: () => "/faq",
  country: (slug: string) => `/visas-for/${slug}`,
  countries: () => "/visas-for",
  methodology: () => "/how-we-verify",
} as const;

// Never indexed: private, personal or internal surfaces.
export const NOINDEX_PREFIXES = ["/admin", "/portal", "/api", "/dev", "/checker/r", "/auth"] as const;
