'use client';

import { useEffect, useState } from 'react';
import { SECTION_META } from '../sectionMeta';

// Only the section labels are needed here — keep the client payload minimal
// (passing full Section objects would serialize all content into the RSC flight).
export function TopNav({
  name,
  sections,
}: {
  name: string;
  sections: { label: string }[];
}) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const top = window.scrollY;
      setProgress(max > 0 ? Math.min(top / max, 1) : 0);
      setScrolled(top > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.label))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line/60 bg-canvas/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div
        className="absolute left-0 top-0 h-px w-full origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a
          href="#"
          className="font-display text-sm font-semibold tracking-tight text-ink"
        >
          {name}
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.label}
              href={`#${s.label}`}
              className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                active === s.label ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {SECTION_META[s.label] ?? s.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
