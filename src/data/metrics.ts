export type Point = { t: string; v: number };

const hours = Array.from({ length: 24 }, (_, i) =>
  `${String(i).padStart(2, "0")}:00`
);

function wobble(seed = 100) {
  return Math.max(40, Math.round(seed + (Math.random() - 0.5) * 20));
}

export const ridership24h: Point[] = hours.map((t, i) => ({
  t,
  v: wobble(100 + Math.sin(i / 3) * 15),
}));

export const otpTrend: Point[] = hours.map((t, i) => ({
  t,
  v: Math.round(96 + Math.sin(i / 4) * 3),
}));

export const activeTrips: Point[] = hours.map((t, i) => ({
  t,
  v: Math.round(3 + Math.sin(i / 5) * 2 + Math.random() * 1.5),
}));

export const incidentBreakdown = [
  { name: "Signal", v: 5 },
  { name: "Vehicle", v: 3 },
  { name: "Weather", v: 2 },
  { name: "Other", v: 4 },
];

export const opsScore = {
  otp: { value: 98.5, delta: +1.2 },
  incidents: { value: 3, delta: -1 },
  csat: { value: 4.5, delta: +0.1 },
};
