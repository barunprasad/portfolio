import { ArticleSections, SocialMediaLinks, IntroSection } from './AllSections';
import { InlinePageNavigation } from './InlinePageNavigation';
import { Section } from './Section';
import styles from './page.module.scss';
import { SideMenu } from '@/ui/components/SideMenu/SideMenu';
import { ActiveSectionProvider } from '@/ui/components/ActiveSection/ActiveSectionContext';
import ScrollSection from '@/ui/components/ActiveSection/ScrollSection';
export default function Index() {
  return (
    <ActiveSectionProvider>
      <SideMenu />
      <main className={styles.container}>
        <section className={styles.intro}>
          <div>
            <h1>{IntroSection.title}</h1>
            <h2>{IntroSection.subTitle}</h2>
            <h3>{IntroSection.description}</h3>
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

        <ScrollSection className={styles.detail}>
          {ArticleSections.map((item) => (
            <Section
              key={item.label}
              id={item.label}
              label={item.label}
              content={item.content}
            />
          ))}
        </ScrollSection>
      </main>
    </ActiveSectionProvider>
  );
}
