import { Badge } from "@/components/ui/primitives";
import type { Rule } from "@/lib/data";
import { fmtDate } from "@/lib/format";

// Shows the reviewer byline when every rule is reviewed; otherwise an honest "pending" note.
export function ReviewNote({ rules, locale }: { rules: Rule[]; locale: string }) {
  const reviewed = rules.length > 0 && rules.every((r) => r.reviewed_at);
  if (reviewed) {
    const last = rules.map((r) => r.reviewed_at!).sort().at(-1)!;
    return <p className="text-sm text-muted">{locale === "th" ? "ตรวจทานโดย" : "Reviewed by"} <strong>{rules[0].reviewed_by}</strong>, {fmtDate(last, locale)}</p>;
  }
  return (
    <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
      <Badge tone="warn">{locale === "th" ? "รอผู้เชี่ยวชาญตรวจทาน" : "Pending expert review"}</Badge>
      {locale === "th" ? "ข้อมูลรวบรวมจากแหล่งทางการที่ลิงก์ไว้ในแต่ละแถว" : "Compiled from the official sources linked on each row."}
    </p>
  );
}
