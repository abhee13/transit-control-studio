import SearchSelect from "@/components/SearchSelect";
import { useAppStore } from "@/store/useAppStore";

export default function FiltersPanel() {
  const { busRoutes, selectedRoutes, setSelectedRoutes, showStops, setShowStops } = useAppStore();
  const options = busRoutes.map((route) => ({
    id: route.id,
    label: `${route.number} — ${route.name}`,
    sub: route.id,
  }));

  return (
    <div className="rounded-xl bg-black/20 ring-1 ring-white/10 p-4 panel-surface space-y-4">
      <header className="space-y-1">
        <div className="text-sm font-semibold uppercase tracking-wide text-white/70">Routes</div>
        <p className="text-xs text-white/50">Filter the live map by route or toggle stop visibility.</p>
      </header>
      <SearchSelect
        options={options}
        value={selectedRoutes}
        onChange={setSelectedRoutes}
        placeholder="Type a route number or name…"
      />
      <label className="flex items-center gap-3 text-sm text-white/70">
        <input
          type="checkbox"
          checked={showStops}
          onChange={(event) => setShowStops(event.target.checked)}
          className="h-4 w-4 rounded border-white/30 bg-white/10 text-primary-400 focus:ring-primary-400"
        />
        Show stops
      </label>
      <p className="text-xs text-white/50">UI only demo with mock data</p>
    </div>
  );
}
