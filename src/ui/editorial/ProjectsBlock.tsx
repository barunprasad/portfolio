import type { ProjectEntry } from '@/types/content';
import { Tag } from './Tag';
import { ArrowUpRight } from './ArrowUpRight';
import { ProjectCover } from './ProjectCover';

// Visual case-study cards: each project gets a unique generative cover (no real
// imagery) plus title, description and tags.
export function ProjectsBlock({ items }: { items: ProjectEntry[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {items.map((project, i) => (
        <li key={project.title} data-animate>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface/40 transition-colors duration-300 hover:border-accent/40"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
              <ProjectCover
                seed={project.title}
                className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute left-4 top-3 font-mono text-xs text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="flex items-center gap-1.5 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                <span>{project.title}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ul>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
