"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { PinPad } from "./PinPad";
import { api } from "./Toast";

interface P { id: string; name: string; avatarColor: string; isAdmin: boolean }

export function ProfilePicker({ profiles, next }: { profiles: P[]; next: string }) {
  const router = useRouter();
  const [active, setActive] = useState<P | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function unlock() {
    if (!active || busy) return;
    setBusy(true);
    try {
      await api(`/api/profiles/${active.id}/unlock`, { method: "POST", json: { pin } });
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setPin("");
      setBusy(false);
    }
  }

  if (!active)
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-10">
        <h1 className="text-center text-4xl md:text-5xl">Who&apos;s dressing today?</h1>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => { setActive(p); setPin(""); setError(""); }}
              className="group flex flex-col items-center gap-3 rounded-3xl p-2 transition active:scale-95"
            >
              <Avatar name={p.name} color={p.avatarColor} size={104} className="shadow-soft ring-4 ring-transparent transition group-hover:ring-accent/40 md:h-[120px] md:w-[120px]" />
              <span className="text-sm font-medium text-muted transition group-hover:text-ink">
                {p.name}
                {p.isAdmin && <span className="ml-1 text-gold">★</span>}
              </span>
            </button>
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex flex-1 animate-fade-up flex-col items-center justify-center py-8">
      <button onClick={() => setActive(null)} className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <Icon name="chevron" size={16} className="rotate-180" /> All profiles
      </button>
      <Avatar name={active.name} color={active.avatarColor} size={84} className="shadow-soft" />
      <h1 className="mt-4 text-3xl">Hi, {active.name}</h1>
      <p className="mb-8 mt-1 h-5 text-sm text-muted">{error ? <span className="text-danger">{error}</span> : "Enter your PIN"}</p>
      <PinPad value={pin} onChange={(v) => { setPin(v); setError(""); }} onSubmit={unlock} error={Boolean(error)} disabled={busy} />
    </div>
  );
}
