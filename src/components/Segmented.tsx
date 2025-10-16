type Option = { label: string; value: string };
export default function Segmented({
  value,
  onChange,
  options,
}: { value: string; onChange: (v: string) => void; options: Option[] }) {
  return (
    <div className="glass inline-flex rounded-xl p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-1 rounded-lg text-sm transition
            ${value === o.value ? "bg-brand-600 text-white shadow-glow" : "text-slate-300 hover:text-white"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
