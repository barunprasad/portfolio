'use client';
import { motion } from 'framer-motion';
import styles from './CardListItem.module.scss';

export function CardListItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      className={styles.cardListItem}
      whileHover="hover"
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.li>
  );
}
