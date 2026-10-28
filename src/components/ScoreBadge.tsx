export function ScoreBadge({ score }: { score: number }) {
  const tone = score >= 85 ? "bg-emerald-50 text-emerald-700" : score >= 70 ? "bg-sand-100 text-taupe-800" : "bg-blush-100 text-blush-600";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{score}% match</span>;
}
