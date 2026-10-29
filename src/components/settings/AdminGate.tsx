"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "../Icon";
import { api, useToast } from "../Toast";
import { Section } from "./Section";

/** Asks for the household ADMIN_KEY; unlocks household settings on this device for 15 minutes. */
export function AdminGate() {
  const router = useRouter();
  const toast = useToast();
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <Section title="Household settings" description="Profiles, devices and AI keys are protected by the household admin key. It stays unlocked on this device for 15 minutes.">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          try {
            await api("/api/admin/unlock", { method: "POST", json: { adminKey: key } });
            router.refresh();
          } catch (err) {
            toast((err as Error).message, "error");
            setBusy(false);
          }
        }}
      >
        <input value={key} onChange={(e) => setKey(e.target.value)} type="password" autoComplete="off" placeholder="Admin key" aria-label="Admin key" required className="input font-mono" autoFocus />
        <button disabled={busy || !key} className="btn-primary shrink-0"><Icon name="lock" size={16} /> {busy ? "Checking…" : "Unlock"}</button>
      </form>
    </Section>
  );
}
