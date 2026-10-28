"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/components/Toast";
import { Icon } from "@/components/Icon";

function guessDeviceName() {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return "iPhone";
  if (/iPad/.test(ua)) return "iPad";
  if (/Android/.test(ua)) return "Android phone";
  if (/Mac/.test(ua)) return "Mac";
  if (/Windows/.test(ua)) return "Windows PC";
  return "Device";
}

export default function PairPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => setName(guessDeviceName()), []);

  const format = (v: string) => {
    const raw = v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
    return raw.length > 4 ? `${raw.slice(0, 4)}-${raw.slice(4)}` : raw;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api("/api/pair", { method: "POST", json: { code, name } });
      router.push("/profiles");
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
        <p className="mt-1 text-sm text-muted">
          Ask your household admin for a one-time key from <span className="text-ink">Settings → Devices</span>.
        </p>
      </div>
      <input
        value={code}
        onChange={(e) => setCode(format(e.target.value))}
        placeholder="XXXX-XXXX"
        autoCapitalize="characters"
        autoComplete="one-time-code"
        aria-label="Pairing key"
        required
        className="input text-center font-mono text-2xl tracking-[0.3em] sm:text-2xl"
      />
      <div>
        <label className="label" htmlFor="device">Device name</label>
        <input id="device" value={name} onChange={(e) => setName(e.target.value)} required maxLength={60} className="input" />
      </div>
      {error && <p className="text-center text-sm text-danger">{error}</p>}
      <button disabled={loading || code.length < 9} className="btn-primary w-full">{loading ? "Pairing…" : "Pair device"}</button>
      <p className="text-center text-sm text-muted">
        Household admin? <Link href="/login" className="text-ink underline underline-offset-4">Sign in instead</Link>
      </p>
    </form>
  );
}
