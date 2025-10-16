import { Link, NavLink } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";

export default function TopNav() {
  const { setMode } = useAppStore();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">
          Transit Control Studio
        </Link>
        <nav className="flex items-center gap-3 text-sm text-white/60">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hover:text-white ${isActive ? "text-white" : ""}`
            }
            onClick={() => setMode("bus")}
          >
            Live Map
          </NavLink>
          <NavLink
            to="/performance"
            className={({ isActive }) =>
              `hover:text-white ${isActive ? "text-white" : ""}`
            }
          >
            Performance
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="glass rounded-full p-1 flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1 rounded-full text-sm ${
                  isActive
                    ? "bg-primary-500/25 text-primary-100"
                    : "text-white/70 hover:text-white"
                }`
              }
              onClick={() => setMode("bus")}
            >
              Bus
            </NavLink>
            <NavLink
              to="/rail"
              className={({ isActive }) =>
                `px-3 py-1 rounded-full text-sm ${
                  isActive
                    ? "bg-primary-500/25 text-primary-100"
                    : "text-white/70 hover:text-white"
                }`
              }
              onClick={() => setMode("rail")}
            >
              Rail
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
