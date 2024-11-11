import { BlogSection } from '@/ui/features/Sections/BlogSection';
import { ExperienceSection } from '@/ui/features/Sections/ExperienceSection';
import { LearningSection } from '@/ui/features/Sections/LearningSection';
import { ProjectSection } from '@/ui/features/Sections/ProjectSection';
import { ViewResume } from '@/ui/features/ViewResume';
import {
  GitHubIcon,
  LinkedInIcon,
  MediumIcon,
  // TwitterIcon
} from '@/ui/icons';

export const Sections = [
  {
    label: 'about',
    content: (
      <>
        <p style={{ color: 'var(--snow-colors-neutral-1000)' }}>
          Frontend Engineering Leader with 17+ years in architecting scalable,
          mobile-first web applications and cross-platform mobile apps.
          Proficient in React ecosystem, frontend design systems, and backend
          integration, with extensive expertise in accessibility, modular CSS,
          and performance optimization. Proven record of leading teams and
          delivering high-impact projects in Agile environments.
        </p>
      </>
    ),
  },
  {
    label: 'experience',
    content: (
      <>
        <ExperienceSection />
        <ViewResume />
      </>
    ),
  },
  {
    label: 'projects',
    content: <ProjectSection />,
  },
  {
    label: 'blogs',
    content: <BlogSection />,
  },
  {
    label: 'learnings',
    content: <LearningSection />,
  },
];

export const SocialMediaLinks = [
  {
    href: 'https://github.com/barunprasad',
    label: 'GitHub',
    icon: <GitHubIcon />,
  },
  {
    href: 'https://www.linkedin.com/in/barunprasad',
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
  {
    href: 'https://medium.com/@barunprasad',
    label: 'Medium',
    icon: <MediumIcon />,
  },
  // {
  //   href: 'https://x.com/iambarunprasad',
  //   label: 'X',
  //   icon: <TwitterIcon />,
  // },
];
