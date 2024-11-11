import { BlogData } from '@/data/blogs';
import { ExperienceData } from '@/data/experience';
import { LearningData } from '@/data/learning';
import { ProjectData } from '@/data/projects';
import { ArticleSection } from '@/ui/features/ArticleSection';
import { ViewResume } from '@/ui/features/ViewResume';
import { GitHubIcon, LinkedInIcon, MediumIcon, TwitterIcon } from '@/ui/icons';
import { Stack } from '@arctic-kit/snow';

export const IntroSection = {
  title: 'Barun Prasad',
  subTitle: 'Frontend Evangelist',
  description: 'Transforming ideas into creative solutions.',
};

export const ArticleSections = [
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
        <ArticleSection articles={ExperienceData} />
        <Stack direction="horizontal" inline spacing={2}>
          <ViewResume label="View Full Resume" href="/resume.pdf" />
          <ViewResume label="View Short Resume" href="/resume_short.pdf" />
        </Stack>
      </>
    ),
  },
  {
    label: 'projects',
    content: <ArticleSection articles={ProjectData} />,
  },
  {
    label: 'blogs',
    content: <ArticleSection articles={BlogData} />,
  },
  {
    label: 'learnings',
    content: <ArticleSection articles={LearningData} />,
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
  {
    href: 'https://x.com/iambarunprasad',
    label: 'X',
    icon: <TwitterIcon />,
  },
];
