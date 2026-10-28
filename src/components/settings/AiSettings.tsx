"use client";

import clsx from "clsx";
import { useState } from "react";
import type { AiProvider } from "@/types";
import { Icon } from "../Icon";
import { api, useToast } from "../Toast";
import { Section } from "./Section";

interface KeyView { key: string | null; model: string; envFallback: boolean }
interface View { provider: AiProvider; gemini: KeyView; openai: KeyView }

const PROVIDERS: { id: AiProvider; name: string; blurb: string }[] = [
  { id: "GEMINI", name: "Google Gemini", blurb: "Fast, generous free tier. Get a key at aistudio.google.com." },
  { id: "OPENAI", name: "OpenAI", blurb: "GPT models. Get a key at platform.openai.com." },
  { id: "ENGINE", name: "Built-in engine", blurb: "Color-theory rules, works offline. No key needed." },
];

export function AiSettings({ initial }: { initial: View }) {
  const toast = useToast();
  const [view, setView] = useState(initial);

  async function patch(body: object, ok: string) {
    try {
      setView(await api<View>("/api/admin/ai", { method: "PATCH", json: body }));
      toast(ok, "success");
    } catch (err) {
      toast((err as Error).message, "error");
    }
  }

  return (
    <div className="space-y-6">
      <Section title="AI Stylist" description="Choose what powers outfit suggestions for every profile in the household.">
        <div className="grid gap-3">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              onClick={() => patch({ provider: p.id }, `Using ${p.name}`)}
              className={clsx("flex items-start gap-3 rounded-2xl border p-4 text-left transition", view.provider === p.id ? "border-accent bg-accent-soft/60" : "border-line hover:bg-surface-2")}
            >
              <span className={clsx("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2", view.provider === p.id ? "border-accent" : "border-line")}>
                {view.provider === p.id && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
              </span>
              <span>
                <span className="block font-medium">{p.name}</span>
                <span className="block text-sm text-muted">{p.blurb}</span>
              </span>
            </button>
          ))}
        </div>
      </Section>
      <KeyCard provider="GEMINI" title="Gemini API key" kv={view.gemini} placeholder="AIza…" onPatch={patch} />
      <KeyCard provider="OPENAI" title="OpenAI API key" kv={view.openai} placeholder="sk-…" onPatch={patch} />
    </div>
  );
}

function KeyCard({ provider, title, kv, placeholder, onPatch }: { provider: "GEMINI" | "OPENAI"; title: string; kv: KeyView; placeholder: string; onPatch: (b: object, ok: string) => Promise<void> }) {
  const toast = useToast();
  const prefix = provider === "GEMINI" ? "gemini" : "openai";
  const [key, setKey] = useState("");
  const [model, setModel] = useState(kv.model);
  const [testing, setTesting] = useState(false);

  async function test() {
    setTesting(true);
    try {
      const r = await api<{ ok: boolean; error?: string }>("/api/admin/ai/test", { method: "POST", json: { provider } });
      toast(r.ok ? "Key works" : `Key test failed: ${r.error}`, r.ok ? "success" : "error");
    } finally {
      setTesting(false);
    }
  }

  return (
    <Section
      title={title}
      description="Encrypted on the server and never shown again — only the last 4 characters."
      action={
        <span className={clsx("rounded-full px-3 py-1 text-xs font-medium", kv.key ? "bg-success/15 text-success" : "bg-surface-2 text-muted")}>
          {kv.key ? `Saved ${kv.key}` : kv.envFallback ? "Using server env key" : "Not set"}
        </span>
      }
    >
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          await onPatch({ [`${prefix}Key`]: key || undefined, [`${prefix}Model`]: model }, "Saved");
          setKey("");
        }}
      >
        <input value={key} onChange={(e) => setKey(e.target.value)} type="password" autoComplete="off" placeholder={kv.key ? "Paste a new key to replace" : placeholder} className="input font-mono" />
        <div>
          <label className="label" htmlFor={`${prefix}-model`}>Model</label>
          <input id={`${prefix}-model`} value={model} onChange={(e) => setModel(e.target.value)} className="input font-mono" />
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary">Save</button>
          <button type="button" onClick={test} disabled={testing || (!kv.key && !kv.envFallback)} className="btn-ghost">
            <Icon name="sparkle" size={16} className={clsx(testing && "animate-spin")} /> {testing ? "Testing…" : "Test key"}
          </button>
          {kv.key && (
            <button type="button" onClick={() => confirm("Remove this key?") && onPatch({ [`${prefix}Key`]: null }, "Key removed")} className="btn-danger ml-auto">
              Remove
            </button>
          )}
        </div>
      </form>
    </Section>
  );
}
