"use client";

/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { api, useToast } from "@/components/Toast";
import { CATEGORIES, OCCASIONS, SEASONS, label } from "@/types";

const SWATCHES: [string, string][] = [
  ["black", "#111111"], ["white", "#FFFFFF"], ["ivory", "#F5EFE6"], ["beige", "#D8CBB5"], ["camel", "#C19A6B"], ["brown", "#6B4423"],
  ["grey", "#8C8C8C"], ["navy", "#1F2A44"], ["blue", "#4A78C2"], ["green", "#3E8E5E"], ["sage", "#A3B18A"], ["red", "#C0392B"],
  ["pink", "#E8A0B4"], ["purple", "#7D5BA6"], ["yellow", "#F4D03F"], ["gold", "#D4AF37"],
];

export default function NewItemPage() {
  const router = useRouter();
  const toast = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("TOP");
  const [season, setSeason] = useState("ALL");
  const [color, setColor] = useState<[string, string]>(["", "#C19A6B"]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return toast("Please add a photo first", "error");
    if (!color[0]) return toast("Pick or type a color", "error");
    const form = new FormData(e.currentTarget); // read before any await — currentTarget is cleared afterwards
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { url } = await api<{ url: string }>("/api/upload", { method: "POST", body: fd });
      await api("/api/items", {
        method: "POST",
        json: { title: form.get("title"), brand: form.get("brand") || null, category, season, color: color[0], colorHex: color[1], occasions, imageUrl: url },
      });
      toast("Added to your closet", "success");
      router.push("/wardrobe");
      router.refresh();
    } catch (err) {
      toast((err as Error).message, "error");
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader eyebrow="Wardrobe" title="Add a piece" />
      <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-8">
        <label className={clsx("card relative flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden md:sticky md:top-24 md:aspect-[3/4] md:self-start", !preview && "glow border-dashed")}>
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              <span className="absolute bottom-3 right-3 rounded-full bg-bg/90 px-3 py-1.5 text-xs font-medium backdrop-blur">Change photo</span>
            </>
          ) : (
            <span className="flex flex-col items-center px-6 text-center text-muted">
              <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent"><Icon name="camera" size={28} /></span>
              <span className="font-serif text-2xl text-ink">Snap or upload a photo</span>
              <span className="mt-1 text-sm">JPG, PNG, WEBP · up to 8MB</span>
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
            }}
          />
        </label>

        <div className="card space-y-5 p-5 md:p-6">
          <div>
            <label className="label" htmlFor="title">Name</label>
            <input id="title" name="title" required placeholder="e.g. Ivory silk blouse" className="input" />
          </div>
          <Choice label="Category" values={CATEGORIES} value={category} onChange={setCategory} />
          <div>
            <span className="label">Color</span>
            <div className="flex flex-wrap gap-2">
              {SWATCHES.map(([name, hex]) => (
                <button
                  type="button"
                  key={name}
                  title={name}
                  aria-label={name}
                  onClick={() => setColor([name, hex])}
                  className={clsx("h-9 w-9 rounded-full ring-1 ring-line transition", color[0] === name && "ring-2 ring-accent ring-offset-2 ring-offset-surface")}
                  style={{ background: hex }}
                />
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input value={color[0]} onChange={(e) => setColor([e.target.value.toLowerCase(), color[1]])} placeholder="or type a color name" className="input" />
              <input type="color" value={color[1]} onChange={(e) => setColor([color[0], e.target.value])} aria-label="Exact color" className="h-11 w-14 shrink-0 cursor-pointer rounded-xl border border-line bg-surface" />
            </div>
          </div>
          <Choice label="Season" values={SEASONS} value={season} onChange={setSeason} render={(s) => (s === "ALL" ? "All year" : label(s))} />
          <div>
            <span className="label">Occasions</span>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <button type="button" key={o} onClick={() => setOccasions((cur) => (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]))} className={clsx("chip", occasions.includes(o) && "chip-active")}>
                  {label(o)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label" htmlFor="brand">Brand <span className="font-normal">(optional)</span></label>
            <input id="brand" name="brand" className="input" />
          </div>
          <button disabled={saving} className="btn-primary w-full">{saving ? "Saving…" : "Save to closet"}</button>
        </div>
      </form>
    </div>
  );
}

function Choice({ label: title, values, value, onChange, render = label }: { label: string; values: string[]; value: string; onChange: (v: string) => void; render?: (v: string) => string }) {
  return (
    <div>
      <span className="label">{title}</span>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <button type="button" key={v} onClick={() => onChange(v)} className={clsx("chip", value === v && "chip-active")}>{render(v)}</button>
        ))}
      </div>
    </div>
  );
}
