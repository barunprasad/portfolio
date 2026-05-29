import Image from 'next/image';
import type { ProjectEntry } from '@/types/content';
import { Tag } from './Tag';
import { ArrowUpRight } from './ArrowUpRight';

export function ProjectsBlock({ items }: { items: ProjectEntry[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((project) => (
        <li key={project.title} className="border-b border-line/60 last:border-b-0">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex flex-col gap-4 py-6 sm:flex-row sm:gap-6"
          >
            {project.imageUrl && (
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg border border-line sm:aspect-square sm:h-28 sm:w-28">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, 112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="flex items-center gap-1.5 text-lg font-medium text-ink transition-colors group-hover:text-accent">
                {project.title}
                <ArrowUpRight className="h-4 w-4 -translate-y-px opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
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
