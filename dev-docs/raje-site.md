# Raje Airey Site — Architecture

## Overview

A static website for Raje Airey's counselling practice, built with Astro and hosted on Cloudflare Pages. Includes a password-protected CMS for content editing.

**Live site:** https://rajeairey.co.uk
**Staging:** https://raje-airey.pages.dev

---

## Tech Stack

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Astro 5.x | Static site generator |
| Hosting | Cloudflare Pages | Auto-deploys from GitHub |
| CMS | Decap CMS | Git-based, password-protected |
| Domain | Namecheap → Cloudflare DNS | rajeairey.co.uk |
| Source | GitHub | richlee/raje-airey |

**Annual cost:** ~£10 (domain only)

---

## Site Structure

```
rajeairey.co.uk
├── /                    # Home
├── /about/              # About Raje
├── /services/           # Counselling services
├── /blog/               # Blog index
├── /blog/[slug]/        # Blog posts
├── /contact/            # Contact page
└── /admin/              # CMS (password-protected)
```

---

## Repository Structure

```
raje-airey/
├── src/
│   ├── content/
│   │   └── blog/           # Blog posts (Markdown)
│   ├── pages/              # Astro pages
│   ├── layouts/            # Page layouts
│   └── components/         # UI components
├── public/
│   ├── images/             # Static images
│   └── admin/
│       ├── index.html      # CMS login page
│       └── config.yml      # CMS configuration
├── functions/              # Cloudflare Functions
│   ├── .netlify/           # Git-gateway endpoints
│   │   ├── git/
│   │   │   ├── github/[[path]].js
│   │   │   └── settings.js
│   │   └── identity/
│   │       ├── token.js
│   │       └── user.js
│   └── auth/               # Legacy OAuth (unused)
├── DECISIONS.md            # Architecture decisions
└── dev-docs/               # Documentation
```

---

## CMS Setup

### How it works

1. Raje visits `/admin/`
2. Enters password
3. Decap CMS loads
4. Edits content (blog posts)
5. Saves → commits to GitHub
6. Cloudflare auto-deploys

### Authentication Flow

```
Browser                 Cloudflare Functions           GitHub
   │                           │                          │
   │─── POST /token ──────────>│                          │
   │    (password)             │                          │
   │<── JWT token ─────────────│                          │
   │                           │                          │
   │─── GET /git/github/* ────>│                          │
   │    (with token)           │─── API call ────────────>│
   │                           │    (with GITHUB_PAT)     │
   │<── GitHub response ───────│<── response ─────────────│
```

### Environment Variables (Cloudflare)

| Variable | Purpose |
|----------|---------|
| `CMS_PASSWORD` | Password for CMS login |
| `GITHUB_PAT` | Fine-grained token for commits |

### Creating/Rotating the GitHub PAT

1. Go to https://github.com/settings/tokens?type=beta
2. Generate new token:
   - Name: `Raje Airey CMS`
   - Repository: `richlee/raje-airey` only
   - Permissions: Contents (Read/Write), Metadata (Read)
3. Copy token to Cloudflare → Pages → Settings → Environment variables
4. Redeploy

---

## Content Schema

### Blog Posts

Location: `src/content/blog/*.md`

```yaml
---
title: "Post Title"
description: "Short description"
date: 2025-01-18
draft: false
---

Post content in Markdown...
```

---

## Development

### Local Development

```bash
npm install
npm run dev        # http://localhost:4321
```

### Build

```bash
npm run build      # Output in dist/
npm run preview    # Preview production build
```

### Deploy

Push to `main` branch → Cloudflare auto-deploys

---

## Future: Art Gallery Site

A separate site for Raje's art portfolio is planned:

- **Domain:** art.rajeairey.co.uk (or similar)
- **Repo:** `raje-airey-art` (separate repo, not monorepo)
- **Features:** Gallery, paintings with sold status, exhibitions

The design brief in `dev-docs/raje-site DESIGN BRIEF.md` contains component designs that can be adapted for the art site:
- Gallery component
- Painting detail pages
- ListPaintings component
- Sold/price badges

### Why separate repos?

- Simpler Cloudflare Pages setup
- Independent deploys
- No workspace import complexity
- Can share styles via copy (they're small)

---

## Troubleshooting

### CMS won't load
- Check `CMS_PASSWORD` is set in Cloudflare
- Clear localStorage and try again
- Check browser console for errors

### CMS can't save
- Check `GITHUB_PAT` is set and not expired
- Verify PAT has Contents:write permission
- Check Cloudflare function logs

### Changes not appearing
- Wait 30-60s for Cloudflare build
- Check GitHub for the commit
- Hard refresh the page (Cmd+Shift+R)

---

## Related Docs

- `DECISIONS.md` — Architecture decisions log
- `dev-docs/raje-site DESIGN BRIEF.md` — Original design brief (aspirational, includes art site concepts)
