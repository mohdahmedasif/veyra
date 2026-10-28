"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { api, useToast } from "../Toast";
import { Section } from "./Section";

interface D { id: string; name: string; lastSeenAt: string; createdAt: string; current: boolean }

const ago = (iso: string) => {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 2) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return h < 48 ? `${h}h ago` : `${Math.round(h / 24)} days ago`;
};

export function Devices({ devices }: { devices: D[] }) {
  const router = useRouter();
  const toast = useToast();
  const [pairing, setPairing] = useState<{ code: string; expiresAt: string } | null>(null);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!pairing) return;
    const tick = () => {
      const s = Math.max(0, Math.round((new Date(pairing.expiresAt).getTime() - Date.now()) / 1000));
      setLeft(s);
      if (!s) setPairing(null);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [pairing]);

  async function generate() {
    try {
      setPairing(await api("/api/admin/pairing", { method: "POST" }));
    } catch (err) {
      toast((err as Error).message, "error");
    }
  }

  async function revoke(d: D) {
    if (!confirm(d.current ? "Unpair this device? You'll need to sign in or use a pairing key again." : `Revoke ${d.name}? It will be signed out immediately.`)) return;
    try {
      if (d.current) {
        await api("/api/devices/self", { method: "DELETE" });
        window.location.href = "/login";
        return;
      }
      await api(`/api/admin/devices/${d.id}`, { method: "DELETE" });
      toast("Device revoked", "success");
      router.refresh();
    } catch (err) {
      toast((err as Error).message, "error");
    }
  }

  return (
    <div className="space-y-6">
      <Section title="Pair a new device" description="Generate a one-time key, then open Veyra on the other device and enter it on the pairing screen.">
        {pairing ? (
          <div className="glow rounded-2xl border border-line p-6 text-center">
            <p className="font-mono text-4xl font-semibold tracking-[0.25em] md:text-5xl" aria-label="Pairing key">{pairing.code}</p>
            <p className="mt-2 text-sm text-muted">
              Single use · expires in {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => navigator.clipboard?.writeText(pairing.code).then(() => toast("Copied", "success"))}
                className="btn-ghost"
              >
                Copy key
              </button>
              <button onClick={generate} className="btn-ghost">New key</button>
            </div>
            <p className="mt-4 text-xs text-muted">On the new device, go to <span className="font-mono text-ink">{typeof window !== "undefined" ? window.location.host : ""}/pair</span></p>
          </div>
        ) : (
          <button onClick={generate} className="btn-accent"><Icon name="key" size={18} /> Generate pairing key</button>
        )}
      </Section>

      <Section title="Paired devices" description="Devices that can show the profile screen.">
        <ul className="divide-y divide-line">
          {devices.map((d) => (
            <li key={d.id} className="flex items-center gap-3 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted"><Icon name="device" size={18} /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {d.name} {d.current && <span className="ml-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">This device</span>}
                </p>
                <p className="text-xs text-muted">Active {ago(d.lastSeenAt)} · paired {new Date(d.createdAt).toLocaleDateString()}</p>
              </div>
              <button onClick={() => revoke(d)} className="btn-danger min-h-[38px] px-4">{d.current ? "Unpair" : "Revoke"}</button>
            </li>
          ))}
          {!devices.length && <li className="py-3 text-sm text-muted">No paired devices yet.</li>}
        </ul>
      </Section>
    </div>
  );
}
