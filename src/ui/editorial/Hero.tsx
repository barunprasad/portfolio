import type { IntroSectionData, SocialLinkData } from '@/lib/data-provider';
import type { Section } from '@/types/content';
import { Container } from './Container';
import { SocialRow } from './SocialRow';
import { SECTION_META } from './sectionMeta';
import { HeroGlow } from './motion/HeroGlow';
import { RotatingText } from './motion/RotatingText';

export function Hero({
  intro,
  socialLinks,
  sections,
}: {
  intro: IntroSectionData;
  socialLinks: SocialLinkData[];
  sections: Section[];
}) {
  const roles = [
    intro.subTitle,
    'UI Architect',
    'Design Systems Leader',
    'Frontend Engineer',
  ];

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-28"
    >
      <HeroGlow />

      <Container className="relative z-10">
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

        <h1
          data-split
          className="mt-6 font-display text-[clamp(2.75rem,11vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.02em] text-ink"
        >
          {intro.title}
        </h1>

        <p
          data-hero-fade
          className="mt-8 max-w-xl text-balance text-lg text-muted sm:text-2xl"
        >
          {intro.description}
        </p>

        <nav data-hero-fade aria-label="Page sections" className="mt-14">
          <ul className="flex flex-col gap-1">
            {sections.map((section, i) => (
              <li key={section.label}>
                <a
                  href={`#${section.label}`}
                  className="group inline-flex items-center gap-3 py-1 font-mono text-sm text-muted transition-colors hover:text-ink"
                >
                  <span className="text-accent" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{SECTION_META[section.label] ?? section.label}</span>
                  <span
                    aria-hidden="true"
                    className="h-px w-6 bg-line transition-all duration-300 group-hover:w-12 group-hover:bg-accent"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div data-hero-fade className="mt-14">
          <SocialRow links={socialLinks} />
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden sm:block">
        <Container>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted/60">
            Scroll&nbsp;↓
          </span>
        </Container>
      </div>
    </section>
  );
}
