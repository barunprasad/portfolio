import type { AboutContent } from '@/types/content';

export function AboutBlock({ items }: { items: AboutContent[] }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-ink/80 sm:text-xl">
      {items.map((item, i) => (
        <p key={i}>{item.description}</p>
      ))}
    </div>
  );
}
