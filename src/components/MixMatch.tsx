"use client";

/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ClothingItem, OutfitSuggestion } from "@/types";
import { CATEGORIES, OCCASIONS, label } from "@/types";
import { ItemCard } from "./ItemCard";
import { ScoreBadge } from "./ScoreBadge";
import { EmptyState } from "./EmptyState";

export function MixMatch({ items }: { items: ClothingItem[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("TOP");
  const [occasion, setOccasion] = useState<string | null>(null);
  const [result, setResult] = useState<OutfitSuggestion | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!selected.length) return setResult(null);
    const ctrl = new AbortController();
    fetch("/api/ai/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemIds: selected, occasion }),
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((d) => setResult(d.result))
      .catch(() => {});
    return () => ctrl.abort();
  }, [selected, occasion]);

  if (!items.length)
    return <EmptyState title="Your canvas is empty" body="Add a few pieces to your wardrobe to start mixing and matching." href="/wardrobe/new" cta="Add pieces" />;

  const toggle = (id: string) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id].slice(-8)));
  const chosen = items.filter((i) => selected.includes(i.id));

  async function save() {
    setSaving(true);
    await fetch("/api/outfits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name || result?.name || "My look", itemIds: selected, occasion, score: result?.score, aiReason: result?.reason }),
    });
    setSaving(false);
    setSelected([]);
    setName("");
    router.push("/favorites?all=1");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={clsx("chip", category === c && "chip-active")}>{label(c)}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.filter((i) => i.category === category).map((i) => (
            <ItemCard key={i.id} item={i} selected={selected.includes(i.id)} onClick={() => toggle(i.id)} />
          ))}
        </div>
      </div>

      <aside className="card h-fit space-y-4 p-6 lg:sticky lg:top-24">
        <h2 className="text-2xl">Your look</h2>
        {chosen.length ? (
          <div className="grid grid-cols-3 gap-2">
            {chosen.map((i) => (
              <button key={i.id} onClick={() => toggle(i.id)} title="Remove">
                <img src={i.imageUrl} alt={i.title} className="aspect-square w-full rounded-xl object-cover" />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-taupe-400">Tap pieces to add them here.</p>
        )}
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button key={o} onClick={() => setOccasion(occasion === o ? null : o)} className={clsx("chip", occasion === o && "chip-active")}>{label(o)}</button>
          ))}
        </div>
        {result && (
          <div className="rounded-2xl bg-sand-50 p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium capitalize">{result.palette} palette</span>
              <ScoreBadge score={result.score} />
            </div>
            <p className="text-sm text-taupe-600">{result.reason}</p>
          </div>
        )}
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name this look" className="input" />
        <button onClick={save} disabled={!selected.length || saving} className="btn-primary w-full">
          {saving ? "Saving…" : "Save outfit"}
        </button>
      </aside>
    </div>
  );
}
