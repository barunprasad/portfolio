import type { IntroSectionData, SocialLinkData } from '@/lib/data-provider';

const SITE_URL = 'https://www.barunprasad.com';

// Server-rendered structured data (JSON-LD) for SEO — present in the initial
// HTML. A ProfilePage wrapping an enriched Person + a WebSite, linked by @id so
// search engines build a single, rich entity.
export function PersonJsonLd({
  intro,
  socialLinks,
}: {
  intro: IntroSectionData;
  socialLinks: SocialLinkData[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${intro.title} — ${intro.subTitle}`,
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: intro.title,
        jobTitle: intro.subTitle,
        description: intro.description,
        url: SITE_URL,
        sameAs: socialLinks.map((l) => l.url),
        knowsAbout: [
          'Engineering Leadership',
          'Frontend Architecture',
          'Design Systems',
          'Micro-frontends',
          'React',
          'Next.js',
          'TypeScript',
          'Accessibility',
          'AI-assisted Development',
        ],
        worksFor: { '@type': 'Organization', name: 'Code & Theory' },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bengaluru',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: intro.title,
        publisher: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
