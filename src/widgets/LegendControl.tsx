import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "../styles/map-legend.css";

export default function LegendControl(): null {
  const map = useMap();

  useEffect(() => {
    const div = (L as any).DomUtil.create("div", "map-legend");
    div.innerHTML = `
      <div class="legend-row"><span class="legend-dot ontime"></span> On time</div>
      <div class="legend-row"><span class="legend-dot delay"></span> Delayed</div>
      <div class="legend-row"><span class="legend-dot major"></span> Major delay</div>
      <div class="legend-row"><span class="legend-dot offline"></span> Offline</div>
    `;
    const ctl = (L as any).control({ position: "topright" });
    ctl.onAdd = () => div;
    ctl.addTo(map);
    return () => ctl.remove();
  }, [map]);

  return null;
}
