import { ReactNode } from "react";

type Props = {
  title: string;
  left: ReactNode;
  center: ReactNode;
  right?: ReactNode;
};

export default function PageShell({ title, left, center, right }: Props) {
  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">{title}</h1>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-[320px_1fr_340px]">
        <aside className="panel-surface">{left}</aside>
        <main className="relative">{center}</main>
        <aside className="hidden lg:block">{right}</aside>
      </div>
    </div>
  );
}
