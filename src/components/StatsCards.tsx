import Panel from "@/components/Panel";
import type { Vehicle } from "@/data/mock";

type Props = {
  vehicles: Vehicle[];
};

export default function StatsCards({ vehicles }: Props) {
  const onTimeCount = vehicles.filter((vehicle) => vehicle.status === "on-time").length;
  const lateCount = vehicles.filter((vehicle) => vehicle.status === "late").length;
  const offRouteCount = vehicles.filter((vehicle) => vehicle.status === "off-route").length;

  return (
    <div className="space-y-4">
      <Panel
        title="Active vehicles"
        action={<span className="text-lg font-semibold text-white">{vehicles.length}</span>}
      >
        <p>Vehicles currently tracking on selected routes.</p>
      </Panel>
      <Panel title="On time">
        <p className="text-2xl font-semibold text-emerald-300">{onTimeCount}</p>
        <p>Vehicles meeting schedule expectations.</p>
      </Panel>
      <Panel title="Late">
        <p className="text-2xl font-semibold text-amber-300">{lateCount}</p>
        <p>Requires attention to improve headways.</p>
      </Panel>
      <Panel title="Off route">
        <p className="text-2xl font-semibold text-rose-300">{offRouteCount}</p>
        <p>Investigate diversions or disruptions.</p>
      </Panel>
    </div>
  );
}
