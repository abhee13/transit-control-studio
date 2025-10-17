import { Fragment, useMemo } from "react";
import { Marker, Tooltip as LeafletTooltip } from "react-leaflet";
import L from "leaflet";
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

// Reusable Material pin for buses
const busDivIcon = (L as any).divIcon({
  className: "pin pin--bus",
  html: '<span class="material-symbols-rounded" aria-hidden="true">directions_bus</span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
  popupAnchor: [0, -18],
});

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
  const tooltipOffset: [number, number] = [0, -18];

  return (
    <Fragment>
      {filtered.map((b) => (
        <Marker
          key={b.id}
          position={b.pos}
          {...({ icon: busDivIcon, zIndexOffset: 1000 } as any)}
        >
          <LeafletTooltip direction="top" offset={tooltipOffset} opacity={1}>
            <div className="text-xs font-medium">{b.id}</div>
          </LeafletTooltip>
        </Marker>
      ))}

      {/* Optionally render stops if showStops is true */}
      {showStops ? null : null}
    </Fragment>
  );
}

export default BusMarkers;
