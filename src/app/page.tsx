import { SocialMediaLinks } from './AllSections';
import { InlinePageNavigation } from './InlinePageNavigation';
import styles from './page.module.scss';
import { SideMenu } from '@/ui/components/SideMenu/SideMenu';
import { ActiveSectionProvider } from '@/ui/components/ActiveSection/ActiveSectionContext';
import { IntroSectionData } from '@/data';
import { DetailSection } from './DetailSection';

export default function Index() {
  return (
    <ActiveSectionProvider>
      <SideMenu />
      <main className={styles.container}>
        <section className={styles.intro}>
          <div>
            <h1>{IntroSectionData.title}</h1>
            <h2>{IntroSectionData.subTitle}</h2>
            <h3>{IntroSectionData.description}</h3>
            <InlinePageNavigation />
          </div>

          <ul aria-label="Social Media" className={styles.socialMediaLinks}>
            {SocialMediaLinks.map(({ href, label, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${label} (opens in a new tab)`}
                  title={label}
                >
                  <span className={styles.srOnly}>{label}</span>
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <DetailSection />
      </main>
    </ActiveSectionProvider>
  );
}
