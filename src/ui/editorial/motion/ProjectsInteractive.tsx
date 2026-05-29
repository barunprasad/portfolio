'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import type { ProjectEntry } from '@/types/content';
import { Tag } from '../Tag';
import { ArrowUpRight } from '../ArrowUpRight';

// Projects list. On fine-pointer desktop a large preview image floats with the
// cursor; on touch / small screens an inline thumbnail is shown instead. The
// list markup itself is server-rendered (SEO-safe).
export function ProjectsInteractive({ items }: { items: ProjectEntry[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const moveRef = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(
    () => {
      const el = previewRef.current;
      if (!el) return;
      if (!window.matchMedia('(pointer: fine)').matches) return;
      moveRef.current = {
        x: gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' }),
      };
    },
    { scope: wrapRef },
  );

  const onMove = (e: React.MouseEvent) => {
    const m = moveRef.current;
    const wrap = wrapRef.current;
    if (!m || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    m.x(e.clientX - rect.left + 28);
    m.y(e.clientY - rect.top - 96);
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseMove={onMove}
      onMouseLeave={() => setActiveImg(null)}
    >
      <ul className="flex flex-col">
        {items.map((project) => (
          <li
            key={project.title}
            data-animate
            className="border-b border-line/60 last:border-b-0"
            onMouseEnter={() => setActiveImg(project.imageUrl ?? null)}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col gap-4 py-6 sm:flex-row sm:gap-6"
            >
              {project.imageUrl && (
                <div className="project-thumb relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg border border-line sm:aspect-square sm:h-24 sm:w-24">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, 96px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 lg:py-1">
                <h3 className="flex items-center gap-1.5 text-lg font-medium text-ink transition-colors group-hover:text-accent lg:text-2xl">
                  {project.title}
                  <ArrowUpRight className="h-4 w-4 -translate-y-px opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </ul>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Floating cursor preview — fine-pointer desktop only (.preview-float) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`preview-float pointer-events-none absolute left-0 top-0 z-20 h-48 w-72 overflow-hidden rounded-xl border border-line shadow-2xl shadow-black/50 transition-opacity duration-300 ${
          activeImg ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {activeImg && (
          <Image src={activeImg} alt="" fill sizes="288px" className="object-cover" />
        )}
      </div>
    </div>
  );
}
