"use client";

import { useRouter } from "next/navigation";
import { Icon } from "./Icon";
import { api, useToast } from "./Toast";

export function DeleteItemButton({ id }: { id: string }) {
  const router = useRouter();
  const toast = useToast();
  return (
    <button
      aria-label="Remove item"
      className="-m-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-danger/10 hover:text-danger"
      onClick={async (e) => {
        e.stopPropagation();
        if (!confirm("Remove this piece from your wardrobe?")) return;
        try {
          await api(`/api/items/${id}`, { method: "DELETE" });
          toast("Piece removed", "success");
          router.refresh();
        } catch (err) {
          toast((err as Error).message, "error");
        }
      }}
    >
      <Icon name="x" size={16} />
    </button>
  );
}
