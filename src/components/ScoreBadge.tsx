import clsx from "clsx";

export function ScoreBadge({ score }: { score: number }) {
  return (
    <span
      className={clsx(
        "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
        score >= 85 ? "bg-success/15 text-success" : score >= 70 ? "bg-gold/20 text-ink" : "bg-accent-soft text-accent",
      )}
    >
      {score}% match
    </span>
  );
}
