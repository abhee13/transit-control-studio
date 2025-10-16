import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import StatsCards from "@/components/StatsCards";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { vehicles } from "@/data/mock";
import { useAppStore } from "@/store/useAppStore";

const LINES = [
  {
    id: "green",
    name: "Green Line",
    color: "#22c55e",
    coords: [
      [32.7769, -96.797],
      [32.782, -96.81],
      [32.795, -96.8],
      [32.81, -96.79],
    ],
  },
  {
    id: "blue",
    name: "Blue Line",
    color: "#3b82f6",
    coords: [
      [32.77, -96.79],
      [32.78, -96.78],
      [32.79, -96.76],
    ],
  },
  {
    id: "red",
    name: "Red Line",
    color: "#ef4444",
    coords: [
      [32.76, -96.81],
      [32.77, -96.8],
      [32.79, -96.79],
    ],
  },
  {
    id: "orange",
    name: "Orange Line",
    color: "#fb923c",
    coords: [
      [32.75, -96.82],
      [32.77, -96.81],
      [32.78, -96.79],
    ],
  },
  {
    id: "silver",
    name: "Silver Line",
    color: "#94a3b8",
    coords: [
      [32.74, -96.83],
      [32.76, -96.82],
      [32.77, -96.8],
    ],
  },
];

export default function RailMapPage() {
  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(LINES.map((l) => [l.id, true]))
  );
  const { setMode } = useAppStore();

  useEffect(() => {
    setMode("rail");
  }, [setMode]);

  const railVehicles = vehicles.filter((vehicle) => vehicle.mode === "rail");

  const LeftPanel = (
    <div className="rounded-xl bg-black/20 ring-1 ring-white/10 p-4 space-y-3">
      <div className="text-sm font-medium text-white/80 mb-1">Rail lines</div>
      {LINES.map((l) => (
        <label
          key={l.id}
          className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2"
        >
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: l.color }}
            />
            <span>{l.name}</span>
          </span>
          <input
            type="checkbox"
            checked={visible[l.id]}
            onChange={() => setVisible((v) => ({ ...v, [l.id]: !v[l.id] }))}
            className="h-4 w-4 accent-white/90"
          />
        </label>
      ))}
    </div>
  );

  const Map = (
    <div className="relative rounded-xl shadow-xl overflow-hidden z-0">
      <MapContainer center={[32.7769, -96.797]} zoom={11} className="h-[70vh] w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {LINES.filter((l) => visible[l.id]).map((l) => (
          <Polyline
            key={l.id}
            positions={l.coords as any}
            pathOptions={{ color: l.color, weight: 5, opacity: 0.9 }}
          />
        ))}
      </MapContainer>
    </div>
  );

  const RightStats = <StatsCards vehicles={railVehicles} />;

  return (
    <PageShell title="Rail Lines" left={LeftPanel} center={Map} right={RightStats} />
  );
}
