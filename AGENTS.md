<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project

Personal portfolio — editorial-minimal redesign. Conventions to follow:

- **Stack:** Next.js 16 (App Router, Turbopack) + React 19 + TypeScript.
- **Styling:** Tailwind CSS v4 only (no CSS-in-JS). Tokens live in `src/app/globals.css` (`@theme`). Committed **dark theme** with an acid-lime accent (`--color-accent`). UI lives in `src/ui/editorial/`.
- **Motion:** GSAP + Lenis in `src/ui/editorial/motion/`, always as **progressive enhancement**. Content is server-rendered and must stay visible without JS and under reduced motion — reveal-hiding is gated on `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`. Never hide the LCP (hero name).
- **SEO is a hard requirement.** Keep all content server-rendered (SSG/ISR); preserve JSON-LD (`PersonJsonLd`), `sitemap.ts`, `robots.ts`, and canonical metadata. Target Lighthouse SEO 100.
- **Content:** sourced from Hygraph CMS via the data-provider abstraction (`src/lib/data-provider/`), with a local fallback in `src/data/`. Some hero/marquee/stats copy is hardcoded in components — update both code and Hygraph when changing it.
- **Checks:** `yarn lint` (ESLint flat config); type-check via `yarn build`. Verify prod behavior with `yarn build && yarn start`.
