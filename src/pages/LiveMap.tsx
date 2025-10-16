import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Segmented from "@/components/Segmented";
import KpiCard from "@/components/KpiCard";
import RailToggles, { RailLine } from "@/components/RailToggles";

type LiveMapProps = {
  initialMode?: "bus" | "rail";
};

export default function LiveMap({ initialMode = "bus" }: LiveMapProps) {
  const [mode, setMode] = useState<"bus" | "rail">(initialMode);
  const [expanded, setExpanded] = useState(false);

  const [rail, setRail] = useState<Record<RailLine, boolean>>({
    green: true,
    blue: true,
    red: true,
    orange: false,
    silver: false,
  });

  const mapHeight = expanded ? "h-[calc(100vh-132px)]" : "h-[calc(100vh-180px)]";

  return (
    <div className="px-6 pt-6 pb-8">
      <div className="mb-4 flex items-center justify-between">
        <Segmented
          value={mode}
          onChange={(v) => setMode(v as "bus" | "rail")}
          options={[
            { label: "Bus", value: "bus" },
            { label: "Rail", value: "rail" },
          ]}
        />
        <button onClick={() => setExpanded((e) => !e)} className="btn-ghost">
          {expanded ? "Exit full map" : "Expand map"}
        </button>
      </div>

      <div className={`grid gap-6 ${expanded ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-[360px_1fr]"}`}>
        {!expanded && (
          <aside className="space-y-6">
            <div className="glass rounded-2xl p-5">
              <div className="text-xs tracking-wider uppercase text-slate-300 mb-3">Routes</div>
              <div className="relative z-50">
                <input
                  placeholder="Type a route number or name..."
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-500/60"
                />
              </div>
              <label className="mt-3 flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" defaultChecked className="accent-brand-500" />
                Show stops
              </label>
              <div className="text-xs text-slate-500 mt-2">UI only demo with mock data</div>
            </div>

            {mode === "rail" && (
              <RailToggles
                enabled={rail}
                onToggle={(k) => setRail((r) => ({ ...r, [k]: !r[k] }))}
              />
            )}

            <div className="grid gap-4">
              <KpiCard title="Active vehicles" value={3} caption="Vehicles currently tracking on selected routes." />
              <KpiCard title="On time" value={2} caption="Vehicles meeting schedule expectations." />
              <KpiCard title="Late" value={1} caption="Requires attention to improve headways." />
              <KpiCard title="Off route" value={0} caption="Investigate diversions or disruptions." />
            </div>
          </aside>
        )}

        <section className={`relative rounded-2xl overflow-hidden glass ${expanded ? "p-0" : "p-2"}`}>
          <div className={`relative z-0 rounded-2xl overflow-hidden ${mapHeight}`}>
            <MapContainer
              center={[32.7767, -96.797]}
              zoom={12}
              className="h-full w-full z-0"
              scrollWheelZoom
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
