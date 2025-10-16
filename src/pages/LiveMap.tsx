import React, { useState } from "react";
import PageShell from "@/components/PageShell";
import LiveOpsMap from "@/components/LiveOpsMap";

function FiltersPanel() {
  const [query, setQuery] = useState("");
  const [showStops, setShowStops] = useState(true);

  return (
    <aside className="rounded-2xl bg-slate-900/40 p-4 ring-1 ring-white/10">
      <h2 className="text-sm font-semibold text-slate-200">ROUTES</h2>
      <p className="mt-1 text-xs text-slate-400">Filter the live map by route or toggle stop visibility.</p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a route number or name..."
        className="mt-3 w-full rounded-lg bg-slate-800/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <label className="mt-3 flex items-center gap-2 text-sm text-slate-200">
        <input type="checkbox" checked={showStops} onChange={(e) => setShowStops(e.target.checked)} />
        Show stops
      </label>
      <p className="mt-2 text-xs text-slate-500">UI only demo with mock data</p>
    </aside>
  );
}

function KPICards() {
  const Card = ({ title, value, desc }: { title: string; value: string | number; desc: string }) => (
    <div className="rounded-xl bg-slate-900/40 p-4 ring-1 ring-white/10">
      <div className="text-xs font-medium tracking-wide text-slate-400">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-100">{value}</div>
      <p className="mt-2 text-sm text-slate-400">{desc}</p>
    </div>
  );
  return (
    <aside className="flex flex-col gap-4">
      <Card title="ACTIVE VEHICLES" value={3} desc="Vehicles currently tracking on selected routes." />
      <Card title="ON TIME" value={2} desc="Vehicles meeting schedule expectations." />
      <Card title="LATE" value={1} desc="Requires attention to improve headways." />
      <Card title="OFF ROUTE" value={0} desc="Investigate diversions or disruptions." />
    </aside>
  );
}

export default function LiveMapPage() {
  // Mock data for vehicles; replace with your store/state
  const vehicles = [
    { id: "bus-101", lat: 32.78, lng: -96.80, label: "BUS-101", color: "#16a34a" },
    { id: "bus-203", lat: 32.76, lng: -96.79, label: "BUS-203", color: "#f97316" },
    { id: "bus-315", lat: 32.78, lng: -96.82, label: "BUS-315", color: "#16a34a" },
  ];

  return (
    <PageShell activeMode="bus" title="Live Network Map">
      <FiltersPanel />
      <section>
        <LiveOpsMap vehicles={vehicles} showStops={true} />
      </section>
      <KPICards />
    </PageShell>
  );
}
