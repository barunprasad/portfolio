// Deterministic generative cover — a unique abstract "system / network" motif
// per project (seeded by its name). Server-rendered SVG: no JS, no real images,
// SEO-safe, and stable across server/client (no hydration mismatch).

function strHash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ProjectCover({
  seed,
  className = '',
}: {
  seed: string;
  className?: string;
}) {
  const hash = strHash(seed);
  const rand = mulberry32(hash);

  const W = 420;
  const H = 262;
  const cols = 6;
  const rows = 4;
  const pad = 44;

  const pts = Array.from({ length: rows * cols }, (_, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const gx = pad + (c / (cols - 1)) * (W - pad * 2);
    const gy = pad + (r / (rows - 1)) * (H - pad * 2);
    return {
      x: gx + (rand() - 0.5) * 36,
      y: gy + (rand() - 0.5) * 36,
      lime: rand() > 0.8,
    };
  });

  const lines: Array<[number, number]> = [];
  for (let i = 0; i < pts.length; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    if (c < cols - 1 && rand() > 0.42) lines.push([i, i + 1]);
    if (r < rows - 1 && rand() > 0.52) lines.push([i, i + cols]);
    if (c < cols - 1 && r < rows - 1 && rand() > 0.82) lines.push([i, i + cols + 1]);
  }

  const gid = `pc-${hash.toString(36)}`;
  const glowX = 18 + rand() * 64;
  const glowY = 14 + rand() * 44;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gid} cx={`${glowX}%`} cy={`${glowY}%`} r="60%">
          <stop offset="0%" stopColor="rgba(200,255,0,0.18)" />
          <stop offset="65%" stopColor="rgba(200,255,0,0)" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="#0c0c0e" />
      <rect width={W} height={H} fill={`url(#${gid})`} />
      <g stroke="#26262b" strokeWidth="1">
        {lines.map(([a, b], i) => (
          <line key={i} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} />
        ))}
      </g>
      <g>
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.lime ? 3.4 : 1.7}
            fill={p.lime ? '#c8ff00' : '#55555c'}
          />
        ))}
      </g>
    </svg>
  );
}
