type CompanyType = {
  name: string;
  url: string;
};
export type ExperienceType = {
  tenure: string;
  positions: string[];
  location: string;
  company: CompanyType;
  skills: string[];
  profileContent: string;
  client?: CompanyType;
};
