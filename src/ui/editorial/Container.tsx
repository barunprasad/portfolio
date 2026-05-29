import type { ReactNode } from 'react';

// Centered editorial canvas. Mobile-first padding that opens up on larger
// screens; a roomy max width that the inner content measures itself against.
export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
