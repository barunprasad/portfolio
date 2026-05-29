import type { ReactElement } from 'react';
import { GitHubIcon, LinkedInIcon, MediumIcon, TwitterIcon } from '@/ui/icons';

export const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, ReactElement> = {
    github: <GitHubIcon />,
    linkedin: <LinkedInIcon />,
    medium: <MediumIcon />,
    twitter: <TwitterIcon />,
    x: <TwitterIcon />,
  };

  return iconMap[iconName.toLowerCase()] || null;
};
