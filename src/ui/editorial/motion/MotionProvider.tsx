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
        'a[href^="#"], a[data-scroll-top]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      // Header name / "scroll to top" link: smooth-scroll up, never add a hash.
      if (anchor.hasAttribute('data-scroll-top')) {
        e.preventDefault();
        lenis.scrollTo(0);
        return;
      }
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
      // Hero intro — fade up the surrounding elements. The name itself paints
      // immediately (it's the LCP element), so it is never hidden/animated.
      gsap.fromTo(
        '[data-hero-fade]',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.08,
          delay: 0.1,
        },
      );

      // Reveal-on-scroll. Elements already in (or above) the viewport on load
      // are shown instantly so nothing can be stuck hidden after a fast jump or
      // a reload mid-page; only below-the-fold elements get the scroll reveal.
      const targets = gsap.utils.toArray<HTMLElement>('[data-animate]');
      const belowFold = targets.filter(
        (el) => el.getBoundingClientRect().top >= window.innerHeight,
      );
      const alreadyVisible = targets.filter(
        (el) => el.getBoundingClientRect().top < window.innerHeight,
      );
      if (alreadyVisible.length) gsap.set(alreadyVisible, { opacity: 1, y: 0 });

      // Fire once, the moment an element enters from the bottom. Short duration
      // + small stagger so fast scrolling never leaves a blank-then-pop frame.
      ScrollTrigger.batch(belowFold, {
        start: 'top bottom-=60',
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
              stagger: 0.05,
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
