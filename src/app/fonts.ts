import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { GeistMono } from 'geist/font/mono';

// Body font (--font-sans).
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

// Display font for headlines (--font-display), self-hosted from Fontshare.
export const generalSans = localFont({
  src: [
    { path: '../fonts/general-sans/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/general-sans/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/general-sans/GeneralSans-Semibold.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/general-sans/GeneralSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-general-sans',
});

// Monospace font for metadata/labels (--font-mono). GeistMono.variable === '--font-geist-mono'.
export { GeistMono };
