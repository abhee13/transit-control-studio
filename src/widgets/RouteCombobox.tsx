import { Fragment, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

// A curated set of Dallas routes (code + name). Add more as needed.
const ROUTES = [
  { code: "001", name: "Malcolm X — Maple" },
  { code: "003", name: "Ross" },
  { code: "005", name: "Love Field Shuttle" },
  { code: "009", name: "Jefferson Gaston" },
  { code: "013", name: "Ervay" },
  { code: "018", name: "Samuell" },
  { code: "020", name: "Northwest Hwy" },
  { code: "022", name: "Forest Lane" },
  { code: "023", name: "Haskell" },
  { code: "025", name: "Cockrell Hill North" },
  { code: "027", name: "Ridgecrest" },
  { code: "028", name: "Singleton" },
  { code: "030", name: "Lake June" },
  { code: "038", name: "Ledbetter" },
  { code: "041", name: "Bonnie View" },
  { code: "047", name: "Polk" },
  { code: "057", name: "Westmoreland" },
];

export function RouteCombobox({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return ROUTES;
    const q = query.toLowerCase();
    return ROUTES.filter(
      (r) =>
        r.code.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q)
    );
  }, [query]);

  const display = useMemo(() => {
    const r = ROUTES.find((x) => x.code === value);
    return r ? `${r.code} — ${r.name}` : "";
  }, [value]);

  return (
    <div className="relative">
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2.5 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            displayValue={() => display}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a route number or name…"
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-[60] mt-2 max-h-60 w-full overflow-auto rounded-xl border border-slate-700/60 bg-slate-900/95 p-1 shadow-2xl backdrop-blur">
              {filtered.length === 0 ? (
                <div className="px-3 py-2 text-sm text-slate-400">No matching routes</div>
              ) : (
                filtered.map((r) => (
                  <Combobox.Option
                    key={r.code}
                    value={r.code}
                    className={({ active }) =>
                      `flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm ${
                        active ? "bg-slate-800 text-slate-100" : "text-slate-200"
                      }`
                    }
                  >
                    <span>{r.code} — {r.name}</span>
                  </Combobox.Option>
                ))
              )}
              {/* Clear selection */}
              <Combobox.Option
                value={null}
                className="mt-1 cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800"
              >
                Clear filter
              </Combobox.Option>
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
