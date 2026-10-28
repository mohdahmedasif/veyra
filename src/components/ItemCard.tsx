import clsx from "clsx";
import Image from "next/image";
import type { ClothingItem } from "@/types";
import { label } from "@/types";
import { resolveHex } from "@/lib/colors";

export const isLocalUpload = (src: string) => src.startsWith("/uploads/");

export function ItemImage({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className?: string }) {
  // Files uploaded at runtime aren't known to the image optimizer, so serve them directly.
  return <Image src={src} alt={alt} fill sizes={sizes} unoptimized={isLocalUpload(src)} className={clsx("object-cover", className)} />;
}

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
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      aria-pressed={onClick ? selected : undefined}
      className={clsx(
        "group relative block w-full overflow-hidden rounded-2xl border bg-surface text-left transition",
        onClick && "hover:-translate-y-0.5 hover:shadow-soft active:scale-[.98]",
        selected ? "border-accent ring-2 ring-accent" : "border-line",
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-2">
        <ItemImage src={item.imageUrl} alt={item.title} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw" className="transition duration-500 group-hover:scale-105" />
        {selected && (
          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm text-accent-ink shadow">✓</span>
        )}
      </div>
      <div className="flex items-start justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{item.title}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-line" style={{ background: resolveHex(item.color, item.colorHex) }} />
            <span className="truncate">{label(item.category)} · {item.color}</span>
          </p>
        </div>
        {action}
      </div>
    </Tag>
  );
}
