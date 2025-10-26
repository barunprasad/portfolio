import { Organization } from '@/types/content';

// Shared organizations data - single source of truth
export const ORGANIZATIONS: Record<string, Organization> = {
  CODE_AND_THEORY: {
    id: 'code-and-theory',
    name: 'Code and Theory',
    url: 'https://www.codeandtheory.com',
  },
  MOXE_HEALTH: {
    id: 'moxe-health',
    name: 'Moxe Health',
    url: 'https://moxehealth.com',
  },
  WALMART_GLOBAL_TECH: {
    id: 'walmart-global-tech',
    name: 'Walmart Global Tech',
    url: 'https://tech.walmart.com',
  },
  HEALTHEDGE: {
    id: 'healthedge',
    name: 'HealthEdge',
    url: 'https://www.healthedge.com',
  },
  DELOITTE: {
    id: 'deloitte',
    name: 'Deloitte Consulting LLC',
    url: 'https://www2.deloitte.com',
  },
  LT_INFOTECH: {
    id: 'lt-infotech',
    name: 'L&T Infotech',
    url: 'https://www.ltimindtree.com',
  },
  PA_DHS: {
    id: 'pa-dhs',
    name: 'Pennsylvania Department of Human Services',
    url: 'https://www.pa.gov',
  },
  MUNICHRE: {
    id: 'munichre',
    name: 'MunichRe America',
    url: 'https://www.munichre.com',
  },
  TRAVELERS: {
    id: 'travelers',
    name: 'Travelers Insurance',
    url: 'https://www.travelers.com',
  },
  INSURITY: {
    id: 'insurity',
    name: 'Insurity',
    url: 'https://insurity.com',
  },
};
