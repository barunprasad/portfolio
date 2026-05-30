// Capabilities, not just tech — leadership/strategy/AI scroll alongside the craft.
const ROW_A = [
  'Engineering Leadership',
  'Design Systems',
  'AI / LLMs',
  'Platform Strategy',
  'Frontend Architecture',
  'Team Building',
  'Micro-frontends',
  'Mentorship',
];

const ROW_B = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'GraphQL',
  'Accessibility',
  'Performance',
  'Design Engineering',
  'React Native',
];

function TrackList({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <ul
      className={`marquee-track flex shrink-0 items-center gap-8 pr-8${reverse ? ' marquee-reverse' : ''}`}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-8 font-mono text-sm uppercase tracking-wider text-muted"
        >
          <span>{item}</span>
          <span className="text-accent">/</span>
        </li>
      ))}
    </ul>
  );
}

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask relative flex overflow-hidden">
      <TrackList items={items} reverse={reverse} />
      <TrackList items={items} reverse={reverse} />
    </div>
  );
}

// Two opposing rows — top scrolls left, bottom scrolls right. CSS-only,
// paused under reduced motion. Decorative, so hidden from assistive tech.
export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="select-none space-y-3 border-y border-line py-5"
    >
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </div>
  );
}
