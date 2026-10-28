"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ClothingItem, OutfitSuggestion } from "@/types";
import { CATEGORIES, OCCASIONS, label } from "@/types";
import { EmptyState } from "./EmptyState";
import { Icon } from "./Icon";
import { ItemCard, ItemImage } from "./ItemCard";
import { ScoreBadge } from "./ScoreBadge";
import { api, useToast } from "./Toast";

export function MixMatch({ items }: { items: ClothingItem[] }) {
  const router = useRouter();
  const toast = useToast();
  const [selected, setSelected] = useState<string[]>([]);
  const present = CATEGORIES.filter((c) => items.some((i) => i.category === c));
  const [category, setCategory] = useState<string>(present[0] ?? "TOP");
  const [occasion, setOccasion] = useState<string | null>(null);
  const [result, setResult] = useState<OutfitSuggestion | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [sheet, setSheet] = useState(false);

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
    return <EmptyState icon="layers" title="Your canvas is empty" body="Add a few pieces to your wardrobe to start mixing and matching." href="/wardrobe/new" cta="Add pieces" />;

  const toggle = (id: string) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id].slice(-8)));
  const chosen = items.filter((i) => selected.includes(i.id));
  const countIn = (c: string) => chosen.filter((i) => i.category === c).length;

  async function save() {
    setSaving(true);
    try {
      await api("/api/outfits", {
        method: "POST",
        json: { name: name || result?.name || "My look", itemIds: selected, occasion, score: result?.score, aiReason: result?.reason },
      });
      toast("Outfit saved", "success");
      setSelected([]);
      setName("");
      setSheet(false);
      router.refresh();
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  }

  const panel = (
    <div className="space-y-4">
      {chosen.length ? (
        <div className="grid grid-cols-4 gap-2">
          {chosen.map((i) => (
            <button key={i.id} onClick={() => toggle(i.id)} title={`Remove ${i.title}`} className="group relative aspect-square overflow-hidden rounded-xl border border-line">
              <ItemImage src={i.imageUrl} alt={i.title} sizes="80px" />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/50 text-bg opacity-0 transition group-hover:opacity-100"><Icon name="x" size={18} /></span>
            </button>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted">Tap pieces to add them to your look.</p>
      )}
      <div>
        <span className="label">Occasion</span>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button key={o} onClick={() => setOccasion(occasion === o ? null : o)} className={clsx("chip", occasion === o && "chip-active")}>{label(o)}</button>
          ))}
        </div>
      </div>
      {result && (
        <div className="rounded-2xl bg-surface-2 p-4">
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-sm font-medium capitalize">{result.palette} palette</span>
            <ScoreBadge score={result.score} />
          </div>
          <p className="text-sm text-muted">{result.reason}</p>
        </div>
      )}
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name this look" className="input" />
      <button onClick={save} disabled={!selected.length || saving} className="btn-primary w-full">{saving ? "Saving…" : "Save outfit"}</button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0">
        <div className="scroll-row mb-4">
          {present.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={clsx("chip gap-1.5", category === c && "chip-active")}>
              {label(c)}
              {countIn(c) > 0 && <span className={clsx("rounded-full px-1.5 text-[10px]", category === c ? "bg-bg/20" : "bg-accent text-accent-ink")}>{countIn(c)}</span>}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {items.filter((i) => i.category === category).map((i) => (
            <ItemCard key={i.id} item={i} selected={selected.includes(i.id)} onClick={() => toggle(i.id)} />
          ))}
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="card hidden h-fit p-6 lg:sticky lg:top-24 lg:block">
        <h2 className="mb-4 text-2xl">Your look</h2>
        {panel}
      </aside>

      {/* Mobile tray + sheet */}
      <div className="lg:hidden">
        {sheet && <div className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm" onClick={() => setSheet(false)} />}
        <div
          className={clsx(
            "pb-safe fixed inset-x-0 z-40 rounded-t-4xl border-t border-line bg-surface shadow-lift transition-all duration-300",
            sheet ? "bottom-0 max-h-[85dvh] overflow-y-auto" : "bottom-16",
          )}
        >
          <button onClick={() => setSheet((s) => !s)} className="flex w-full items-center gap-3 px-4 py-3">
            <span className="flex -space-x-3">
              {chosen.slice(0, 4).map((i) => (
                <span key={i.id} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-surface">
                  <ItemImage src={i.imageUrl} alt="" sizes="40px" />
                </span>
              ))}
              {!chosen.length && <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-muted"><Icon name="layers" size={18} /></span>}
            </span>
            <span className="flex-1 text-left">
              <span className="block text-sm font-medium">Your look · {chosen.length} piece{chosen.length === 1 ? "" : "s"}</span>
              <span className="block text-xs text-muted">{result ? `${result.score}% match · ${result.palette}` : "Tap pieces to start"}</span>
            </span>
            <Icon name="chevron" size={18} className={clsx("text-muted transition", sheet ? "rotate-90" : "-rotate-90")} />
          </button>
          {sheet && <div className="px-4 pb-6">{panel}</div>}
        </div>
      </div>
    </div>
  );
}
