// Public, read-only MCP server (Streamable HTTP, stateless JSON responses).
// Connect any MCP client to https://staylong.co/mcp. Spec: https://modelcontextprotocol.io/specification
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";
import { DISCLAIMER, SERVER_INFO, TOOL_DEFS, TOOL_LIST } from "@/lib/mcp/tools";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SUPPORTED = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
const LATEST = SUPPORTED[0];
const INSTRUCTIONS = `${SITE_NAME} answers questions about living in Thailand long term: visas (DTV, ED, retirement, O-A, LTR, Privilege, marriage, work), 90-day reports, TM30, where to live, immigration offices, and schools, camps and visa agents with their verification status. Use search then fetch for explanations, get_visa_rules for exact current thresholds, and check_visa_eligibility to match a person to visas. Cite the url in each result.`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version, Authorization",
  "Access-Control-Expose-Headers": "Mcp-Protocol-Version",
};

type Msg = { jsonrpc: "2.0"; id?: string | number | null; method?: string; params?: Record<string, unknown> };
const ok = (id: Msg["id"], result: unknown) => ({ jsonrpc: "2.0", id, result });
const err = (id: Msg["id"], code: number, message: string) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

async function handle(m: Msg) {
  if (m.jsonrpc !== "2.0" || typeof m.method !== "string") return err(m.id, -32600, "Invalid request");
  const p = m.params ?? {};
  switch (m.method) {
    case "initialize": {
      const asked = String(p.protocolVersion ?? "");
      return ok(m.id, { protocolVersion: SUPPORTED.includes(asked) ? asked : LATEST, capabilities: { tools: { listChanged: false } }, serverInfo: SERVER_INFO, instructions: INSTRUCTIONS });
    }
    case "ping":
      return ok(m.id, {});
    case "tools/list":
      return ok(m.id, { tools: TOOL_LIST });
    case "tools/call": {
      const tool = TOOL_DEFS.find((t) => t.name === p.name);
      if (!tool) return err(m.id, -32602, `Unknown tool: ${String(p.name)}`);
      try {
        const out = { ...(await tool.run((p.arguments as Record<string, unknown>) ?? {})), disclaimer: DISCLAIMER };
        return ok(m.id, { content: [{ type: "text", text: JSON.stringify(out) }], structuredContent: out, isError: false });
      } catch (e) {
        return ok(m.id, { content: [{ type: "text", text: e instanceof Error ? e.message : "Tool failed" }], isError: true });
      }
    }
    case "resources/list":
      return ok(m.id, { resources: [] });
    case "prompts/list":
      return ok(m.id, { prompts: [] });
    default:
      return err(m.id, -32601, `Method not found: ${m.method}`);
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(err(null, -32700, "Parse error"), { status: 400, headers: CORS });
  }
  const batch = Array.isArray(body);
  const msgs = (batch ? body : [body]) as Msg[];
  const replies = [];
  for (const m of msgs) {
    if (m && m.id === undefined) continue; // notification, e.g. notifications/initialized
    replies.push(await handle(m));
  }
  if (!replies.length) return new Response(null, { status: 202, headers: CORS });
  return Response.json(batch ? replies : replies[0], { headers: { ...CORS, "Mcp-Protocol-Version": LATEST, "Cache-Control": "no-store" } });
}

// No server-initiated stream: this server is stateless.
export function GET() {
  return new Response("Staylong MCP server. POST JSON-RPC 2.0 to this URL (Streamable HTTP). Docs: " + absoluteUrl("/mcp-server"), { status: 405, headers: { ...CORS, Allow: "POST, OPTIONS" } });
}
export function DELETE() {
  return new Response(null, { status: 405, headers: { ...CORS, Allow: "POST, OPTIONS" } });
}
export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
