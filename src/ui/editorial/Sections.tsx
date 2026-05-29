import type {
  Section,
  AboutContent,
  ExperienceEntry,
  ProjectEntry,
  BlogEntry,
  LearningEntry,
} from '@/types/content';
import { SectionShell } from './SectionShell';
import { AboutBlock } from './AboutBlock';
import { WorkBlock } from './WorkBlock';
import { ProjectsBlock } from './ProjectsBlock';
import { WritingBlock } from './WritingBlock';
import { LearningBlock } from './LearningBlock';
import { SECTION_META } from './sectionMeta';

// The data provider returns the non-narrowed `Section[]`, where `content` is the
// full content union. Each `case` below is guarded by `section.label`, so the
// localized assertion to the matching item type is runtime-sound.
function renderBlock(section: Section) {
  switch (section.label) {
    case 'about':
      return <AboutBlock items={section.content as AboutContent[]} />;
    case 'experience':
      return <WorkBlock items={section.content as ExperienceEntry[]} />;
    case 'projects':
      return <ProjectsBlock items={section.content as ProjectEntry[]} />;
    case 'blogs':
      return <WritingBlock items={section.content as BlogEntry[]} />;
    case 'learnings':
      return <LearningBlock items={section.content as LearningEntry[]} />;
    default:
      return null;
  }
}

export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, i) => (
        <SectionShell
          key={section.label}
          id={section.label}
          index={i + 1}
          label={SECTION_META[section.label] ?? section.label}
        >
          {renderBlock(section)}
        </SectionShell>
      ))}
    </>
  );
}
