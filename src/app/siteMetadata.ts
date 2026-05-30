import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://www.barunprasad.com'),
  title: 'Barun Prasad — Engineering Leader & Frontend Architect',
  description:
    'Portfolio of Barun Prasad — an engineering leader with 19 years across frontend platforms, design systems, and team leadership, increasingly building with AI. Scalable, accessible, high-performance frontend.',
  keywords: [
    'Barun Prasad',
    'Engineering Leader',
    'Director of Technology',
    'Frontend Architect',
    'Design Systems',
    'AI-assisted Development',
    'React',
    'Next.js',
    'TypeScript',
    'UI Strategy',
  ],
  openGraph: {
    title: 'Barun Prasad — Engineering Leader & Frontend Architect',
    description:
      'Engineering leader with 19 years across frontend platforms, design systems, and team leadership — increasingly building with AI.',
    url: 'https://www.barunprasad.com',
    siteName: 'Barun Prasad',
    locale: 'en_US',
    type: 'website',
    // og:image is supplied by app/opengraph-image.tsx (dynamic, on-brand).
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barun Prasad — Engineering Leader & Frontend Architect',
    description:
      'Engineering leader with 19 years across frontend platforms, design systems, and team leadership — increasingly building with AI.',
    creator: '@iambarunprasad',
    site: '@iambarunprasad',
    // twitter:image falls back to app/opengraph-image.tsx.
  },
  robots: 'index, follow',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Barun Prasad', url: 'https://www.barunprasad.com' }],
  creator: 'Barun Prasad',
  publisher: 'Barun Prasad',
};
