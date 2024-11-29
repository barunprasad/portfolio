'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

interface AnalyticsProviderProps {
  children: ReactNode;
}

function getScreenClass(pathname: string): string {
  if (pathname.startsWith('/about')) {
    return 'AboutPage';
  } else if (pathname.startsWith('/projects')) {
    return 'ProjectsPage';
  } else if (pathname.startsWith('/contact')) {
    return 'ContactPage';
  } else {
    return 'LatestPortfolioApp';
  }
}

const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (analytics && process.env.NODE_ENV === 'production') {
      const pagePath =
        pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : '');
      logEvent(analytics, 'screen_view', {
        firebase_screen: pagePath,
        firebase_screen_class: getScreenClass(pathname),
      });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
};

export default AnalyticsProvider;
