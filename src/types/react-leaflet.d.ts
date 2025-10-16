import type { PointExpression } from "leaflet";

declare module "react-leaflet" {
  interface CircleMarkerProps {
    radius?: number;
  }

  interface TooltipProps {
    direction?: "top" | "right" | "bottom" | "left" | "center" | "auto";
    offset?: PointExpression;
    opacity?: number;
  }
}
