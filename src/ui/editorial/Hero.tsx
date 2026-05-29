import type { IntroSectionData, SocialLinkData } from '@/lib/data-provider';
import type { Section } from '@/types/content';
import { Container } from './Container';
import { SocialRow } from './SocialRow';
import { SECTION_META } from './sectionMeta';

export function Hero({
  intro,
  socialLinks,
  sections,
}: {
  intro: IntroSectionData;
  socialLinks: SocialLinkData[];
  sections: Section[];
}) {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center py-24"
    >
      <Container>
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          {intro.subTitle}
        </p>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
          {intro.title}
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
          {intro.description}
        </p>

        <nav aria-label="Page sections" className="mt-12">
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
                    className="h-px w-6 bg-line transition-all duration-200 group-hover:w-10 group-hover:bg-accent"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialRow links={socialLinks} className="mt-12" />
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden sm:block">
        <Container>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted/70">
            Scroll&nbsp;↓
          </span>
        </Container>
      </div>
    </section>
  );
}
