import { SectionType } from '@/types/SectionType';
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

export const ArticleSectionData: SectionType[] = [
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
