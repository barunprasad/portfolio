import { ArticleType } from './ArticleType';

type FooterLink = {
  href: string;
  label: string;
};

export type SectionType = {
  label: string;
  content: ArticleType[];
  footerLinks?: FooterLink[];
};
