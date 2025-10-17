import { Fragment, useMemo } from "react";
import { CircleMarker, Tooltip as LeafletTooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

// Demo data – keep/replace with your real feed
const BUS_POINTS: Array<{
  id: string;
  pos: LatLngExpression;
  status: "onTime" | "late" | "offline";
}> = [
  { id: "BUS-315", pos: [32.7767, -96.797], status: "onTime" },
  { id: "BUS-203", pos: [32.77, -96.81], status: "late" },
];

export function BusMarkers({
  showStops,
  routeIds,
}: {
  showStops: boolean;
  routeIds: string[];
}) {
  const filtered = useMemo(() => {
    if (!routeIds.length) return BUS_POINTS;

    const normalized = new Set(
      routeIds.map((id) => id.replace(/^0+/, ""))
    );

    return BUS_POINTS.filter((b) => {
      const [, maybeId] = b.id.split("-");
      if (!maybeId) return false;
      const trimmed = maybeId.replace(/^0+/, "");
      return normalized.has(trimmed);
    });
  }, [routeIds]);

  // Using tuple type to avoid PointExpression import (not present in your leaflet types)
  const tooltipOffset: [number, number] = [0, 8];

  return (
    <Fragment>
      {filtered.map((b) => {
        const pathOptions =
          b.status === "onTime"
            ? { color: "#22c55e", weight: 2, fillColor: "#22c55e", fillOpacity: 0.85, opacity: 0.9 }
            : b.status === "late"
            ? { color: "#f97316", weight: 2, fillColor: "#f97316", fillOpacity: 0.85, opacity: 0.9 }
            : { color: "#64748b", weight: 2, fillColor: "#64748b", fillOpacity: 0.85, opacity: 0.9 };

        return (
          <CircleMarker
            key={b.id}
            center={b.pos}
            radius={8}
            pathOptions={pathOptions}
          >
            <LeafletTooltip direction="top" offset={tooltipOffset} opacity={1}>
              <div className="text-xs font-medium">{b.id}</div>
            </LeafletTooltip>
          </CircleMarker>
        );
      })}

      {/* Optionally render stops if showStops is true */}
      {showStops ? null : null}
    </Fragment>
  );
}

export default BusMarkers;
