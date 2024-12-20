import { ArticleType } from '@/types/ArticleType';

export const ProjectData: ArticleType[] = [
  {
    title: 'Arctic Design Kit',
    url: 'https://www.arctic-kit.com',
    description: `Arctic Design Kit is an innovative design system that integrates cutting-edge technologies and design principles to deliver a cohesive and flexible experience. With an emphasis on performance and interactivity, Arctic Design leverages zero-runtime CSS, server-side rendering compatibility, and advanced animations to create engaging user interfaces.`,
    imageUrl: '/images/arcticdesign.png',
    tags: [
      'React',
      'NX Workspace',
      'Storybook',
      'TypeScript',
      'PigmentCss',
      'framer-motion',
    ],
  },
  {
    title: 'PDF Studio',
    url: 'https://pdf-studio.netlify.app',
    description: `PDF Studio application using Next.js with the App Router, set up within an NX Workspace. It also leverages the @arctic-kit/snow component library to streamline the UI development`,
    imageUrl: '/images/pdf_studio.webp',
    tags: [
      'React',
      'NX Workspace',
      'TypeScript',
      'PigmentCss',
      'framer-motion',
      'Arctic-Design',
    ],
  },
  {
    title: 'Portfolio',
    url: 'https://www.barunprasad.com',
    description: `The current portfolio project built using NextJs and deployed on vercel.`,
    imageUrl: '/images/portfolio.png',
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'PigmentCss',
      'framer-motion',
      'Arctic-Design',
      'Vercel',
    ],
  },
];
