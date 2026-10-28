/* eslint-disable @next/next/no-img-element */
import type { ClothingItem } from "@/types";
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
  return (
    <div className="card overflow-hidden">
      <div className="grid grid-cols-2 gap-1 bg-sand-50 p-1">
        {items.slice(0, 4).map((i) => (
          <img key={i.id} src={i.imageUrl} alt={i.title} className="aspect-square w-full rounded-xl object-cover" />
        ))}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl">{name}</h3>
          {score != null && <ScoreBadge score={score} />}
        </div>
        {reason && <p className="text-sm text-taupe-600">{reason}</p>}
        <p className="text-xs text-taupe-400">{items.map((i) => i.title).join(" · ")}</p>
        {footer}
      </div>
    </div>
  );
}
