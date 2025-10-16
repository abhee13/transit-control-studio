import React, { useMemo, useState, useEffect } from "react";
import type { ComponentType } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { railLines } from "@/data/rail";
import { useAppStore } from "@/store/useAppStore";

type Visible = Record<string, boolean>;

const Map = MapContainer as ComponentType<any>;
const Tile = TileLayer as ComponentType<any>;
const Line = Polyline as ComponentType<any>;
const Marker = CircleMarker as ComponentType<any>;
const Tip = Tooltip as ComponentType<any>;

function FitToVisible({ visible }: { visible: Visible }) {
  const map = useMap();

  useEffect(() => {
    const latlngs: [number, number][] = [];
    railLines.forEach((line) => {
      if (!visible[line.id]) return;
      latlngs.push(...line.positions);
    });
    if (!latlngs.length) return;

    // Compute bounds
    let minLat = 90,
      minLng = 180,
      maxLat = -90,
      maxLng = -180;
    for (const [lat, lng] of latlngs) {
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    }
    const bounds = [
      [minLat, minLng] as [number, number],
      [maxLat, maxLng] as [number, number],
    ];
    (map as any).fitBounds(bounds, { padding: [40, 40] });
  }, [visible, map]);

  return null;
}

function Dot({ tone = "ok" }: { tone?: "ok" | "delay" | "issue" }) {
  const c =
    tone === "ok"
      ? "bg-emerald-400"
      : tone === "delay"
      ? "bg-amber-400"
      : "bg-rose-400";
  return <span className={`inline-block h-2 w-2 rounded-full ${c}`} />;
}

export default function RailMapPage() {
  const [visible, setVisible] = useState<Visible>(() =>
    Object.fromEntries(railLines.map((l) => [l.id, true]))
  );
  const { setMode } = useAppStore();

  useEffect(() => {
    setMode("rail");
  }, [setMode]);

  const activeCount = useMemo(
    () => railLines.filter((l) => visible[l.id]).length,
    [visible]
  );

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 md:px-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Rail Lines</h1>
          <p className="text-sm text-white/60">
            Toggle lines to preview service layout. Data is mock for UI demo.
          </p>
        </div>
        <div className="text-sm text-white/70">
          Showing <span className="font-medium text-white">{activeCount}</span> of {" "}
          {railLines.length}
        </div>
      </header>

      {/* Filter chips */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {railLines.map((line) => {
          const on = !!visible[line.id];
          const ring = on ? "ring-white/20" : "ring-white/10";
          return (
            <button
              key={line.id}
              onClick={() =>
                setVisible((v) => ({ ...v, [line.id]: !v[line.id] }))
              }
              className={`flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-left ring-1 ${ring} transition hover:bg-white/[.08]`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-3 w-3 rounded-full shadow"
                  style={{ backgroundColor: line.color }}
                />
                <div>
                  <div className="text-sm font-medium text-white">
                    {line.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Dot tone={line.status ?? "ok"} />
                    {line.status === "delay"
                      ? "Delays reported"
                      : line.status === "issue"
                      ? "Investigating issue"
                      : "Normal service"}
                  </div>
                </div>
              </div>
              <div
                className={`rounded-lg px-2 py-1 text-xs ${
                  on ? "bg-white/10 text-white" : "bg-white/5 text-white/70"
                }`}
              >
                {on ? "Visible" : "Hidden"}
              </div>
            </button>
          );
        })}
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
        <Map
          center={[32.78, -96.8]}
          zoom={12}
          className="h-[66vh] w-full"
          zoomControl
        >
          <Tile
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitToVisible visible={visible} />

          {railLines.map((line) =>
            visible[line.id] ? (
              <React.Fragment key={line.id}>
                <Line
                  positions={line.positions}
                  pathOptions={{
                    color: line.color,
                    weight: 5,
                    opacity: 0.95,
                    ...(line.id === "silver" ? { dashArray: "6 6" } : {}),
                  }}
                />
                <Marker
                  center={line.positions[0]}
                  radius={6}
                  pathOptions={{ color: line.color, fillColor: line.color }}
                >
                  <Tip direction="top" offset={[0, -6]} opacity={0.9}>
                    {line.name} — Start
                  </Tip>
                </Marker>
                <Marker
                  center={line.positions[line.positions.length - 1]}
                  radius={6}
                  pathOptions={{ color: line.color, fillColor: line.color }}
                >
                  <Tip direction="top" offset={[0, -6]} opacity={0.9}>
                    {line.name} — End
                  </Tip>
                </Marker>
              </React.Fragment>
            ) : null
          )}
        </Map>
      </div>
    </div>
  );
}
