import { useEffect } from "react";

import Panel from "@/components/Panel";
import { RAIL_LINES } from "@/data/routes";
import { useAppStore } from "@/store/useAppStore";

export default function RailPage() {
  const { setMode } = useAppStore();

  useEffect(() => {
    setMode("rail");
  }, [setMode]);

  return (
    <div className="space-y-6 py-6">
      <div className="space-y-1">
        <h1 className="title-lg">Rail Lines</h1>
        <p className="text-sm text-white/60">Choose a line to preview service info.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RAIL_LINES.map((line) => (
          <div key={line.id} className="card flex items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ background: line.color }} />
              <div>
                <p className="font-medium text-white/90">{line.label}</p>
                <p className="text-sm text-white/50">Mock status • Schedule & incidents coming soon</p>
              </div>
            </div>
            <span className="chip" style={{ borderColor: "rgba(255,255,255,.12)" }}>
              View
            </span>
          </div>
        ))}
      </div>
      <Panel title="System notes">
        <p>
          Rail data integrations are in progress. This UI showcases the layout for real-time vehicle tracking, incident alerts, and
          planned service adjustments.
        </p>
      </Panel>
    </div>
  );
}
