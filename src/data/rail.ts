export type RailLine = {
  id: "green" | "blue" | "red" | "orange" | "silver";
  name: string;
  color: string;
  positions: [number, number][];
  status?: "ok" | "delay" | "issue";
};

const d = {
  // Rough Dallas core bounds — mock points, just to visualize lines.
  // Replace with real GTFS shapes later.
  n: 32.86,
  s: 32.70,
  w: -96.92,
  e: -96.65,
};

export const railLines: RailLine[] = [
  {
    id: "green",
    name: "Green Line",
    color: "#22c55e",
    status: "ok",
    positions: [
      [d.n - 0.0, d.w + 0.12],
      [32.835, -96.84],
      [32.815, -96.83],
      [32.8, -96.82],
      [32.785, -96.81],
      [32.77, -96.8],
      [d.s + 0.01, d.w + 0.09],
    ],
  },
  {
    id: "blue",
    name: "Blue Line",
    color: "#60a5fa",
    status: "ok",
    positions: [
      [32.79, d.w + 0.01],
      [32.79, -96.88],
      [32.79, -96.86],
      [32.79, -96.83],
      [32.79, -96.8],
      [32.79, -96.77],
      [32.79, -96.73],
      [32.79, d.e - 0.02],
    ],
  },
  {
    id: "red",
    name: "Red Line",
    color: "#f87171",
    status: "delay",
    positions: [
      [d.n - 0.01, -96.88],
      [32.845, -96.86],
      [32.83, -96.84],
      [32.815, -96.82],
      [32.8, -96.8],
      [32.785, -96.78],
      [32.77, -96.75],
      [32.74, -96.71],
    ],
  },
  {
    id: "orange",
    name: "Orange Line",
    color: "#fb923c",
    status: "ok",
    positions: [
      [32.82, -96.9],
      [32.81, -96.88],
      [32.8, -96.86],
      [32.79, -96.84],
      [32.78, -96.82],
      [32.77, -96.8],
      [32.76, -96.78],
      [32.75, -96.76],
    ],
  },
  {
    id: "silver",
    name: "Silver Line",
    color: "#cbd5e1",
    status: "issue",
    positions: [
      [32.745, -96.9],
      [32.76, -96.87],
      [32.78, -96.84],
      [32.8, -96.81],
      [32.82, -96.78],
      [32.835, -96.75],
      [32.85, -96.72],
    ],
  },
];
