import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { AnswerBlock } from "@/components/seo/answer-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq } from "@/components/ui/faq";
import { Card, Container } from "@/components/ui/primitives";
import { TOOL_LIST } from "@/lib/mcp/tools";
import { pageMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/site";
import { breadcrumbSchema, faqSchema, graph, webAppSchema } from "@/lib/seo/schema";

const PATH = "/mcp-server";
export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Thailand visa MCP server for Claude, ChatGPT and Cursor",
  description: "Connect your AI assistant to Staylong's Thailand visa rules, eligibility checks, immigration offices and places to live. Free, no key.",
  updatedAt: "2026-11-04",
});

const faqs = [
  { question: "Is the Staylong MCP server free?", answer: "Yes. It is read-only, needs no API key and returns the same data as the website, with a link to the source page in every answer." },
  { question: "Which clients does it work with?", answer: "Any client that supports remote MCP servers over Streamable HTTP, including Claude, ChatGPT connectors, Cursor, VS Code and Windsurf." },
  { question: "How current are the visa rules?", answer: "get_visa_rules reads the live rules table behind staylong.co. Each value carries its effective date, official source and a confidence level." },
];

export default function McpPage() {
  const url = absoluteUrl("/mcp");
  const config = JSON.stringify({ mcpServers: { staylong: { type: "http", url } } }, null, 2);
  const crumbs = [{ name: "Staylong", path: "/" }, { name: "MCP server", path: PATH }];
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={crumbs} />}
        eyebrow="For AI assistants"
        title="Thailand long-stay data in your AI assistant."
        lead={<AnswerBlock answer={`Add ${url} as a remote MCP server in Claude, ChatGPT, Cursor or any MCP client. Your assistant can then check visa eligibility, read current visa thresholds, find the right immigration office and search every Staylong guide, with links back to the source. It is free and needs no key.`} checkedAt="2026-11-04" />}
      />
      <Container className="max-w-3xl space-y-12 py-14">
        <section>
          <h2 className="mb-4 text-3xl">Connect</h2>
          <Card className="space-y-4 text-[15px]">
            <p><strong>Server URL:</strong> <code className="rounded bg-sunken px-2 py-0.5">{url}</code></p>
            <p><strong>Claude:</strong> Settings, Connectors, Add custom connector, paste the URL. Claude Code: <code className="rounded bg-sunken px-2 py-0.5">claude mcp add --transport http staylong {url}</code></p>
            <p><strong>ChatGPT:</strong> Settings, Connectors, Create, paste the URL, no authentication.</p>
            <p><strong>Cursor, VS Code, Windsurf:</strong> add this to your MCP config:</p>
            <pre className="overflow-x-auto rounded-sm bg-ink p-4 text-sm text-white">{config}</pre>
          </Card>
        </section>
        <section>
          <h2 className="mb-4 text-3xl">Tools</h2>
          <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
            {TOOL_LIST.map((t) => (
              <div key={t.name} className="px-5 py-4">
                <p className="font-semibold"><code>{t.name}</code> · {t.title}</p>
                <p className="mt-1 text-sm text-ink-2">{t.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">Discovery: <a href="/.well-known/mcp/server-card.json" className="underline">server card</a> · <a href="/llms.txt" className="underline">llms.txt</a> · <Link href="/how-we-verify" className="underline">how we verify</Link></p>
        </section>
        <Faq title="MCP server questions" items={faqs} />
      </Container>
      <JsonLd data={graph(webAppSchema({ path: PATH, name: "Staylong MCP server", description: "Remote MCP server for Thailand long-stay visa rules, eligibility, immigration offices and places to live." }), breadcrumbSchema(crumbs), faqSchema(faqs))} />
    </>
  );
}
