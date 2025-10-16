import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import ChartCard from "@/components/ChartCard";
import StatChip from "@/components/StatChip";
import {
  ridership24h,
  otpTrend,
  activeTrips,
  incidentBreakdown,
  opsScore,
} from "@/data/metrics";

const axis = {
  stroke: "rgba(255,255,255,0.35)",
  tick: { fill: "rgba(255,255,255,0.55)", fontSize: 11 },
};

export default function PerformancePage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-white">Performance story</h1>
        <p className="text-white/60 text-sm">
          A focused view of operations health with trends and benchmarks.
        </p>
      </header>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatChip label="OTP" value={`${opsScore.otp.value}%`} delta={opsScore.otp.delta} />
        <StatChip label="Incidents" value={opsScore.incidents.value} delta={opsScore.incidents.delta} />
        <StatChip label="CSAT" value={`${opsScore.csat.value}/5`} delta={opsScore.csat.delta} />
        <StatChip label="Window" value="Last 24 hours" />
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Ridership trend">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ridership24h} margin={{ left: -20, right: 10 }}>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="t" {...axis} tickMargin={8} />
                  <YAxis {...axis} tickMargin={6} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,.9)",
                      border: "1px solid rgba(255,255,255,.12)",
                      borderRadius: 12,
                      color: "white",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    fill="url(#grad1)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="lg:col-span-1">
          <ChartCard title="Operations score">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentBreakdown}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="name" {...axis} />
                  <YAxis {...axis} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,.9)",
                      border: "1px solid rgba(255,255,255,.12)",
                      borderRadius: 12,
                      color: "white",
                    }}
                  />
                  <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="#a78bfa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="lg:col-span-1">
          <ChartCard title="On-time performance">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={otpTrend} margin={{ left: -20, right: 10 }}>
                  <defs>
                    <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis hide dataKey="t" />
                  <YAxis hide />
                  <Area type="monotone" dataKey="v" stroke="#34d399" strokeWidth={2} fill="url(#grad2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="lg:col-span-2">
          <ChartCard title="Active trips">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeTrips} margin={{ left: -20, right: 10 }}>
                  <defs>
                    <linearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis hide dataKey="t" />
                  <YAxis hide />
                  <Area type="monotone" dataKey="v" stroke="#60a5fa" strokeWidth={2} fill="url(#grad3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
