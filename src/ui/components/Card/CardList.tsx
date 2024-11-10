'use client';
import { motion } from 'framer-motion';
import styles from './CardList.module.scss';
export function CardList({ children }: { children: React.ReactNode }) {
  return (
    <motion.ul
      className={styles.cardList}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {children}
    </motion.ul>
  );
}
