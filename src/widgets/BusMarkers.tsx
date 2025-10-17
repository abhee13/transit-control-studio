import { useMemo } from "react";
import { LayerGroup, Marker, Tooltip as LeafletTooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "../styles/map-pins.css";

import { busDivIcon, type BusStatus } from "./map/busIcon";

// Demo data – keep/replace with your real feed
const BUS_POINTS: Array<Bus> = [
  { id: "BUS-315", pos: [32.7767, -96.797], label: "Route 315", delayMinutes: 2 },
  { id: "BUS-203", pos: [32.77, -96.81], label: "Route 203", delayMinutes: 7 },
  { id: "BUS-710", pos: [32.781, -96.79], label: "Route 710", status: "offline", lastSeenSec: 720 },
];

type Bus = {
  id: string;
  pos: LatLngExpression;
  label?: string;
  status?: BusStatus;
  latePct?: number;
  delayMinutes?: number;
  lastSeenSec?: number;
  reportedAt?: string;
};

function ageSeconds(b: Bus): number | undefined {
  if (typeof b.lastSeenSec === "number") return b.lastSeenSec;
  if (b.reportedAt) {
    const t = Date.parse(b.reportedAt);
    if (!Number.isNaN(t)) {
      return Math.max(0, (Date.now() - t) / 1000);
    }
  }
  return undefined;
}

function statusOf(b: Bus): BusStatus {
  if (b.status) return b.status;

  const age = ageSeconds(b);
  if (age !== undefined && age > 300) return "offline";

  if (typeof b.latePct === "number") {
    if (b.latePct >= 0.5) return "major";
    if (b.latePct >= 0.2) return "delay";
    return "ontime";
  }

  if (typeof b.delayMinutes === "number") {
    if (b.delayMinutes >= 10) return "major";
    if (b.delayMinutes >= 5) return "delay";
    return "ontime";
  }

  return "ontime";
}

type BusMarkersProps = {
  showStops: boolean;
  routeIds: string[];
  visible?: boolean;
};

export function BusMarkers({
  showStops,
  routeIds,
  visible = true,
}: BusMarkersProps) {
  if (!visible) return null;
  const filtered = useMemo(() => {
    if (!routeIds.length) return BUS_POINTS;

    const normalized = new Set(routeIds.map((id) => id.replace(/^0+/, "")));

    return BUS_POINTS.filter((b) => {
      const [, maybeId] = b.id.split("-");
      if (!maybeId) return false;
      const trimmed = maybeId.replace(/^0+/, "");
      return normalized.has(trimmed);
    });
  }, [routeIds]);

  const tooltipOffset: [number, number] = [0, -18];

  return (
    <LayerGroup>
      {filtered.map((b) => (
        <Marker
          key={b.id}
          position={b.pos}
          {...({ icon: busDivIcon({ status: statusOf(b) }), zIndexOffset: 1000 } as any)}
        >
          <LeafletTooltip direction="top" offset={tooltipOffset} opacity={1}>
            <div className="text-xs font-medium">{b.label ?? b.id}</div>
          </LeafletTooltip>
        </Marker>
      ))}

      {/* Optionally render stops if showStops is true */}
      {showStops ? null : null}
    </LayerGroup>
  );
}

export default BusMarkers;
