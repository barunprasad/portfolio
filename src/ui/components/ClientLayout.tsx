'use client';

import { ReactNode } from 'react';
import AnalyticsProvider from './AnalyticsProvider';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return <AnalyticsProvider>{children}</AnalyticsProvider>;
};

export default ClientLayout;
