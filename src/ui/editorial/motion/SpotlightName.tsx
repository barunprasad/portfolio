'use client';

import { useEffect, useRef } from 'react';

// Renders the hero name (real <h1>, SSR'd for SEO). On fine-pointer + motion-OK
// devices it switches to a "spotlight" state where a bright spot tracks the
// cursor across the letters (via CSS background-clip:text + --sx/--sy). Touch /
// reduced-motion / no-JS keep the solid name.
export function SpotlightName({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const area = el.closest('section') ?? el;
    el.dataset.spotlight = 'on';

    let raf = 0;
    const onMove = (e: Event) => {
      const me = e as MouseEvent;
      const r = el.getBoundingClientRect();
      const x = me.clientX - r.left;
      const y = me.clientY - r.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--sx', `${x}px`);
        el.style.setProperty('--sy', `${y}px`);
      });
    };

    area.addEventListener('mousemove', onMove);
    return () => {
      area.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      delete el.dataset.spotlight;
    };
  }, []);

  return (
    <h1 ref={ref} data-hero-name className={className}>
      {text}
    </h1>
  );
}
