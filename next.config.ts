import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/id/**',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        port: '',
        pathname: '/v2/resize:fit:150/format:webp/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
