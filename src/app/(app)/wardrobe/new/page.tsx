"use client";

/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { CATEGORIES, OCCASIONS, SEASONS, label } from "@/types";

export default function NewItemPage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return setError("Please add a photo");
    setSaving(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const up = await fetch("/api/upload", { method: "POST", body: fd });
      if (!up.ok) throw new Error((await up.json()).error ?? "Upload failed");
      const { url } = await up.json();

      const form = new FormData(e.currentTarget);
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.get("title"),
          category: form.get("category"),
          color: form.get("color"),
          colorHex: form.get("colorHex"),
          season: form.get("season"),
          brand: form.get("brand") || null,
          occasions,
          imageUrl: url,
        }),
      });
      if (!res.ok) throw new Error("Could not save item");
      router.push("/wardrobe");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader eyebrow="Wardrobe" title="Add a piece" />
      <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
        <label className="card flex aspect-[3/4] cursor-pointer items-center justify-center overflow-hidden">
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <span className="text-center text-taupe-400">
              <span className="block font-serif text-3xl text-ink">Upload or snap a photo</span>
              JPG, PNG, WEBP · up to 8MB
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFile(f);
                setPreview(URL.createObjectURL(f));
              }
            }}
          />
        </label>

        <div className="card space-y-4 p-6">
          <input name="title" required placeholder="e.g. Ivory silk blouse" className="input" />
          <div className="grid grid-cols-2 gap-3">
            <select name="category" className="input" defaultValue="TOP">
              {CATEGORIES.map((c) => <option key={c} value={c}>{label(c)}</option>)}
            </select>
            <select name="season" className="input" defaultValue="ALL">
              {SEASONS.map((s) => <option key={s} value={s}>{s === "ALL" ? "All seasons" : label(s)}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <input name="color" required placeholder="Color name (e.g. camel)" className="input" />
            <input name="colorHex" type="color" defaultValue="#c19a6b" className="h-11 w-14 cursor-pointer rounded-xl border border-sand-200" />
          </div>
          <input name="brand" placeholder="Brand (optional)" className="input" />
          <div>
            <p className="mb-2 text-sm text-taupe-600">Occasions</p>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <button
                  type="button"
                  key={o}
                  onClick={() => setOccasions((cur) => (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]))}
                  className={clsx("chip", occasions.includes(o) && "chip-active")}
                >
                  {label(o)}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-blush-600">{error}</p>}
          <button disabled={saving} className="btn-primary w-full">{saving ? "Saving…" : "Save to wardrobe"}</button>
        </div>
      </form>
    </div>
  );
}
