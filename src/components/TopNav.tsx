import { Link, NavLink } from "react-router-dom";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">
          Transit Control Studio
        </Link>
        <nav className="flex items-center gap-4 text-sm text-white/60">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `transition hover:text-white ${isActive ? "text-white" : ""}`
            }
          >
            Live Map
          </NavLink>
          <NavLink
            to="/performance"
            className={({ isActive }) =>
              `transition hover:text-white ${isActive ? "text-white" : ""}`
            }
          >
            Performance
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
