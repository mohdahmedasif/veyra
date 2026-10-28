"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import type { CropRect } from "@/lib/image-client";

type Handle = "move" | "nw" | "ne" | "sw" | "se";
const MIN = 0.08;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Full-screen crop: drag the box or its corners. Works with touch and mouse. */
export function CropEditor({ src, onApply, onCancel }: { src: string; onApply: (r: CropRect) => void; onCancel: () => void }) {
  const [rect, setRect] = useState<CropRect>({ x: 0.05, y: 0.05, w: 0.9, h: 0.9 });
  const frame = useRef<HTMLDivElement>(null);
  const drag = useRef<{ handle: Handle; start: { x: number; y: number }; rect: CropRect } | null>(null);

  const point = (e: React.PointerEvent) => {
    const b = frame.current!.getBoundingClientRect();
    return { x: (e.clientX - b.left) / b.width, y: (e.clientY - b.top) / b.height };
  };

  function onDown(handle: Handle) {
    return (e: React.PointerEvent) => {
      e.stopPropagation();
      (e.target as Element).setPointerCapture(e.pointerId);
      drag.current = { handle, start: point(e), rect };
    };
  }

  function onMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const p = point(e);
    const dx = p.x - d.start.x, dy = p.y - d.start.y;
    const r = { ...d.rect };
    if (d.handle === "move") {
      r.x = clamp(r.x + dx, 0, 1 - r.w);
      r.y = clamp(r.y + dy, 0, 1 - r.h);
    } else {
      const right = r.x + r.w, bottom = r.y + r.h;
      if (d.handle.includes("w")) r.x = clamp(r.x + dx, 0, right - MIN);
      if (d.handle.includes("n")) r.y = clamp(r.y + dy, 0, bottom - MIN);
      r.w = (d.handle.includes("e") ? clamp(right + dx, r.x + MIN, 1) : right) - r.x;
      r.h = (d.handle.includes("s") ? clamp(bottom + dy, r.y + MIN, 1) : bottom) - r.y;
    }
    setRect(r);
  }

  const pct = (v: number) => `${v * 100}%`;
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0d0a09]/95 pt-safe pb-safe">
      <div className="flex items-center justify-between px-4 py-3 text-sm text-white">
        <button onClick={onCancel} className="min-h-[44px] px-2 opacity-80">Cancel</button>
        <span className="font-medium">Crop to the garment</span>
        <button onClick={() => setRect({ x: 0, y: 0, w: 1, h: 1 })} className="min-h-[44px] px-2 opacity-80">Reset</button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center p-6">
        <div ref={frame} className="relative max-h-full touch-none select-none" onPointerMove={onMove} onPointerUp={() => (drag.current = null)}>
          <img src={src} alt="" draggable={false} className="block max-h-[70dvh] max-w-full bg-[repeating-conic-gradient(#3a3330_0_25%,#2a2421_0_50%)] bg-[length:20px_20px]" />
          <div
            onPointerDown={onDown("move")}
            className="absolute cursor-move border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]"
            style={{ left: pct(rect.x), top: pct(rect.y), width: pct(rect.w), height: pct(rect.h) }}
          >
            <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }, (_, i) => <span key={i} className="border border-white/20" />)}
            </div>
            {(["nw", "ne", "sw", "se"] as const).map((h) => (
              <span
                key={h}
                onPointerDown={onDown(h)}
                className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white/30"
                style={{ left: h.includes("w") ? 0 : "100%", top: h.includes("n") ? 0 : "100%", cursor: `${h}-resize` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <button onClick={() => onApply(rect)} className="btn w-full bg-white text-[#231A16]">Apply crop</button>
      </div>
    </div>
  );
}
