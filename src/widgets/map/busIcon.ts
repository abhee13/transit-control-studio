import L from "leaflet";

// Existing SVG for bus marker; left as-is.
export const BUS_SVG = `
  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor"><circle cx="14" cy="14" r="10"/></g>
  </svg>`;

export type BusStatus = "ontime" | "delay" | "major" | "offline";

/**
 * Status-aware bus icon. Accepts one of: ontime | delay | major | offline.
 */
export function busDivIcon(opts?: { status?: BusStatus }) {
  const status: BusStatus = opts?.status ?? "ontime";
  return (L as any).divIcon({
    className: `pin pin--bus is-${status}`,
    html: BUS_SVG,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}
