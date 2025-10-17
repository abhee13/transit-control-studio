import { Fragment, useMemo, useRef, useState, type SVGProps } from "react";
import { Combobox, Transition } from "@headlessui/react";

type Route = { id: string; name: string };

type Props = {
  routes: Route[];
  value: Route[];
  onChange: (next: Route[]) => void;
  placeholder?: string;
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
  const btnRef = useRef<HTMLButtonElement>(null);

  const filtered = useMemo(() => {
    if (!query) return routes;
    const q = query.toLowerCase();
    return routes.filter(
      (r) => r.id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    );
  }, [routes, query]);

  const isSelected = (r: Route) => value.some((v) => v.id === r.id);
  const toggle = (r: Route) =>
    isSelected(r)
      ? onChange(value.filter((v) => v.id !== r.id))
      : onChange([...value, r]);

  return (
    <div className={`lm-side-panel ${className}`}>
      <Combobox multiple value={value} onChange={onChange}>
        <div className="relative">
          <div className="flex items-center rounded-2xl border border-white/10 bg-panel-dark px-3 py-2 ring-1 ring-inset ring-white/5 focus-within:ring-2 focus-within:ring-indigo-400">
            <Combobox.Input
              className="ml-1 flex-1 bg-transparent text-[15px] leading-6 text-slate-100 placeholder:text-slate-400 focus:outline-none"
              placeholder={value.length ? "" : placeholder}
              displayValue={() => ""}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => btnRef.current?.click()} // auto-open on focus
            />
            <Combobox.Button
              ref={btnRef}
              className="ml-1 rounded-lg p-1.5 text-slate-400 hover:bg-white/10"
              aria-label="Toggle routes menu"
            >
              <ChevronDownIcon className="h-4 w-4" />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Combobox.Options
              className="route-menu absolute z-[70] mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-white/10 bg-[rgba(10,14,25,0.98)] p-1 shadow-2xl backdrop-blur"
              data-ui="route-menu"
            >
              <div className="mb-1 flex items-center justify-between gap-2 rounded-xl bg-white/5 px-2 py-1.5 text-xs text-slate-300">
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
                  onClick={() => onChange([])}
                >
                  Clear
                </button>
                <span className="opacity-60">
                  {value.length}/{routes.length} selected
                </span>
              </div>

              {filtered.length === 0 ? (
                <div className="px-3 py-3 text-sm text-slate-400">No matches</div>
              ) : (
                filtered.map((r) => (
                  <Combobox.Option key={r.id} value={r} as={Fragment}>
                    {({ active }) => {
                      const selected = isSelected(r);
                      return (
                        <div
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => toggle(r)}
                          className={`item flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-[14px] ${
                            active ? "bg-white/10 text-slate-50" : "text-slate-200"
                          }`}
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="tabular-nums text-slate-300">
                              {r.id}
                            </span>
                            <span className="opacity-80">{r.name}</span>
                          </div>
                          {selected && <CheckIcon className="h-4 w-4 text-indigo-300" />}
                        </div>
                      );
                    }}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
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
