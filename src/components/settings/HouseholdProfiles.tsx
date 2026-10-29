"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "../Avatar";
import { api, useToast } from "../Toast";
import { ColorPicker } from "./ColorPicker";
import { Section } from "./Section";

interface P { id: string; name: string; avatarColor: string; locked: boolean; items: number }

export function HouseholdProfiles({ profiles, meId }: { profiles: P[]; meId: string }) {
  const router = useRouter();
  const toast = useToast();
  const [editing, setEditing] = useState<string | null>(null);

  async function run(fn: () => Promise<unknown>, ok: string) {
    try {
      await fn();
      toast(ok, "success");
      setEditing(null);
      router.refresh();
    } catch (err) {
      toast((err as Error).message, "error");
    }
  }

  return (
    <Section title="Profiles & PINs" description="New profiles are added from the profile screen on any paired device. Here you can rename, reset a forgotten PIN (clears lockouts and signs that profile out everywhere) or remove a profile.">
      <ul className="divide-y divide-line">
        {profiles.map((p) =>
          editing === p.id ? (
            <li key={p.id} className="py-4">
              <Editor
                p={p}
                onCancel={() => setEditing(null)}
                onSave={async ({ name, avatarColor, pin }) => {
                  await run(async () => {
                    await api(`/api/admin/profiles/${p.id}`, { method: "PATCH", json: { name, avatarColor } });
                    if (pin) await api(`/api/profiles/${p.id}/reset-pin`, { method: "POST", json: { newPin: pin } });
                  }, pin ? "Saved · PIN reset" : "Saved");
                }}
                onDelete={p.id === meId ? undefined : () => confirm(`Delete ${p.name}'s profile and closet? This can't be undone.`) && run(() => api(`/api/admin/profiles/${p.id}`, { method: "DELETE" }), "Profile deleted")}
              />
            </li>
          ) : (
            <li key={p.id} className="flex items-center gap-3 py-3">
              <Avatar name={p.name} color={p.avatarColor} size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.name} {p.id === meId && <span className="text-xs font-normal text-muted">(you)</span>}</p>
                <p className="text-xs text-muted">
                  {p.items} pieces{p.locked && <span className="ml-1 text-danger">· locked out</span>}
                </p>
              </div>
              <button onClick={() => setEditing(p.id)} className="btn-ghost min-h-[38px] px-4">Edit</button>
            </li>
          ),
        )}
      </ul>
    </Section>
  );
}

function Editor({ p, onSave, onCancel, onDelete }: { p: P; onSave: (b: { name: string; avatarColor: string; pin: string }) => void; onCancel: () => void; onDelete?: () => void }) {
  const [name, setName] = useState(p.name);
  const [color, setColor] = useState(p.avatarColor);
  const [pin, setPin] = useState("");
  return (
    <form className="space-y-4 rounded-2xl bg-surface-2 p-4" onSubmit={(e) => { e.preventDefault(); onSave({ name, avatarColor: color, pin }); }}>
      <div className="flex items-center gap-3">
        <Avatar name={name || "?"} color={color} size={48} />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" maxLength={40} required className="input" autoFocus />
      </div>
      <ColorPicker value={color} onChange={setColor} />
      <div>
        <label className="label" htmlFor={`pin-${p.id}`}>Reset PIN</label>
        <input id={`pin-${p.id}`} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} inputMode="numeric" minLength={4} maxLength={8}
          placeholder="Leave blank to keep · clears a lockout" className="input tracking-widest" />
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
        {onDelete && <button type="button" onClick={onDelete} className="btn-danger ml-auto">Delete</button>}
      </div>
    </form>
  );
}
