import LiveMap from "./LiveMap";

export default function RailPage() {
  // Reuse the Live Map; the in-page Bus/Rail tabs control the overlays.
  return <LiveMap />;
}
