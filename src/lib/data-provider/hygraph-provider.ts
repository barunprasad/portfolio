import { hygraphClient } from '@/lib/graphql/client';
import { DataProvider, IntroSectionData, SocialLinkData } from './types';
import { Section, AboutContent, ExperienceEntry, ProjectEntry, BlogEntry, LearningEntry } from '@/types/content';
import { gql } from 'graphql-request';

const GET_ALL_SECTIONS = gql`
  fragment AboutContentFields on AboutContent {
    description
  }

  fragment ExperienceEntryFields on ExperienceEntry {
    duration
    roles
    location
    tags
    description
    organization {
      id
      name
      url
    }
    clientOrganization {
      id
      name
      url
    }
  }

  fragment ProjectEntryFields on ProjectEntry {
    title
    url
    description
    imageUrl
    tags
  }

  fragment BlogEntryFields on BlogEntry {
    title
    url
    description
    imageUrl
    date
  }

  fragment LearningEntryFields on LearningEntry {
    title
    certificateUrl
    description
    imageUrl
    date
    organization {
      id
      name
      url
    }
  }

  query GetAllSections {
    sections(orderBy: order_ASC) {
      id
      order
      label
      aboutContents {
        ...AboutContentFields
      }
      experienceEntries {
        ...ExperienceEntryFields
      }
      projectEntries {
        ...ProjectEntryFields
      }
      blogEntries {
        ...BlogEntryFields
      }
      learningEntries {
        ...LearningEntryFields
      }
    }
  }
`;

const GET_INTRO_SECTION = gql`
  query GetIntroSection {
    introSections(first: 1) {
      id
      title
      subTitle
      description
    }
  }
`;

const GET_SOCIAL_LINKS = gql`
  query GetSocialLinks {
    socialLinks(orderBy: order_ASC) {
      id
      platform
      url
      icon
      order
    }
  }
`;

type HygraphSection = {
  id: string;
  order: number;
  label: 'about' | 'experience' | 'projects' | 'blogs' | 'learnings';
  aboutContents?: AboutContent[];
  experienceEntries?: ExperienceEntry[];
  projectEntries?: ProjectEntry[];
  blogEntries?: BlogEntry[];
  learningEntries?: LearningEntry[];
};

type HygraphIntroSection = {
  id: string;
  title: string;
  subTitle: string;
  description: string;
};

type HygraphSocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order: number;
};

export class HygraphDataProvider implements DataProvider {
  async getSections(): Promise<Section[]> {
    try {
      const data = await hygraphClient.request<{ sections: HygraphSection[] }>(
        GET_ALL_SECTIONS,
      );

      // Map Hygraph sections to typed Section structure
      return data.sections.map((section): Section => {
        const label = section.label;

        // Determine which content array to use based on label
        let content: Section['content'];

        switch (label) {
          case 'about':
            content = section.aboutContents || [];
            break;
          case 'experience':
            content = section.experienceEntries || [];
            break;
          case 'projects':
            content = section.projectEntries || [];
            break;
          case 'blogs':
            content = section.blogEntries || [];
            break;
          case 'learnings':
            // Map certificateUrl to url for ArticleSection compatibility
            content = (section.learningEntries || []).map((entry) => ({
              ...entry,
              url: entry.certificateUrl,
            })) as any;
            break;
        }

        return {
          label,
          content,
        };
      });
    } catch (error) {
      console.error('Error fetching sections from Hygraph:', error);
      throw new Error(
        'Failed to fetch sections from Hygraph. Please check your configuration.',
      );
    }
  }

  async getIntroSection(): Promise<IntroSectionData> {
    try {
      const data = await hygraphClient.request<{
        introSections: HygraphIntroSection[];
      }>(GET_INTRO_SECTION);

      if (!data.introSections || data.introSections.length === 0) {
        throw new Error('No intro section found in Hygraph');
      }

      const intro = data.introSections[0];
      return {
        title: intro.title,
        subTitle: intro.subTitle,
        description: intro.description,
      };
    } catch (error) {
      console.error('Error fetching intro section from Hygraph:', error);
      throw new Error(
        'Failed to fetch intro section from Hygraph. Please check your configuration.',
      );
    }
  }

  async getSocialLinks(): Promise<SocialLinkData[]> {
    try {
      const data = await hygraphClient.request<{
        socialLinks: HygraphSocialLink[];
      }>(GET_SOCIAL_LINKS);

      return data.socialLinks.map((link) => ({
        platform: link.platform,
        url: link.url,
        icon: link.icon,
        order: link.order,
      }));
    } catch (error) {
      console.error('Error fetching social links from Hygraph:', error);
      throw new Error(
        'Failed to fetch social links from Hygraph. Please check your configuration.',
      );
    }
  }
}
