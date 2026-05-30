import {
  getIntroSection,
  getSocialLinks,
  getSections,
} from '@/lib/data-provider';
import ClientLayout from '@/ui/components/ClientLayout';
import { Hero } from '@/ui/editorial/Hero';
import { StatsBand } from '@/ui/editorial/StatsBand';
import { Marquee } from '@/ui/editorial/Marquee';
import { Sections } from '@/ui/editorial/Sections';
import { Footer } from '@/ui/editorial/Footer';
import { PersonJsonLd } from '@/ui/editorial/PersonJsonLd';
import { MotionProvider } from '@/ui/editorial/motion/MotionProvider';
import { TopNav } from '@/ui/editorial/motion/TopNav';

// ISR: Revalidate this page every hour (3600 seconds).
// On-demand revalidation via webhook triggers updates immediately.
export const revalidate = 3600;

export default async function Index() {
  const [intro, socialLinks, sections] = await Promise.all([
    getIntroSection(),
    getSocialLinks(),
    getSections(),
  ]);

  return (
    <ClientLayout>
      <PersonJsonLd intro={intro} socialLinks={socialLinks} />
      <MotionProvider />
      <TopNav
        name={intro.title}
        sections={sections.map((s) => ({ label: s.label }))}
        socialLinks={socialLinks}
      />
      <main>
        <Hero intro={intro} socialLinks={socialLinks} />
        <StatsBand />
        <Marquee />
        <Sections sections={sections} />
      </main>
      <Footer socialLinks={socialLinks} name={intro.title} />
    </ClientLayout>
  );
}
