# Raje Airey Site - Decisions Log

## 2025-01-18: Architecture Review & Reset

### Context
Original design docs in `dev-docs/` proposed a monorepo with two Astro sites (art + counselling) sharing components. Review identified several issues that would prevent the design from working.

### Issues Found
1. **Content schemas**: `body` incorrectly defined as frontmatter field (Astro handles body separately)
2. **Monorepo complexity**: Cloudflare Pages friction with workspace imports
3. **Decap CMS configs**: Wrong media folder paths, OAuth setup unclear
4. **Components**: Data fetching inside components, broken script interpolation
5. **Dynamic routes**: Missing `getStaticPaths()`
6. **Markdown rendering**: Using `{post.body}` instead of `<Content />`

### Decisions

**D1: Start with counselling site only**
- It's the existing site that needs migration
- Art site can be added later as separate repo
- Reduces complexity

**D2: Single repo per site (not monorepo)**
- Simpler Cloudflare Pages deployment
- Independent deployments
- Easier for Raje to understand
- Share design via CSS variables, copy components if needed

**D3: Skip Decap CMS initially**
- Get static site working first
- Add CMS once site is deployed and stable
- Reduces initial complexity

**D4: Use Astro 5.x**
- Latest content collections API
- Better TypeScript support
- Image optimization built-in

**D5: Keep original docs as archive**
- `dev-docs/` contains original AI-generated design
- Use this `DECISIONS.md` for ongoing decisions
- Actual implementation in root of repo

### Tech Stack (Confirmed)
- Astro 5.x (static site generator)
- Cloudflare Pages (hosting)
- TypeScript
- CSS (no framework initially - keep it simple)
- Later: Decap CMS for content editing

### Site Structure
```
rajeairey.co.uk (counselling - this repo)
├── Home
├── About
├── Services
├── Blog
│   ├── Index
│   └── [slug] posts
└── Contact

art.rajeairey.co.uk (future - separate repo)
├── Gallery
├── Paintings/[slug]
└── About/Contact
```

---

## 2025-01-18: CMS Authentication Setup

### Context
Raje needs to edit blog posts without a GitHub account. Standard Decap CMS requires GitHub OAuth, which means every editor needs a GitHub account.

### Options Considered
1. **Sveltia CMS with GitHub OAuth** — Tried first, but requires GitHub account
2. **Decap CMS with git-gateway** — Standard Netlify approach, but needs custom implementation on Cloudflare
3. **Password-based auth with git proxy** — Custom solution using service token

### Decision: Password-based auth with Git Gateway proxy

**Why:**
- Raje doesn't need a GitHub account
- Single password for CMS access
- All commits use a service token (GITHUB_PAT)
- Works on Cloudflare Pages with custom functions

### Implementation

**Cloudflare Functions created:**
```
functions/
├── .netlify/
│   ├── git/
│   │   ├── github/[[path]].js  # Proxies GitHub API using GITHUB_PAT
│   │   └── settings.js          # Returns git-gateway config
│   └── identity/
│       ├── token.js             # Password login endpoint
│       └── user.js              # User info endpoint
└── auth/
    ├── index.js                 # GitHub OAuth start (legacy)
    └── callback.js              # GitHub OAuth callback (legacy)
```

**Environment variables (Cloudflare Pages):**
- `GITHUB_PAT` — Fine-grained token with Contents:write on richlee/raje-airey
- `CMS_PASSWORD` — Password for CMS login
- `GITHUB_CLIENT_ID` — OAuth app (legacy, may remove)
- `GITHUB_CLIENT_SECRET` — OAuth app (legacy, may remove)

**CMS Config (`public/admin/config.yml`):**
```yaml
backend:
  name: git-gateway
  repo: richlee/raje-airey
  branch: main
```

**Admin page (`public/admin/index.html`):**
- Custom login form (password-based)
- Loads Decap CMS after successful auth
- Stores token in localStorage as `gotrue.user`

### How it works
1. User visits `/admin/`
2. Enters password → POST to `/.netlify/identity/token`
3. Token stored in localStorage
4. Decap CMS loads, reads token
5. CMS calls `/.netlify/git/github/*` for all GitHub operations
6. Git proxy adds GITHUB_PAT and forwards to GitHub API
7. Commits appear as the PAT owner (Rich)

### Trade-offs
- Single shared password (not per-user auth)
- Commits attributed to PAT owner, not individual editors
- Simple but not enterprise-grade

### Future improvements (if needed)
- Add user management with different passwords
- Include editor name in commit messages
- Add audit logging

---

## 2025-01-18: Single Repo per Site (not monorepo)

### Context
Original design proposed monorepo with shared components. After review, decided against.

### Decision
Each site gets its own repo:
- `raje-airey` — Counselling site (this repo)
- Future: `raje-airey-art` — Art portfolio site

### Rationale
- Simpler Cloudflare Pages deployment
- Independent deploy cycles
- Easier for Raje to understand
- Can copy components between repos if needed
- Avoids workspace import complexity

---

## Future Decisions
<!-- Add new decisions above this line -->
