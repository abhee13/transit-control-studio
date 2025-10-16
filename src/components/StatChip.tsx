import React from "react";

export default function StatChip({
  label,
  value,
  delta,
}: {
  label: string;
  value: string | number;
  delta?: number;
}) {
  const tone =
    delta === undefined
      ? ""
      : delta > 0
      ? "text-emerald-400 bg-emerald-400/10"
      : delta < 0
      ? "text-rose-400 bg-rose-400/10"
      : "text-white/70 bg-white/10";

  return (
    <div className="glass rounded-xl p-3 flex items-center justify-between">
      <div className="text-white/60 text-xs tracking-wide">{label}</div>
      <div className="flex items-center gap-2">
        <div className="text-lg font-semibold text-white">{value}</div>
        {delta !== undefined && (
          <span className={`px-2 py-1 rounded-lg text-xs ${tone}`}>
            {delta > 0 ? `+${delta}%` : `${delta}%`}
          </span>
        )}
      </div>
    </div>
  );
}
