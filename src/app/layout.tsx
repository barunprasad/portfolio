import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteMetadata } from './siteMetadata';
import { inter, generalSans, GeistMono } from './fonts';

export const metadata: Metadata = { ...siteMetadata };

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${generalSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
