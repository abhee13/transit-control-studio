import { Fragment, useMemo, useState, type SVGProps } from "react";
import { Combobox, Transition } from "@headlessui/react";

type Route = { id: string; name: string };

type Props = {
  /** Full list of routes */
  routes: Route[];
  /** Currently selected routes (multi) */
  value: Route[];
  /** Called with the new selection */
  onChange: (routes: Route[]) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Optional: className for outer wrapper */
  className?: string;
};

export default function RouteMultiSelect({
  routes,
  value,
  onChange,
  placeholder = "Type a route number or name…",
  className = "",
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return routes;
    const q = query.toLowerCase();
    return routes.filter(
      (r) => r.id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    );
  }, [routes, query]);

  const isSelected = (id: string) => value.some((r) => r.id === id);

  const toggle = (route: Route) => {
    if (isSelected(route.id)) {
      onChange(value.filter((r) => r.id !== route.id));
    } else {
      onChange([...value, route]);
    }
  };

  const clearAll = () => onChange([]);

  const removeOne = (id: string) => onChange(value.filter((r) => r.id !== id));

  return (
    <div className={`relative ${className}`} data-ui="routes-panel">
      <Combobox multiple value={value} onChange={onChange}>
        {/* Input w/ chips */}
        <div className="flex min-h-[3.25rem] w-full items-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.10)] bg-[rgba(22,28,41,0.75)] px-3 py-2 ring-1 ring-transparent focus-within:ring-[rgba(88,101,242,0.7)]">
          {/* Selected chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {value.map((r) => (
              <span
                key={r.id}
                className="group inline-flex items-center gap-1 rounded-xl bg-[rgba(88,101,242,0.18)] px-2 py-0.5 text-[13px] text-slate-200"
                title={`${r.id} — ${r.name}`}
              >
                <span className="tabular-nums">{r.id}</span>
                <span className="opacity-75">{r.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${r.name}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => removeOne(r.id)}
                  className="ml-0.5 rounded p-0.5 text-slate-300/80 hover:bg-white/10 hover:text-white"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Search input grows to fill */}
          <Combobox.Input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            displayValue={() => ""}
            placeholder={value.length ? "" : placeholder}
            className="combobox-input ml-1 flex-1 bg-transparent text-[15px] leading-6 text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />

          {/* Clear all */}
          {value.length > 0 && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={clearAll}
              className="rounded-xl bg-white/5 px-2 py-1 text-xs text-slate-200 hover:bg-white/10"
            >
              Clear
            </button>
          )}

          {/* Chevron (purely decorative) */}
          <ChevronDownIcon className="ml-1 h-4 w-4 text-slate-400" />
        </div>

        {/* Options menu */}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <Combobox.Options
            static
            className="route-menu absolute z-[70] mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-white/10 bg-[rgba(10,14,25,0.98)] p-1 shadow-2xl"
            data-ui="route-menu"
          >
            {/* Top utility row */}
            <div className="mb-1 flex items-center justify-between gap-2 rounded-xl bg-white/3 px-2 py-1.5 text-xs text-slate-300">
              <button
                type="button"
                className="rounded-lg px-2 py-1 hover:bg-white/10"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onChange(routes)}
              >
                Select all
              </button>
              <button
                type="button"
                className="rounded-lg px-2 py-1 hover:bg-white/10"
                onMouseDown={(e) => e.preventDefault()}
                onClick={clearAll}
              >
                Clear
              </button>
              <span className="opacity-60">
                {value.length}/{routes.length} selected
              </span>
            </div>

            {/* Items */}
            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-sm text-slate-400">No matches</div>
            ) : (
              filtered.map((r) => (
                <Combobox.Option key={r.id} value={r} as={Fragment}>
                  {({ active }) => (
                    <div
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => toggle(r)}
                      className={`item flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-[14px] ${
                        active ? "bg-white/10 text-slate-50" : "text-slate-200"
                      }`}
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="tabular-nums text-slate-300">{r.id}</span>
                        <span className="opacity-80">{r.name}</span>
                      </div>
                      {isSelected(r.id) && (
                        <CheckIcon className="h-4 w-4 text-indigo-300" />
                      )}
                    </div>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l7 7m0-7l-7 7" />
    </svg>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 8.25l3 3 5.5-6" />
    </svg>
  );
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.5l4.25 4 4.25-4" />
    </svg>
  );
}
