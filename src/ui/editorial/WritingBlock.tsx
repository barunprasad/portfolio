import type { BlogEntry } from '@/types/content';
import { ArrowUpRight } from './ArrowUpRight';

export function WritingBlock({ items }: { items: BlogEntry[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((post) => (
        <li key={post.url} data-animate className="border-b border-line/60 last:border-b-0">
          <a
            href={post.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group block py-6"
          >
            <h3 className="flex items-start gap-1.5 text-lg font-medium text-ink transition-colors group-hover:text-accent">
              <span>{post.title}</span>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{post.description}</p>
            <span className="mt-3 inline-block font-mono text-[0.7rem] uppercase tracking-wider text-muted">
              Read on Medium
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
