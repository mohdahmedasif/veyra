"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { api } from "@/components/Toast";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const body = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      await api("/api/register", { method: "POST", json: body });
      await signIn("credentials", { email: body.email, password: body.password, redirect: false });
      await api("/api/devices/self", { method: "POST", json: { name: "Admin browser" } });
      router.push("/wardrobe/new");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <p className="eyebrow">New household</p>
        <h1 className="mt-1 text-3xl">Create your closet</h1>
        <p className="mt-1 text-sm text-muted">You&apos;ll be the admin — add family profiles and pair devices later.</p>
      </div>
      <div>
        <label className="label" htmlFor="name">Your name</label>
        <input id="name" name="name" required autoComplete="name" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required className="input" />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required placeholder="8+ characters" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="pin">Profile PIN</label>
        <input id="pin" name="pin" inputMode="numeric" pattern="\d{4,6}" maxLength={6} required placeholder="4–6 digits" className="input tracking-[0.4em]" />
        <p className="mt-1 text-xs text-muted">Used to unlock your profile on shared devices.</p>
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button disabled={loading} className="btn-primary w-full">{loading ? "Creating…" : "Create household"}</button>
      <p className="text-center text-sm text-muted">
        Already set up? <Link href="/login" className="text-ink underline underline-offset-4">Sign in</Link>
      </p>
    </form>
  );
}
