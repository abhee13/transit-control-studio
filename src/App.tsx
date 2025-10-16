import { Navigate, Route, Routes } from "react-router-dom";

import FiltersPanel from "@/components/FiltersPanel";
import TopNav from "@/components/TopNav";
import LiveMap from "@/pages/LiveMap";
import Performance from "@/pages/Performance";
import Rail from "@/pages/Rail";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <TopNav />
      <main className="mx-auto max-w-7xl px-5 pb-10">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid gap-6 py-6 lg:grid-cols-[320px,1fr]">
                <FiltersPanel />
                <LiveMap />
              </div>
            }
          />
          <Route path="/performance" element={<Performance />} />
          <Route path="/rail" element={<Rail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
