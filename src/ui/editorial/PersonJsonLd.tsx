import type { IntroSectionData, SocialLinkData } from '@/lib/data-provider';

const SITE_URL = 'https://www.barunprasad.com';

// Server-rendered structured data (JSON-LD) for SEO. Present in the initial HTML.
export function PersonJsonLd({
  intro,
  socialLinks,
}: {
  intro: IntroSectionData;
  socialLinks: SocialLinkData[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: intro.title,
    jobTitle: intro.subTitle,
    description: intro.description,
    url: SITE_URL,
    sameAs: socialLinks.map((l) => l.url),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
