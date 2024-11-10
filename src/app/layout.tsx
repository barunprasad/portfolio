import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import '@pigment-css/react/styles.css';
import '@arctic-kit/snow/style.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Barun Prasad - Portfolio',
  description: 'Portfolio for Barun Prasad',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-dark">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
