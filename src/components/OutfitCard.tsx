import type { ClothingItem } from "@/types";
import { ItemImage } from "./ItemCard";
import { ScoreBadge } from "./ScoreBadge";

export function OutfitCard({
  name,
  items,
  score,
  reason,
  footer,
}: {
  name: string;
  items: ClothingItem[];
  score?: number | null;
  reason?: string | null;
  footer?: React.ReactNode;
}) {
  const shown = items.slice(0, 4);
  return (
    <div className="card animate-fade-up overflow-hidden">
      <div className={`grid gap-1 bg-surface-2 p-1 ${shown.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
        {shown.map((i, idx) => (
          <div key={i.id} className={`relative overflow-hidden rounded-2xl ${shown.length === 3 && idx === 0 ? "row-span-2" : "aspect-square"}`}>
            <ItemImage src={i.imageUrl} alt={i.title} sizes="(min-width: 768px) 16vw, 45vw" />
          </div>
        ))}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl leading-tight">{name}</h3>
          {score != null && <ScoreBadge score={score} />}
        </div>
        {reason && <p className="text-sm leading-relaxed text-muted">{reason}</p>}
        <p className="text-xs text-muted/80">{items.map((i) => i.title).join(" · ")}</p>
        {footer}
      </div>
    </div>
  );
}
