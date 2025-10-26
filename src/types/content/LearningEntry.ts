import { Organization } from './Organization';

export type LearningEntry = {
  title: string;
  certificateUrl: string;
  description: string;
  imageUrl?: string;
  date?: string;
  organization?: Organization;
  // Optional url field for compatibility with ArticleSection component
  // In Hygraph provider, we map certificateUrl to url for consistency
  url?: string;
};
