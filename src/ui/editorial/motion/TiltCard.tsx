'use client';

import { useRef, type ReactNode } from 'react';

// Cursor-reactive 3D tilt wrapper. Fine-pointer + motion-OK only (CSS resets it
// under reduced motion); touch devices never set the tilt vars, so it stays flat.
export function TiltCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(py - 0.5) * -7}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * 7}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt h-full ${className}`}
    >
      {children}
    </div>
  );
}
