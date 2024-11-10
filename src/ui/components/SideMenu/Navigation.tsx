import { motion } from 'framer-motion';
import { MenuItem } from './MenuItem';
import { Sections } from '@/app/data';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({
  onToggle,
}: {
  onToggle: (label: string) => void;
}) => (
  <motion.ul variants={variants}>
    {Sections.map((item, index) => (
      <MenuItem
        key={index}
        label={item.label}
        onToggle={() => onToggle(item.label)}
      />
    ))}
  </motion.ul>
);
