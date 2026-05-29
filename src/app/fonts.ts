import { Inter } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';

// Body font. `variable` exposes --font-inter for Tailwind's font-sans token;
// `.className` is still applied to <body> in Phase 1 so body text is unchanged.
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
});

// Monospace font for metadata/labels (self-hosted via the geist package).
// GeistMono.variable === '--font-geist-mono'
export { GeistMono };
