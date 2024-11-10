// SkillsList.tsx
'use client';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  CubeTransparentIcon,
  MoonIcon,
  ServerIcon,
  CodeBracketIcon,
  ChatBubbleOvalLeftIcon,
  CloudIcon,
} from '@arctic-kit/icons';
import styles from './SkillsList.module.scss';

const skills = [
  {
    icon: <AcademicCapIcon className={styles.icon} />,
    title: 'Proven Architecture Expertise',
    description:
      'Extensive experience architecting complex and resilient front-end applications and design systems across modern frontend technology stacks.',
  },
  {
    icon: <CubeTransparentIcon className={styles.icon} />,
    title: 'Expert in React Ecosystem',
    description:
      'Proficient in React.js, React Native, Redux, Next.js, and Electron, with extensive experience in CSS-in-JS libraries such as styled-components, Emotion, and Pigment CSS.',
  },
  {
    icon: <CodeBracketIcon className={styles.icon} />,
    title: 'UI Specialist',
    description:
      'Expert in creating intuitive user interfaces with HTML5, CSS3, SASS/LESS, and JavaScript/TypeScript for both mobile and web platforms, integrating Web Accessibility (WCAG 2.1/2.2 AA compliance) best practices.',
  },
  {
    icon: <ChatBubbleOvalLeftIcon className={styles.icon} />,
    title: 'Comprehensive Experience in Design Systems',
    description: (
      <>
        Developed the Arctic Design (
        <a
          href="https://arctic-design.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          arctic-design.netlify.app
        </a>
        ) component library as an open-source, comprehensive React library with
        interactive examples, usage guidelines, and API references, streamlining
        enterprise UI development.
      </>
    ),
  },
  {
    icon: <ServerIcon className={styles.icon} />,
    title: 'Backend Integration',
    description:
      'Experienced with NodeJS, using Express and Fastify to build API endpoints and serve static assets, providing robust backend support for frontend applications.',
  },
  {
    icon: <CloudIcon className={styles.icon} />,
    title: 'Containerization & Deployment',
    description:
      'Skilled in creating Docker containers of frontend applications to ensure consistent and scalable deployments.',
  },
  {
    icon: <MoonIcon className={styles.icon} />,
    title: 'Cross-Platform Development',
    description:
      'Adept at developing applications that run seamlessly across web, mobile (iOS and Android), and desktop platforms.',
  },
];

export const SkillsList: React.FC = () => {
  return (
    <>
      <motion.ul
        className={styles.skillsList}
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
        {skills.map((skill, index) => (
          <motion.li
            key={index}
            className={styles.skillsListItem}
            whileHover="hover"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {skill.icon}
            <div className={styles.text}>
              <strong>{skill.title}</strong>
              <p>{skill.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
};

export default SkillsList;
