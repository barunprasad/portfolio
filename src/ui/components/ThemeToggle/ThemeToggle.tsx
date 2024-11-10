import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@arctic-kit/icons';
import styles from './ThemeToggle.module.scss';

type ThemeToggleProps = {
  onToggle?: (isDarkMode: boolean) => void;
  initialDarkMode?: boolean;
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  onToggle,
  initialDarkMode = false,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);

  // Update isDarkMode if initialDarkMode changes
  useEffect(() => {
    setIsDarkMode(initialDarkMode);
  }, [initialDarkMode]);

  // Trigger onToggle only when isDarkMode changes after initial render
  useEffect(() => {
    if (onToggle) {
      onToggle(isDarkMode);
    }
  }, [isDarkMode, onToggle]);

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <motion.div
      className={styles.themeToggle}
      onClick={handleToggle}
      animate={{ backgroundColor: isDarkMode ? '#333' : '#ddd' }}
    >
      <motion.div
        className={styles.toggleIcon}
        animate={{ x: isDarkMode ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {isDarkMode ? (
          <MoonIcon className={`${styles.icon} ${styles.darkModeIcon}`} />
        ) : (
          <SunIcon className={`${styles.icon} ${styles.lightModeIcon}`} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ThemeToggle;
