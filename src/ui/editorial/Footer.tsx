import type { SocialLinkData } from '@/lib/data-provider';
import { Container } from './Container';
import { SocialRow } from './SocialRow';
import { ArrowUpRight } from './ArrowUpRight';
import { Magnetic } from './motion/Magnetic';

export function Footer({
  socialLinks,
  name,
}: {
  socialLinks: SocialLinkData[];
  name: string;
}) {
  const year = new Date().getFullYear();
  const linkedin = socialLinks.find((l) => l.platform.toLowerCase() === 'linkedin');

  return (
    <footer id="contact" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <Container>
        <p
          data-animate
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Get in touch
        </p>

        <h2
          data-animate
          className="mt-6 font-display text-[clamp(2.25rem,7vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-ink"
        >
          Let&rsquo;s build something<span className="text-accent">.</span>
        </h2>

        {linkedin && (
          <div data-animate className="mt-10">
            <Magnetic>
              <a
                href={linkedin.url}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline inline-flex items-center gap-2 font-display text-xl text-ink transition-colors hover:text-accent sm:text-2xl"
              >
                Connect on LinkedIn
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </Magnetic>
          </div>
        )}

        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            © {year} {name}
          </p>
          <SocialRow links={socialLinks} />
        </div>

        <p className="mt-6 font-mono text-[0.7rem] text-muted/60">
          Built with Next.js &amp; Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
