# Raje Airey — Counselling Website

A static website for Raje Airey's counselling practice, built with [Astro](https://astro.build) and hosted on [Cloudflare Pages](https://pages.cloudflare.com).

**Live:** https://rajeairey.co.uk

## Tech Stack

- **Framework:** Astro 5.x
- **Hosting:** Cloudflare Pages
- **CMS:** Decap CMS (password-protected, git-based)
- **Styling:** CSS (no framework)

## Project Structure

```
├── src/
│   ├── content/blog/      # Blog posts (Markdown)
│   ├── pages/             # Site pages
│   ├── layouts/           # Page layouts
│   └── components/        # UI components
├── public/
│   ├── images/            # Static assets
│   └── admin/             # CMS interface
├── functions/             # Cloudflare Functions (CMS auth)
└── dev-docs/              # Architecture documentation
```

## Development

```bash
npm install
npm run dev       # Start dev server at localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build
```

## Deployment

Push to `main` → Cloudflare auto-deploys.

## CMS

Content is edited via Decap CMS at `/admin/`. The CMS uses password-based authentication with a custom git-gateway implementation (no GitHub account required for editors).

See `dev-docs/raje-site.md` for setup details.

## Documentation

- `DECISIONS.md` — Architecture decisions log
- `dev-docs/raje-site.md` — Technical architecture
- `dev-docs/raje-site DESIGN BRIEF.md` — Design system reference

## License

MIT
