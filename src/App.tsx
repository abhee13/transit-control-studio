import React from "react";
import { NavLink, Outlet, Route, Routes, Navigate } from "react-router-dom";

import TopNav from "./components/TopNav";
import FiltersPanel from "./components/FiltersPanel";
import LiveMap from "./pages/LiveMap";
import Performance from "./pages/Performance";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/live" replace />} />
        <Route path="live" element={<LiveMap />} />
        <Route path="performance" element={<Performance />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-72 border-r border-ink-200 bg-white p-4 hidden lg:block">
        <FiltersPanel />
      </aside>
      <div className="flex-1 flex flex-col">
        <TopNav />
        <div className="px-4 md:px-6 lg:px-8 pb-8">
          <div className="mb-4">
            <nav className="flex gap-2">
              <Tab to="/live">Live Map</Tab>
              <Tab to="/performance">Performance</Tab>
            </nav>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function Tab({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-2xl px-4 py-2 text-sm transition-all border ${
          isActive
            ? "bg-ink-900 text-white border-ink-900"
            : "bg-white text-ink-700 border-ink-200 hover:bg-ink-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
