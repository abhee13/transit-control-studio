import { memo, useMemo } from "react";
import { LayerGroup, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "../styles/map-pins.css";

type PinType = "bus" | "rail";

export type MaterialPin = {
  id: string;
  lat: number;
  lng: number;
  type: PinType;
  label?: string;      // shown in tooltip
  subtitle?: string;   // shown in popup
  pulse?: boolean;     // late/alert – adds ring animation
};

type Props = {
  pins: MaterialPin[];
};

function makeDivIcon(pin: MaterialPin) {
  const glyph = pin.type === "bus" ? "directions_bus" : "tram";
  const classes = [
    "material-pin",
    pin.pulse ? "pin-pulse" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const html = `
    <div class="${classes}" data-variant="${pin.type}">
      <span class="material-symbols-rounded">${glyph}</span>
    </div>
  `;

  return (L as any).divIcon({
    className: "material-divicon",
    html,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
}

const MaterialPinsLayer = memo(({ pins }: Props) => {
  const icons = useMemo(
    () =>
      pins.reduce<Record<string, any>>((acc, p) => {
        acc[p.id] = makeDivIcon(p);
        return acc;
      }, {}),
    [pins]
  );

  return (
    <LayerGroup>
      {pins.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          {...({ icon: icons[p.id] } as any)}
          keyboard={false}
        >
          {p.label && (
            <Tooltip direction="top" offset={[0, -14]} opacity={0.95}>
              {p.label}
            </Tooltip>
          )}
          {(p.label || p.subtitle) && (
            <Popup>
              <div style={{ minWidth: 180 }}>
                {p.label && <div style={{ fontWeight: 600 }}>{p.label}</div>}
                {p.subtitle && (
                  <div style={{ opacity: 0.8, marginTop: 2 }}>{p.subtitle}</div>
                )}
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </LayerGroup>
  );
});

export default MaterialPinsLayer;
