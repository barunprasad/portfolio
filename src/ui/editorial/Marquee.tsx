const ITEMS = [
  'React',
  'Next.js',
  'TypeScript',
  'Design Systems',
  'Micro-frontends',
  'React Native',
  'Node.js',
  'GraphQL',
  'Accessibility',
  'Performance',
  'UI Architecture',
];

function Track() {
  return (
    <ul className="marquee-track flex shrink-0 items-center gap-8 pr-8">
      {ITEMS.map((item, i) => (
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

// Full-bleed, infinitely scrolling tech-stack ticker. CSS-only (paused under
// reduced motion). Decorative, so hidden from assistive tech.
export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="marquee-mask relative flex select-none overflow-hidden border-y border-line py-5"
    >
      <Track />
      <Track />
    </div>
  );
}
