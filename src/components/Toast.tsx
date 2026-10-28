"use client";

import clsx from "clsx";
import { createContext, useCallback, useContext, useState } from "react";

type Tone = "success" | "error" | "info";
interface Toast { id: number; message: string; tone: Tone }

const ToastCtx = createContext<(message: string, tone?: Tone) => void>(() => {});

export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((message: string, tone: Tone = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex flex-col items-center gap-2 px-4 md:bottom-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={clsx(
              "animate-fade-up rounded-full px-5 py-3 text-sm font-medium shadow-lift",
              t.tone === "error" ? "bg-danger text-white" : t.tone === "success" ? "bg-ink text-bg" : "bg-surface text-ink border border-line",
            )}
          >
            {t.tone === "success" && "✓ "}
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/** fetch + JSON with a thrown Error carrying the API's message. */
export async function api<T = unknown>(url: string, init?: RequestInit & { json?: unknown }): Promise<T> {
  const { json, ...rest } = init ?? {};
  const res = await fetch(url, {
    ...rest,
    ...(json !== undefined ? { body: JSON.stringify(json), headers: { "Content-Type": "application/json", ...rest.headers } } : {}),
  });
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Something went wrong");
  return data as T;
}
