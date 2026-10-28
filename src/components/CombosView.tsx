"use client";

import clsx from "clsx";
import Link from "next/link";
import { useMemo, useState } from "react";
import { generateOutfits } from "@/lib/style-engine";
import type { AiProvider, ClothingItem, OutfitSuggestion, SuggestResponse } from "@/types";
import { OCCASIONS, PROVIDER_LABEL, SEASONS, label } from "@/types";
import { EmptyState } from "./EmptyState";
import { Icon } from "./Icon";
import { OutfitCard } from "./OutfitCard";
import { api, useToast } from "./Toast";

/** What's missing before outfits can be made, phrased for the user. */
function missingHint(items: ClothingItem[]) {
  const has = (c: string) => items.some((i) => i.category === c);
  if (has("DRESS") || (has("TOP") && has("BOTTOM"))) return null;
  if (has("TOP")) return "Add some pants or a skirt to start making combos.";
  if (has("BOTTOM")) return "Add a shirt or top to start making combos.";
  return "Add at least a top and a bottom (or a dress) to start making combos.";
}

export function CombosView({ items, aiProvider }: { items: ClothingItem[]; aiProvider: AiProvider | null }) {
  const toast = useToast();
  const [occasion, setOccasion] = useState<string | null>(null);
  const [season, setSeason] = useState("ALL");
  const [ai, setAi] = useState<SuggestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  // Built-in combos are computed instantly on the device whenever filters change.
  const combos = useMemo(
    () => generateOutfits(items, { occasion: occasion as never, season: season as never, count: 12 }),
    [items, occasion, season],
  );

  const hint = missingHint(items);
  if (!items.length || hint)
    return <EmptyState icon="camera" title={items.length ? "Almost there" : "No clothes yet"} body={hint ?? "Snap your shirts, pants and more — Veyra makes the outfits."} href="/wardrobe/new" cta="Snap clothes" />;

  async function askAi() {
    setLoading(true);
    try {
      const res = await api<SuggestResponse>("/api/ai/suggest", { method: "POST", json: { occasion, season, count: 4 } });
      setAi(res);
      if (res.notice) toast(res.notice, "info");
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function save(s: OutfitSuggestion) {
    const key = s.itemIds.join();
    try {
      await api("/api/outfits", { method: "POST", json: { name: s.name, itemIds: s.itemIds, occasion, score: s.score, aiReason: s.reason } });
      setSaved((cur) => new Set(cur).add(key));
      toast("Saved to your looks", "success");
    } catch (err) {
      toast((err as Error).message, "error");
    }
  }

  const grid = (list: OutfitSuggestion[]) => (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => {
        const key = s.itemIds.join();
        return (
          <OutfitCard
            key={key}
            name={s.name}
            score={s.score}
            reason={s.reason}
            items={s.itemIds.map((id) => byId.get(id)).filter((x): x is ClothingItem => Boolean(x))}
            footer={
              <button onClick={() => save(s)} disabled={saved.has(key)} className={clsx("btn-ghost mt-2 w-full", saved.has(key) && "border-accent/40 text-accent")}>
                <Icon name="heart" size={16} className={clsx(saved.has(key) && "fill-current")} /> {saved.has(key) ? "Saved" : "Save look"}
              </button>
            }
          />
        );
      })}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2.5">
        <div className="scroll-row">
          <button onClick={() => setOccasion(null)} className={clsx("chip", !occasion && "chip-active")}>Any occasion</button>
          {OCCASIONS.map((o) => <button key={o} onClick={() => setOccasion(o)} className={clsx("chip", occasion === o && "chip-active")}>{label(o)}</button>)}
        </div>
        <div className="scroll-row">
          {SEASONS.map((s) => <button key={s} onClick={() => setSeason(s)} className={clsx("chip", season === s && "chip-active")}>{s === "ALL" ? "Any season" : label(s)}</button>)}
        </div>
      </div>

      <section className="card glow flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"><Icon name="sparkle" size={22} /></span>
        <div className="flex-1">
          <p className="font-medium">{aiProvider ? `Want fresh ideas from ${PROVIDER_LABEL[aiProvider]}?` : "Want smarter combos?"}</p>
          <p className="text-sm text-muted">{aiProvider ? "The AI stylist looks at your whole closet and your style preferences." : "Add a free Gemini key in Settings → AI Stylist to let AI style you too."}</p>
        </div>
        {aiProvider ? (
          <button onClick={askAi} disabled={loading} className="btn-accent">
            <Icon name="sparkle" size={18} className={clsx(loading && "animate-spin")} /> {loading ? "Styling…" : ai ? "Ask again" : "Ask AI"}
          </button>
        ) : (
          <Link href="/settings?tab=ai" className="btn-ghost">Settings</Link>
        )}
      </section>

      {ai && ai.suggestions.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl">From {PROVIDER_LABEL[ai.source]}</h2>
          {grid(ai.suggestions)}
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl">{combos.length} combo{combos.length === 1 ? "" : "s"} for you</h2>
        {combos.length ? grid(combos) : <EmptyState icon="layers" title="Nothing for that filter" body="Try another occasion or season — or snap more pieces tagged for it." href="/wardrobe/new" cta="Snap clothes" />}
      </section>
    </div>
  );
}
