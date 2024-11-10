'use client';
import { motion } from 'framer-motion';
import styles from './Experiment.module.scss';

export const Experiment = () => {
  return (
    <div className={styles.app}>
      <Section
        title="UI Evangelist"
        subtitle="Transforming Ideas into Seamless Experiences"
        theme="light"
        showScrollIndicator
      />
      <Section title="Section 2" theme="dark" />
      <Section title="Section 3" theme="light" />
      <Section title="Section 4" theme="dark" />
    </div>
  );
};

type SectionProps = {
  title: string;
  subtitle?: string;
  theme: 'light' | 'dark';
  showScrollIndicator?: boolean;
};

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  theme,
  showScrollIndicator,
}) => {
  return (
    <motion.section
      className={`${styles.section} ${styles[theme]}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {showScrollIndicator && (
        <div className={styles.scrollIndicator}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 16l-6-6h12l-6 6z" fill="currentColor" />
          </svg>
        </div>
      )}
    </motion.section>
  );
};

export default Experiment;
