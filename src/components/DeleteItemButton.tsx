"use client";

import { useRouter } from "next/navigation";

export function DeleteItemButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      aria-label="Remove item"
      className="text-taupe-400 hover:text-blush-600"
      onClick={async (e) => {
        e.stopPropagation();
        if (!confirm("Remove this piece from your wardrobe?")) return;
        await fetch(`/api/items/${id}`, { method: "DELETE" });
        router.refresh();
      }}
    >
      ✕
    </button>
  );
}
