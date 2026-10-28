"use client";

import { useRouter } from "next/navigation";

export function OutfitActions({ id, favorite }: { id: string; favorite: boolean }) {
  const router = useRouter();
  const call = async (url: string, method: string) => {
    await fetch(url, { method });
    router.refresh();
  };
  return (
    <div className="flex gap-2 pt-2">
      <button onClick={() => call(`/api/outfits/${id}/favorite`, "POST")} className="btn-ghost flex-1">
        {favorite ? "♥ Favorited" : "♡ Favorite"}
      </button>
      <button
        onClick={() => confirm("Delete this outfit?") && call(`/api/outfits/${id}`, "DELETE")}
        className="btn-ghost text-blush-600"
      >
        Delete
      </button>
    </div>
  );
}
