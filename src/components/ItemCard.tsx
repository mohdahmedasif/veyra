/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import type { ClothingItem } from "@/types";
import { label } from "@/types";
import { resolveHex } from "@/lib/colors";

export function ItemCard({
  item,
  selected,
  onClick,
  action,
}: {
  item: ClothingItem;
  selected?: boolean;
  onClick?: () => void;
  action?: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "group overflow-hidden rounded-2xl border bg-white transition",
        onClick && "cursor-pointer hover:-translate-y-0.5 hover:shadow-soft",
        selected ? "border-ink ring-2 ring-ink" : "border-sand-100",
      )}
    >
      <div className="aspect-[3/4] overflow-hidden bg-sand-50">
        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <div className="flex items-start justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{item.title}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-taupe-400">
            <span className="h-2.5 w-2.5 rounded-full border border-sand-200" style={{ background: resolveHex(item.color, item.colorHex) }} />
            {label(item.category)} · {item.color}
          </p>
        </div>
        {action}
      </div>
    </div>
  );
}
