import { PersonalProjectType } from '@/types/PersonalProjectType';

export const ProjectData: PersonalProjectType[] = [
  {
    title: 'Arctic Design System',
    url: 'https://arctic-design.netlify.app',
    content: `Arctic Design is an innovative design system that integrates cutting-edge technologies and design principles to deliver a cohesive and flexible experience. With an emphasis on performance and interactivity, Arctic Design leverages zero-runtime CSS, server-side rendering compatibility, and advanced animations to create engaging user interfaces.`,
    imgUrl: '/arcticdesign1.png',
    skills: [
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
    content: `PDF Studio application using Next.js with the App Router, set up within an NX Workspace. It also leverages the @arctic-kit/snow component library to streamline the UI development`,
    imgUrl: '/images/pdf_studio.webp',
    skills: [
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
    content: `The current portfolio project built using NextJs and deployed on vercel.`,
    imgUrl: '/images/portfolio.png',
    skills: [
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
