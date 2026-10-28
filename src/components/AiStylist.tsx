"use client";

import clsx from "clsx";
import { useState } from "react";
import type { ClothingItem, OutfitSuggestion, SuggestResponse } from "@/types";
import { OCCASIONS, PROVIDER_LABEL, SEASONS, label } from "@/types";
import { EmptyState } from "./EmptyState";
import { Icon } from "./Icon";
import { OutfitCard } from "./OutfitCard";
import { api, useToast } from "./Toast";

export function AiStylist({ items }: { items: ClothingItem[] }) {
  const toast = useToast();
  const [occasion, setOccasion] = useState<string | null>(null);
  const [season, setSeason] = useState<string>("ALL");
  const [data, setData] = useState<SuggestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<Set<number>>(new Set());

  if (items.length < 2)
    return <EmptyState icon="sparkle" title="Add a few more pieces" body="The AI Stylist needs at least a top and a bottom (or a dress) to compose outfits." href="/wardrobe/new" cta="Add pieces" />;

  const byId = new Map(items.map((i) => [i.id, i]));

  async function generate() {
    setLoading(true);
    setSaved(new Set());
    try {
      const res = await api<SuggestResponse>("/api/ai/suggest", { method: "POST", json: { occasion, season, count: 4 } });
      setData(res);
      if (res.notice) toast(res.notice, "info");
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function save(s: OutfitSuggestion, idx: number) {
    try {
      await api("/api/outfits", { method: "POST", json: { name: s.name, itemIds: s.itemIds, occasion, score: s.score, aiReason: s.reason } });
      setSaved((cur) => new Set(cur).add(idx));
      toast("Look saved", "success");
    } catch (err) {
      toast((err as Error).message, "error");
    }
  }

  return (
    <div className="space-y-8">
      <div className="card glow space-y-5 p-5 md:p-6">
        <div>
          <span className="label">Where are you headed?</span>
          <div className="scroll-row">
            {OCCASIONS.map((o) => (
              <button key={o} onClick={() => setOccasion(occasion === o ? null : o)} className={clsx("chip", occasion === o && "chip-active")}>{label(o)}</button>
            ))}
          </div>
        </div>
        <div>
          <span className="label">Season</span>
          <div className="scroll-row">
            {SEASONS.map((s) => (
              <button key={s} onClick={() => setSeason(s)} className={clsx("chip", season === s && "chip-active")}>{s === "ALL" ? "Any" : label(s)}</button>
            ))}
          </div>
        </div>
        <button onClick={generate} disabled={loading} className="btn-accent w-full sm:w-auto">
          <Icon name="sparkle" size={18} className={clsx(loading && "animate-spin")} />
          {loading ? "Styling…" : data ? "Restyle" : "Generate outfits"}
        </button>
      </div>

      {loading && !data && (
        <div className="grid gap-5 sm:grid-cols-2">{[0, 1].map((i) => <div key={i} className="skeleton h-80" />)}</div>
      )}

      {data &&
        (data.suggestions.length ? (
          <section>
            <p className="mb-3 text-xs text-muted">Styled by {PROVIDER_LABEL[data.source]}</p>
            <div className={clsx("grid gap-5 sm:grid-cols-2", loading && "opacity-50")}>
              {data.suggestions.map((s, idx) => (
                <OutfitCard
                  key={`${idx}-${s.itemIds.join()}`}
                  name={s.name}
                  score={s.score}
                  reason={s.reason}
                  items={s.itemIds.map((id) => byId.get(id)).filter((x): x is ClothingItem => Boolean(x))}
                  footer={
                    <button onClick={() => save(s, idx)} disabled={saved.has(idx)} className="btn-ghost mt-2 w-full">
                      <Icon name="heart" size={16} /> {saved.has(idx) ? "Saved" : "Save look"}
                    </button>
                  }
                />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState icon="sparkle" title="No matches for that filter" body="Try a different occasion or season, or add more pieces tagged for it." />
        ))}
    </div>
  );
}
