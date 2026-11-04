// Sticky "On this page" list for long guides.
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">On this page</p>
      <ol className="space-y-2 border-l border-line">
        {items.map((i) => (
          <li key={i.id}><a href={`#${i.id}`} className="-ml-px block border-l-2 border-transparent pl-4 text-ink-2 hover:border-primary hover:text-primary">{i.label}</a></li>
        ))}
      </ol>
    </nav>
  );
}
