// src/pages/LiveMap.tsx
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import BusMarkers from "@/widgets/BusMarkers";
import RailLinesOverlay from "@/widgets/RailLinesOverlay";

type Mode = "bus" | "rail";
type RailLineKey = "green" | "blue" | "red" | "orange" | "silver";

const HEADER_OFFSET = 160; // adjusts map/panel height under the app header

export default function LiveMap(): JSX.Element {
  const [mode, setMode] = useState<Mode>("bus");

  // Bus controls
  const [route, setRoute] = useState<string>("");
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

  return (
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
      <section className="grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)]">
        {/* LEFT PANEL */}
        <aside
          className={`
  rounded-2xl
  border border-white/10
  bg-white/5
  backdrop-blur-xl
  shadow-[0_10px_30px_rgba(2,6,23,.35),inset_0_1px_0_rgba(255,255,255,.08)]
  p-6
  space-y-6
  overflow-visible
`}
        >
          {mode === "bus" ? (
            <>
              <h2 className="text-sm tracking-wide text-white/70 mb-3">ROUTES</h2>

              <div className="mb-4 relative">
                <input
                  type="text"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  placeholder="Type a route number or name..."
                  className="w-full rounded-xl bg-white/10 ring-1 ring-white/15 px-4 py-3 text-[0.95rem] text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-indigo-500/70"
                />
              </div>

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
            className={`
  h-[780px]
  w-full
`}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mode === "bus" && <BusMarkers showStops={showStops} route={route} />}
            {mode === "rail" && <RailLinesOverlay visible={visible} />}
          </MapContainer>
        </div>
      </section>
    </main>
  );
}

function KpiCard(props: {
  title: string;
  value: string;
  subtitle: string;
}): JSX.Element {
  const { title, value, subtitle } = props;
  return (
    <div
      className={`
  rounded-xl
  border border-white/10
  bg-white/3
  p-5
  shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
`}
    >
      <p className="text-xs tracking-wide text-white/60">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/60">{subtitle}</p>
    </div>
  );
}
