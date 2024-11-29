'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

interface AnalyticsProviderProps {
  children: ReactNode;
}

const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (analytics && process.env.NODE_ENV === 'production') {
      logEvent(analytics, 'screen_view', {
        firebase_screen: pathname,
        firebase_screen_class: 'LatestPortfolio',
      });
    }
  }, [pathname]);

  return <>{children}</>;
};

export default AnalyticsProvider;
