import { ExperienceEntry } from '@/types/content';
import { ORGANIZATIONS } from './organizations';

export const ExperienceData: ExperienceEntry[] = [
  {
    duration: 'Jun 2025 - Present',
    roles: ['Director of Technology'],
    location: 'Bengaluru',
    organization: ORGANIZATIONS.CODE_AND_THEORY,
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'Design Systems',
      'Micro-frontends',
    ],
    description:
      'Leading frontend technology initiatives at Code and Theory, focusing on modernizing UI architecture, design system adoption, and micro-frontend strategies across enterprise projects.',
  },
  {
    duration: 'Sep 2023 - Apr 2025',
    roles: ['UI Architect'],
    location: 'Bengaluru',
    organization: ORGANIZATIONS.MOXE_HEALTH,
    tags: [
      'React',
      'Vite',
      'Rollup',
      'Node.js',
      'Fastify',
      'SMART on FHIR',
      'GraphQL',
    ],
    description:
      'Leading the frontend tech stack initiatives across India and the USA, focusing on modernizing legacy systems and designing mobile-first web solutions. Spearheaded the development of the Particle Design System, reducing feature development time by 40% and code complexity by 30%. Collaborated closely with UX and product teams to establish architectural standards, ensuring consistency across projects. Re-engineered the legacy "Point of Care Insights" project, integrating Particle Design components and SMART on FHIR, enhancing automation and user experience. Developed the "Virtual EHR App", simulating EHR systems for testing and demos, improving efficiency in managing patient records and provider data.',
  },
  {
    duration: 'Sep 2021 - Sep 2023',
    roles: ['Staff Engineer'],
    location: 'Bengaluru',
    organization: ORGANIZATIONS.WALMART_GLOBAL_TECH,
    tags: [
      'React',
      'Redux',
      'React Native',
      'Node.js',
      'Express',
      'Electron',
      'MQTT',
    ],
    description:
      'Led the development of the Checkout with Me (COWM) app, enhancing in-store checkout processes by reducing transaction failure rates from over 30% to under 2%. Spearheaded the Device Management Framework (DMF), standardizing peripheral device connections with a modular, reusable system. Led the UI team for the Electronic Journal project, modernizing the tech stack and improving user experience.',
  },
  {
    duration: 'Jun 2019 - Aug 2021',
    roles: ['Principal Engineer'],
    location: 'Bengaluru',
    organization: ORGANIZATIONS.HEALTHEDGE,
    tags: ['React.js', 'React Native', 'Redux', 'LoopBack'],
    description:
      'Architected frontend solutions for HealthEdge applications, leading the Configuration Integrity and Promotion project, enabling business analysts to modify configurations independently. Converted legacy services to RESTful APIs and developed web and native apps for improved user accessibility.',
  },
  {
    duration: 'Oct 2015 - May 2019',
    roles: ['Senior Engineer'],
    location: 'Burlington, MA',
    organization: ORGANIZATIONS.HEALTHEDGE,
    tags: [
      'React.js',
      'Redux',
      'React Native',
      'Next.js',
      'Node.js',
      'HTML5',
      'CSS3',
    ],
    description:
      'Led frontend development for the Population Health Management platform, focusing on data analytics and campaign management. Upgraded HealthRules Care Manager UI from AngularJS to React, improving performance and user experience. Developed the Digital Member Portal, a mobile-first web portal and cross-platform app to enhance member engagement.',
  },
  {
    duration: 'Dec 2014 - Oct 2015',
    roles: ['Senior Solution Engineer'],
    location: 'Camp Hill, PA',
    organization: ORGANIZATIONS.DELOITTE,
    clientOrganization: ORGANIZATIONS.PA_DHS,
    tags: [
      'ASP.NET',
      'AngularJS',
      'Oracle',
      'VB.NET',
      'HTML5',
      'CSS3',
      'JavaScript',
    ],
    description: `Managed release planning and web development for Home and Community Services Information System (HCSIS), supporting Pennsylvania's vulnerable citizens.`,
  },
  {
    duration: 'Feb 2013 - Dec 2014',
    roles: ['Onsite Coordinator', 'Project Lead'],
    location: 'Princeton, NJ',
    organization: ORGANIZATIONS.LT_INFOTECH,
    clientOrganization: ORGANIZATIONS.MUNICHRE,
    tags: [
      'C#.NET',
      'ASP.NET MVC',
      'KnockoutJS',
      'SQL Server',
      'nUnit',
      'HTML5',
      'CSS3',
      'JavaScript',
    ],
    description:
      'Led the Specialty Market Workflow project for MunichRe America, managing offshore teams and improving code quality.',
  },
  {
    duration: 'Sep 2011 - Jan 2013',
    roles: ['Technical Lead'],
    location: 'Hartford, CT',
    organization: ORGANIZATIONS.LT_INFOTECH,
    clientOrganization: ORGANIZATIONS.TRAVELERS,
    tags: ['ASP.NET MVC', 'nUnit', 'JavaScript', 'SQL Server', 'Oracle'],
    description:
      'Led development for Quote Prefill and eDelivery Preference Service projects at Travelers Insurance, improving policyholder services.',
  },
  {
    duration: 'Sep 2009 - Aug 2011',
    roles: ['Onsite Coordinator'],
    location: 'Hartford, CT',
    organization: ORGANIZATIONS.LT_INFOTECH,
    clientOrganization: ORGANIZATIONS.INSURITY,
    tags: ['C#.NET', 'ASP.NET', 'nUnit', 'MS SQL Server'],
    description:
      'Coordinated offshore activities and customized "Policy Decisions/NGA" for Insurity, ensuring compliance with ISO regulations.',
  },
  {
    duration: 'Jul 2007 - Aug 2009',
    roles: ['Sr. Software Engineer', 'Software Engineer'],
    location: 'Mumbai',
    organization: ORGANIZATIONS.LT_INFOTECH,
    clientOrganization: ORGANIZATIONS.MUNICHRE,
    tags: [
      'ASP.NET 2.0',
      'C#.NET 2.0',
      'Oracle',
      'SQL Server',
      'MS Enterprise Library',
    ],
    description:
      'Developed key modules for "Autofac", a web-based reinsurance solution for MunichRe America.',
  },
];
