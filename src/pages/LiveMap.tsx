import { useEffect } from "react";
import type { ComponentType } from "react";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Panel from "@/components/Panel";
import { polylines, routes, vehicles } from "@/data/mock";
import { useAppStore } from "@/store/useAppStore";

const DALLAS: [number, number] = [32.7767, -96.797];

const Map = MapContainer as ComponentType<any>;
const Tile = TileLayer as ComponentType<any>;
const PolylineLayer = Polyline as ComponentType<any>;
const Marker = CircleMarker as ComponentType<any>;
const TooltipLayer = Tooltip as ComponentType<any>;

function statusColor(status: string) {
  switch (status) {
    case "on-time":
      return "#22c55e";
    case "late":
      return "#f97316";
    case "off-route":
      return "#ef4444";
    default:
      return "#38bdf8";
  }
}

export default function LiveMap() {
  const { selectedRoutes, mode, setMode } = useAppStore();

  useEffect(() => {
    setMode("bus");
  }, [setMode]);

  const fallbackRoutes = routes.filter((route) => route.mode === mode).map((route) => route.shortName);
  const activeRouteShortNames = selectedRoutes.length ? selectedRoutes : fallbackRoutes;

  const visibleVehicles = vehicles.filter(
    (vehicle) => vehicle.mode === mode && activeRouteShortNames.includes(vehicle.routeShort)
  );

  const visiblePolylines = polylines.filter((polyline) => {
    const matchedRoute = routes.find((route) => route.id === polyline.routeId);
    return matchedRoute ? activeRouteShortNames.includes(matchedRoute.shortName) && matchedRoute.mode === mode : false;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="title-lg">Live Network Map</h1>
        <p className="text-sm text-white/60">
          Track vehicles and service levels across the system in real time.
        </p>
      </div>

      <div className="card space-y-4 p-4 lg:p-6">
        <div className="rounded-2xl overflow-hidden relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 to-black/5" />
          <Map center={DALLAS} zoom={12} style={{ height: 520, width: "100%" }}>
            <Tile attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {visiblePolylines.map((polyline, index) => (
              <PolylineLayer key={index} positions={polyline.points} pathOptions={{ color: "#38bdf8", weight: 3, opacity: 0.5 }} />
            ))}
            {visibleVehicles.map((vehicle) => (
              <Marker
                key={vehicle.id}
                center={[vehicle.lat, vehicle.lng]}
                radius={7}
                pathOptions={{ color: statusColor(vehicle.status), fillOpacity: 0.9 }}
              >
                <TooltipLayer direction="top" offset={[0, -8]}>
                  <div className="text-xs">
                    <div>
                      <strong>{vehicle.label}</strong> • {vehicle.routeShort}
                    </div>
                    <div>Status: {vehicle.status}</div>
                    <div>Last seen {vehicle.lastSeen}m ago</div>
                  </div>
                </TooltipLayer>
              </Marker>
            ))}
          </Map>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Panel title="Active vehicles" action={<span className="text-lg font-semibold text-white">{visibleVehicles.length}</span>}>
            <p>Vehicles currently tracking on selected routes.</p>
          </Panel>
          <Panel title="On time">
            <p className="text-2xl font-semibold text-emerald-300">
              {visibleVehicles.filter((vehicle) => vehicle.status === "on-time").length}
            </p>
            <p>Vehicles meeting schedule expectations.</p>
          </Panel>
          <Panel title="Late">
            <p className="text-2xl font-semibold text-amber-300">
              {visibleVehicles.filter((vehicle) => vehicle.status === "late").length}
            </p>
            <p>Requires attention to improve headways.</p>
          </Panel>
          <Panel title="Off route">
            <p className="text-2xl font-semibold text-rose-300">
              {visibleVehicles.filter((vehicle) => vehicle.status === "off-route").length}
            </p>
            <p>Investigate diversions or disruptions.</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
