'use client';
import { Sections } from './data';
import { useActiveSection } from '../ui/components/ActiveSection/ActiveSectionContext';
import styles from './page.module.scss';
import { useCallback } from 'react';

export function InlinePageNavigation() {
  const { activeSection } = useActiveSection();

  const handleClick = useCallback((label: string) => {
    window.location.hash = label;
  }, []);

  return (
    <nav aria-label="page navigation" className={styles.sectionInLinePageNav}>
      <ul className={styles.sectionLinks}>
        {Sections.map((item, index) => {
          const isActive =
            activeSection === item.label || (!activeSection && index === 0);
          return (
            <li key={item.label}>
              <div
                onClick={() => handleClick(item.label)}
                className={`${styles.sectionLink} ${styles.clickable} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.sectionLinkLine}></span>
                <h3>{item.label.replace('-', ' ')}</h3>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
