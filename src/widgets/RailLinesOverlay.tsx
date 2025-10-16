import { useMemo } from "react";
import { LayerGroup, Polyline, Tooltip } from "react-leaflet";
import type { PathOptions } from "leaflet";
import { railLines } from "../data/rail";

export type RailLineKey = "green" | "blue" | "red" | "orange" | "silver";

type RailLineMeta = {
  key: RailLineKey;
  label: string;
  color: string;
  status?: string;
};

export const RAIL_LINES: RailLineMeta[] = railLines.map((line) => ({
  key: line.id,
  label: line.name,
  color: line.color,
  status: line.status,
}));

type RailLinesOverlayProps = {
  visible: Record<RailLineKey, boolean>;
};

export function RailLinesOverlay({ visible }: RailLinesOverlayProps) {
  const linesToRender = useMemo(
    () => railLines.filter((line) => visible[line.id]),
    [visible]
  );

  return (
    <LayerGroup>
      {linesToRender.map((line) => {
        const pathOptions: PathOptions = {
          color: line.color,
          weight: 5,
          opacity: 0.85,
        };

        return (
          <Polyline key={line.id} positions={line.positions} pathOptions={pathOptions}>
            <Tooltip direction="top" offset={[0, -6]} opacity={1}
              className="rounded-lg bg-slate-900/95 px-2 py-1 text-xs font-medium text-slate-100 shadow"
            >
              {line.name}
            </Tooltip>
          </Polyline>
        );
      })}
    </LayerGroup>
  );
}
