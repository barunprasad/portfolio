import { Container } from './Container';

// Headline metrics surfaced from the experience history.
const STATS = [
  { value: '18+', label: 'Years in engineering' },
  { value: '40%', label: 'Faster delivery via design systems' },
  { value: '93%', label: 'Fewer checkout failures at Walmart' },
  { value: '30%', label: 'Lower code complexity' },
];

export function StatsBand() {
  return (
    <section aria-label="By the numbers" className="border-t border-line">
      <Container className="py-14 sm:py-20">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <li key={stat.label} data-animate>
              <div className="font-display text-5xl font-semibold tracking-tight text-accent sm:text-6xl">
                {stat.value}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">
                {stat.label}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
