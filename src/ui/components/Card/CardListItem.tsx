'use client';
import { motion } from 'framer-motion';
import styles from './CardListItem.module.scss';

export function CardListItem({
  children,
  clickable = true,
}: {
  children: React.ReactNode;
  clickable?: boolean;
}) {
  return (
    <motion.li
      className={`${styles.cardListItem} ${clickable ? styles.clickable : ''}`}
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
