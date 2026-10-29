"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AVATAR_COLORS } from "@/types";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { PinPad } from "./PinPad";
import { api } from "./Toast";

interface P { id: string; name: string; avatarColor: string }
type Mode = { kind: "pick" } | { kind: "unlock"; p: P } | { kind: "create" } | { kind: "reset"; p: P };

export function ProfilePicker({ profiles, next }: { profiles: P[]; next: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(profiles.length ? { kind: "pick" } : { kind: "create" });
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const go = (m: Mode) => { setMode(m); setPin(""); setError(""); };
  const done = () => { router.replace(next); router.refresh(); };

  async function run(fn: () => Promise<unknown>) {
    if (busy) return;
    setBusy(true);
    try {
      await fn();
      done();
    } catch (err) {
      setError((err as Error).message);
      setPin("");
      setBusy(false);
    }
  }

  const back = profiles.length > 0 && (
    <button onClick={() => go({ kind: "pick" })} className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
      <Icon name="chevron" size={16} className="rotate-180" /> All profiles
    </button>
  );

  if (mode.kind === "pick")
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-10">
        <h1 className="text-center text-4xl md:text-5xl">Who&apos;s dressing today?</h1>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
          {profiles.map((p) => (
            <button key={p.id} onClick={() => go({ kind: "unlock", p })} className="group flex flex-col items-center gap-3 rounded-3xl p-2 transition active:scale-95">
              <Avatar name={p.name} color={p.avatarColor} size={104} className="shadow-soft ring-4 ring-transparent transition group-hover:ring-accent/40" />
              <span className="text-sm font-medium text-muted transition group-hover:text-ink">{p.name}</span>
            </button>
          ))}
          <button onClick={() => go({ kind: "create" })} className="group flex flex-col items-center gap-3 rounded-3xl p-2 transition active:scale-95">
            <span className="flex h-[104px] w-[104px] items-center justify-center rounded-full border-2 border-dashed border-line text-muted transition group-hover:border-accent group-hover:text-accent">
              <Icon name="plus" size={32} />
            </span>
            <span className="text-sm font-medium text-muted">Add profile</span>
          </button>
        </div>
      </div>
    );

  if (mode.kind === "unlock")
    return (
      <div className="flex flex-1 animate-fade-up flex-col items-center justify-center py-8">
        {back}
        <Avatar name={mode.p.name} color={mode.p.avatarColor} size={84} className="shadow-soft" />
        <h1 className="mt-4 text-3xl">Hi, {mode.p.name}</h1>
        <p className="mb-8 mt-1 min-h-5 max-w-xs text-center text-sm text-muted">{error ? <span className="text-danger">{error}</span> : "Enter your PIN"}</p>
        <PinPad value={pin} onChange={(v) => { setPin(v); setError(""); }} maxLength={8} disabled={busy} error={Boolean(error)}
          onSubmit={() => run(() => api(`/api/profiles/${mode.p.id}/unlock`, { method: "POST", json: { pin } }))} />
        <button onClick={() => go({ kind: "reset", p: mode.p })} className="mt-8 text-sm text-muted underline-offset-4 hover:text-ink hover:underline">Forgot PIN?</button>
      </div>
    );

  if (mode.kind === "reset") return <ResetPin p={mode.p} back={back} error={error} busy={busy}
    onSubmit={(adminKey, newPin) => run(() => api(`/api/profiles/${mode.p.id}/reset-pin`, { method: "POST", json: { adminKey, newPin } }))} />;

  return <CreateProfile back={back} error={error} busy={busy} first={!profiles.length}
    onSubmit={(body) => run(() => api("/api/profiles", { method: "POST", json: body }))} />;
}

function CreateProfile({ back, error, busy, first, onSubmit }: { back: React.ReactNode; error: string; busy: boolean; first: boolean; onSubmit: (b: object) => void }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(AVATAR_COLORS[0]);
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const mismatch = confirm.length > 0 && confirm !== pin;
  return (
    <div className="flex w-full max-w-sm flex-1 animate-fade-up flex-col items-center justify-center py-8">
      {back}
      <Avatar name={name || "?"} color={color} size={84} className="shadow-soft" />
      <h1 className="mt-4 text-center text-3xl">{first ? "Create your profile" : "New profile"}</h1>
      <form className="card mt-6 w-full space-y-4 p-5" onSubmit={(e) => { e.preventDefault(); if (!mismatch) onSubmit({ name, avatarColor: color, pin }); }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" maxLength={40} required className="input" autoFocus />
        <div className="flex justify-center gap-2">
          {AVATAR_COLORS.map((c) => (
            <button type="button" key={c} aria-label={`Color ${c}`} onClick={() => setColor(c)} style={{ background: c }}
              className={clsx("h-8 w-8 rounded-full", color === c && "ring-2 ring-accent ring-offset-2 ring-offset-surface")} />
          ))}
        </div>
        <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} type="password" inputMode="numeric" minLength={4} maxLength={8} placeholder="PIN (4–8 digits)" required className="input text-center tracking-[0.4em]" />
        <input value={confirm} onChange={(e) => setConfirm(e.target.value.replace(/\D/g, ""))} type="password" inputMode="numeric" maxLength={8} placeholder="Repeat PIN" required className="input text-center tracking-[0.4em]" />
        {(error || mismatch) && <p className="text-center text-sm text-danger">{mismatch ? "PINs don't match" : error}</p>}
        <button disabled={busy || pin.length < 4 || mismatch} className="btn-primary w-full">{busy ? "Creating…" : "Create profile"}</button>
      </form>
    </div>
  );
}

function ResetPin({ p, back, error, busy, onSubmit }: { p: P; back: React.ReactNode; error: string; busy: boolean; onSubmit: (adminKey: string, pin: string) => void }) {
  const [adminKey, setAdminKey] = useState("");
  const [pin, setPin] = useState("");
  return (
    <div className="flex w-full max-w-sm flex-1 animate-fade-up flex-col items-center justify-center py-8">
      {back}
      <Avatar name={p.name} color={p.avatarColor} size={72} />
      <h1 className="mt-4 text-3xl">Reset {p.name}&apos;s PIN</h1>
      <p className="mt-1 text-center text-sm text-muted">Needs the household admin key. Signs {p.name} out on every other device.</p>
      <form className="card mt-6 w-full space-y-4 p-5" onSubmit={(e) => { e.preventDefault(); onSubmit(adminKey, pin); }}>
        <input value={adminKey} onChange={(e) => setAdminKey(e.target.value)} type="password" placeholder="Admin key" autoComplete="off" required className="input font-mono" />
        <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} type="password" inputMode="numeric" minLength={4} maxLength={8} placeholder="New PIN (4–8 digits)" required className="input text-center tracking-[0.4em]" />
        {error && <p className="text-center text-sm text-danger">{error}</p>}
        <button disabled={busy || pin.length < 4} className="btn-primary w-full">{busy ? "Saving…" : "Set new PIN"}</button>
      </form>
    </div>
  );
}
