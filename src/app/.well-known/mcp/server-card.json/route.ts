// MCP server card for discovery by agents and registries (/.well-known/mcp/server-card.json).
import { SERVER_INFO, TOOL_LIST } from "@/lib/mcp/tools";
import { absoluteUrl } from "@/lib/seo/site";

export const revalidate = 86400;

export function GET() {
  return Response.json(
    {
      version: "1.0",
      protocolVersion: "2025-11-25",
      serverInfo: SERVER_INFO,
      description: "Thailand long-stay visas, rules, 90-day reports, immigration offices, places to live and schools with their verification status. Read-only, no auth.",
      transport: { type: "streamable-http", endpoint: absoluteUrl("/mcp") },
      authentication: { required: false },
      capabilities: { tools: { listChanged: false } },
      tools: TOOL_LIST.map(({ name, title, description }) => ({ name, title, description })),
      documentation: absoluteUrl("/mcp-server"),
    },
    { headers: { "Access-Control-Allow-Origin": "*" } },
  );
}
