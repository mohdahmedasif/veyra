"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", { email: form.get("email"), password: form.get("password"), redirect: false });
    setLoading(false);
    if (res?.error) return setError("Invalid email or password");
    router.push(params.get("callbackUrl") || "/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-3xl">Welcome back</h1>
        <p className="mt-1 text-sm text-taupe-600">Demo: demo@veyra.app / veyra123</p>
      </div>
      <input name="email" type="email" required placeholder="Email" className="input" />
      <input name="password" type="password" required placeholder="Password" className="input" />
      {error && <p className="text-sm text-blush-600">{error}</p>}
      <button disabled={loading} className="btn-primary w-full">{loading ? "Signing in…" : "Sign in"}</button>
      <p className="text-center text-sm text-taupe-600">
        New to Veyra? <Link href="/signup" className="text-ink underline">Create an account</Link>
      </p>
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
