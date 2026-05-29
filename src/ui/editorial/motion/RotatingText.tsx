'use client';

import { useEffect, useState } from 'react';

// Cycles through `items` on an interval. SSR renders items[0] and the client's
// initial render matches it (no hydration mismatch); cycling starts after mount
// and is skipped under reduced motion.
export function RotatingText({
  items,
  interval = 2400,
  className = '',
}: {
  items: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (items.length < 2) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % items.length),
      interval,
    );
    return () => clearInterval(id);
  }, [items.length, interval]);

  return <span className={className}>{items[index]}</span>;
}
