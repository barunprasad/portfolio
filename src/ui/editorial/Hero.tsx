import type { ReactNode } from 'react';
import type { IntroSectionData, SocialLinkData } from '@/lib/data-provider';
import { Container } from './Container';
import { SocialRow } from './SocialRow';
import { HeroAurora } from './HeroAurora';
import { HeroBackground } from './motion/HeroBackground';
import { RotatingText } from './motion/RotatingText';
import { SpotlightName } from './motion/SpotlightName';
import { LocalTime } from './motion/LocalTime';

export function Hero({
  intro,
  socialLinks,
}: {
  intro: IntroSectionData;
  socialLinks: SocialLinkData[];
}) {
  const roles = [
    'Director of Technology',
    'Engineering Leader',
    'Frontend Architect',
    'AI-augmented builder',
  ];

  // Composed "title card" metadata. `Currently` reflects the latest role.
  const meta: { label: string; value: ReactNode }[] = [
    { label: 'Based in', value: 'Bengaluru, IN' },
    {
      label: 'Local time',
      value: (
        <>
          <LocalTime /> IST
        </>
      ),
    },
    { label: 'Currently', value: 'Code & Theory' },
    { label: 'Focus', value: 'Strategic Leadership' },
  ];

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden py-28 text-center"
    >
      <HeroAurora />
      <HeroBackground />

      <Container className="relative z-10 w-full">
        <div className="mx-auto flex w-full flex-col items-center">
          {/* Eyebrow — rotating role */}
          <div
            data-hero-fade
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <RotatingText items={roles} />
          </div>

          {/* The name — the hero (server-rendered LCP, never hidden) */}
          <SpotlightName
            text={intro.title}
            className="mt-7 whitespace-nowrap font-display text-[clamp(2.5rem,11vw,9rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-ink"
          />

          <p
            data-hero-fade
            className="mt-7 max-w-xl text-balance text-lg text-muted sm:text-xl"
          >
            {intro.description}
          </p>

          <dl
            data-hero-fade
            className="mt-12 flex flex-wrap items-start justify-center gap-x-10 gap-y-5 border-t border-line pt-8"
          >
            {meta.map((m) => (
              <div key={m.label} className="text-center">
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                  {m.label}
                </dt>
                <dd className="mt-1.5 text-sm text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div data-hero-fade className="mt-10">
            <SocialRow links={socialLinks} />
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden justify-center sm:flex">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted/60">
          Scroll&nbsp;↓
        </span>
      </div>
    </section>
  );
}
