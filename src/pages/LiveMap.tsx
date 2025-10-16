import { useEffect } from "react";
import type { ComponentType } from "react";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import PageShell from "@/components/PageShell";
import FiltersPanel from "@/components/FiltersPanel";
import StatsCards from "@/components/StatsCards";
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
    <PageShell
      title="Live Network Map"
      left={<FiltersPanel />}
      center={
        <div className="relative rounded-xl shadow-xl overflow-hidden z-0">
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
      }
      right={<StatsCards vehicles={visibleVehicles} />}
    />
  );
}
