"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { Icon } from "./Icon";

/** Numeric keypad with dot indicators; supports the physical keyboard too. */
export function PinPad({
  value,
  onChange,
  length = 4,
  maxLength = 6,
  onSubmit,
  error,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  length?: number;
  maxLength?: number;
  onSubmit: () => void;
  error?: boolean;
  disabled?: boolean;
}) {
  const press = (d: string) => !disabled && value.length < maxLength && onChange(value + d);
  const back = () => !disabled && onChange(value.slice(0, -1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") back();
      else if (e.key === "Enter" && value.length >= length) onSubmit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const dots = Math.max(length, value.length);
  return (
    <div className="flex flex-col items-center">
      <div className={clsx("mb-8 flex h-4 gap-3", error && "animate-shake")}>
        {Array.from({ length: dots }, (_, i) => (
          <span key={i} className={clsx("h-3.5 w-3.5 rounded-full border-2 transition", i < value.length ? (error ? "border-danger bg-danger" : "border-ink bg-ink") : "border-line")} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => <Key key={d} onClick={() => press(d)} disabled={disabled}>{d}</Key>)}
        <Key onClick={back} disabled={disabled} aria-label="Delete" subtle><Icon name="backspace" size={22} /></Key>
        <Key onClick={() => press("0")} disabled={disabled}>0</Key>
        <Key onClick={onSubmit} disabled={disabled || value.length < length} aria-label="Unlock" accent>→</Key>
      </div>
    </div>
  );
}

function Key({ children, subtle, accent, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { subtle?: boolean; accent?: boolean }) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        "flex h-[68px] w-[68px] items-center justify-center rounded-full font-serif text-[1.7rem] transition active:scale-95 disabled:opacity-40",
        accent ? "bg-accent text-accent-ink" : subtle ? "text-muted hover:bg-surface-2" : "border border-line bg-surface hover:bg-surface-2",
      )}
    >
      {children}
    </button>
  );
}
