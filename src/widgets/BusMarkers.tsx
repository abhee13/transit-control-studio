import { useMemo } from "react";
import { CircleMarker, LayerGroup, Popup, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { vehicles } from "../data/mock";

type BusMarkerProps = {
  showStops: boolean;
  route: string | null;
};

type Stop = {
  id: string;
  name: string;
  route: string;
  position: LatLngExpression;
};

const BUS_STOPS: Stop[] = [
  { id: "001-1", name: "Maple & Oak", route: "001", position: [32.8025, -96.816] },
  { id: "001-2", name: "Malcolm X & Elm", route: "001", position: [32.782, -96.796] },
  { id: "005-1", name: "Love Field Terminal", route: "005", position: [32.843, -96.852] },
  { id: "005-2", name: "Inwood/Lovers", route: "005", position: [32.845, -96.825] },
  { id: "009-1", name: "Jefferson & Bishop", route: "009", position: [32.747, -96.828] },
  { id: "013-1", name: "Ervay & Main", route: "013", position: [32.779, -96.8] },
  { id: "018-1", name: "Samuell & Lawnview", route: "018", position: [32.782, -96.713] },
  { id: "020-1", name: "Northwest Hwy & Ferndale", route: "020", position: [32.864, -96.763] },
  { id: "022-1", name: "Forest Lane Station", route: "022", position: [32.909, -96.739] },
  { id: "023-1", name: "Haskell & Ross", route: "023", position: [32.793, -96.786] },
  { id: "025-1", name: "Cockrell Hill & Clarendon", route: "025", position: [32.738, -96.886] },
  { id: "027-1", name: "Ridgecrest & Royal", route: "027", position: [32.901, -96.747] },
  { id: "028-1", name: "Singleton & Sylvan", route: "028", position: [32.779, -96.842] },
  { id: "030-1", name: "Lake June Station", route: "030", position: [32.713, -96.685] },
  { id: "038-1", name: "Ledbetter Station", route: "038", position: [32.677, -96.808] },
  { id: "041-1", name: "Bonnie View & Illinois", route: "041", position: [32.714, -96.769] },
  { id: "047-1", name: "Polk & Camp Wisdom", route: "047", position: [32.659, -96.865] },
  { id: "057-1", name: "Westmoreland & Clarendon", route: "057", position: [32.738, -96.876] },
];

const STATUS_COLORS: Record<string, string> = {
  "on-time": "#22c55e",
  late: "#f97316",
  "off-route": "#ef4444",
};

export function BusMarkers({ showStops, route }: BusMarkerProps) {
  const vehiclesToRender = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (vehicle.mode !== "bus") return false;
      if (!route) return true;
      return vehicle.routeShort === route;
    });
  }, [route]);

  const stopsToRender = useMemo(() => {
    if (!showStops) return [];
    if (!route) return BUS_STOPS;
    return BUS_STOPS.filter((stop) => stop.route === route);
  }, [showStops, route]);

  return (
    <LayerGroup>
      {vehiclesToRender.map((vehicle) => (
        <CircleMarker
          key={vehicle.id}
          center={[vehicle.lat, vehicle.lng]}
          radius={9}
          weight={2}
          color="#0f172a"
          fillColor={STATUS_COLORS[vehicle.status] ?? "#38bdf8"}
          fillOpacity={0.9}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={false}
            className="rounded-lg bg-slate-900/90 px-2 py-1 text-xs font-medium text-slate-100 shadow-lg"
          >
            {vehicle.label}
          </Tooltip>
          <Popup>
            <div className="space-y-1">
              <div className="font-semibold">{vehicle.label}</div>
              <div className="text-sm text-slate-600">Route {vehicle.routeShort}</div>
              <div className="text-xs text-slate-500">Last seen {vehicle.lastSeen} min ago</div>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      {stopsToRender.map((stop) => (
        <CircleMarker
          key={stop.id}
          center={stop.position}
          radius={5}
          weight={1.5}
          color="#6366f1"
          fillColor="#c7d2fe"
          fillOpacity={0.85}
          opacity={showStops ? 1 : 0}
        >
          <Tooltip
            direction="top"
            offset={[0, -6]}
            opacity={1}
            className="rounded-lg bg-slate-900/95 px-2 py-1 text-xs text-slate-100 shadow"
          >
            {stop.name}
          </Tooltip>
        </CircleMarker>
      ))}
    </LayerGroup>
  );
}
