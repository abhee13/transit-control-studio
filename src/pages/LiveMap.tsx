import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import BusMarkers from "@/widgets/BusMarkers";
import RailLinesOverlay from "@/widgets/RailLinesOverlay";

type Mode = "bus" | "rail";
// If your app defines RailLineKey elsewhere, this still structurally matches.
type RailLineKey = "green" | "blue" | "red" | "orange" | "silver";

const HEADER_OFFSET = 160; // tweak if your header height differs

export default function LiveMap() {
  const [mode, setMode] = useState<Mode>("bus");

  // Bus controls
  const [route, setRoute] = useState<string>("");
  const [showStops, setShowStops] = useState<boolean>(true);

  // Rail visibility toggles
  const [visible, setVisible] = useState<Record<RailLineKey, boolean>>({
    green: true,
    blue: false,
    red: false,
    orange: false,
    silver: false,
  });

  // Keep left panel + map
