import { ReactNode } from "react";

type Props = {
  title: string;
  value: ReactNode;
  caption?: string;
};

export default function KpiCard({ title, value, caption }: Props) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs tracking-wider uppercase text-slate-300">{title}</div>
      <div className="mt-1 text-4xl font-semibold">{value}</div>
      {caption && <div className="mt-3 text-sm text-slate-400">{caption}</div>}
    </div>
  );
}
