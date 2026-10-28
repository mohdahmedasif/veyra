import clsx from "clsx";

export function Avatar({ name, color, size = 40, className }: { name: string; color: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={clsx("inline-flex shrink-0 select-none items-center justify-center rounded-full font-serif font-semibold text-white", className)}
      style={{ background: `linear-gradient(145deg, ${color}, ${color}cc)`, width: size, height: size, fontSize: size * 0.45 }}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
