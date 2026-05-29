'use client';

import { useEffect, useState } from 'react';

// Live local clock. SSR and the first client render both show the placeholder
// (so no hydration mismatch); the real time fills in after mount.
export function LocalTime({ timeZone = 'Asia/Kolkata' }: { timeZone?: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone,
      }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span suppressHydrationWarning>{time || '—'}</span>;
}
