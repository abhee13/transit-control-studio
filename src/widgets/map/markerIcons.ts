import L from "leaflet";

export type BadgeOptions = {
  label: string;               // text shown inside the badge
  color?: string;              // css color for the badge
  pulse?: boolean;             // add soft pulse ring
  anchor?: [number, number];   // iconAnchor override
  size?: [number, number];     // iconSize override
};

// Creates a pill-shaped “badge” icon (DivIcon) with a soft glow.
// Example: const icon = makeRouteBadgeIcon({ label: "005", color: "#22c55e" });
export function makeRouteBadgeIcon({
  label,
  color = "#5b6bfa",
  pulse = false,
  anchor = [18, 18],
  size = [36, 36],
}: BadgeOptions) {
  const html = `
    <div class="marker-badge ${pulse ? "pulse" : ""}" style="--badge:${color}">
      <span>${label}</span>
      <i class="ring"></i>
    </div>
  `;
  return (L as any).divIcon({
    className: "",
    html,
    iconSize: size as any,
    iconAnchor: anchor as any,
  });
}
