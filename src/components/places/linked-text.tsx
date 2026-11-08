import Link from "next/link";
import { splitPaths } from "@/lib/places";
import { pathLabel } from "@/lib/seo/related";

// Editorial text that mentions site paths ("/visa-rules/dtv") renders them as links with the page's name as anchor.
export function LinkedText({ text }: { text: string }) {
  return <>{splitPaths(text).map((part, i) => (typeof part === "string" ? part : <Link key={i} href={part.href} className="font-medium text-primary underline underline-offset-2">{pathLabel(part.href)}</Link>))}</>;
}

export function BulletList({ items, tone = "primary" }: { items: string[]; tone?: "primary" | "muted" }) {
  return (
    <ul className="space-y-2.5 text-ink-2">
      {[...new Set(items)].map((t) => (
        <li key={t} className="flex gap-3"><span className={`mt-2 size-1.5 shrink-0 rounded-full ${tone === "primary" ? "bg-primary-2" : "bg-line-strong"}`} /><span><LinkedText text={t} /></span></li>
      ))}
    </ul>
  );
}
