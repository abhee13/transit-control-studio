import { Fragment } from "react";
import { Marker, Polyline, Tooltip as LeafletTooltip } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";

export type RailLineKey = "green" | "blue" | "red" | "orange" | "silver";

export const RAIL_LINES: Array<{
  key: RailLineKey;
  label: string;
  color: string;
  coords: LatLngExpression[];
}> = [
  { key: "green",  label: "Green Line",  color: "#22c55e", coords: [[32.78, -96.81], [32.77, -96.79]] },
  { key: "blue",   label: "Blue Line",   color: "#60a5fa", coords: [[32.78, -96.80], [32.76, -96.78]] },
  { key: "red",    label: "Red Line",    color: "#f87171", coords: [[32.79, -96.81], [32.775, -96.79]] },
  { key: "orange", label: "Orange Line", color: "#fb923c", coords: [[32.785, -96.82], [32.77, -96.80]] },
  { key: "silver", label: "Silver Line", color: "#cbd5e1", coords: [[32.782, -96.83], [32.77, -96.79]] },
];

const railDivIcon = (L as any).divIcon({
  className: "pin pin--rail",
  html: '<span class="material-symbols-rounded" aria-hidden="true">tram</span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
  popupAnchor: [0, -18],
});

export function RailLinesOverlay({
  visible,
}: {
  visible: Record<RailLineKey, boolean>;
}) {
  // Using tuple type to avoid PointExpression import
  const tooltipOffset: [number, number] = [0, -18];

  return (
    <Fragment>
      {RAIL_LINES.filter((l) => visible[l.key]).map((l) => {
        const markerPosition = l.coords[0];

        return (
          <Fragment key={l.key}>
            <Polyline
              positions={l.coords}
              pathOptions={{ color: l.color, weight: 5, opacity: 0.9 }}
            />
            {markerPosition ? (
              <Marker
                position={markerPosition}
                {...({ icon: railDivIcon, zIndexOffset: 900 } as any)}
              >
                <LeafletTooltip direction="top" offset={tooltipOffset} opacity={1}>
                  <div className="text-xs font-medium">{l.label}</div>
                </LeafletTooltip>
              </Marker>
            ) : null}
          </Fragment>
        );
      })}
    </Fragment>
  );
}

export default RailLinesOverlay;
