import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://www.barunprasad.com'),
  title: 'Barun Prasad - Frontend Evangelist',
  description:
    'Explore the portfolio of Barun Prasad, a seasoned Frontend Evangelist with expertise in UI strategy, React, and modern web development. Discover insights into accessible, scalable, and high-performance frontend solutions.',
  keywords: [
    'Frontend Evangelist',
    'Barun Prasad',
    'UI Strategy',
    'React Developer',
    'Web Development',
    'JavaScript',
    'TypeScript',
    'UI/UX',
    'Next.js',
    'Frontend Architect',
  ],
  openGraph: {
    title: 'Barun Prasad - Frontend Evangelist',
    description:
      "Discover Barun Prasad's portfolio as a seasoned Frontend Evangelist with extensive experience in UI strategy and modern web development.",
    url: 'https://www.barunprasad.com',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Barun Prasad - Frontend Evangelist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barun Prasad - Frontend Evangelist',
    description:
      'Explore the portfolio of Barun Prasad, a seasoned Frontend Evangelist with expertise in UI strategy, React, and modern web development.',
    images: ['/images/profile_image.jpg'],
  },
  robots: 'index, follow',
  authors: {
    name: 'Barun Prasad',
    url: 'https://www.barunprasad.com',
  },
};
