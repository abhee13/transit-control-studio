export type RailLine = "green" | "blue" | "red" | "orange" | "silver";
const COLORS: Record<RailLine, string> = {
  green: "#22c55e",
  blue: "#60a5fa",
  red: "#ef4444",
  orange: "#fb923c",
  silver: "#cbd5e1",
};

export default function RailToggles({
  enabled,
  onToggle,
}: { enabled: Record<RailLine, boolean>; onToggle: (k: RailLine) => void }) {
  const lines: RailLine[] = ["green", "blue", "red", "orange", "silver"];
  return (
    <div className="glass rounded-2xl p-4 space-y-2">
      <div className="text-xs uppercase tracking-wider text-slate-300">Rail lines</div>
      <div className="grid grid-cols-2 gap-3">
        {lines.map((line) => (
          <button
            key={line}
            onClick={() => onToggle(line)}
            className={`rounded-lg px-3 py-2 text-sm text-left border transition
              ${enabled[line] ? "border-brand-500/60 shadow-glow" : "border-white/10 opacity-80 hover:opacity-100"}`}
            style={{ boxShadow: enabled[line] ? "0 0 0 2px rgba(99,102,241,.35)" : undefined }}
          >
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS[line as RailLine] }} />
              <span className="capitalize">{line} line</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">{enabled[line] ? "Visible" : "Hidden"}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
