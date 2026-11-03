import type { MetadataRoute } from "next";
import { NOINDEX_PREFIXES } from "@/lib/seo/routes";
import { isIndexable, siteUrl } from "@/lib/seo/site";

// AI search growth: allow every search and answer-engine bot by name.
// Previews and non-domain deploys block everything so they never compete with production.
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "Bingbot",
  "DuckAssistBot", "Meta-ExternalAgent", "MistralAI-User", "YouBot", "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: [{ userAgent: "*", disallow: "/" }] };
  const disallow = [...NOINDEX_PREFIXES];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
    host: siteUrl(),
  };
}
