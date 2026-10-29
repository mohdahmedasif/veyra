"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "../Avatar";
import { api, useToast } from "../Toast";
import { ColorPicker } from "./ColorPicker";
import { Section } from "./Section";

const STYLES = ["minimal", "elegant", "classic", "streetwear", "bohemian", "romantic", "edgy", "sporty", "preppy", "bold"];

export function ProfileForm({ profile }: { profile: { name: string; avatarColor: string; stylePreferences: string[] } }) {
  const router = useRouter();
  const toast = useToast();
  const [name, setName] = useState(profile.name);
  const [color, setColor] = useState(profile.avatarColor);
  const [prefs, setPrefs] = useState(profile.stylePreferences);
  const [pins, setPins] = useState({ currentPin: "", newPin: "" });

  async function save(body: object, ok: string) {
    try {
      await api("/api/profile", { method: "PATCH", json: body });
      toast(ok, "success");
      router.refresh();
      return true;
    } catch (err) {
      toast((err as Error).message, "error");
      return false;
    }
  }

  return (
    <div className="space-y-6">
      <Section title="My profile" description="How you appear on the profile screen.">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar name={name || "?"} color={color} size={64} />
            <div className="flex-1">
              <label className="label" htmlFor="pname">Name</label>
              <input id="pname" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} className="input" />
            </div>
          </div>
          <div>
            <span className="label">Avatar color</span>
            <ColorPicker value={color} onChange={setColor} />
          </div>
          <div>
            <span className="label">Style preferences — the AI Stylist uses these</span>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button key={s} onClick={() => setPrefs((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))} className={clsx("chip capitalize", prefs.includes(s) && "chip-active")}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => save({ name, avatarColor: color, stylePreferences: prefs }, "Profile saved")} className="btn-primary">Save profile</button>
        </div>
      </Section>

      <Section title="Change PIN" description="4–8 digits. Changing it signs you out on your other devices.">
        <form
          className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
          onSubmit={async (e) => {
            e.preventDefault();
            if (await save(pins, "PIN updated")) setPins({ currentPin: "", newPin: "" });
          }}
        >
          <input value={pins.currentPin} onChange={(e) => setPins({ ...pins, currentPin: e.target.value.replace(/\D/g, "") })} inputMode="numeric" maxLength={8} placeholder="Current PIN" type="password" className="input" required />
          <input value={pins.newPin} onChange={(e) => setPins({ ...pins, newPin: e.target.value.replace(/\D/g, "") })} inputMode="numeric" maxLength={8} minLength={4} placeholder="New PIN" type="password" className="input" required />
          <button className="btn-ghost">Update</button>
        </form>
      </Section>

      <Section title="This device" description="Lock returns to the profile screen. Unpairing removes this browser from the household.">
        <div className="flex flex-wrap gap-2">
          <button onClick={async () => { await api("/api/lock", { method: "POST" }); window.location.href = "/profiles"; }} className="btn-ghost">Lock</button>
          <button
            onClick={async () => {
              if (!confirm("Unpair this device? You'll need the admin key or a pairing key to use Veyra here again.")) return;
              await api("/api/devices/self", { method: "DELETE" });
              window.location.href = "/pair";
            }}
            className="btn-danger"
          >
            Unpair this device
          </button>
        </div>
      </Section>
    </div>
  );
}
