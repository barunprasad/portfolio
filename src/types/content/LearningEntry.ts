import { Organization } from './Organization';

export type LearningEntry = {
  title: string;
  certificateUrl: string;
  description: string;
  imageUrl?: string;
  date?: string;
  organization?: Organization;
};
