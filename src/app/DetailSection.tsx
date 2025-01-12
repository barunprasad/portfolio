import { ArticleSectionData } from '@/data';
import ScrollSection from '@/ui/components/ActiveSection/ScrollSection';
import { ArticleSection } from '@/ui/features/ArticleSection';
import { Section } from './Section';
import { Stack } from '@arctic-kit/snow';
import { ViewResume } from '@/ui/features/ViewResume';
import styles from './page.module.scss';

export function DetailSection() {
  return (
    <ScrollSection className={styles.detail}>
      {ArticleSectionData.map((articleSection) => (
        <Section
          key={articleSection.label}
          id={articleSection.label}
          label={articleSection.label}
        >
          <ArticleSection articles={articleSection.content} />
          {articleSection.footerLinks && (
            <Stack direction="horizontal" inline spacing={2}>
              {articleSection.footerLinks.map((footerLink) => (
                <ViewResume
                  key={articleSection.label + footerLink.label}
                  label={footerLink.label}
                  href={footerLink.href}
                />
              ))}
            </Stack>
          )}
        </Section>
      ))}
    </ScrollSection>
  );
}
