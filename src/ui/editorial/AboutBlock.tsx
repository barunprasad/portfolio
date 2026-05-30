import type { AboutContent } from '@/types/content';
import { highlight } from './highlight';

// Phrases emphasized in accent within the bio lead.
const ACCENT_KEYWORDS = [
  'Engineering leader',
  '18+ years',
  'design systems',
  'platform architecture',
  'AI-assisted',
];

export function AboutBlock({ items }: { items: AboutContent[] }) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <p
          key={i}
          data-animate
          className="font-display text-2xl font-medium leading-snug text-ink/85 sm:text-3xl sm:leading-snug"
        >
          {highlight(item.description, ACCENT_KEYWORDS)}
        </p>
      ))}
    </div>
  );
}
