import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// Keep these if you have them; if not, leave the imports as-is.
import BusMarkers from "@/widgets/BusMarkers";
import RailLinesOverlay from "@/widgets/RailLinesOverlay";

type Mode = "bus" | "rail";

const HEADER_OFFSET = 160; // tweak if your top bar height differs

export default function LiveMap() {
  const [mode, setMode] = useState<Mode>("bus");
  const [vh, setVh] = useState<number>(typeof window !== "undefined" ? window.innerHeight : 900);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Shared height so left panel and map bottom align exactly
  const panelAndMapHeight = useMemo(() => Math.max(640, vh - HEADER_OFFSET), [vh]);

  return (
    <main className="w-full max-w-[1600px] mx-auto px-4 md:px-6 pt-6 pb-10">
      <header className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">Live Network Map</h1>
      </header>

      {/* Sub-tabs */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => setMode("bus")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition
            ${mode === "bus" ? "bg-indigo-600 text-white shadow" : "bg-white/5 hover:bg-white/10 text-white/80"}`}
        >
          Bus
        </button>
        <button
          onClick={() => setMode("rail")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition
            ${mode === "rail" ? "bg-indigo-600 text-white shadow" : "bg-white/5 hover:bg-white/10 text-white/80"}`}
        >
          Rail
        </button>
      </div>

      {/* Left panel + Map */}
      <section className="grid gap-6 lg:gap-8 [grid-template-columns:310px_minmax(0,1fr)]">
        {/* LEFT PANEL */}
        <aside
          className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 md:p-6 overflow-hidden"
          style={{ height: panelAndMapHeight }}
        >
          <h2 className="text-sm tracking-wide text-white/70 mb-3">ROUTES</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Type a route number or name..."
              className="w-full rounded-xl bg-white/10 ring-1 ring-white/15 px-4 py-3 text-[0.95rem] text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-indigo-500/70"
            />
          </div>

          <label className="flex select-none items-center gap-3 text-white/90 text-sm">
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-indigo-500" />
            Show stops
          </label>

          <p className="mt-4 text-xs text-white/50">UI only demo with mock data</p>

          <div className="mt-6 space-y-4">
            <KpiCard title="ACTIVE VEHICLES" value="3" subtitle="Vehicles currently tracking on selected routes." />
            <KpiCard title="ON TIME" value="2" subtitle="Vehicles meeting schedule expectations." />
            <KpiCard title="LATE" value="1" subtitle="Requires attention to improve headways." />
            <KpiCard title="OFF ROUTE" value="0" subtitle="Investigate diversions or disruptions." />
          </div>
        </aside>

        {/* MAP */}
        <div
          id="map-shell"
          className="rounded-3xl ring-1 ring-white/10 bg-white/5 overflow-hidden"
          style={{ height: panelAndMapHeight }}
        >
          <MapContainer
            center={[32.7767, -96.7970]} // Dallas
            zoom={12}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
            className="leaflet-dark"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mode === "bus" && <BusMarkers />}
            {mode === "rail" && <RailLinesOverlay />}
          </MapContainer>
        </div>
      </section>
    </main>
  );
}

function KpiCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-4">
      <p className="text-xs tracking-wide text-white/60">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/60">{subtitle}</p>
    </div>
  );
}
