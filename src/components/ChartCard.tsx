import React from "react";

export default function ChartCard({
  title,
  children,
  right,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-sm font-medium">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}
