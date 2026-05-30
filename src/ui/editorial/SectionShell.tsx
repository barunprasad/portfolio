import type { ReactNode } from 'react';
import { Container } from './Container';

// Editorial section frame: a sticky left rail carrying a large ghosted index
// number + mono label, with the content measured in a readable column to the
// right. Stacks to a single column on mobile.
export function SectionShell({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative overflow-hidden scroll-mt-20 border-t border-line py-16 sm:py-24"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 right-0 select-none font-display text-[24vw] font-bold uppercase leading-none tracking-tighter text-ink/[0.035] lg:text-[13rem]"
      >
        {label}
      </span>
      <Container className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
          <div data-animate className="lg:sticky lg:top-28 lg:self-start">
            <h2
              id={`${id}-heading`}
              className="flex items-baseline gap-3 lg:flex-col lg:items-start lg:gap-3"
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl font-semibold leading-none text-ink/15 lg:text-6xl"
              >
                {String(index).padStart(2, '0')}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                {label}
              </span>
            </h2>
          </div>

          <div className="max-w-2xl">{children}</div>
        </div>
      </Container>
    </section>
  );
}
