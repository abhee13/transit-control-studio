import type { ReactNode } from "react";

export default function Panel({
  title,
  action,
  children,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card p-6 space-y-4">
      {(title || action) && (
        <header className="flex items-center justify-between gap-3">
          {title && <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">{title}</h2>}
          {action}
        </header>
      )}
      <div className="text-white/80 text-sm space-y-4">{children}</div>
    </section>
  );
}
