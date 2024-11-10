'use client';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useActiveSection } from '../ui/components/ActiveSection/ActiveSectionContext';
import styles from './page.module.scss';

export function Section({
  id,
  label,
  content,
}: {
  id: string;
  label: string;
  content: React.ReactNode;
}) {
  const ref = useRef(null);
  const { setActiveSection, containerRef } = useActiveSection();
  const inView = useInView(ref, { amount: 0.6, root: containerRef });

  useEffect(() => {
    if (inView) setActiveSection(label);
  }, [inView, label, setActiveSection]);

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`${styles.detailItem} scrollSection`}
    >
      <h3>{label.replace('-', ' ')}</h3>
      {content}
    </motion.section>
  );
}
