"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AVATAR_COLORS } from "@/types";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";
import { api, useToast } from "../Toast";
import { ColorPicker } from "./ColorPicker";
import { Section } from "./Section";

interface P { id: string; name: string; avatarColor: string; isAdmin: boolean; locked: boolean; items: number }

export function HouseholdProfiles({ profiles, meId }: { profiles: P[]; meId: string }) {
  const router = useRouter();
  const toast = useToast();
  const [editing, setEditing] = useState<string | "new" | null>(null);

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
    <Section
      title="Profiles & PINs"
      description="Everyone in the household gets their own closet, unlocked with a PIN."
      action={editing !== "new" && profiles.length < 8 ? <button onClick={() => setEditing("new")} className="btn-primary"><Icon name="plus" size={16} /> Add profile</button> : undefined}
    >
      <ul className="divide-y divide-line">
        {editing === "new" && (
          <li className="pb-4">
            <ProfileEditor
              initial={{ name: "", avatarColor: AVATAR_COLORS[profiles.length % AVATAR_COLORS.length], isAdmin: false }}
              requirePin
              onCancel={() => setEditing(null)}
              onSave={(body) => run(() => api("/api/admin/profiles", { method: "POST", json: body }), "Profile created")}
            />
          </li>
        )}
        {profiles.map((p) =>
          editing === p.id ? (
            <li key={p.id} className="py-4">
              <ProfileEditor
                initial={p}
                isMe={p.id === meId}
                onCancel={() => setEditing(null)}
                onSave={(body) => run(() => api(`/api/admin/profiles/${p.id}`, { method: "PATCH", json: body }), "Profile updated")}
                onDelete={p.id === meId ? undefined : () => confirm(`Delete ${p.name}'s profile and closet? This can't be undone.`) && run(() => api(`/api/admin/profiles/${p.id}`, { method: "DELETE" }), "Profile deleted")}
              />
            </li>
          ) : (
            <li key={p.id} className="flex items-center gap-3 py-3">
              <Avatar name={p.name} color={p.avatarColor} size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {p.name} {p.id === meId && <span className="text-xs font-normal text-muted">(you)</span>}
                </p>
                <p className="text-xs text-muted">
                  {p.isAdmin ? "Admin" : "Member"} · {p.items} pieces
                  {p.locked && <span className="ml-1 text-danger">· locked out</span>}
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

function ProfileEditor({
  initial,
  requirePin,
  isMe,
  onSave,
  onCancel,
  onDelete,
}: {
  initial: { name: string; avatarColor: string; isAdmin: boolean };
  requirePin?: boolean;
  isMe?: boolean;
  onSave: (body: object) => void;
  onCancel: () => void;
  onDelete?: () => void;
}) {
  const [name, setName] = useState(initial.name);
  const [color, setColor] = useState(initial.avatarColor);
  const [isAdmin, setIsAdmin] = useState(initial.isAdmin);
  const [pin, setPin] = useState("");

  return (
    <form
      className="space-y-4 rounded-2xl bg-surface-2 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ name, avatarColor: color, isAdmin, ...(pin ? { pin } : {}) });
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar name={name || "?"} color={color} size={48} />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" maxLength={40} required className="input" autoFocus />
      </div>
      <ColorPicker value={color} onChange={setColor} />
      <div>
        <label className="label" htmlFor="newpin">{requirePin ? "PIN" : "Reset PIN"}</label>
        <input
          id="newpin"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          inputMode="numeric"
          minLength={4}
          maxLength={6}
          required={requirePin}
          placeholder={requirePin ? "4–6 digits" : "Leave blank to keep · also clears a lockout"}
          className="input tracking-widest"
        />
      </div>
      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" checked={isAdmin} disabled={isMe} onChange={(e) => setIsAdmin(e.target.checked)} className="h-5 w-5 accent-[rgb(var(--accent))]" />
        Admin — can manage profiles, devices and AI keys
      </label>
      <div className="flex flex-wrap gap-2">
        <button className="btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
        {onDelete && <button type="button" onClick={onDelete} className="btn-danger ml-auto">Delete</button>}
      </div>
    </form>
  );
}
