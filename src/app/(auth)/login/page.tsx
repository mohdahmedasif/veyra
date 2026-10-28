"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";
import { api } from "@/components/Toast";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", { email: form.get("email"), password: form.get("password"), redirect: false });
    if (res?.error) {
      setLoading(false);
      return setError("Invalid email or password");
    }
    // Trust this browser and unlock the admin profile.
    await api("/api/devices/self", { method: "POST", json: { name: navigator.platform || "Admin browser" } }).catch(() => {});
    router.push(params.get("next") || "/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <p className="eyebrow">Admin sign in</p>
        <h1 className="mt-1 text-3xl">Welcome back</h1>
        <p className="mt-1 text-sm text-muted">Demo: demo@veyra.app / veyra123</p>
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required className="input" />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="input" />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button disabled={loading} className="btn-primary w-full">{loading ? "Signing in…" : "Sign in"}</button>
      <div className="flex justify-between text-sm text-muted">
        <Link href="/pair" className="underline-offset-4 hover:text-ink hover:underline">Have a pairing key?</Link>
        <Link href="/signup" className="underline-offset-4 hover:text-ink hover:underline">Create household</Link>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
