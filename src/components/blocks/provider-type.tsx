import { BicepsFlexed, Building2, ChefHat, FileCheck, HandHeart, Languages, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// One look per provider type. We have no photos, so listings show a tinted art tile with the type icon.
const TYPES: Record<string, { label: string; icon: LucideIcon; art: string }> = {
  muay_thai_camp: { label: "Muay Thai camp", icon: BicepsFlexed, art: "art-teal" },
  language_school: { label: "Language school", icon: Languages, art: "art-turmeric" },
  cooking_school: { label: "Cooking school", icon: ChefHat, art: "art-clay" },
  massage_school: { label: "Massage school", icon: HandHeart, art: "art-sage" },
  visa_agent: { label: "Visa agent", icon: FileCheck, art: "art-sand" },
};
const fallback = { icon: Building2, art: "art-sky" };

export const typeLabel = (t: string) => TYPES[t]?.label ?? t.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());

export function TypeArt({ type, className, iconClass }: { type: string; className?: string; iconClass?: string }) {
  const { icon: Icon, art } = TYPES[type] ?? fallback;
  return (
    <span className={cn("tile-art grid shrink-0 place-items-center rounded-[10px]", art, className)} aria-hidden>
      <Icon className={cn("size-6 text-ink/70", iconClass)} strokeWidth={1.75} />
    </span>
  );
}
