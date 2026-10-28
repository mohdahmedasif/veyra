"use client";

import clsx from "clsx";
import { useState } from "react";

const STYLES = ["minimal", "elegant", "classic", "streetwear", "bohemian", "romantic", "edgy", "sporty", "preppy", "bold"];

export function ProfileForm({ user }: { user: { name: string | null; email: string; stylePreferences: string[] } }) {
  const [name, setName] = useState(user.name ?? "");
  const [prefs, setPrefs] = useState(user.stylePreferences);
  const [status, setStatus] = useState("");

  async function save() {
    setStatus("Saving…");
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, stylePreferences: prefs }),
    });
    setStatus(res.ok ? "Saved ✓" : "Could not save");
  }

  return (
    <div className="card space-y-5 p-6">
      <div>
        <p className="mb-1 text-sm text-taupe-600">Email</p>
        <p>{user.email}</p>
      </div>
      <div>
        <p className="mb-1 text-sm text-taupe-600">Name</p>
        <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
      </div>
      <div>
        <p className="mb-2 text-sm text-taupe-600">Style preferences — the AI Stylist uses these</p>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setPrefs((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))}
              className={clsx("chip capitalize", prefs.includes(s) && "chip-active")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={save} className="btn-primary">Save profile</button>
        <span className="text-sm text-taupe-400">{status}</span>
      </div>
    </div>
  );
}
