import { GitHubIcon, LinkedInIcon, MediumIcon, TwitterIcon } from '@/ui/icons';

export const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, JSX.Element> = {
    github: <GitHubIcon />,
    linkedin: <LinkedInIcon />,
    medium: <MediumIcon />,
    twitter: <TwitterIcon />,
    x: <TwitterIcon />,
  };

  return iconMap[iconName.toLowerCase()] || null;
};
