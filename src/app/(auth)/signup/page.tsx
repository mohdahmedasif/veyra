"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!res.ok) {
      setLoading(false);
      return setError((await res.json()).error ?? "Something went wrong");
    }
    await signIn("credentials", { email: body.email, password: body.password, redirect: false });
    router.push("/wardrobe/new");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-3xl">Create your closet</h1>
        <p className="mt-1 text-sm text-taupe-600">Start styling smarter in under a minute.</p>
      </div>
      <input name="name" required placeholder="Name" className="input" />
      <input name="email" type="email" required placeholder="Email" className="input" />
      <input name="password" type="password" minLength={8} required placeholder="Password (8+ characters)" className="input" />
      {error && <p className="text-sm text-blush-600">{error}</p>}
      <button disabled={loading} className="btn-primary w-full">{loading ? "Creating…" : "Create account"}</button>
      <p className="text-center text-sm text-taupe-600">
        Already have an account? <Link href="/login" className="text-ink underline">Sign in</Link>
      </p>
    </form>
  );
}
