import { Navigate, Route, Routes } from "react-router-dom";

import TopNav from "@/components/TopNav";
import LiveMapPage from "@/pages/LiveMap";
import Performance from "@/pages/Performance";
import RailPage from "@/pages/Rail";

export default function App() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto w-full max-w-7xl px-5 pb-10">
        <Routes>
          <Route path="/" element={<LiveMapPage />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/rail" element={<RailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
