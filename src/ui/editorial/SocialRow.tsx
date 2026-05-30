import type { SocialLinkData } from '@/lib/data-provider';
import { getIconComponent } from '@/lib/utils/icon-mapper';

// Row of social icon links. Icons inherit currentColor, so the hover accent
// is driven entirely by the anchor's text color.
export function SocialRow({
  links,
  className = '',
}: {
  links: SocialLinkData[];
  className?: string;
}) {
  return (
    <ul className={`flex items-center gap-5 ${className}`} aria-label="Social media">
      {links.map((link) => (
        <li key={link.platform}>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${link.platform} (opens in a new tab)`}
            title={link.platform}
            className="block text-muted transition-colors duration-200 hover:text-accent [&_svg]:h-5 [&_svg]:w-5"
          >
            {getIconComponent(link.icon)}
          </a>
        </li>
      ))}
    </ul>
  );
}
