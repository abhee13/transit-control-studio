export type Route = { id: string; number: string; name: string };
export const BUS_ROUTES: Route[] = [
  { id: "001", number: "001", name: "Malcolm X — Maple" },
  { id: "003", number: "003", name: "Ross" },
  { id: "005", number: "005", name: "Love Field Shuttle" },
  { id: "009", number: "009", name: "Jefferson Gaston" },
  { id: "013", number: "013", name: "Ervay" },
  { id: "018", number: "018", name: "Samuel" },
  { id: "025", number: "025", name: "Cockrell Hill North" },
  { id: "038", number: "038", name: "Ledbetter" },
  { id: "041", number: "041", name: "Bonnie View" },
  { id: "047", number: "047", name: "Polk" },
  { id: "057", number: "057", name: "Westmoreland" },
  { id: "105", number: "105", name: "Northwest Hwy" },
  { id: "203", number: "203", name: "Ridgecrest" },
  { id: "315", number: "315", name: "BUS-315" },
  { id: "408", number: "408", name: "BUS-408" }
];

export const RAIL_LINES = [
  { id: "green",  label: "Green Line",  color: "#22c55e" },
  { id: "blue",   label: "Blue Line",   color: "#60a5fa" },
  { id: "red",    label: "Red Line",    color: "#ef4444" },
  { id: "orange", label: "Orange Line", color: "#fb923c" },
  { id: "silver", label: "Silver Line", color: "#cbd5e1" },
];
