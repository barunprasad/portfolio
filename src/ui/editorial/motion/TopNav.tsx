'use client';

import { useEffect, useRef, useState } from 'react';
import type { SocialLinkData } from '@/lib/data-provider';
import { SECTION_META } from '../sectionMeta';
import { SocialRow } from '../SocialRow';
import { ArrowUpRight } from '../ArrowUpRight';

// Only the section labels are needed here — keep the client payload minimal
// (passing full Section objects would serialize all content into the RSC flight).
export function TopNav({
  name,
  sections,
  socialLinks,
}: {
  name: string;
  sections: { label: string }[];
  socialLinks: SocialLinkData[];
}) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Primary contact channel for the menu CTA (LinkedIn, with a graceful fallback).
  const contact =
    socialLinks.find((l) => l.platform.toLowerCase().includes('linkedin')) ??
    socialLinks[0];

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

  // While the menu is open: lock body scroll, close on Escape, and move focus
  // into the panel. Focus returns to the trigger when it closes.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !open
            ? 'border-b border-line/60 bg-canvas/80 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <div
          className="absolute left-0 top-0 h-px w-full origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          {/* Intentional <a>: a scroll-to-top control (intercepted by Lenis; falls
              back to a clean "/" load with JS off). A <Link> would fight the
              smooth-scroll interceptor. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            data-scroll-top
            title="Back to top"
            className="relative z-10 font-display text-sm font-semibold tracking-tight text-ink"
          >
            {name}
          </a>

          {/* Desktop section nav */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
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

          {/* Mobile menu toggle — morphs from hamburger to X */}
          <button
            ref={triggerRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span
              aria-hidden="true"
              className={`absolute left-1/2 top-[calc(50%-1px)] h-0.5 w-6 -translate-x-1/2 rounded-full bg-ink transition-transform duration-300 ${
                open ? 'rotate-45' : '-translate-y-[5px]'
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute left-1/2 top-[calc(50%-1px)] h-0.5 w-6 -translate-x-1/2 rounded-full bg-ink transition-transform duration-300 ${
                open ? '-rotate-45' : 'translate-y-[5px]'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu — oversized editorial links */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`fixed inset-0 z-40 bg-canvas transition-[opacity,visibility] duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          data-lenis-prevent
          className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24"
        >
          <nav aria-label="Sections" className="flex flex-col">
            {sections.map((s, i) => (
              <a
                key={s.label}
                href={`#${s.label}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' }}
                className={`group flex items-baseline gap-4 border-b border-line/40 py-4 transition-[transform,opacity] duration-500 ease-out ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
              >
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[clamp(2.25rem,11vw,3.75rem)] font-semibold leading-none tracking-tight text-ink transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent">
                  {SECTION_META[s.label] ?? s.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-10">
            {contact && (
              <a
                href={contact.url}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${120 + sections.length * 55}ms` : '0ms',
                }}
                className={`group flex items-center justify-between gap-4 rounded-xl border border-line bg-surface/40 px-5 py-4 transition-[transform,opacity,border-color,background-color] duration-500 ease-out hover:border-accent/50 hover:bg-surface/70 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
              >
                <span className="flex flex-col">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                    Get in touch
                  </span>
                  <span className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                    Let&rsquo;s work together
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
              <SocialRow links={socialLinks} />
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                Bengaluru, IN
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
