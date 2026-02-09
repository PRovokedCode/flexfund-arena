export default function StatBadge({ type, value }) {
  // FLEX BADGE
  if (type === "flex") {
    const style =
      value >= 70
        ? "bg-red-500/10 text-red-600 ring-1 ring-red-500/30"
        : value >= 40
        ? "bg-yellow-400/10 text-yellow-700 ring-1 ring-yellow-400/30"
        : "bg-green-500/10 text-green-600 ring-1 ring-green-500/30";

    return (
      <span
        className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${style}`}
      >
        ⚡ {value}
      </span>
    );
  }

  // AI VERIFIED BADGE
  if (type === "ai") {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/30">
        <span className="text-sm">✔</span>
        AI Verified
      </span>
    );
  }

  return null;
}
