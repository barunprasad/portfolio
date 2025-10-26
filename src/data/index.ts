import { Section } from '@/types/content';
import { ExperienceData } from './experience';
import { AboutData } from './about';
import { ProjectData } from './projects';
import { BlogData } from './blogs';
import { LearningData } from './learning';

export const IntroSectionData = {
  title: 'Barun Prasad',
  subTitle: 'Frontend Evangelist',
  description: 'Transforming ideas into creative solutions.',
};

// Type-safe sections with discriminated unions
export const ArticleSectionData: Section[] = [
  {
    label: 'about',
    content: AboutData,
  },
  {
    label: 'experience',
    content: ExperienceData,
    footerLinks: [
      // {
      //   href: '/resume.pdf',
      //   label: 'View Full Resume',
      // },
      // {
      //   href: '/resume_short.pdf',
      //   label: 'View Short Resume',
      // },
    ],
  },
  {
    label: 'projects',
    content: ProjectData,
  },
  {
    label: 'blogs',
    content: BlogData,
  },
  {
    label: 'learnings',
    content: LearningData,
  },
];
