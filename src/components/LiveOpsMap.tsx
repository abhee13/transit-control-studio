import React from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip as LeafletTooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Vehicle = { id: string; lat: number; lng: number; label: string; color: string };
type Stop = { id: string; lat: number; lng: number };
type Props = {
  className?: string;
  center?: [number, number];
  zoom?: number;
  vehicles?: Vehicle[];
  stops?: Stop[];
  railLines?: Array<{ id: string; color: string; coords: [number, number][] }>;
  showStops?: boolean;
};

export default function LiveOpsMap({
  className,
  center = [32.7767, -96.7970],
  zoom = 12,
  vehicles = [],
  stops = [],
  railLines = [],
  showStops = true,
}: Props) {
  return (
    <div className={`h-[76vh] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 bg-slate-900/40 ${className ?? ""}`}>
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {railLines.map((line) => (
          <Polyline
            key={line.id}
            positions={line.coords}
            pathOptions={{ color: line.color, weight: 5, opacity: 0.9 }}
          />
        ))}

        {vehicles.map((v) => (
          <CircleMarker
            key={v.id}
            center={[v.lat, v.lng]}
            radius={8}
            pathOptions={{ color: v.color, fillOpacity: 0.95 }}
          >
            <LeafletTooltip direction={"top"} offset={[0, -6]} opacity={1}>
              {v.label}
            </LeafletTooltip>
          </CircleMarker>
        ))}

        {showStops &&
          stops.map((s) => (
            <CircleMarker
              key={s.id}
              center={[s.lat, s.lng]}
              radius={3}
              pathOptions={{ color: "#94a3b8", fillOpacity: 0.8 }}
            />
          ))}
      </MapContainer>
    </div>
  );
}
