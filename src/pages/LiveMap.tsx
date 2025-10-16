import { useEffect } from "react";
import type { CircleMarkerProps, TooltipProps } from "react-leaflet";
import type { LatLngExpression, LatLngTuple } from "leaflet";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Tooltip as LeafletTooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import PageShell from "@/components/PageShell";
import FiltersPanel from "@/components/FiltersPanel";
import StatsCards from "@/components/StatsCards";
import { polylines, routes, vehicles } from "@/data/mock";
import { useAppStore } from "@/store/useAppStore";

const DALLAS: LatLngExpression = [32.7769, -96.797];

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
        <div className="rounded-xl shadow-xl overflow-hidden z-0">
          <MapContainer center={DALLAS} zoom={12} className="h-[72vh] w-full">
            <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {visiblePolylines.map((polyline, index) => (
              <Polyline
                key={index}
                positions={polyline.points as LatLngTuple[]}
                pathOptions={{ color: "#38bdf8", weight: 3, opacity: 0.5 }}
              />
            ))}
            {visibleVehicles.map((vehicle) => {
              const markerCenter = [vehicle.lat, vehicle.lng] as LatLngTuple;
              const markerProps: CircleMarkerProps = {
                center: markerCenter,
                radius: 7,
                pathOptions: { color: statusColor(vehicle.status), fillOpacity: 0.9 },
              };
              const tooltipProps: TooltipProps = {
                direction: "top",
                offset: [0, -8] as [number, number],
                opacity: 1,
              };

              return (
                <CircleMarker key={vehicle.id} {...markerProps}>
                  <LeafletTooltip {...tooltipProps}>
                    <div className="text-xs">
                      <div>
                        <strong>{vehicle.label}</strong> • {vehicle.routeShort}
                      </div>
                      <div>Status: {vehicle.status}</div>
                      <div>Last seen {vehicle.lastSeen}m ago</div>
                    </div>
                  </LeafletTooltip>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>
      }
      right={<StatsCards vehicles={visibleVehicles} />}
    />
  );
}
