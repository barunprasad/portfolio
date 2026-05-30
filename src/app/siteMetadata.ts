import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://www.barunprasad.com'),
  title: 'Barun Prasad — Engineering Leader & Frontend Architect',
  description:
    'Portfolio of Barun Prasad — an engineering leader with 18+ years across frontend platforms, design systems, and team leadership, increasingly building with AI. Scalable, accessible, high-performance frontend.',
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
      "Engineering leader with 18+ years across frontend platforms, design systems, and team leadership — increasingly building with AI.",
    url: 'https://www.barunprasad.com',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Barun Prasad — Engineering Leader & Frontend Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barun Prasad — Engineering Leader & Frontend Architect',
    description:
      'Engineering leader with 18+ years across frontend platforms, design systems, and team leadership — increasingly building with AI.',
    images: ['/images/profile_image.jpg'],
  },
  robots: 'index, follow',
  alternates: {
    canonical: '/',
  },
  authors: {
    name: 'Barun Prasad',
    url: 'https://www.barunprasad.com',
  },
};
