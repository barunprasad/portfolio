import { InlinePageNavigation } from './InlinePageNavigation';
import styles from './page.module.scss';
import { SideMenu } from '@/ui/components/SideMenu/SideMenu';
import { ActiveSectionProvider } from '@/ui/components/ActiveSection/ActiveSectionContext';
import { DetailSection } from './DetailSection';
import ClientLayout from '@/ui/components/ClientLayout';
import {
  getIntroSection,
  getSocialLinks,
  getSections,
} from '@/lib/data-provider';
import { getIconComponent } from '@/lib/utils/icon-mapper';

// ISR: Revalidate this page every hour (3600 seconds)
// On-demand revalidation via webhook will trigger updates immediately
export const revalidate = 3600;

export default async function Index() {
  const introData = await getIntroSection();
  const socialLinks = await getSocialLinks();
  const sections = await getSections();

  return (
    <ClientLayout>
      <ActiveSectionProvider>
        <SideMenu />
        <main className={styles.container}>
          <section className={styles.intro}>
            <div>
              <h1>{introData.title}</h1>
              <h2>{introData.subTitle}</h2>
              <h3>{introData.description}</h3>
              <InlinePageNavigation />
            </div>

            <ul aria-label="Social Media" className={styles.socialMediaLinks}>
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${link.platform} (opens in a new tab)`}
                    title={link.platform}
                  >
                    <span className={styles.srOnly}>{link.platform}</span>
                    {getIconComponent(link.icon)}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <DetailSection sections={sections} />
        </main>
      </ActiveSectionProvider>
    </ClientLayout>
  );
}
