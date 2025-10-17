// src/pages/LiveMap.tsx
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/page-live-map.css";

import RouteMultiSelect, {
  Option as RouteOption,
} from "../components/RouteMultiSelect";
import "../styles/multiselect.css";
import BusMarkers from "@/widgets/BusMarkers";
import RailLinesOverlay from "@/widgets/RailLinesOverlay";
import { BUS_ROUTES } from "@/data/routes";

type Mode = "bus" | "rail";
type RailLineKey = "green" | "blue" | "red" | "orange" | "silver";

const HEADER_OFFSET = 160; // adjusts map/panel height under the app header

export default function LiveMap(): JSX.Element {
  const [mode, setMode] = useState<Mode>("bus");

  // Bus controls
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [showStops, setShowStops] = useState<boolean>(true);

  // Rail visibility toggles
  const [visible, setVisible] = useState<Record<RailLineKey, boolean>>({
    green: true,
    blue: false,
    red: false,
    orange: false,
    silver: false,
  });

  // Keep left panel + map heights aligned
  const [vh, setVh] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : 900
  );
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const panelAndMapHeight = useMemo(() => Math.max(640, vh - HEADER_OFFSET), [vh]);
  void panelAndMapHeight;

  const routeOptions: RouteOption[] = useMemo(() => {
    const catalog = BUS_ROUTES ?? [];
    return catalog.map((r: any) => {
      const id = String(r.id ?? r.code ?? r.routeId ?? r.value ?? r);
      const code = r.code ?? r.shortName ?? id;
      const name = r.name ?? r.longName ?? r.label ?? "";
      return { id, label: name ? `${code} — ${name}` : `${code}` };
    });
  }, []);

  const activeRouteIds = useMemo(() => selectedRoutes, [selectedRoutes]);

  return (
    <div className="live-map-page">
      <main className="w-full max-w-[1600px] mx-auto px-4 md:px-6 pt-6 pb-10">
        <header className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">Live Network Map</h1>
        </header>

        {/* Sub-tabs */}
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMode("bus")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                mode === "bus"
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white/5 hover:bg-white/10 text-white/80"
              }`}
            >
              Bus
            </button>
            <button
              onClick={() => setMode("rail")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                mode === "rail"
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white/5 hover:bg-white/10 text-white/80"
              }`}
            >
              Rail
            </button>
          </div>
        </div>

        {/* Left panel + Map */}
        <section className="live-map-bleed live-map-grid">
          {/* LEFT PANEL */}
          <aside
            className="lm-side-panel rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_30px_rgba(2,6,23,.35),inset_0_1px_0_rgba(255,255,255,.08)] p-6 space-y-6"
            data-ui="routes-panel"
          >
            {mode === "bus" ? (
              <>
                <h2 className="text-sm tracking-wide text-white/70 mb-3">ROUTES</h2>

                <RouteMultiSelect
                  options={routeOptions}
                  selected={selectedRoutes}
                  onChange={setSelectedRoutes}
                />

                <label className="flex select-none items-center gap-3 text-white/90 text-sm">
                  <input
                    type="checkbox"
                    checked={showStops}
                    onChange={(e) => setShowStops(e.target.checked)}
                    className="h-4 w-4 accent-indigo-500"
                  />
                  Show stops
                </label>

                <p className="mt-4 text-xs text-white/50">UI only demo with mock data</p>

                <div className="mt-6 space-y-4">
                  <KpiCard
                    title="ACTIVE VEHICLES"
                    value="3"
                    subtitle="Vehicles currently tracking on selected routes."
                  />
                  <KpiCard
                    title="ON TIME"
                    value="2"
                    subtitle="Vehicles meeting schedule expectations."
                  />
                  <KpiCard
                    title="LATE"
                    value="1"
                    subtitle="Requires attention to improve headways."
                  />
                  <KpiCard
                    title="OFF ROUTE"
                    value="0"
                    subtitle="Investigate diversions or disruptions."
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-sm tracking-wide text-white/70 mb-3">RAIL LINES</h2>

                <div className="grid grid-cols-1 gap-3">
                  {(["green", "blue", "red", "orange", "silver"] as RailLineKey[]).map(
                    (k) => (
                      <button
                        key={k}
                        onClick={() =>
                          setVisible((v) => ({ ...v, [k]: !v[k] }))
                        }
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 ring-1 transition ${
                          visible[k]
                            ? "ring-indigo-500/60 bg-indigo-500/10 text-white"
                            : "ring-white/10 bg-white/5 text-white/80"
                        }`}
                      >
                        <span className="capitalize">{k} line</span>
                        <span className="text-xs">
                          {visible[k] ? "Visible" : "Hidden"}
                        </span>
                      </button>
                    )
                  )}
                </div>

                <p className="mt-4 text-xs text-white/50">
                  Toggle lines to preview service layout.
                </p>

                <div className="mt-6 space-y-4">
                  <KpiCard
                    title="ACTIVE VEHICLES"
                    value="3"
                    subtitle="Vehicles currently tracking on selected routes."
                  />
                  <KpiCard
                    title="ON TIME"
                    value="2"
                    subtitle="Vehicles meeting schedule expectations."
                  />
                  <KpiCard
                    title="LATE"
                    value="1"
                    subtitle="Requires attention to improve headways."
                  />
                  <KpiCard
                    title="OFF ROUTE"
                    value="0"
                    subtitle="Investigate diversions or disruptions."
                  />
                </div>
              </>
            )}
          </aside>

          {/* MAP */}
          <div
            id="map-shell"
            className="rounded-2xl border border-white/10 overflow-hidden shadow-[0_10px_30px_rgba(2,6,23,.35),inset_0_1px_0_rgba(255,255,255,.06)]"
          >
            <MapContainer
              center={[32.7767, -96.797]} // Dallas
              zoom={12}
              scrollWheelZoom
              className="w-full h-[720px] md:h-[800px]"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {mode === "bus" && (
                <BusMarkers showStops={showStops} routeIds={activeRouteIds} />
              )}
              {mode === "rail" && <RailLinesOverlay visible={visible} />}
            </MapContainer>
          </div>
        </section>
      </main>
    </div>
  );
}

function KpiCard(props: {
  title: string;
  value: string;
  subtitle: string;
}): JSX.Element {
  const { title, value, subtitle } = props;
  return (
    <div className="rounded-xl border border-white/10 bg-white/3 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
      <p className="text-xs tracking-wide text-white/60">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/60">{subtitle}</p>
    </div>
  );
}
