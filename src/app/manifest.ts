import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Barun Prasad — Engineering Leader',
    short_name: 'Barun Prasad',
    description:
      'Portfolio of Barun Prasad — engineering leader: design systems, frontend architecture, and AI-assisted delivery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0b',
    theme_color: '#0a0a0b',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
