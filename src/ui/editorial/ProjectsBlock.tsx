import type { ProjectEntry } from '@/types/content';
import { Tag } from './Tag';
import { ArrowUpRight } from './ArrowUpRight';

// Text-only project rows: large display titles, an index, and a hover treatment
// (accent bar slides in, row shifts, arrow reveals). No imagery.
export function ProjectsBlock({ items }: { items: ProjectEntry[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((project, i) => (
        <li
          key={project.title}
          data-animate
          className="group relative border-b border-line/60 last:border-b-0"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
          />
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="block py-7 transition-[padding] duration-300 group-hover:pl-5 sm:py-9"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl lg:text-4xl">
                  <span>{project.title}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </ul>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
