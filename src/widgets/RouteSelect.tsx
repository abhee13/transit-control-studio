import React, { useEffect, useMemo, useRef, useState } from "react";

type RouteItem = { id: string; label: string };
type Props = {
  routes: RouteItem[];
  value: RouteItem | null;
  onChange: (route: RouteItem | null) => void;
  placeholder?: string;
};

export default function RouteSelect({
  routes,
  value,
  onChange,
  placeholder = "Type a route number or name...",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return routes.slice(0, 50);
    return routes
      .filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.label.toLowerCase().includes(q)
      )
      .slice(0, 100);
  }, [routes, query]);

  useEffect(() => {
    setHighlight((h) => {
      if (filtered.length === 0) {
        return 0;
      }
      return Math.min(h, filtered.length - 1);
    });
  }, [filtered]);

  useEffect(() => {
    if (open) return;
    if (value) {
      setQuery(`${value.id} — ${value.label}`);
    } else {
      setQuery("");
    }
  }, [value, open]);

  // close on outside click
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
    };
  }, []);

  function commit(idx: number) {
    const item = filtered[idx];
    if (item) {
      onChange(item);
      setQuery(`${item.id} — ${item.label}`);
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full" data-ui="routes-panel">
      <input
        ref={inputRef}
        type="text"
        className="w-full rounded-xl bg-slate-900/50 ring-1 ring-slate-700/60 focus:ring-2 focus:ring-indigo-500 px-4 py-3 text-slate-100 placeholder:text-slate-400 outline-none"
        placeholder={placeholder}
        value={
          open
            ? query
            : value
            ? `${value.id} — ${value.label}`
            : query
        }
        onFocus={() => {
          setOpen(true);
          setHighlight(0);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setHighlight(0);
        }}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
            setOpen(true);
            return;
          }
          if (!open) return;
          if (e.key === "ArrowDown") {
            if (filtered.length === 0) return;
            e.preventDefault();
            setHighlight((h) => Math.min(h + 1, filtered.length - 1));
          } else if (e.key === "ArrowUp") {
            if (filtered.length === 0) return;
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
          } else if (e.key === "Enter") {
            if (filtered.length === 0) return;
            e.preventDefault();
            commit(highlight);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      {open && (
        <div
          className="route-menu top-full"
          data-ui="route-menu"
          role="listbox"
          id="route-select-list"
        >
          <ul className="py-2">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-slate-400">No matches</li>
            )}
            {filtered.map((r, i) => (
              <li
                key={r.id}
                role="option"
                aria-selected={i === highlight}
                className="item select-none text-sm"
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => commit(i)}
              >
                <span className="truncate block text-[0.95rem]">
                  {r.id} — {r.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
