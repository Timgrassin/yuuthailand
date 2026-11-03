// Public route map used by sitemap, llms.txt, breadcrumbs and internal links.
// D1: the brief's routes win. Align these with START-HERE.md when /handoff lands.
export const routes = {
  home: () => "/",
  checker: () => "/checker",
  rules: () => "/visa-rules",
  ruleChanges: () => "/visa-rules/changes",
  providers: () => "/providers",
  provider: (slug: string) => `/providers/${slug}`,
  city: (slug: string) => `/cities/${slug}`,
  embassies: () => "/embassies",
  embassy: (slug: string) => `/embassies/${slug}`,
  methodology: () => "/how-we-verify",
  about: () => "/about",
} as const;

// Never indexed: private, personal or internal surfaces.
export const NOINDEX_PREFIXES = ["/admin", "/portal", "/api", "/dev", "/r/", "/auth"] as const;
