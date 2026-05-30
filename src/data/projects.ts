import { ProjectEntry } from '@/types/content';

// Projects render generative covers seeded by title — no imageUrl needed.
// Live content is served from Hygraph; mirror any changes there.
export const ProjectData: ProjectEntry[] = [
  {
    title: 'Arctic Design Kit',
    url: 'https://www.arctic-kit.com',
    description: `My open-source React design system, built for performance — zero-runtime CSS, full SSR support, accessible primitives, and motion baked in. Shipped as @arctic-kit/snow, developed Storybook-first in an Nx monorepo.`,
    tags: [
      'React',
      'TypeScript',
      'Design Systems',
      'Pigment CSS',
      'Framer Motion',
      'Storybook',
      'Nx',
    ],
  },
  {
    title: 'PDF Studio',
    url: 'https://pdf-studio.netlify.app',
    description: `A fast, browser-based PDF toolkit — merge, split, reorder and convert, entirely client-side. Built with the Next.js App Router in an Nx monorepo, using the Arctic Kit design system for a consistent UI.`,
    tags: ['Next.js', 'React', 'TypeScript', 'Nx', 'Arctic Kit', 'Pigment CSS'],
  },
  {
    title: 'Previews',
    url: 'https://previews.bpstack.com',
    description: `A web tool for generating polished App Store & Play Store screenshots — device mockups, templates, backgrounds, text overlays, and background removal, with cloud sync. Ship store-ready assets without a designer.`,
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Canvas', 'SVG'],
  },
  {
    title: 'Learn',
    url: 'https://learn.barunprasad.com',
    description: `A cohort-based technical learning platform — instructor-led tracks with weekly-unlocked lessons, hands-on projects with feedback, peer discussion, progress dashboards, and certificates on completion.`,
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Portfolio',
    url: 'https://www.barunprasad.com',
    description: `This site — an editorial portfolio with a generative "systems" visual language: an interactive node-network hero, generative project covers, a career timeline, and scroll-driven motion. Next.js 16 + Tailwind v4, GSAP + Lenis, content via Hygraph — SEO-first, with a perfect-100 desktop Lighthouse.`,
    tags: [
      'Next.js',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'GSAP',
      'Lenis',
      'Hygraph',
      'Vercel',
    ],
  },
];
