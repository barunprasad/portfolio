import type { LearningEntry } from '@/types/content';
import { ArrowUpRight } from './ArrowUpRight';

export function LearningBlock({ items }: { items: LearningEntry[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((item) => (
        <li key={item.title} className="border-b border-line/60 py-6 last:border-b-0">
          <h3 className="text-lg font-medium text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
          {item.certificateUrl && (
            <a
              href={item.certificateUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-3 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted transition-colors hover:text-accent"
            >
              View certificate
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
