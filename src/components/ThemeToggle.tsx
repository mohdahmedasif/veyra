"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { THEME_KEY } from "./ThemeScript";

type Theme = "system" | "light" | "dark";

function apply(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#14100E" : "#FAF7F2");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    try {
      setTheme((localStorage.getItem(THEME_KEY) as Theme) || "system");
    } catch {}
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      try {
        if ((localStorage.getItem(THEME_KEY) || "system") === "system") apply("system");
      } catch {}
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const set = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {}
    apply(t);
  };
  return [theme, set] as const;
}

const OPTIONS: { value: Theme; label: string; icon: string }[] = [
  { value: "system", label: "System", icon: "◐" },
  { value: "light", label: "Light", icon: "☀" },
  { value: "dark", label: "Dark", icon: "☾" },
];

/** Segmented control. `compact` shows icons only (for the nav). */
export function ThemeToggle({ compact }: { compact?: boolean }) {
  const [theme, setTheme] = useTheme();
  return (
    <div role="radiogroup" aria-label="Theme" className="inline-flex rounded-full border border-line bg-surface p-1">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={theme === o.value}
          aria-label={o.label}
          onClick={() => setTheme(o.value)}
          className={clsx(
            "flex items-center gap-1.5 rounded-full text-xs font-medium transition",
            compact ? "h-8 w-8 justify-center" : "min-h-[36px] px-4",
            theme === o.value ? "bg-ink text-bg" : "text-muted hover:text-ink",
          )}
        >
          <span aria-hidden>{o.icon}</span>
          {!compact && o.label}
        </button>
      ))}
    </div>
  );
}
