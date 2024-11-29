import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import '@pigment-css/react/styles.css';
import '@arctic-kit/snow/style.css';
import { siteMetadata } from './siteMetadata';
import AnalyticsProvider from '@/ui/components/AnalyticsProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
});

export const metadata: Metadata = { ...siteMetadata };

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-dark">
      <body className={`${inter.className} antialiased`}>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
