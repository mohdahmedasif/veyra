"use client";

import { ThemeToggle } from "../ThemeToggle";
import { Section } from "./Section";

const SWATCHES = [
  { name: "Porcelain", var: "--bg" },
  { name: "Espresso", var: "--ink" },
  { name: "Rose clay", var: "--accent" },
  { name: "Champagne", var: "--gold" },
  { name: "Linen", var: "--surface-2" },
];

export function Appearance() {
  return (
    <Section title="Appearance" description="Veyra follows your device by default. This choice is saved on this device.">
      <ThemeToggle />
      <div className="mt-6 grid grid-cols-5 gap-2">
        {SWATCHES.map((s) => (
          <div key={s.name} className="text-center">
            <div className="aspect-square rounded-2xl ring-1 ring-line" style={{ background: `rgb(var(${s.var}))` }} />
            <p className="mt-1.5 text-[11px] text-muted">{s.name}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
