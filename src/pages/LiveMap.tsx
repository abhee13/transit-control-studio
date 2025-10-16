import { useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BusMarkers } from "../widgets/BusMarkers";
import { RailLinesOverlay, RAIL_LINES, RailLineKey } from "../widgets/RailLinesOverlay";
import { KpiCard } from "../widgets/KpiCard";
import { RouteCombobox } from "../widgets/RouteCombobox";

type Tab = "bus" | "rail";

export default function LiveMap() {
  const [tab, setTab] = useState<Tab>("bus");
  const [showStops, setShowStops] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [visibleRail, setVisibleRail] = useState<Record<RailLineKey, boolean>>({
    green: true,
    blue: true,
    red: true,
    orange: true,
    silver: true,
  });

  const center = useMemo<[number, number]>(() => [32.7767, -96.7970], []);
  const zoom = 12;

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 lg:px-6">
      {/* Top tabs for Bus/Rail inside Live Map */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab("bus")}
          className={`rounded-xl px-4 py-2 text-sm font-medium ${
            tab === "bus"
              ? "bg-indigo-600 text-white"
              : "bg-slate-800 text-slate-200 hover:bg-slate-700"
          }`}
        >
          Bus
        </button>
        <button
          onClick={() => setTab("rail")}
          className={`rounded-xl px-4 py-2 text-sm font-medium ${
            tab === "rail"
              ? "bg-indigo-600 text-white"
              : "bg-slate-800 text-slate-200 hover:bg-slate-700"
          }`}
        >
          Rail
        </button>
      </div>

      {/* Two-column layout: fixed panel + flexible map */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
        {/* Side panel */}
        <aside className="space-y-4">
          {/* Bus-only filter */}
          {tab === "bus" && (
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4 shadow-lg backdrop-blur">
              <h3 className="mb-3 text-sm font-semibold text-slate-300">ROUTES</h3>
              <RouteCombobox
                value={selectedRoute}
                onChange={setSelectedRoute}
              />
              <label className="mt-3 flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={showStops}
                  onChange={() => setShowStops((s) => !s)}
                  className="h-4 w-4 accent-indigo-500"
                />
                Show stops
              </label>
              <p className="mt-2 text-xs text-slate-500">UI only demo with mock data</p>
            </div>
          )}

          {/* Rail-only toggles */}
          {tab === "rail" && (
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4 shadow-lg backdrop-blur">
              <h3 className="mb-3 text-sm font-semibold text-slate-300">RAIL LINES</h3>
              <div className="grid grid-cols-2 gap-3">
                {RAIL_LINES.map((l) => {
                  const active = visibleRail[l.key];
                  return (
                    <button
                      key={l.key}
                      onClick={() =>
                        setVisibleRail((v) => ({ ...v, [l.key]: !v[l.key] }))
                      }
                      className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm ${
                        active
                          ? "border-indigo-500/50 bg-slate-800/60"
                          : "border-slate-700/60 bg-slate-900/60"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ background: l.color }}
                        />
                        <span className="text-slate-200">{l.label}</span>
                      </span>
                      <span
                        className={`text-xs ${
                          active ? "text-indigo-400" : "text-slate-500"
                        }`}
                      >
                        {active ? "Visible" : "Hidden"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* KPI cards (shared) */}
          <KpiCard title="Active vehicles" value="3" hint="Vehicles currently tracking on selected routes." />
          <KpiCard title="On time" value="2" hint="Vehicles meeting schedule expectations." />
          <KpiCard title="Late" value="1" hint="Requires attention to improve headways." />
          <KpiCard title="Off route" value="0" hint="Investigate diversions or disruptions." />
        </aside>

        {/* Map column */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-2 shadow-xl">
          {/* Removed Expand map button */}
          <div className="relative">
            <MapContainer
              center={center}
              zoom={zoom}
              className="h-[68vh] min-h-[560px] w-full rounded-xl overflow-hidden"
              preferCanvas
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              {tab === "bus" && <BusMarkers showStops={showStops} route={selectedRoute} />}
              {tab === "rail" && <RailLinesOverlay visible={visibleRail} />}
            </MapContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
