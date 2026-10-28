"use client";

import clsx from "clsx";
import { useState } from "react";
import type { ClothingItem, OutfitSuggestion, SuggestResponse } from "@/types";
import { OCCASIONS, SEASONS, label } from "@/types";
import { EmptyState } from "./EmptyState";
import { OutfitCard } from "./OutfitCard";

export function AiStylist({ items }: { items: ClothingItem[] }) {
  const [occasion, setOccasion] = useState<string | null>(null);
  const [season, setSeason] = useState<string>("ALL");
  const [data, setData] = useState<SuggestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<Set<number>>(new Set());

  if (items.length < 2)
    return <EmptyState title="Add a few more pieces" body="The AI Stylist needs at least a top and a bottom (or a dress) to compose outfits." href="/wardrobe/new" cta="Add pieces" />;

  const byId = new Map(items.map((i) => [i.id, i]));

  async function generate() {
    setLoading(true);
    setSaved(new Set());
    const res = await fetch("/api/ai/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ occasion, season, count: 4 }),
    });
    setData(await res.json());
    setLoading(false);
  }

  async function save(s: OutfitSuggestion, idx: number) {
    await fetch("/api/outfits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: s.name, itemIds: s.itemIds, occasion, score: s.score, aiReason: s.reason }),
    });
    setSaved((cur) => new Set(cur).add(idx));
  }

  return (
    <div className="space-y-8">
      <div className="card space-y-4 p-6">
        <div>
          <p className="mb-2 text-sm text-taupe-600">Occasion</p>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((o) => (
              <button key={o} onClick={() => setOccasion(occasion === o ? null : o)} className={clsx("chip", occasion === o && "chip-active")}>{label(o)}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-taupe-600">Season</p>
          <div className="flex flex-wrap gap-2">
            {SEASONS.map((s) => (
              <button key={s} onClick={() => setSeason(s)} className={clsx("chip", season === s && "chip-active")}>{s === "ALL" ? "Any" : label(s)}</button>
            ))}
          </div>
        </div>
        <button onClick={generate} disabled={loading} className="btn-primary">
          {loading ? "Styling…" : "✦ Generate outfits"}
        </button>
      </div>

      {data && (
        data.suggestions.length ? (
          <>
            <p className="text-xs text-taupe-400">Styled by {data.source === "openai" ? "Veyra AI" : "Veyra style engine"}</p>
            <div className="grid gap-6 md:grid-cols-2">
              {data.suggestions.map((s, idx) => (
                <OutfitCard
                  key={idx}
                  name={s.name}
                  score={s.score}
                  reason={s.reason}
                  items={s.itemIds.map((id) => byId.get(id)).filter((x): x is ClothingItem => Boolean(x))}
                  footer={
                    <button onClick={() => save(s, idx)} disabled={saved.has(idx)} className="btn-ghost w-full">
                      {saved.has(idx) ? "Saved ✓" : "Save look"}
                    </button>
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState title="No matches for that filter" body="Try a different occasion or season, or add more pieces tagged for it." />
        )
      )}
    </div>
  );
}
