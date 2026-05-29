import type { Metadata, Viewport } from 'next';
import './globals.scss';
import './globals.css';
import '@pigment-css/react/styles.css';
import '@arctic-kit/snow/style.css';
import { siteMetadata } from './siteMetadata';
import { inter, GeistMono } from './fonts';

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
    <html
      lang="en"
      className={`theme-dark ${inter.variable} ${GeistMono.variable}`}
    >
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
