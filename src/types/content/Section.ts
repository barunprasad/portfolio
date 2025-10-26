import { AboutContent } from './AboutContent';
import { ExperienceEntry } from './ExperienceEntry';
import { ProjectEntry } from './ProjectEntry';
import { BlogEntry } from './BlogEntry';
import { LearningEntry } from './LearningEntry';

// Discriminated union for type-safe section content
export type SectionContent =
  | { type: 'about'; items: AboutContent[] }
  | { type: 'experience'; items: ExperienceEntry[] }
  | { type: 'projects'; items: ProjectEntry[] }
  | { type: 'blogs'; items: BlogEntry[] }
  | { type: 'learnings'; items: LearningEntry[] };

// Type-safe section with discriminated union
export type Section<T extends SectionContent['type'] = SectionContent['type']> = {
  label: T;
  content: Extract<SectionContent, { type: T }>['items'];
  footerLinks?: Array<{ href: string; label: string }>;
};

// Convenience type for all sections
export type AllSections = [
  Section<'about'>,
  Section<'experience'>,
  Section<'projects'>,
  Section<'blogs'>,
  Section<'learnings'>
];
