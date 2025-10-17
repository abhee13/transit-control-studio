import React, { useMemo, useRef, useState, useEffect } from "react";

export type Option = { id: string; label: string };

type Props = {
  options: Option[];
  selected: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function RouteMultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Type a route number or name…",
  disabled,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
    );
  }, [options, query]);

  const toggle = (id: string) => {
    if (selected.includes(id)) onChange(selected.filter((s) => s !== id));
    else onChange([...selected, id]);
  };

  const allVisibleIds = filtered.map((o) => o.id);

  const selectAllVisible = () => {
    const merged = Array.from(new Set([...selected, ...allVisibleIds]));
    onChange(merged);
  };

  const clearVisible = () => {
    onChange(selected.filter((id) => !allVisibleIds.includes(id)));
  };

  const clearAll = () => onChange([]);

  const selectedCount = selected.length;

  return (
    <div ref={rootRef} className={`route-multi-select ${className}`}>
      {/* Input */}
      <div
        className={`rms-input ${disabled ? "rms-disabled" : ""}`}
        onClick={() => !disabled && setOpen((v) => !v)}
      >
        <input
          className="rms-input-field"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          disabled={disabled}
        />
        <span className="rms-caret" aria-hidden>
          ▾
        </span>
      </div>

      {/* Chips */}
      {selectedCount > 0 && (
        <div className="rms-chips">
          {selected.slice(0, 8).map((id) => {
            const opt = options.find((o) => o.id === id);
            const label = opt?.label ?? id;
            return (
              <button
                key={id}
                className="rms-chip"
                onClick={() => toggle(id)}
                title="Remove"
              >
                {label}
                <span className="rms-x">×</span>
              </button>
            );
          })}
          {selectedCount > 8 && (
            <span className="rms-more">+{selectedCount - 8} more</span>
          )}
          <button className="rms-clear-all" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}

      {/* Dropdown */}
      {open && !disabled && (
        <div className="rms-popover">
          <div className="rms-toolbar">
            <button onClick={selectAllVisible}>
              Select all
            </button>
            <button onClick={clearVisible}>
              Clear visible
            </button>
            <span className="rms-count">
              {selectedCount}/{options.length} selected
            </span>
          </div>
          <ul className="rms-list" role="listbox" aria-multiselectable>
            {filtered.length === 0 && (
              <li className="rms-empty">No matches</li>
            )}
            {filtered.map((o) => {
              const isSel = selected.includes(o.id);
              return (
                <li
                  key={o.id}
                  className={`rms-item ${isSel ? "rms-item--sel" : ""}`}
                  onClick={() => toggle(o.id)}
                >
                  <span className={`rms-check ${isSel ? "rms-check--on" : ""}`}>
                    ✓
                  </span>
                  <span className="rms-label">{o.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
