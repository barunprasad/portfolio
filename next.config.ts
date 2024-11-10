import type { NextConfig } from 'next';
import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';
import {
  createDefaultTheme,
  createTheme,
  createColorTheme,
} from '@arctic-kit/snow';
import { mint, slate } from '@arctic-kit/colors';

const lightTheme = createDefaultTheme();
const darkTheme = createDefaultTheme(true);
darkTheme.colors.secondary = {
  ...mint,
  main: mint[500],
};

darkTheme.colors.primary = {
  ...slate,
  main: slate[500],
};

const theme = extendTheme({
  colorSchemes: {
    light: lightTheme,
    dark: darkTheme,
  },
  cssVarPrefix: 'snow',
  getSelector: (colorScheme) =>
    colorScheme ? `.theme-${colorScheme}` : ':root',
});

const nextConfig: NextConfig = {
  /* config options here */
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
  output: 'export',
};

const configWithPigment = withPigment(
  { ...nextConfig },
  {
    theme,
  },
);

export default configWithPigment;
