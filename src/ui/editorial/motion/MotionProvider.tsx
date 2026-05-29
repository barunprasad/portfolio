'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/**
 * Sets up smooth scroll (Lenis) + scroll-driven reveals (GSAP) as progressive
 * enhancement. Renders nothing. All content is already in the DOM and visible
 * unless scripting is enabled AND the user allows motion — the reveal-hiding CSS
 * is gated on `(scripting: enabled) and (prefers-reduced-motion: no-preference)`,
 * so SEO/no-JS/reduced-motion users always see everything.
 */
export function MotionProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Route in-page anchor clicks through Lenis for a smooth scroll.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (href === '#') {
        e.preventDefault();
        lenis.scrollTo(0);
        return;
      }
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };
    document.addEventListener('click', onClick);

    const ctx = gsap.context(() => {
      // Hero intro — the name wipes up; everything else fades up.
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo(
        '[data-hero-name]',
        { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.1 },
        0,
      );
      tl.fromTo(
        '[data-hero-fade]',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
        0.2,
      );

      // Staggered fade-up reveals as sections enter the viewport.
      ScrollTrigger.batch('[data-animate]', {
        start: 'top 88%',
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.08,
              overwrite: true,
            },
          ),
      });

      ScrollTrigger.refresh();
    });

    return () => {
      document.removeEventListener('click', onClick);
      ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return null;
}
