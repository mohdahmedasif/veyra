"use client";

/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { prepareImage, SWATCHES } from "@/lib/image-client";
import { CATEGORIES, OCCASIONS, PROVIDER_LABEL, SEASONS, label, type AiProvider } from "@/types";
import { Icon } from "./Icon";
import { api, useToast } from "./Toast";

const CATEGORY_HINT: Record<string, string> = { TOP: "Shirt / top", BOTTOM: "Pants / skirt", DRESS: "Dress", OUTERWEAR: "Jacket / coat", SHOES: "Shoes", ACCESSORY: "Accessory", BAG: "Bag" };

interface Draft {
  key: string;
  preview: string;
  status: "uploading" | "ready" | "error";
  url?: string;
  detectedBy?: AiProvider | null;
  title: string;
  category: string | null;
  color: string;
  colorHex: string;
  season: string;
  occasions: string[];
  more: boolean;
}

interface Detected { title: string; category: string; color: string; colorHex?: string | null; season: string; occasions: string[] }

export function SnapCloset({ aiReady }: { aiReady: boolean }) {
  const router = useRouter();
  const toast = useToast();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [saving, setSaving] = useState(false);
  const cameraRef = useRef<HTMLInputElement>(null);
  const libraryRef = useRef<HTMLInputElement>(null);

  const update = (key: string, patch: Partial<Draft>) => setDrafts((ds) => ds.map((d) => (d.key === key ? { ...d, ...patch } : d)));

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    for (const original of Array.from(files)) {
      const key = `${Date.now()}-${Math.random()}`;
      const draft: Draft = { key, preview: URL.createObjectURL(original), status: "uploading", title: "", category: null, color: "", colorHex: "#999999", season: "ALL", occasions: [], more: false };
      setDrafts((ds) => [draft, ...ds]);
      (async () => {
        const { file, color } = await prepareImage(original);
        if (color) update(key, { color: color[0], colorHex: color[1] });
        try {
          const fd = new FormData();
          fd.append("file", file);
          const res = await api<{ url: string; detected: Detected | null; provider: AiProvider | null }>("/api/items/analyze", { method: "POST", body: fd });
          const d = res.detected;
          update(key, {
            status: "ready",
            url: res.url,
            detectedBy: res.provider,
            ...(d ? { title: d.title, category: d.category, color: d.color, colorHex: d.colorHex ?? color?.[1] ?? "#999999", season: d.season, occasions: d.occasions } : {}),
          });
        } catch (err) {
          update(key, { status: "error" });
          toast((err as Error).message, "error");
        }
      })();
    }
  }

  const ready = drafts.filter((d) => d.status === "ready");
  const missing = ready.filter((d) => !d.category || !d.color);

  async function saveAll() {
    if (missing.length) return toast("Pick a type and color for every piece", "error");
    setSaving(true);
    try {
      for (const d of ready) {
        await api("/api/items", {
          method: "POST",
          json: {
            title: d.title.trim() || `${d.color} ${CATEGORY_HINT[d.category!].split(" ")[0].toLowerCase()}`.replace(/^./, (c) => c.toUpperCase()),
            category: d.category,
            color: d.color,
            colorHex: d.colorHex,
            season: d.season,
            occasions: d.occasions,
            imageUrl: d.url,
          },
        });
      }
      toast(`${ready.length} piece${ready.length === 1 ? "" : "s"} added`, "success");
      router.push("/combos");
      router.refresh();
    } catch (err) {
      toast((err as Error).message, "error");
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
      <input ref={libraryRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />

      <div className={clsx("card glow p-5 md:p-6", !drafts.length && "py-10 text-center")}>
        {!drafts.length && (
          <>
            <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent"><Icon name="camera" size={30} /></span>
            <h2 className="text-3xl">Photograph your clothes</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Lay each piece flat or hang it up, one per photo — shirts, pants, dresses, shoes. {aiReady ? "Veyra recognizes the type and color for you." : "You'll just tap its type."}
            </p>
          </>
        )}
        <div className={clsx("flex flex-col gap-3 sm:flex-row", !drafts.length ? "mt-6 sm:justify-center" : "")}>
          <button onClick={() => cameraRef.current?.click()} className="btn-accent"><Icon name="camera" size={18} /> {drafts.length ? "Take another" : "Take photo"}</button>
          <button onClick={() => libraryRef.current?.click()} className="btn-ghost"><Icon name="plus" size={18} /> Choose from photos</button>
        </div>
        {!aiReady && (
          <p className="mt-4 text-xs text-muted">Tip: add a free Gemini key in Settings → AI Stylist and Veyra will tag photos automatically.</p>
        )}
      </div>

      <div className="space-y-4">
        {drafts.map((d) => (
          <div key={d.key} className="card animate-fade-up overflow-hidden">
            <div className="flex gap-4 p-4">
              <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-2xl bg-surface-2 sm:h-44 sm:w-36">
                <img src={d.preview} alt="" className="h-full w-full object-cover" />
                {d.status === "uploading" && (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-ink/45 text-xs font-medium text-bg backdrop-blur-[2px]">
                    <Icon name="sparkle" size={20} className="animate-spin" /> {aiReady ? "Recognizing…" : "Uploading…"}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex items-start gap-2">
                  <input value={d.title} onChange={(e) => update(d.key, { title: e.target.value })} placeholder="Name (optional)" className="input min-h-[40px] py-2" />
                  <button onClick={() => setDrafts((ds) => ds.filter((x) => x.key !== d.key))} aria-label="Discard photo" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted hover:bg-danger/10 hover:text-danger">
                    <Icon name="x" size={16} />
                  </button>
                </div>
                {d.detectedBy && <p className="text-xs text-success">✓ Recognized by {PROVIDER_LABEL[d.detectedBy]} — check and adjust if needed</p>}
                {d.status === "error" && <p className="text-xs text-danger">Upload failed — discard and try again.</p>}
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((c) => (
                    <button key={c} onClick={() => update(d.key, { category: c })} className={clsx("chip min-h-[32px] px-3", d.category === c && "chip-active", !d.category && d.status === "ready" && "border-accent/50")}>
                      {CATEGORY_HINT[c]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-line px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 shrink-0 rounded-full ring-1 ring-line" style={{ background: d.colorHex }} />
                <div className="scroll-row !mx-0 !px-0 flex-1 !flex-nowrap">
                  {SWATCHES.map(([name, hexv]) => (
                    <button key={name} title={name} aria-label={name} onClick={() => update(d.key, { color: name, colorHex: hexv })} className={clsx("h-7 w-7 shrink-0 rounded-full ring-1 ring-line", d.color === name && "ring-2 ring-accent ring-offset-2 ring-offset-surface")} style={{ background: hexv }} />
                  ))}
                </div>
                <span className="hidden text-sm capitalize text-muted sm:block">{d.color || "color?"}</span>
              </div>
              <button onClick={() => update(d.key, { more: !d.more })} className="mt-2 text-xs text-muted underline-offset-4 hover:underline">
                {d.more ? "Hide details" : `Season & occasions${d.occasions.length ? ` · ${d.occasions.map(label).join(", ")}` : ""}`}
              </button>
              {d.more && (
                <div className="mt-3 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {SEASONS.map((s) => <button key={s} onClick={() => update(d.key, { season: s })} className={clsx("chip min-h-[32px]", d.season === s && "chip-active")}>{s === "ALL" ? "All year" : label(s)}</button>)}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {OCCASIONS.map((o) => (
                      <button key={o} onClick={() => update(d.key, { occasions: d.occasions.includes(o) ? d.occasions.filter((x) => x !== o) : [...d.occasions, o] })} className={clsx("chip min-h-[32px]", d.occasions.includes(o) && "chip-active")}>
                        {label(o)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {drafts.length > 0 && (
        <div className="sticky bottom-20 z-20 md:bottom-4">
          <button onClick={saveAll} disabled={saving || !ready.length || drafts.some((d) => d.status === "uploading")} className="btn-primary w-full shadow-lift">
            {saving ? "Saving…" : drafts.some((d) => d.status === "uploading") ? "Processing photos…" : `Save ${ready.length} piece${ready.length === 1 ? "" : "s"} & see combos`}
          </button>
        </div>
      )}
    </div>
  );
}
