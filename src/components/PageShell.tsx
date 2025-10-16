import React from "react";

type Props = {
  activeMode: "bus" | "rail";
  title?: string;
  children: React.ReactNode;
};

export default function PageShell({ activeMode, title = "Live Network Map", children }: Props) {
  return (
    <div className="px-6 py-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">{title}</h1>
        <nav className="flex gap-2 rounded-full bg-slate-800/60 p-1">
          <a
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm ${activeMode === "bus" ? "bg-indigo-500 text-white" : "text-slate-200 hover:bg-slate-700/60"}`}
          >
            Bus
          </a>
          <a
            href="/rail"
            className={`px-4 py-1.5 rounded-full text-sm ${activeMode === "rail" ? "bg-indigo-500 text-white" : "text-slate-200 hover:bg-slate-700/60"}`}
          >
            Rail
          </a>
        </nav>
      </header>

      <div className="grid grid-cols-[300px,1fr,360px] gap-6">{children}</div>
    </div>
  );
}
