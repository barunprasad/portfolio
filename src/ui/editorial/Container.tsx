import type { ReactNode } from 'react';

// Centered editorial content column. Mobile-first horizontal padding that opens
// up on larger screens; capped measure keeps line lengths readable.
export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-3xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
