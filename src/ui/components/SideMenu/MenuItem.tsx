import * as React from 'react';
import { motion } from 'framer-motion';
import styles from './SideMenu.module.scss';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({
  label,
  onToggle,
}: {
  label: string;
  onToggle: () => void;
}) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={styles.textPlaceholder} onClick={onToggle}>
        {label}
      </div>
    </motion.li>
  );
};
