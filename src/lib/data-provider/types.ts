import { Section } from '@/types/content';

export type IntroSectionData = {
  title: string;
  subTitle: string;
  description: string;
};

export type SocialLinkData = {
  platform: string;
  url: string;
  icon: string;
  order: number;
};

export interface DataProvider {
  getSections(): Promise<Section[]>;
  getIntroSection(): Promise<IntroSectionData>;
  getSocialLinks(): Promise<SocialLinkData[]>;
}

export type DataSource = 'local' | 'hygraph';
