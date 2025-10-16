import { useEffect, useMemo, useRef, useState } from "react";

type Option = { id: string; label: string; sub?: string };

type SearchSelectProps = {
  options: Option[];
  value: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
  maxHeight?: number;
};

export default function SearchSelect({
  options,
  value,
  onChange,
  placeholder = "Search routes…",
  maxHeight = 240,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return options.slice(0, 50);
    return options
      .filter((option) => option.label.toLowerCase().includes(search) || option.id.toLowerCase().includes(search))
      .slice(0, 50);
  }, [query, options]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const remove = (id: string) => onChange(value.filter((item) => item !== id));
  const add = (id: string) => {
    if (!value.includes(id)) {
      onChange([...value, id]);
    }
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative" ref={boxRef}>
      <div className="mb-2 flex flex-wrap gap-2">
        {value.map((id) => {
          const found = options.find((option) => option.id === id);
          return (
            <span key={id} className="chip bg-white/10 border-white/15 flex items-center gap-2">
              <span className="font-medium">{found?.id ?? id}</span>
              <button
                type="button"
                className="opacity-70 transition hover:opacity-100"
                onClick={() => remove(id)}
                aria-label={`Remove ${found?.label ?? id}`}
              >
                ×
              </button>
            </span>
          );
        })}
      </div>

      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-primary-500/50"
        aria-expanded={open}
        aria-haspopup="listbox"
      />

      {open && (
        <div
          role="listbox"
          className="card absolute z-20 mt-2 w-full overflow-auto p-2"
          style={{ maxHeight }}
        >
          {filtered.length === 0 && <div className="px-3 py-2 text-sm text-white/60">No matches</div>}
          {filtered.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => add(option.id)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-white transition hover:bg-white/5 focus:bg-white/5 focus:outline-none"
            >
              <span>{option.label}</span>
              <span className="text-white/50">{option.sub ?? option.id}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
