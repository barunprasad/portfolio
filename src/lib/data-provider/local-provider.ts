import { ArticleSectionData, IntroSectionData as IntroData } from '@/data';
import { DataProvider, IntroSectionData, SocialLinkData } from './types';
import { Section } from '@/types/content';
import { SocialMediaLinks } from '@/app/AllSections';

export class LocalDataProvider implements DataProvider {
  async getSections(): Promise<Section[]> {
    return ArticleSectionData;
  }

  async getIntroSection(): Promise<IntroSectionData> {
    return {
      title: IntroData.title,
      subTitle: IntroData.subTitle,
      description: IntroData.description,
    };
  }

  async getSocialLinks(): Promise<SocialLinkData[]> {
    return SocialMediaLinks.map((link, index) => {
      // Extract icon name from the platform/label
      const iconName =
        link.label.toLowerCase() === 'x' ? 'twitter' : link.label.toLowerCase();

      return {
        platform: link.label,
        url: link.href,
        icon: iconName,
        order: index + 1,
      };
    });
  }
}
