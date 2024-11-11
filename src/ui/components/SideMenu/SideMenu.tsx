'use client';

import { useRef, useCallback } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from './useDimensions';
import { MenuToggle } from './MenuToggle';
import { Navigation } from './Navigation';
import { useActiveSection } from '@/ui/components/ActiveSection/ActiveSectionContext';

import styles from './SideMenu.module.scss';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 260px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(24px at 260px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

export const SideMenu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { setActiveSection } = useActiveSection();
  const containerRef = useRef<HTMLElement>(null);

  const { height } = useDimensions(containerRef);

  const handleToggle = useCallback(
    (label: string) => {
      toggleOpen();
      setActiveSection(label);
    },
    [toggleOpen, setActiveSection],
  );

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className={`${styles.container} ${isOpen ? styles.open : ''}`}
    >
      <motion.div className={styles.background} variants={sidebar} />
      <Navigation onToggle={handleToggle} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
