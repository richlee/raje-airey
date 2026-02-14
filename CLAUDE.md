# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Raje Airey's counselling practice, built with **Astro 5.x** and hosted on **Cloudflare Pages**. Live at https://rajeairey.co.uk.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

No test framework is configured. No linter is configured.

## Architecture

### Tech Stack
- Astro 5.x (static site generator, zero JS by default)
- TypeScript (strict mode, extends `astro/tsconfigs/strict`)
- Plain CSS with CSS variables for theming (no CSS framework)
- Cloudflare Pages for hosting + Cloudflare Functions for CMS auth
- Decap CMS with custom git-gateway (password-based, no GitHub account needed for editors)

### Key Directories
- `src/pages/` — File-based routing. Each `.astro` file = a page. `blog/[slug].astro` uses `getStaticPaths()` for dynamic routes.
- `src/content/blog/` — Markdown blog posts managed via Decap CMS. Schema in `src/content/config.ts` (Zod validation).
- `src/components/` — Reusable components (Header, Footer, SEO).
- `src/layouts/BaseLayout.astro` — Wraps all pages (header + slot + footer).
- `src/styles/global.css` — Design tokens (CSS variables) and base styles.
- `public/admin/` — Decap CMS interface (`config.yml` + custom login page).
- `functions/.netlify/` — Cloudflare Functions that implement git-gateway: password auth (`identity/token.js`), git proxy (`git/github/[[path]].js`). These proxy GitHub API calls using a `GITHUB_PAT` env var.
- `dev-docs/` — Archived architecture docs (original design, not current implementation). `DECISIONS.md` in root has current decisions.

### Path Aliases (tsconfig.json)
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@styles/*` → `src/styles/*`

### Styling Conventions
- CSS variables defined in `:root` in `global.css` — colors (`--color-*`), spacing (`--spacing-*`), typography (`--font-*`), etc.
- Primary accent: `#E09900` (gold/ochre). Warm background: `#e8dcc8`. Footer dark blue: `#1A3A5C`.
- Font: Work Sans. Content max-width: `--content-width: 1080px`.
- Component styles use Astro's scoped `<style>` tags. Global styles only in `global.css`.
- Mobile-first responsive design with breakpoints at 980px and 640px.

### Content Patterns
- Static content (services, FAQs, testimonials, about) is hardcoded in `.astro` page files.
- Blog posts are the only CMS-managed content (Markdown in `src/content/blog/`).
- Blog frontmatter: `title` (required), `description`, `date`, `updatedDate`, `image`, `tags`, `draft`.

### Deployment
Push to `main` → Cloudflare auto-builds and deploys. Env vars (`CMS_PASSWORD`, `GITHUB_PAT`) are set in Cloudflare Pages dashboard.
