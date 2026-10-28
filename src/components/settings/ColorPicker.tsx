import clsx from "clsx";
import { AVATAR_COLORS } from "@/types";

export function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {AVATAR_COLORS.map((c) => (
        <button
          type="button"
          key={c}
          aria-label={`Color ${c}`}
          onClick={() => onChange(c)}
          className={clsx("h-9 w-9 rounded-full transition", value === c && "ring-2 ring-accent ring-offset-2 ring-offset-surface")}
          style={{ background: c }}
        />
      ))}
    </div>
  );
}
