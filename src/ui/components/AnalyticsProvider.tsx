'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Firebase is imported lazily (dynamic import) only when this runs, so its SDK
// is code-split out of the initial bundle. Failures are swallowed by the caller
// — analytics must never affect the page.
async function logScreenView(pathname: string) {
  const { analytics } = await import('@/lib/firebase');
  if (!analytics) return;
  const { logEvent } = await import('firebase/analytics');
  logEvent(analytics, 'screen_view', {
    firebase_screen: pathname,
    firebase_screen_class: 'LatestPortfolio',
  });
}

const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    logScreenView(pathname).catch(() => {
      /* analytics is optional */
    });
  }, [pathname]);

  return <>{children}</>;
};

export default AnalyticsProvider;
