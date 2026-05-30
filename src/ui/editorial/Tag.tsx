import type { ReactNode } from 'react';

// A single skill/tech chip. Render inside a <ul className="flex flex-wrap gap-2">.
export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
      {children}
    </li>
  );
}
