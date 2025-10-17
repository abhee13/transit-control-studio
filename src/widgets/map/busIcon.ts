import L from "leaflet";

// HTML with a centered Material Symbols glyph
const BUS_HTML = `
  <div class="pin__inner">
    <span class="material-symbols-rounded pin__glyph">directions_bus</span>
  </div>
`;

export type BusStatus = "ontime" | "delay" | "major" | "offline";

/**
 * Status-aware bus icon. Accepts one of: ontime | delay | major | offline.
 */
export function busDivIcon(opts?: { status?: BusStatus }) {
  const status: BusStatus = opts?.status ?? "ontime";
  return (L as any).divIcon({
    className: `pin pin--bus pin--has-glyph is-${status}`,
    html: BUS_HTML,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}
