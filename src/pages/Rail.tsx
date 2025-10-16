import React, { useState } from "react";
import PageShell from "@/components/PageShell";
import LiveOpsMap from "@/components/LiveOpsMap";

function RailFilters() {
  const [notes] = useState("Mock status • Schedule & incidents coming soon");
  return (
    <aside className="rounded-2xl bg-slate-900/40 p-4 ring-1 ring-white/10">
      <h2 className="text-sm font-semibold text-slate-200">RAIL LINES</h2>
      <p className="mt-1 text-xs text-slate-400">Toggle lines to preview service layout. Data is mock for UI demo.</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        <li><span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mr-2" />Green Line — {notes}</li>
        <li><span className="inline-block h-2 w-2 rounded-full bg-sky-500 mr-2" />Blue Line — {notes}</li>
        <li><span className="inline-block h-2 w-2 rounded-full bg-rose-500 mr-2" />Red Line — {notes}</li>
        <li><span className="inline-block h-2 w-2 rounded-full bg-orange-500 mr-2" />Orange Line — {notes}</li>
        <li><span className="inline-block h-2 w-2 rounded-full bg-slate-300 mr-2" />Silver Line — {notes}</li>
      </ul>
    </aside>
  );
}

function RailKPIs() {
  const Card = ({ title, value, desc }: { title: string; value: string | number; desc: string }) => (
    <div className="rounded-xl bg-slate-900/40 p-4 ring-1 ring-white/10">
      <div className="text-xs font-medium tracking-wide text-slate-400">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-100">{value}</div>
      <p className="mt-2 text-sm text-slate-400">{desc}</p>
    </div>
  );
  return (
    <aside className="flex flex-col gap-4">
      <Card title="ACTIVE TRAINS" value={3} desc="Trains currently tracking across selected lines." />
      <Card title="ON TIME" value={2} desc="Trains meeting schedule expectations." />
      <Card title="INCIDENTS" value={1} desc="Reported issues impacting service." />
      <Card title="OFFLINE" value={0} desc="No comms or scheduled downtime." />
    </aside>
  );
}

export default function RailPage() {
  const railLines = [
    { id: "green",  color: "#22c55e", coords: [[32.78,-96.84],[32.78,-96.80],[32.76,-96.78],[32.73,-96.75]] as [number,number][] },
    { id: "blue",   color: "#38bdf8", coords: [[32.77,-96.86],[32.77,-96.81],[32.75,-96.78],[32.73,-96.76]] as [number,number][] },
    { id: "red",    color: "#ef4444", coords: [[32.79,-96.84],[32.78,-96.80],[32.76,-96.77],[32.74,-96.74]] as [number,number][] },
    { id: "orange", color: "#fb923c", coords: [[32.80,-96.86],[32.79,-96.82],[32.77,-96.79],[32.75,-96.76]] as [number,number][] },
    { id: "silver", color: "#cbd5e1", coords: [[32.81,-96.87],[32.79,-96.83],[32.77,-96.80],[32.74,-96.77]] as [number,number][] },
  ];

  return (
    <PageShell activeMode="rail" title="Rail Lines">
      <RailFilters />
      <section>
        <LiveOpsMap railLines={railLines} showStops={false} />
      </section>
      <RailKPIs />
    </PageShell>
  );
}
