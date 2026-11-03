import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, graph } from "@/lib/seo/schema";

// Visible FAQ plus matching FAQPage JSON-LD. Never emit the schema without the visible list.
export function Faq({ items, title }: { items: { question: string; answer: string }[]; title: string }) {
  if (!items.length) return null;
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="divide-y divide-line rounded-card border border-line bg-surface">
        {items.map((f) => (
          <details key={f.question} className="group p-5">
            <summary className="cursor-pointer list-none font-semibold marker:hidden">
              <span className="mr-2 inline-block text-primary transition-transform group-open:rotate-90">›</span>
              {f.question}
            </summary>
            <p className="mt-3 text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={graph(faqSchema(items))} />
    </section>
  );
}
