import type { SocialLinkData } from '@/lib/data-provider';
import { Container } from './Container';
import { SocialRow } from './SocialRow';
import { ArrowUpRight } from './ArrowUpRight';

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
    <footer id="contact" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Get in touch
        </p>

        <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Let&rsquo;s build something<span className="text-accent">.</span>
        </h2>

        {linkedin && (
          <a
            href={linkedin.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-8 inline-flex items-center gap-2 font-display text-xl text-ink underline-offset-8 transition-colors hover:text-accent hover:underline sm:text-2xl"
          >
            Connect on LinkedIn
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        )}

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
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
