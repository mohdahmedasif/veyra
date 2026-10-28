"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Icon } from "./Icon";
import { api, useToast } from "./Toast";

export function OutfitActions({ id, favorite }: { id: string; favorite: boolean }) {
  const router = useRouter();
  const toast = useToast();
  const call = async (url: string, method: string, ok: string) => {
    try {
      await api(url, { method });
      toast(ok, "success");
      router.refresh();
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };
  return (
    <div className="flex gap-2 pt-2">
      <button
        onClick={() => call(`/api/outfits/${id}/favorite`, "POST", favorite ? "Removed from favorites" : "Added to favorites")}
        className={clsx("btn-ghost flex-1", favorite && "border-accent/40 text-accent")}
      >
        <Icon name="heart" size={16} className={clsx(favorite && "fill-current")} /> {favorite ? "Favorited" : "Favorite"}
      </button>
      <button onClick={() => confirm("Delete this outfit?") && call(`/api/outfits/${id}`, "DELETE", "Outfit deleted")} className="btn-danger px-4" aria-label="Delete outfit">
        <Icon name="x" size={16} />
      </button>
    </div>
  );
}
