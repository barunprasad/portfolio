import { Organization } from './Organization';

export type ExperienceEntry = {
  duration: string;
  roles: string[];
  location: string;
  organization: Organization;
  clientOrganization?: Organization;
  tags: string[];
  description: string;
};
