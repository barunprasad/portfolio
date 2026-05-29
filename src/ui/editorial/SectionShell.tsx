import type { ReactNode } from 'react';
import { Container } from './Container';

// Wraps each content section with a consistent numbered, mono eyebrow heading.
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
      className="scroll-mt-20 border-t border-line py-16 sm:py-24"
    >
      <Container>
        <h2
          id={`${id}-heading`}
          className="mb-10 flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted"
        >
          <span className="text-accent" aria-hidden="true">
            {String(index).padStart(2, '0')}
          </span>
          <span>{label}</span>
        </h2>
        {children}
      </Container>
    </section>
  );
}
