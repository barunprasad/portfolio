'use client';

import { useSyncExternalStore } from 'react';

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(new Date());
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

// Live local clock. The server snapshot is a placeholder ("—") so SSR and the
// first client render match (no hydration mismatch); the client then renders the
// real time and updates on an interval — all without setState-in-effect.
export function LocalTime({ timeZone = 'Asia/Kolkata' }: { timeZone?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => formatTime(timeZone),
    () => '—',
  );

  return <span suppressHydrationWarning>{time}</span>;
}
