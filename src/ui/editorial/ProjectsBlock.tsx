import type { ProjectEntry } from '@/types/content';
import { ProjectsInteractive } from './motion/ProjectsInteractive';

// Server wrapper — passes serializable project data to the client component
// that renders the list (SSR'd) plus the desktop floating hover-preview.
export function ProjectsBlock({ items }: { items: ProjectEntry[] }) {
  return <ProjectsInteractive items={items} />;
}
