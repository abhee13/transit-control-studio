import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
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

  // keep dropdown aligned with input
  useEffect(() => {
    function update() {
      if (inputRef.current) {
        setAnchorRect(inputRef.current.getBoundingClientRect());
      }
    }
    update();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", update);
      window.addEventListener("scroll", update, true);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", update);
        window.removeEventListener("scroll", update, true);
      }
    };
  }, []);

  // close on outside click
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    function onDocClick(e: MouseEvent) {
      if (!inputRef.current) return;
      const el = inputRef.current;
      const list = document.getElementById("route-select-list");
      if (!el.contains(e.target as Node) && !list?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
    };
  }, []);

  // compute menu placement (open up if near bottom)
  const menuStyle: React.CSSProperties = useMemo(() => {
    if (!anchorRect) return { display: "none" };
    if (typeof window === "undefined") {
      return {
        position: "fixed",
        zIndex: 9999,
        left: anchorRect.left,
        width: anchorRect.width,
      };
    }
    const gap = 6;
    const viewportH = window.innerHeight;
    const preferUp =
      anchorRect.bottom + 320 > viewportH && anchorRect.top > 320;
    const top = preferUp ? anchorRect.top - gap : anchorRect.bottom + gap;
    return {
      position: "fixed",
      zIndex: 9999,
      left: anchorRect.left,
      width: anchorRect.width,
      maxHeight: Math.min(
        320,
        preferUp
          ? anchorRect.top - 8
          : viewportH - anchorRect.bottom - 8
      ),
      top: preferUp ? undefined : top,
      bottom: preferUp ? viewportH - anchorRect.top + gap : undefined,
    };
  }, [anchorRect]);

  function commit(idx: number) {
    const item = filtered[idx];
    if (item) {
      onChange(item);
      setQuery(`${item.id} — ${item.label}`);
      setOpen(false);
    }
  }

  return (
    <div className="relative w-full">
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
          setTimeout(() => {
            if (inputRef.current) {
              setAnchorRect(inputRef.current.getBoundingClientRect());
            }
          }, 0);
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
            e.preventDefault();
            setHighlight((h) => Math.min(h + 1, filtered.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            commit(highlight);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />

      {/* Portalled dropdown to avoid clipping by overflow */}
      {open && anchorRect && typeof document !== "undefined" &&
        createPortal(
          <div
            id="route-select-list"
            style={menuStyle}
            className="rounded-xl bg-slate-900/95 backdrop-blur-md shadow-2xl ring-1 ring-slate-700/60 overflow-auto"
          >
            <ul className="py-2">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-slate-400">No matches</li>
              )}
              {filtered.map((r, i) => (
                <li
                  key={r.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => commit(i)}
                  className={
                    "px-3 py-2 cursor-pointer select-none text-sm flex items-center justify-between " +
                    (i === highlight
                      ? "bg-indigo-600/20 text-slate-100"
                      : "text-slate-200 hover:bg-slate-700/40")
                  }
                >
                  <span className="truncate">
                    {r.id} — {r.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
