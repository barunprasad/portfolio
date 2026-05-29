# Portfolio Redesign — Editorial Minimal (2026)

**Branch:** `redesign/editorial-minimal`
**Status:** Plan (not yet implemented)
**Last updated:** 2026-05-29

---

## 1. Goal

Move the portfolio from the now-ubiquitous "Brittany Chiang split-pane" template to a
fresh, **editorial-minimal** single-column experience that reads as 2026-current: oversized
typography, generous space, a committed dark theme with one electric accent, and intentional
scroll-driven motion (GSAP + Lenis). Must stay **fast** (SSG/ISR, Lighthouse 95+) and become
**leaner** (drop the heavy/fragile styling stack).

### Locked decisions
| Decision | Choice |
| --- | --- |
| Design direction | **Editorial Minimal** — one column, huge type, mono labels, scroll reveals |
| Styling stack | **Drop `@arctic-kit/*` + Pigment CSS → Tailwind CSS v4** |
| Mood | **Dark + electric accent** (committed single dark theme) |
| Motion | **GSAP** (free, all plugins) + **Lenis** smooth scroll, `prefers-reduced-motion` aware |

### Open (non-blocking) decisions
- **Accent color:** acid lime `#C8FF00` (recommended) vs electric cyan `#3DD7FF` vs amber `#FFB020`.
- **Font pairing:** General Sans (display) + Inter (body) + Geist Mono (labels) — recommended.
- **Theme toggle:** recommend **removing** light/dark toggle and committing to dark. (Decision pending.)

---

## 2. Design spec

### Color tokens (dark, single theme)
| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0A0A0B` | page canvas |
| `--surface` | `#121214` | cards, hover surfaces |
| `--text` | `#EDEDED` | primary text |
| `--muted` | `#8A8A8E` | secondary text, mono labels |
| `--border` | `#26262A` | hairlines, dividers |
| `--accent` | `#C8FF00` (pending) | active state, link underline, arrows, status dot |

### Typography (self-hosted via `next/font`, free)
- **Display:** General Sans (Fontshare) — oversized hero + section headings.
- **Body:** Inter (already in use) — paragraphs, lists.
- **Mono:** Geist Mono — metadata (`01 — about`, dates, tags, status line).

### Layout (single column, ~720–820px measure, generous margins)
1. **Hero** — oversized name; one-line statement; mono status line (`● Available · Engineer, Builder`);
   socials as a tidy mono row. Subtle film grain + faint radial gradient that drifts toward cursor
   (CSS/canvas, no WebGL).
2. **Sticky section index** — minimal `01 / 04` marker that updates on scroll (modern replacement for
   the old `.sectionLinkLine` nav).
3. **About** — short editorial paragraph; SplitText line reveal.
4. **Work** — role timeline; each entry reveals on scroll; tags as mono chips.
5. **Projects** — **hover-preview list**: titles in a vertical list, hovering floats the project image
   near the cursor (signature interaction; Arctic Design becomes a featured entry here).
6. **Writing** — Medium posts as a clean list.
7. **Footer/contact** — large email CTA with magnetic hover.

### Motion
- **Lenis** smooth scroll (replaces `scroll-behavior: smooth` + the `overflow:hidden` inner-scroll
  container in `page.module.scss` that currently fights native scroll).
- **GSAP ScrollTrigger + SplitText**: line/word reveals, staggered section fade-ups (`y: 24→0`, `expo.out`).
- **Flip** (optional, later): projects list↔grid toggle.
- `useGSAP()` from `@gsap/react` for cleanup; motion bundle lazy-loaded; full reduced-motion fallback
  (reveals become instant, Lenis disabled).

---

## 3. Tech changes

### Upgrade
- Next.js `15.0.7 → 16.2` (Turbopack + React Compiler now stable = free perf).
- React `19.0.0-rc → 19.2` stable; `@types/react`/`@types/react-dom` `18 → 19`.

### Remove (deps + code touchpoints)
- `@arctic-kit/snow`, `@arctic-kit/colors`, `@arctic-kit/icons`
- `@pigment-css/react`, `@pigment-css/nextjs-plugin`
- `framer-motion`
- `@floating-ui/react` (appears unused in `src/` — confirm, then drop)
- `sass` (optional — Tailwind replaces `.scss`)
- `@fontsource/inter` (replaced by `next/font`)

**Code touchpoints to rewrite/remove:**
- `@arctic-kit`: `next.config.ts` (theme), `src/ui/features/ViewResume/ViewResume.tsx`,
  `src/ui/features/ArticleSection/ArticleSection.tsx`, `src/ui/components/Card/Card.tsx`,
  `src/ui/components/Card/CardChip.tsx`, `src/ui/components/ThemeToggle/ThemeToggle.tsx`,
  `src/app/layout.tsx`, `src/app/DetailSection.tsx`, `src/pigment.d.ts`.
  *(Note: `@arctic-kit/snow` strings in `src/data/projects.ts` & `src/data/blogs.ts` are content text — keep.)*
- Pigment: `next.config.ts`, `src/app/layout.tsx`, `src/app/Section.tsx`, `Card.tsx`, `CardChip.tsx`,
  `ViewResume.tsx`, delete `src/pigment.d.ts`.
- framer-motion: `Experiment.tsx`, `Card/CardList.tsx`, `Card/CardListItem.tsx`, `ThemeToggle.tsx`,
  all of `SideMenu/*`.
- `.scss`: `globals.scss`, `page.module.scss`, `Card/*.module.scss`, `SideMenu/*.module.scss`,
  `ThemeToggle/*.module.scss`, `Experiment/*.module.scss`.

### Add
- `tailwindcss@4` (+ `@tailwindcss/postcss`)
- `gsap` + `@gsap/react`
- `lenis`

### Keep as-is (working well)
- Hygraph + GraphQL codegen data layer (`src/lib/graphql/*`, `codegen.ts`).
- Dual local/CMS provider (`src/lib/data-provider/*`) and content types (`src/types/content/*`).
- ISR + revalidate webhook (`src/app/api/revalidate/route.ts`, `revalidate = 3600`).
- Firebase analytics (`src/lib/firebase*.ts`, `AnalyticsProvider.tsx`).
- Social icons (`src/ui/icons/*`).

---

## 4. Phased implementation

Each phase ends with a working, committable app.

### Phase 0 — Branch & safety net ✅ (this branch)
- `redesign/editorial-minimal` created. Land this plan doc first.

### Phase 1 — Foundation (upgrade + Tailwind, app still renders)
- Upgrade Next 16.2 / React 19.2; run `next` codemods; verify build.
- Add Tailwind v4 + PostCSS; create `src/app/globals.css` with color/type/spacing tokens (`@theme`).
- Wire self-hosted fonts via `next/font` (General Sans, Inter, Geist Mono).
- Remove Pigment from `next.config.ts`; strip Arctic theme; delete `src/pigment.d.ts`.
- Temporarily keep old components compiling (or stub) so the app boots.
- **Exit:** `next build` green on the new stack; page renders (unstyled-ish is fine).

### Phase 2 — Layout & type (no motion yet)
- Rebuild `src/app/page.tsx` as the single-column editorial layout (hero → sections → footer).
- New presentational components (Tailwind): `Hero`, `SectionBlock`, `WorkItem`, `ProjectList`,
  `WritingList`, `Footer`, `SocialRow`, `Chip`.
- Replace `Card`/`CardList`/`CardListItem`/`ArticleSection`/`DetailSection`/`Section` with the new set;
  delete `SideMenu/*`, `ThemeToggle/*`, `SchemeSwitch`, `Experiment` (and toggle, if removing).
- Keep data wiring intact (`getIntroSection`/`getSections`/`getSocialLinks`).
- **Exit:** looks current and spacious with zero JS motion; fully responsive.

### Phase 3 — Motion
- Add Lenis (client provider) + `useGSAP` setup; register ScrollTrigger/SplitText.
- Section fade-ups, hero SplitText reveal, sticky `01/04` index, projects hover-preview.
- **Exit:** smooth scroll + reveals; `prefers-reduced-motion` disables motion cleanly.

### Phase 4 — Polish & ship
- Film grain + cursor-follow gradient; magnetic email CTA.
- a11y pass (focus states, reduced-motion, semantics, alt text); responsive QA.
- Lighthouse tune (target 95+ across categories); image `next/image` audit.
- Update `siteMetadata.ts`/OG image if copy changes; update `README.md`.
- Open PR `redesign/editorial-minimal → main`.

---

## 5. Performance & a11y guardrails
- SSG/ISR preserved → instant first paint.
- Transform/opacity-only animations (GPU); no layout-thrashing reveals.
- Motion JS lazy-loaded; Lenis + GSAP only on the client, after hydration.
- Full `prefers-reduced-motion: reduce` path (instant reveals, no smooth-scroll hijack).
- Self-hosted fonts, `display: swap`, preload display face.
- Keyboard nav + visible focus on all interactive elements; hover-preview has a non-hover fallback.

---

## 6. Risks
- **Next 16 / React 19.2 upgrade churn** — async APIs, possible codemod fixes. Isolated in Phase 1.
- **SplitText + a11y** — ensure split text stays readable to screen readers (aria / re-join on reduced motion).
- **Hover-preview on touch** — needs a tap/non-hover fallback (show thumbnail inline on mobile).
- **Dropping the theme toggle** — confirm before deleting `SchemeSwitch`/`ThemeToggle`.

## 7. Acceptance criteria
- [ ] No `@arctic-kit/*`, `@pigment-css/*`, `framer-motion`, `sass` in `package.json`.
- [ ] Single-column editorial layout, committed dark theme, one accent.
- [ ] GSAP + Lenis scroll reveals; reduced-motion fallback verified.
- [ ] Hygraph/ISR/analytics still functional.
- [ ] Lighthouse ≥ 95 (Performance, A11y, Best Practices, SEO) on mobile.
- [ ] Responsive from 360px → wide desktop.
