import type { ExperienceEntry } from '@/types/content';
import { Tag } from './Tag';
import { ArrowUpRight } from './ArrowUpRight';

// Most recent roles are shown by default; older roles fold into a native
// <details> so the page stays scannable while keeping every role in the DOM
// (SEO-safe, works without JS).
const RECENT_COUNT = 5;

function WorkItem({ job }: { job: ExperienceEntry }) {
  const org = job.organization;
  return (
    <li
      data-animate
      className="group grid gap-2 border-b border-line/60 py-6 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:gap-6"
    >
      <p className="pt-1 font-mono text-xs uppercase tracking-wider text-muted">
        {job.duration}
      </p>
      <div>
        <h3 className="text-base font-medium text-ink">
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
      </div>
    </li>
  );
}

export function WorkBlock({ items }: { items: ExperienceEntry[] }) {
  const recent = items.slice(0, RECENT_COUNT);
  const older = items.slice(RECENT_COUNT);

  return (
    <>
      <ol className="flex flex-col">
        {recent.map((job, i) => (
          <WorkItem key={i} job={job} />
        ))}
      </ol>

      {older.length > 0 && (
        <details className="group mt-6">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink">
            <span className="group-open:hidden">Show earlier roles ({older.length})</span>
            <span className="hidden group-open:inline">Hide earlier roles</span>
            <span className="transition-transform group-open:rotate-180" aria-hidden="true">
              ↓
            </span>
          </summary>
          <ol className="mt-4 flex flex-col border-t border-line/60">
            {older.map((job, i) => (
              <WorkItem key={i} job={job} />
            ))}
          </ol>
        </details>
      )}
    </>
  );
}
