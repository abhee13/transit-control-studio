import { create } from "zustand";
import { BUS_ROUTES } from "@/data/routes";

type Mode = "bus" | "rail";

type State = {
  mode: Mode;
  busRoutes: typeof BUS_ROUTES;
  selectedRoutes: string[];
  showStops: boolean;
};

type Actions = {
  setMode: (mode: Mode) => void;
  setSelectedRoutes: (ids: string[]) => void;
  setShowStops: (value: boolean) => void;
};

export const useAppStore = create<State & Actions>((set) => ({
  mode: "bus",
  busRoutes: BUS_ROUTES,
  selectedRoutes: [],
  showStops: true,
  setMode: (mode) => set({ mode }),
  setSelectedRoutes: (ids) => set({ selectedRoutes: ids }),
  setShowStops: (value) => set({ showStops: value }),
}));
