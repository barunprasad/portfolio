type OrganizationType = {
  name: string;
  url: string;
};
export type ArticleType = {
  title?: string;
  url?: string;
  imageUrl?: string;
  tags?: string[];
  duration?: string;
  roles?: string[];
  location?: string;
  organization?: OrganizationType;
  clientOrganization?: OrganizationType;
  date?: string;
  description?: string;
};
