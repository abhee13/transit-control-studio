import { Fragment, useMemo } from "react";
import { CircleMarker, Tooltip as LeafletTooltip } from "react-leaflet";
import type { LatLngExpression, PointExpression } from "leaflet";

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
  route,
}: {
  showStops: boolean;
  route: string | null;
}) {
  const filtered = useMemo(() => {
    // If you want to filter markers by route, handle here
    return BUS_POINTS;
  }, [route]);

  const tooltipOffset = [0, 8] as PointExpression;

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
