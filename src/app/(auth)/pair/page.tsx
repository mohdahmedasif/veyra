"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { api } from "@/components/Toast";

function guessDeviceName() {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return "iPhone";
  if (/iPad/.test(ua)) return "iPad";
  if (/Android/.test(ua)) return "Android phone";
  if (/Mac/.test(ua)) return "Mac";
  if (/Windows/.test(ua)) return "Windows PC";
  return "Device";
}

function PairForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [key, setKey] = useState("");
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);

  useEffect(() => {
    setLabel(guessDeviceName());
    // Already paired (e.g. arrived via a link from another site, where SameSite=Strict hides cookies)?
    api<{ paired: boolean; adminKeyConfigured: boolean }>("/api/auth/status")
      .then((s) => {
        if (s.paired) router.replace(`/profiles${params.get("next") ? `?next=${encodeURIComponent(params.get("next")!)}` : ""}`);
        setNotConfigured(!s.adminKeyConfigured);
      })
      .catch(() => {});
  }, [router, params]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api("/api/pair", { method: "POST", json: { key, label } });
      router.push(`/profiles${params.get("next") ? `?next=${encodeURIComponent(params.get("next")!)}` : ""}`);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Icon name="key" size={26} />
        </span>
        <h1 className="text-3xl">Pair this device</h1>
        <p className="mt-1 text-sm text-muted">Enter the household admin key — or a one-time pairing key from Settings → Devices on a paired phone.</p>
      </div>
      {notConfigured && (
        <p className="rounded-2xl bg-danger/10 p-3 text-sm text-danger">
          The server has no <code className="font-mono">ADMIN_KEY</code> set yet. Add it to the environment and restart.
        </p>
      )}
      <input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        type="password"
        placeholder="Admin key or XXXX-XXXX"
        autoComplete="off"
        autoCapitalize="none"
        aria-label="Admin or pairing key"
        required
        className="input text-center font-mono text-lg tracking-widest"
      />
      <div>
        <label className="label" htmlFor="device">Device name</label>
        <input id="device" value={label} onChange={(e) => setLabel(e.target.value)} required maxLength={60} className="input" />
      </div>
      {error && <p className="text-center text-sm text-danger">{error}</p>}
      <button disabled={loading || key.length < 4} className="btn-primary w-full">{loading ? "Pairing…" : "Pair device"}</button>
      <p className="text-center text-xs text-muted">No accounts or emails — this device stays paired for a year.</p>
    </form>
  );
}

export default function PairPage() {
  return (
    <Suspense>
      <PairForm />
    </Suspense>
  );
}
