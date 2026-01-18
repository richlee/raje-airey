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

## Future Decisions
<!-- Add new decisions above this line -->
