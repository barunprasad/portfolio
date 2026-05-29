// Slow-drifting gradient "aurora" behind the hero (CSS-only; static under
// reduced motion). Replaces the single static glow with living atmosphere.
export function HeroAurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <span className="aurora-blob aurora-1" />
      <span className="aurora-blob aurora-2" />
      <span className="aurora-blob aurora-3" />
    </div>
  );
}
