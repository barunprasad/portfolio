import type { ExperienceEntry } from '@/types/content';
import { Tag } from './Tag';
import { ArrowUpRight } from './ArrowUpRight';

// Experience as a vertical timeline — a connecting line with a node per role
// (the current role pulses lime), cohesive with the hero network. Recent roles
// show by default; older ones fold into a native <details> (kept in the DOM).
const RECENT_COUNT = 5;

function TimelineItem({
  job,
  current = false,
}: {
  job: ExperienceEntry;
  current?: boolean;
}) {
  const org = job.organization;
  return (
    <li data-animate className="relative pb-10 pl-8 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 flex h-2.5 w-2.5 -translate-x-1/2 items-center justify-center"
      >
        {current && (
          <span className="absolute inset-0 rounded-full bg-accent/50 motion-safe:animate-ping" />
        )}
        <span
          className={`relative block h-2.5 w-2.5 rounded-full ring-4 ring-canvas ${
            current ? 'bg-accent' : 'bg-muted'
          }`}
        />
      </span>

      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        {job.duration}
      </p>
      <h3 className="mt-1.5 text-base font-medium text-ink">
        <span>{job.roles[0]}</span>
        <span className="text-muted"> · </span>
        {org.url ? (
          <a
            href={org.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-0.5 underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {org.name}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span>{org.name}</span>
        )}
        <span className="text-muted"> · {job.location}</span>
      </h3>

      {job.roles.length > 1 && (
        <p className="mt-0.5 text-sm text-muted">{job.roles.slice(1).join(', ')}</p>
      )}
      {job.clientOrganization && (
        <p className="mt-0.5 text-sm text-muted">Client: {job.clientOrganization.name}</p>
      )}

      <p className="mt-3 text-sm leading-relaxed text-muted">{job.description}</p>

      {job.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </ul>
      )}
    </li>
  );
}

export function WorkBlock({ items }: { items: ExperienceEntry[] }) {
  const recent = items.slice(0, RECENT_COUNT);
  const older = items.slice(RECENT_COUNT);

  return (
    <div className="ml-1.5">
      <ol className="relative border-l border-line/60">
        {recent.map((job, i) => (
          <TimelineItem key={i} job={job} current={i === 0} />
        ))}
      </ol>

      {older.length > 0 && (
        <details className="group mt-2">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 pl-8 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink">
            <span className="group-open:hidden">Show earlier roles ({older.length})</span>
            <span className="hidden group-open:inline">Hide earlier roles</span>
            <span className="transition-transform group-open:rotate-180" aria-hidden="true">
              ↓
            </span>
          </summary>
          <ol className="relative mt-4 border-l border-line/60">
            {older.map((job, i) => (
              <TimelineItem key={i} job={job} />
            ))}
          </ol>
        </details>
      )}
    </div>
  );
}
