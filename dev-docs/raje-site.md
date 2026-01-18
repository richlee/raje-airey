

# `raje-site.md`

## 🌐 Project Overview

This document outlines a modern, low‑cost, low‑maintenance architecture for two static websites:

- **Art portfolio** (image‑heavy, with “sold” status)
- **Counselling site** (static pages + blog posts)

Both sites share a unified design system and deploy automatically on every content update.

------

## 🏗️ Final Technology Stack

### **1. Domain Registrar — Namecheap**

- Manages the primary domain (e.g., `mysite.com`)
- Subdomains for each site:
  - `art.mysite.com`
  - `counselling.mysite.com`
- Annual cost: **£8–£12**

### **2. DNS + CDN + Hosting — Cloudflare Pages**

- Hosts both static sites
- Global CDN, SSL, caching, subdomains
- Automatic builds from GitHub
- Zero cost for this scale
- Optional: move DNS from Namecheap → Cloudflare for:
  - faster propagation
  - simpler subdomain management
  - automatic SSL
  - better caching

**Cost: £0**

### **3. Source Control — GitHub**

- Stores all site code and content
- Decap CMS commits directly to GitHub
- Cloudflare Pages builds from GitHub

**Cost: £0**

### **4. Static Site Generator — Astro**

- Modern, component‑based static site generator
- Ideal for:
  - shared layouts across two sites
  - image‑heavy galleries
  - Markdown/MDX blog posts
  - future interactivity if needed
- Fast rebuilds for small/medium sites

**Cost: £0**

### **5. CMS — Decap CMS (formerly Netlify CMS)**

- Git‑based CMS with a clean UI
- Runs entirely client‑side
- Allows non‑technical editing of:
  - blog posts
  - paintings
  - counselling pages
  - artwork metadata (e.g., “sold”)
- Authenticates via GitHub OAuth

**Cost: £0**

### **6. Shared Design System (recommended)**

- Reusable Astro components for:
  - headers
  - footers
  - typography
  - image galleries
  - blog layouts
- Ensures both sites feel cohesive
- Reduces maintenance overhead

**Cost: £0 (just development time)**

### **7. Optional Enhancements**

#### **A. Image Storage Strategy**

For small sites:

- Store images in the repo (simple + free)

For large art portfolios:

- Cloudflare R2 (cheap object storage)
- or Cloudinary (paid, powerful)

#### **B. Staging / Preview Deploys**

- Cloudflare Pages automatically creates preview URLs for every PR
- Useful for client approval before publishing

#### **C. Analytics**

- Cloudflare Web Analytics (free, privacy‑friendly)
- or Plausible (paid, simple)

------

## 🧩 Architecture Diagram (conceptual)

```
Namecheap (domain)
        |
        v
Cloudflare DNS (optional)
        |
        +--> art.mysite.com  ----> Cloudflare Pages ----> Astro build ----> GitHub repo
        |
        +--> counselling.mysite.com ----> Cloudflare Pages ----> Astro build ----> GitHub repo
        |
        +--> /admin (Decap CMS UI) ----> GitHub OAuth ----> GitHub commits ----> Cloudflare rebuild
```

------

## 📝 Content Workflow

### **1. Editor logs into Decap CMS**

- Hosted at `mysite.com/admin`
- Authenticates via GitHub OAuth

### **2. Editor updates content**

- Adds a painting
- Marks artwork as sold
- Writes a blog post
- Updates counselling pages

### **3. Decap CMS commits to GitHub**

- Markdown, JSON, or YAML files updated in the repo

### **4. Cloudflare Pages rebuilds**

- Astro regenerates the static site
- New version deployed globally within seconds

------

## 💸 Total Annual Cost

| Item                       | Cost   |
| -------------------------- | ------ |
| Domain (Namecheap)         | £8–£12 |
| Hosting (Cloudflare Pages) | £0     |
| CMS (Decap)                | £0     |
| SSL                        | £0     |
| Subdomains                 | £0     |
| Astro                      | £0     |
| GitHub                     | £0     |

**Total: £8–£12 per year**  
 (Down from her current £200/year for a static brochure site.)

------

## 🎯 Summary

This stack gives your friend:

- Two beautiful, fast, secure sites
- A unified design system
- Zero hosting cost
- A friendly CMS
- Automatic deploys
- Full ownership and portability
- No WordPress, no plugins, no server maintenance

It’s a future‑proof setup that scales with her needs and keeps her costs near zero.

------

# 📁 Recommended Monorepo Structure for Two Astro Sites

```
raje-sites/
├── package.json
├── pnpm-lock.yaml (or yarn.lock / package-lock.json)
├── astro.config.mjs
├── tsconfig.json
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml        # optional CI, Cloudflare Pages usually handles this
│
├── shared/                   # Shared design system
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Layout.astro
│   │   ├── Gallery.astro
│   │   ├── Card.astro
│   │   └── Typography.css
│   ├── utils/
│   │   └── imageHelpers.ts
│   └── styles/
│       └── base.css
│
├── sites/
│   ├── art/                  # Art portfolio site
│   │   ├── astro.config.mjs  # extends root config
│   │   ├── public/
│   │   │   └── admin/        # Decap CMS for art site
│   │   │       ├── index.html
│   │   │       └── config.yml
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── index.astro
│   │   │   │   ├── about.astro
│   │   │   │   └── blog/
│   │   │   ├── content/
│   │   │   │   ├── paintings/
│   │   │   │   │   ├── painting-1.md
│   │   │   │   │   └── painting-2.md
│   │   │   │   └── blog/
│   │   │   └── components/   # site-specific components
│   │   └── package.json      # optional if site-specific deps
│   │
│   └── counselling/          # Counselling site
│       ├── astro.config.mjs
│       ├── public/
│       │   └── admin/        # Decap CMS for counselling site
│       │       ├── index.html
│       │       └── config.yml
│       ├── src/
│       │   ├── pages/
│       │   │   ├── index.astro
│       │   │   ├── about.astro
│       │   │   └── blog/
│       │   ├── content/
│       │   │   └── blog/
│       │   └── components/
│       └── package.json
│
└── cloudflare/
    ├── art-project-config.json
    └── counselling-project-config.json
```

------

# 🧠 Why this structure works

## **1. Shared design system**

Everything in `/shared` is imported by both sites:

- Layouts
- Typography
- Gallery components
- Buttons
- Utilities
- Base styles

This keeps both sites visually consistent.

## **2. Clean separation of content**

Each site has its own:

- pages
- blog posts
- images
- Decap CMS config
- admin UI

This avoids cross‑contamination and keeps editing simple for your friend.

## **3. Cloudflare Pages handles two separate deployments**

You’ll create:

- **Project 1:** `art.mysite.com` → `sites/art/`
- **Project 2:** `counselling.mysite.com` → `sites/counselling/`

Both build from the same repo.

## **4. Decap CMS lives inside each site**

Each site gets its own:

```
public/admin/index.html
public/admin/config.yml
```

This means:

- art site edits art content
- counselling site edits counselling content
- no confusion
- no permissions issues

## **5. Astro config inheritance**

Each site’s `astro.config.mjs` can extend the root config:

```js
import { defineConfig } from 'astro/config';
import base from '../../astro.config.mjs';

export default defineConfig({
  ...base,
  site: 'https://art.mysite.com',
});
```

------

# 🟩 What this gives your friend

- A clean CMS for each site
- A consistent design across both
- Easy updates (blog posts, paintings, sold status)
- Zero hosting cost
- Instant deploys
- A future‑proof architecture

------

Absolutely, Rich — here are **clean, production‑ready Decap CMS configs** for both sites, written so you can drop them straight into:

```
sites/art/public/admin/config.yml
sites/counselling/public/admin/config.yml
```

They’re designed for:

- Astro
- GitHub backend
- Cloudflare Pages hosting
- Image uploads
- Blog posts
- Art pieces with metadata (price, sold, dimensions, medium, etc.)
- Counselling pages + blog

Everything is structured so your friend gets a clear, friendly editing UI.

------

# 🎨 **Decap CMS config for the \*Art\* site**

```yaml
backend:
  name: github
  repo: your-github-username/raje-sites
  branch: main
  site_domain: art.mysite.com

media_folder: "src/content/paintings/images"
public_folder: "/paintings/images"

publish_mode: editorial_workflow

collections:
  - name: "paintings"
    label: "Paintings"
    folder: "src/content/paintings"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Image", name: "image", widget: "image" }
      - { label: "Description", name: "body", widget: "markdown" }
      - { label: "Medium", name: "medium", widget: "string", required: false }
      - { label: "Dimensions", name: "dimensions", widget: "string", required: false }
      - { label: "Price", name: "price", widget: "string", required: false }
      - { label: "Sold", name: "sold", widget: "boolean", default: false }
      - { label: "Featured", name: "featured", widget: "boolean", default: false }

  - name: "blog"
    label: "Blog Posts"
    folder: "src/content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Cover Image", name: "cover", widget: "image", required: false }
      - { label: "Body", name: "body", widget: "markdown" }

  - name: "pages"
    label: "Static Pages"
    files:
      - label: "About"
        name: "about"
        file: "src/pages/about.md"
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Body", name: "body", widget: "markdown" }
```

------

# 🧠 **Decap CMS config for the \*Counselling\* site**

```yaml
backend:
  name: github
  repo: your-github-username/raje-sites
  branch: main
  site_domain: counselling.mysite.com

media_folder: "src/content/images"
public_folder: "/images"

publish_mode: editorial_workflow

collections:
  - name: "pages"
    label: "Counselling Pages"
    files:
      - label: "Home"
        name: "home"
        file: "src/pages/index.md"
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Body", name: "body", widget: "markdown" }

      - label: "About"
        name: "about"
        file: "src/pages/about.md"
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Body", name: "body", widget: "markdown" }

      - label: "Services"
        name: "services"
        file: "src/pages/services.md"
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Body", name: "body", widget: "markdown" }

  - name: "blog"
    label: "Blog Posts"
    folder: "src/content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Cover Image", name: "cover", widget: "image", required: false }
      - { label: "Body", name: "body", widget: "markdown" }
```

------

# 🟦 Notes on how this behaves in practice

### **Art site**

Your friend gets:

- A “Paintings” collection with:
  - image upload
  - price
  - sold toggle
  - featured toggle
  - description
- A blog
- Editable static pages

### **Counselling site**

Your friend gets:

- Editable home, about, services pages
- A blog
- Image uploads

### **Both sites**

- Editorial workflow (draft → review → publish)
- GitHub commits trigger Cloudflare rebuilds
- No backend
- No hosting cost

------

Absolutely, Rich — here are **clean, typed Astro content schemas** that pair perfectly with the Decap CMS configs we just built. These give you:

- validation
- type‑safety
- predictable front‑matter
- clean imports in your Astro pages

They slot straight into:

```
sites/art/src/content/config.ts
sites/counselling/src/content/config.ts
```

Each site gets its own schema, but they share the same pattern.

------

# 🎨 **Art Site — `src/content/config.ts`**

```ts
import { defineCollection, z } from "astro:content";

const paintings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string(),
    body: z.string(),
    medium: z.string().optional(),
    dimensions: z.string().optional(),
    price: z.string().optional(),
    sold: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    cover: z.string().optional(),
    body: z.string(),
  }),
});

export const collections = {
  paintings,
  blog,
};
```

### What this gives you

- Strong typing for paintings
- Guaranteed fields for blog posts
- Optional metadata for art pieces
- Perfect alignment with Decap CMS fields
- Clean imports like:

```ts
const paintings = await getCollection("paintings");
```

------

# 🧠 **Counselling Site — `src/content/config.ts`**

```ts
import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    body: z.string(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    cover: z.string().optional(),
    body: z.string(),
  }),
});

export const collections = {
  pages,
  blog,
};
```

### What this gives you

- Typed static pages (home, about, services)
- Typed blog posts
- Clean, predictable front‑matter
- Zero surprises when rendering content

------

# 🧩 How Astro uses these schemas

Once these files exist, Astro automatically:

- validates front‑matter
- generates TypeScript types
- prevents invalid content from building
- gives you autocomplete in editors
- ensures Decap CMS and Astro stay in sync

It’s the missing piece that makes the whole system feel “engineered” rather than “cobbled together”.

------

Here you go, Rich — a **clean, modern Astro layout** that works beautifully with the content schemas we built. It’s designed to be dropped into:

```
shared/components/Layout.astro
```

It gives you:

- a consistent layout for both sites
- shared header + footer
- automatic metadata injection
- clean typography
- a slot for page content
- optional cover images for blog posts

Everything is modular so you can extend it later.

------

# 🟦 `Layout.astro` (shared component)

```astro
---
import "../styles/base.css";
import Header from "./Header.astro";
import Footer from "./Footer.astro";

interface Props {
  title?: string;
  description?: string;
  cover?: string;
}

const {
  title = "Site Title",
  description = "A modern Astro site",
  cover,
} = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>{title}</title>
    <meta name="description" content={description} />

    {cover && <meta property="og:image" content={cover} />}
    {cover && <meta name="twitter:image" content={cover} />}

    <link rel="stylesheet" href="/styles/base.css" />
  </head>

  <body>
    <Header />

    <main class="container">
      {cover && (
        <div class="cover-wrapper">
          <img src={cover} alt={title} class="cover-image" />
        </div>
      )}

      <slot />
    </main>

    <Footer />
  </body>
</html>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .cover-wrapper {
    margin-bottom: 2rem;
  }

  .cover-image {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
</style>
```

------

# 🟩 `Header.astro` (shared)

```astro
---
import "../styles/base.css";
---

<header class="header">
  <nav>
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
  </nav>
</header>

<style>
  .header {
    padding: 1rem 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 2rem;
  }

  nav {
    display: flex;
    gap: 1.5rem;
    font-size: 1.1rem;
  }

  a {
    text-decoration: none;
    color: var(--text);
  }

  a:hover {
    text-decoration: underline;
  }
</style>
```

------

# 🟧 `Footer.astro` (shared)

```astro
<footer class="footer">
  <p>© {new Date().getFullYear()} — All rights reserved.</p>
</footer>

<style>
  .footer {
    margin-top: 3rem;
    padding: 2rem 0;
    border-top: 1px solid #ddd;
    text-align: center;
    color: #666;
    font-size: 0.9rem;
  }
</style>
```

------

# 🟨 `base.css` (shared typography + variables)

```css
:root {
  --text: #222;
  --bg: #fff;
  --accent: #4a6fa5;
  --font-body: system-ui, -apple-system, sans-serif;
}

body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.6;
}

img {
  max-width: 100%;
  display: block;
}

h1, h2, h3, h4 {
  line-height: 1.3;
  margin-top: 2rem;
}

p {
  margin: 1rem 0;
}

a {
  color: var(--accent);
}
```

------

# 🟦 How this fits into your two‑site architecture

Both sites import the same layout:

```astro
---
import Layout from "../../../shared/components/Layout.astro";
import { getEntry } from "astro:content";

const post = await getEntry("blog", Astro.params.slug);
---

<Layout title={post.data.title} cover={post.data.cover}>
  <article>
    <h1>{post.data.title}</h1>
    <p><em>{post.data.date.toDateString()}</em></p>
    {post.body}
  </article>
</Layout>
```

This gives you:

- consistent typography
- consistent header/footer
- optional cover images
- clean blog layout
- shared styling across both sites

Exactly what you want for a cohesive art + counselling presence.

------

Absolutely, Rich — here’s a **clean, modern, production‑ready Gallery component** for the art site. It automatically:

- pulls all paintings from the `paintings` collection
- sorts them by date (newest first)
- displays them in a responsive grid
- shows “Sold” status
- shows optional metadata (medium, dimensions, price)
- links each painting to its detail page

It fits perfectly into the architecture we’ve built.

------

# 🎨 `Gallery.astro` (drop into `shared/components/Gallery.astro`)

```astro
---
import { getCollection } from "astro:content";

const paintings = await getCollection("paintings");

// Sort newest → oldest
paintings.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<div class="gallery">
  {paintings.map((item) => (
    <a href={`/paintings/${item.slug}/`} class="card">
      <img src={item.data.image} alt={item.data.title} loading="lazy" />

      <div class="info">
        <h3>{item.data.title}</h3>

        {item.data.medium && <p class="meta">{item.data.medium}</p>}
        {item.data.dimensions && <p class="meta">{item.data.dimensions}</p>}

        {item.data.sold ? (
          <p class="sold">Sold</p>
        ) : (
          item.data.price && <p class="price">{item.data.price}</p>
        )}
      </div>
    </a>
  ))}
</div>

<style>
  .gallery {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .card {
    display: block;
    text-decoration: none;
    color: inherit;
    border-radius: 8px;
    overflow: hidden;
    background: #fafafa;
    border: 1px solid #eee;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
  }

  .info {
    padding: 1rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  .meta {
    margin: 0.2rem 0;
    color: #666;
    font-size: 0.9rem;
  }

  .price {
    margin-top: 0.5rem;
    font-weight: bold;
    color: var(--accent);
  }

  .sold {
    margin-top: 0.5rem;
    font-weight: bold;
    color: #b33;
  }
</style>
```

------

# 🧩 How to use it in the art site

Inside:

```
sites/art/src/pages/index.astro
```

You can simply do:

```astro
---
import Layout from "../../../shared/components/Layout.astro";
import Gallery from "../../../shared/components/Gallery.astro";
---

<Layout title="Art Portfolio">
  <h1>Art Portfolio</h1>
  <Gallery />
</Layout>
```

That’s it — the gallery auto‑renders from the content collection.

------

# 🟦 Why this works well for your friend

- She adds a painting in Decap CMS
- It appears instantly in the gallery
- If she marks it as “sold”, the UI updates automatically
- No code changes
- No manual sorting
- No risk of breaking layout

It’s the kind of workflow that feels effortless for a non‑technical user.

------

Here’s a clean, elegant **painting detail page** for the art site — the natural companion to the gallery component. It’s designed to:

- pull a single painting from the `paintings` collection
- render all metadata cleanly
- show a large hero image
- display “Sold” status
- fall back gracefully if optional fields are missing
- use the shared `Layout.astro`

Drop this into:

```
sites/art/src/pages/paintings/[slug].astro
```

------

# 🎨 **`[slug].astro` — Painting Detail Page**

```astro
---
import Layout from "../../../../shared/components/Layout.astro";
import { getEntry } from "astro:content";

const { slug } = Astro.params;
const painting = await getEntry("paintings", slug);

const {
  title,
  date,
  image,
  medium,
  dimensions,
  price,
  sold,
  body,
} = painting.data;
---

<Layout title={title} cover={image}>
  <article class="painting">
    <img src={image} alt={title} class="hero" />

    <h1>{title}</h1>
    <p class="date">{date.toDateString()}</p>

    <div class="meta">
      {medium && <p><strong>Medium:</strong> {medium}</p>}
      {dimensions && <p><strong>Dimensions:</strong> {dimensions}</p>}

      {sold ? (
        <p class="sold">Sold</p>
      ) : (
        price && <p class="price">{price}</p>
      )}
    </div>

    <div class="body">
      {body}
    </div>
  </article>
</Layout>

<style>
  .painting {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    object-fit: cover;
  }

  h1 {
    margin-bottom: 0.5rem;
  }

  .date {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .meta p {
    margin: 0.3rem 0;
  }

  .price {
    font-weight: bold;
    color: var(--accent);
  }

  .sold {
    font-weight: bold;
    color: #b33;
  }

  .body {
    margin-top: 2rem;
  }
</style>
```

------

# 🧩 How this behaves in practice

When your friend edits a painting in Decap CMS:

- the hero image updates
- the metadata updates
- the “Sold” badge appears automatically
- the detail page URL becomes:
   `https://art.mysite.com/paintings/<slug>/`

No code changes needed.

------

# 🟦 How it fits into the whole system

- The **Gallery** component links to this page
- The **Layout** component wraps it
- The **content schema** validates the front‑matter
- Decap CMS writes the Markdown
- Cloudflare Pages deploys instantly

It’s a fully‑automated, zero‑maintenance workflow.

------

Here’s a **clean, elegant blog post layout** you can drop straight into both sites. It matches the design language we’ve already built (Layout, Header, Footer, Gallery, painting detail pages) and keeps everything consistent across the art and counselling sites.

This goes into:

```
shared/components/BlogPost.astro
```

It’s flexible enough to handle:

- posts with or without cover images
- posts with or without dates
- long‑form writing
- MDX or Markdown content

------

# 📝 **`BlogPost.astro` — Shared Blog Post Layout**

```astro
---
import Layout from "./Layout.astro";

interface Props {
  title: string;
  date?: Date;
  cover?: string;
  body: any; // Markdown or MDX content
}

const { title, date, cover, body } = Astro.props;
---

<Layout title={title} cover={cover}>
  <article class="post">
    <h1>{title}</h1>

    {date && (
      <p class="date">
        {date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    )}

    <div class="content">
      {body}
    </div>
  </article>
</Layout>

<style>
  .post {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    margin-bottom: 0.5rem;
  }

  .date {
    color: #666;
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }

  .content {
    margin-top: 1rem;
  }

  .content img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  .content h2,
  .content h3 {
    margin-top: 2rem;
  }

  .content p {
    margin: 1rem 0;
  }

  .content a {
    color: var(--accent);
  }
</style>
```

------

# 🧩 How to use it in a blog post page

Inside either site:

```
sites/<site>/src/pages/blog/[slug].astro
```

Use this:

```astro
---
import BlogPost from "../../../../shared/components/BlogPost.astro";
import { getEntry } from "astro:content";

const { slug } = Astro.params;
const post = await getEntry("blog", slug);
---

<BlogPost
  title={post.data.title}
  date={post.data.date}
  cover={post.data.cover}
  body={post.body}
/>
```

That’s it — the layout handles everything.

------

# 🟦 What this gives your friend

- A clean, readable blog layout
- Automatic date formatting
- Optional cover images
- Consistent typography
- Zero maintenance
- Works for both sites without duplication

It’s the kind of setup that makes writing feel inviting rather than fiddly.

------

Absolutely, Rich — here’s a **clean, modern blog index page** that works for *both* the art site and the counselling site. It automatically:

- pulls all blog posts from the `blog` collection
- sorts them newest → oldest
- shows optional cover images
- shows formatted dates
- shows excerpts (auto‑generated)
- links to the full post

Drop this into:

```
sites/<site>/src/pages/blog/index.astro
```

It uses the shared `Layout.astro` and works seamlessly with the content schemas and Decap CMS setup.

------

# 📝 **`/blog/index.astro` — Blog Index Page**

```astro
---
import Layout from "../../../../shared/components/Layout.astro";
import { getCollection } from "astro:content";

// Load all blog posts
const posts = await getCollection("blog");

// Sort newest → oldest
posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

// Helper: generate excerpt from body
function excerpt(body: string, length = 180) {
  const clean = body.replace(/[#>*_`]/g, "").trim();
  return clean.length > length ? clean.slice(0, length) + "…" : clean;
}
---

<Layout title="Blog">
  <h1>Blog</h1>

  <div class="posts">
    {posts.map((post) => (
      <a href={`/blog/${post.slug}/`} class="post-card">
        {post.data.cover && (
          <img
            src={post.data.cover}
            alt={post.data.title}
            class="cover"
            loading="lazy"
          />
        )}

        <div class="content">
          <h2>{post.data.title}</h2>

          <p class="date">
            {post.data.date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p class="excerpt">{excerpt(post.body)}</p>
        </div>
      </a>
    ))}
  </div>
</Layout>

<style>
  h1 {
    margin-bottom: 2rem;
  }

  .posts {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .post-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border-radius: 8px;
    overflow: hidden;
    background: #fafafa;
    border: 1px solid #eee;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .cover {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .content {
    padding: 1rem;
  }

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
  }

  .date {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .excerpt {
    color: #444;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

------

# 🟦 What this gives you

- A clean, modern blog index for both sites
- Automatic excerpts
- Optional cover images
- Responsive grid layout
- Zero maintenance
- Perfect alignment with Decap CMS

It’s the kind of page that makes even a small blog feel polished and intentional.

------

Here you go, Rich — a **clean, modern, production‑ready pagination component** that drops straight into your shared library and works for *both* sites’ blog indexes. It’s intentionally minimal, predictable, and easy to style, while still giving you the flexibility to scale once your friend has dozens of posts.

This fits naturally into the architecture we’ve built so far.

------

# 📄 `Pagination.astro` (shared component)

Place this in:

```
shared/components/Pagination.astro
---
interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // e.g. "/blog"
}

const { currentPage, totalPages, baseUrl } = Astro.props;

const prevPage = currentPage > 1 ? currentPage - 1 : null;
const nextPage = currentPage < totalPages ? currentPage + 1 : null;
---

<nav class="pagination">
  {prevPage && (
    <a href={`${baseUrl}/${prevPage === 1 ? "" : prevPage + "/"}`} class="prev">
      ← Newer posts
    </a>
  )}

  <span class="page-info">
    Page {currentPage} of {totalPages}
  </span>

  {nextPage && (
    <a href={`${baseUrl}/${nextPage}/`} class="next">
      Older posts →
    </a>
  )}
</nav>

<style>
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #ddd;
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    color: var(--accent);
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }

  .page-info {
    color: #666;
    font-size: 0.9rem;
  }
</style>
```

------

# 🧩 How to use it in your blog index

You’ll create paginated routes like:

```
sites/<site>/src/pages/blog/[page].astro
```

And then:

```astro
---
import Layout from "../../../../shared/components/Layout.astro";
import Pagination from "../../../../shared/components/Pagination.astro";
import { getCollection } from "astro:content";

const POSTS_PER_PAGE = 10;

const { page } = Astro.params;
const currentPage = Number(page) || 1;

const allPosts = await getCollection("blog");
allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

const start = (currentPage - 1) * POSTS_PER_PAGE;
const posts = allPosts.slice(start, start + POSTS_PER_PAGE);
---

<Layout title="Blog">
  <h1>Blog</h1>

  <!-- Render your post cards here -->
  <div class="posts">
    {posts.map((post) => (
      <a href={`/blog/${post.slug}/`} class="post-card">
        <h2>{post.data.title}</h2>
      </a>
    ))}
  </div>

  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    baseUrl="/blog"
  />
</Layout>
```

------

# 🟦 What this gives you

- Infinite scalability for both sites
- Clean URLs (`/blog/`, `/blog/2/`, `/blog/3/`)
- Shared styling and behaviour
- No duplication
- A friendly, predictable UX for readers
- Zero maintenance for your friend

It’s the kind of component that quietly does its job and never needs revisiting.

------

Absolutely, Rich — here’s a **clean, reusable `ListPosts` component** that keeps your blog index pages tiny and declarative. It handles:

- sorting
- excerpts
- optional cover images
- date formatting
- linking to each post
- responsive layout

Drop it into:

```
shared/components/ListPosts.astro
```

Then your `/blog/index.astro` becomes almost trivial.

------

# 📄 **`ListPosts.astro` — Shared Blog List Component**

```astro
---
import { getCollection } from "astro:content";

interface Props {
  limit?: number;        // optional: show only N posts
  baseUrl?: string;      // e.g. "/blog"
}

const { limit, baseUrl = "/blog" } = Astro.props;

// Load all posts
let posts = await getCollection("blog");

// Sort newest → oldest
posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

// Apply limit if provided
if (limit) {
  posts = posts.slice(0, limit);
}

// Helper: generate excerpt from body
function excerpt(body: string, length = 180) {
  const clean = body.replace(/[#>*_`]/g, "").trim();
  return clean.length > length ? clean.slice(0, length) + "…" : clean;
}
---

<div class="posts">
  {posts.map((post) => (
    <a href={`${baseUrl}/${post.slug}/`} class="post-card">
      {post.data.cover && (
        <img
          src={post.data.cover}
          alt={post.data.title}
          class="cover"
          loading="lazy"
        />
      )}

      <div class="content">
        <h2>{post.data.title}</h2>

        <p class="date">
          {post.data.date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <p class="excerpt">{excerpt(post.body)}</p>
      </div>
    </a>
  ))}
</div>

<style>
  .posts {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .post-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border-radius: 8px;
    overflow: hidden;
    background: #fafafa;
    border: 1px solid #eee;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .cover {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .content {
    padding: 1rem;
  }

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
  }

  .date {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .excerpt {
    color: #444;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

------

# 🧩 How to use it in `/blog/index.astro`

Your blog index becomes beautifully simple:

```astro
---
import Layout from "../../../../shared/components/Layout.astro";
import ListPosts from "../../../../shared/components/ListPosts.astro";
---

<Layout title="Blog">
  <h1>Blog</h1>
  <ListPosts baseUrl="/blog" />
</Layout>
```

That’s it — no sorting, no excerpt logic, no layout code.
 Just a declarative component call.

------

# 🟦 Why this helps your workflow

- Both sites share the same blog list UI
- You avoid duplication
- You can tweak the design in one place
- Your friend gets a clean, consistent reading experience
- The index page stays tiny and readable

It’s the kind of modularity you naturally gravitate toward — clean, intentional, and future‑proof.

------

Absolutely, Rich — here’s a **clean, reusable `ListPaintings` component** that mirrors the elegance of `ListPosts` but is tailored for the art site. It gives you:

- automatic loading of all paintings
- sorting newest → oldest
- optional limit (e.g., “show 6 featured paintings on the homepage”)
- responsive grid layout
- “Sold” badge
- optional metadata (medium, dimensions, price)
- links to the painting detail pages

Drop it into:

```
shared/components/ListPaintings.astro
```

------

# 🎨 **`ListPaintings.astro` — Shared Painting List Component**

```astro
---
import { getCollection } from "astro:content";

interface Props {
  limit?: number;        // optional: show only N paintings
  featuredOnly?: boolean; // optional: filter by featured flag
  baseUrl?: string;      // e.g. "/paintings"
}

const { limit, featuredOnly = false, baseUrl = "/paintings" } = Astro.props;

// Load all paintings
let paintings = await getCollection("paintings");

// Filter featured if requested
if (featuredOnly) {
  paintings = paintings.filter((p) => p.data.featured);
}

// Sort newest → oldest
paintings.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

// Apply limit if provided
if (limit) {
  paintings = paintings.slice(0, limit);
}
---

<div class="gallery">
  {paintings.map((item) => (
    <a href={`${baseUrl}/${item.slug}/`} class="card">
      <img
        src={item.data.image}
        alt={item.data.title}
        class="cover"
        loading="lazy"
      />

      <div class="info">
        <h3>{item.data.title}</h3>

        {item.data.medium && <p class="meta">{item.data.medium}</p>}
        {item.data.dimensions && <p class="meta">{item.data.dimensions}</p>}

        {item.data.sold ? (
          <p class="sold">Sold</p>
        ) : (
          item.data.price && <p class="price">{item.data.price}</p>
        )}
      </div>
    </a>
  ))}
</div>

<style>
  .gallery {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .card {
    display: block;
    text-decoration: none;
    color: inherit;
    border-radius: 8px;
    overflow: hidden;
    background: #fafafa;
    border: 1px solid #eee;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .cover {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
  }

  .info {
    padding: 1rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  .meta {
    margin: 0.2rem 0;
    color: #666;
    font-size: 0.9rem;
  }

  .price {
    margin-top: 0.5rem;
    font-weight: bold;
    color: var(--accent);
  }

  .sold {
    margin-top: 0.5rem;
    font-weight: bold;
    color: #b33;
  }
</style>
```

------

# 🧩 How to use it in the art site

### **Homepage (show featured paintings)**

```astro
---
import Layout from "../../../shared/components/Layout.astro";
import ListPaintings from "../../../shared/components/ListPaintings.astro";
---

<Layout title="Art Portfolio">
  <h1>Featured Paintings</h1>
  <ListPaintings featuredOnly={true} limit={6} />
</Layout>
```

### **Paintings index page**

```
sites/art/src/pages/paintings/index.astro
---
import Layout from "../../../../shared/components/Layout.astro";
import ListPaintings from "../../../../shared/components/ListPaintings.astro";
---

<Layout title="All Paintings">
  <h1>All Paintings</h1>
  <ListPaintings />
</Layout>
```

------

# 🟦 Why this component is useful

- You avoid duplicating gallery logic
- You can show curated selections (featured)
- You can show “latest paintings” anywhere
- You can build homepage sections effortlessly
- It keeps your codebase modular and elegant
- Your friend never needs to think about layout

It’s the kind of component that makes the whole system feel like a well‑designed product rather than a pile of templates.

------

Absolutely, Rich — here’s a **clean, elegant `SiteSwitcher` component** that lets your friend’s two sites link to each other gracefully. It’s intentionally minimal, avoids visual noise, and fits the aesthetic of the shared design system you’ve been building.

It works beautifully for:

- “Visit my art site” on the counselling site
- “Visit my counselling site” on the art site
- A subtle cross‑link in the header or footer
- A standalone block on the homepage

Drop it into:

```
shared/components/SiteSwitcher.astro
```

------

# 🔀 **`SiteSwitcher.astro` — Shared Cross‑Site Switcher**

```astro
---
interface Props {
  label: string;   // e.g. "Visit my art site"
  url: string;     // e.g. "https://art.mysite.com"
}

const { label, url } = Astro.props;
---

<div class="switcher">
  <a href={url}>{label}</a>
</div>

<style>
  .switcher {
    margin: 2rem 0;
    text-align: center;
  }

  a {
    display: inline-block;
    padding: 0.75rem 1.25rem;
    border-radius: 6px;
    background: var(--accent);
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.15s ease;
  }

  a:hover {
    background: #3a5a85;
  }
</style>
```

------

# 🧩 How to use it on the **art site**

Inside:

```
sites/art/src/pages/index.astro
---
import Layout from "../../../shared/components/Layout.astro";
import ListPaintings from "../../../shared/components/ListPaintings.astro";
import SiteSwitcher from "../../../shared/components/SiteSwitcher.astro";
---

<Layout title="Art Portfolio">
  <h1>Art Portfolio</h1>

  <ListPaintings featuredOnly={true} limit={6} />

  <SiteSwitcher
    label="Visit my counselling site"
    url="https://counselling.mysite.com"
  />
</Layout>
```

------

# 🧩 How to use it on the **counselling site**

Inside:

```
sites/counselling/src/pages/index.astro
---
import Layout from "../../../shared/components/Layout.astro";
import ListPosts from "../../../shared/components/ListPosts.astro";
import SiteSwitcher from "../../../shared/components/SiteSwitcher.astro";
---

<Layout title="Counselling">
  <h1>Welcome</h1>

  <p>Supporting your wellbeing with compassion and clarity.</p>

  <ListPosts limit={3} baseUrl="/blog" />

  <SiteSwitcher
    label="Visit my art site"
    url="https://art.mysite.com"
  />
</Layout>
```

------

# 🟦 Why this works well for your friend

- It’s visually gentle and non‑intrusive
- It reinforces her dual professional identity
- It keeps both sites connected without clutter
- It’s easy to customise (button, link, subtle text)
- It lives in the shared library, so you maintain it once

It’s the kind of small detail that makes the whole ecosystem feel intentional and cohesive.



Absolutely, Rich — here’s a **clean, reusable SEO metadata helper** that fits perfectly into your shared design system. It keeps both sites consistent, avoids duplication, and gives you a single place to manage:

- `<title>`
- `<meta name="description">`
- OpenGraph tags
- Twitter cards
- Canonical URLs
- Optional cover images

It’s intentionally minimal but extensible — exactly the kind of modular building block you prefer.

Drop this into:

```
shared/components/Seo.astro
```

------

# 🔍 **`Seo.astro` — Shared SEO Metadata Component**

```astro
---
interface Props {
  title?: string;
  description?: string;
  url?: string;      // full canonical URL
  cover?: string;    // og:image
}

const {
  title = "Site Title",
  description = "A modern Astro site",
  url,
  cover,
} = Astro.props;
---

<>
  <title>{title}</title>
  <meta name="description" content={description} />

  {url && <link rel="canonical" href={url} />}

  <!-- OpenGraph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  {url && <meta property="og:url" content={url} />}
  {cover && <meta property="og:image" content={cover} />}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  {cover && <meta name="twitter:image" content={cover} />}
</>
```

------

# 🧩 How to integrate it into `Layout.astro`

Inside your shared layout, just drop this in the `<head>`:

```astro
---
import Seo from "./Seo.astro";

interface Props {
  title?: string;
  description?: string;
  cover?: string;
  url?: string;
}

const { title, description, cover, url } = Astro.props;
---

<html lang="en">
  <head>
    <Seo
      title={title}
      description={description}
      cover={cover}
      url={url}
    />
    <link rel="stylesheet" href="/styles/base.css" />
  </head>
```

This keeps your layout clean and your metadata consistent.

------

# 🟦 How to use it in a page

Example for a blog post:

```astro
<Layout
  title={post.data.title}
  description={excerpt(post.body)}
  cover={post.data.cover}
  url={`https://art.mysite.com/blog/${post.slug}/`}
>
  ...
</Layout>
```

Example for a painting detail page:

```astro
<Layout
  title={painting.data.title}
  description={painting.data.medium || "Artwork"}
  cover={painting.data.image}
  url={`https://art.mysite.com/paintings/${painting.slug}/`}
>
  ...
</Layout>
```

------

# 🟩 Why this helps your whole system

- Both sites share the same SEO logic
- You avoid duplication across dozens of pages
- Social previews look consistent
- You can tweak metadata in one place
- It scales effortlessly as the sites grow

It’s the kind of small, elegant abstraction that keeps the whole architecture feeling intentional and maintainable.











Here you go, Rich — a **clean, elegant, shared `Breadcrumbs` component** that works beautifully for both sites. It’s intentionally minimal, accessible, and easy to drop into painting pages, blog posts, or any nested route.

It fits your design philosophy: modular, predictable, and unobtrusive.

------

# 🧭 `Breadcrumbs.astro` — Shared Component

Place this in:

```
shared/components/Breadcrumbs.astro
---
interface Crumb {
  label: string;
  url?: string; // optional — last crumb has no URL
}

interface Props {
  items: Crumb[];
}

const { items } = Astro.props;
---

<nav aria-label="Breadcrumb" class="breadcrumbs">
  <ol>
    {items.map((item, i) => (
      <li>
        {item.url && i < items.length - 1 ? (
          <a href={item.url}>{item.label}</a>
        ) : (
          <span class="current">{item.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>

<style>
  .breadcrumbs {
    margin: 1rem 0 2rem;
    font-size: 0.9rem;
    color: #666;
  }

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  li::after {
    content: "/";
    margin-left: 0.5rem;
    color: #aaa;
  }

  li:last-child::after {
    content: "";
  }

  a {
    text-decoration: none;
    color: var(--accent);
  }

  a:hover {
    text-decoration: underline;
  }

  .current {
    color: #333;
    font-weight: 500;
  }
</style>
```

------

# 🧩 How to use it on a **painting detail page**

Inside:

```
sites/art/src/pages/paintings/[slug].astro
```

Add:

```astro
---
import Breadcrumbs from "../../../../shared/components/Breadcrumbs.astro";
---

<Breadcrumbs
  items={[
    { label: "Home", url: "/" },
    { label: "Paintings", url: "/paintings" },
    { label: painting.data.title }
  ]}
/>
```

------

# 🧩 How to use it on a **blog post page**

Inside:

```
sites/<site>/src/pages/blog/[slug].astro
---
import Breadcrumbs from "../../../../shared/components/Breadcrumbs.astro";
---

<Breadcrumbs
  items={[
    { label: "Home", url: "/" },
    { label: "Blog", url: "/blog" },
    { label: post.data.title }
  ]}
/>
```

------

# 🟦 Why this works well for your system

- It’s shared across both sites
- It’s visually subtle and doesn’t clutter the layout
- It improves navigation for deep pages
- It’s fully accessible (`aria-label="Breadcrumb"`)
- It’s easy to extend (icons, separators, etc.)
- It keeps your page files clean and declarative

It’s another small piece that makes the whole architecture feel cohesive and thoughtfully engineered.









Here you go, Rich — a **clean, modular `TagList` component** that lets both sites use tags elegantly. It’s designed to be:

- shared across both sites
- unobtrusive
- accessible
- easy to style
- compatible with tag archive pages (if you add them later)

It fits perfectly into the architecture you’ve been building — another small, intentional building block that keeps everything cohesive.

Drop it into:

```
shared/components/TagList.astro
```

------

# 🏷️ **`TagList.astro` — Shared Tag List Component**

```astro
---
interface Props {
  tags: string[];
  baseUrl?: string; // e.g. "/tags"
}

const { tags, baseUrl = "/tags" } = Astro.props;
---

{tags && tags.length > 0 && (
  <ul class="tag-list">
    {tags.map((tag) => (
      <li>
        <a href={`${baseUrl}/${tag.toLowerCase()}/`}>{tag}</a>
      </li>
    ))}
  </ul>
)}

<style>
  .tag-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag-list li {
    margin: 0;
  }

  .tag-list a {
    display: inline-block;
    padding: 0.25rem 0.6rem;
    font-size: 0.85rem;
    border-radius: 4px;
    background: #eee;
    color: #333;
    text-decoration: none;
    transition: background 0.15s ease;
  }

  .tag-list a:hover {
    background: #ddd;
  }
</style>
```

------

# 🧩 How to use it in a blog post page

Inside:

```
sites/<site>/src/pages/blog/[slug].astro
---
import TagList from "../../../../shared/components/TagList.astro";
---

<TagList tags={post.data.tags} baseUrl="/blog/tags" />
```

------

# 🧩 How to use it in the blog index

Inside:

```
sites/<site>/src/pages/blog/index.astro
<TagList tags={[...new Set(posts.flatMap((p) => p.data.tags || []))]} />
```

This automatically collects all tags across posts.

------

# 🟦 Updating your content schema

To support tags, update the blog schema in:

```
src/content/config.ts
tags: z.array(z.string()).optional(),
```

And update Decap CMS:

```yaml
- { label: "Tags", name: "tags", widget: "list", required: false }
```

------

# 🟩 Why this fits your system so well

- It’s shared across both sites
- It keeps your blog pages clean and declarative
- It’s easy for your friend to use in Decap CMS
- It scales naturally into tag archive pages
- It keeps your design system cohesive

It’s another small piece that makes the whole architecture feel like a well‑designed product rather than a pile of templates.







Absolutely, Rich — here’s a **clean, modular Tag Archive page template** that fits perfectly into your two‑site Astro setup. It works with the `TagList` component we just built and gives you automatic archive pages like:

```
/blog/tags/anxiety/
/blog/tags/painting/
/blog/tags/exhibitions/
```

It’s intentionally minimal, predictable, and easy to extend — exactly the kind of structure you gravitate toward.

------

# 🏷️ **Tag Archive Page Template**

Place this in:

```
sites/<site>/src/pages/blog/tags/[tag].astro
---
import Layout from "../../../../../shared/components/Layout.astro";
import TagList from "../../../../../shared/components/TagList.astro";
import { getCollection } from "astro:content";

const { tag } = Astro.params;

// Load all posts
const allPosts = await getCollection("blog");

// Filter posts that include this tag
const posts = allPosts.filter((post) =>
  (post.data.tags || []).map((t) => t.toLowerCase()).includes(tag.toLowerCase())
);

// Sort newest → oldest
posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<Layout title={`Posts tagged "${tag}"`}>
  <h1>Posts tagged “{tag}”</h1>

  <TagList tags={[tag]} baseUrl="/blog/tags" />

  {posts.length === 0 ? (
    <p>No posts found for this tag.</p>
  ) : (
    <div class="posts">
      {posts.map((post) => (
        <a href={`/blog/${post.slug}/`} class="post-card">
          {post.data.cover && (
            <img
              src={post.data.cover}
              alt={post.data.title}
              class="cover"
              loading="lazy"
            />
          )}

          <div class="content">
            <h2>{post.data.title}</h2>

            <p class="date">
              {post.data.date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <p class="excerpt">
              {post.body.replace(/[#>*_`]/g, "").slice(0, 180)}…
            </p>
          </div>
        </a>
      ))}
    </div>
  )}
</Layout>

<style>
  .posts {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    margin-top: 2rem;
  }

  .post-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border-radius: 8px;
    overflow: hidden;
    background: #fafafa;
    border: 1px solid #eee;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .cover {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .content {
    padding: 1rem;
  }

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
  }

  .date {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .excerpt {
    color: #444;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

------

# 🧩 What this gives you

- Automatic tag archive pages
- Clean URLs
- Shared styling with the rest of the system
- Zero duplication
- A single place to adjust tag behaviour
- A predictable editing experience for your friend

It’s the kind of modularity that keeps the whole architecture feeling intentional and future‑proof.









Absolutely, Rich — here’s a **clean, elegant Tag Index page** that lists all tags alphabetically, shows post counts, and links to each tag archive page. It fits perfectly into the modular system you’ve been building: shared components, clean content schemas, and predictable routing.

Drop this into:

```
sites/<site>/src/pages/blog/tags/index.astro
```

------

# 🏷️ **Tag Index Page — `/blog/tags/index.astro`**

```astro
---
import Layout from "../../../../../shared/components/Layout.astro";
import { getCollection } from "astro:content";

// Load all posts
const posts = await getCollection("blog");

// Collect all tags
const tagMap = new Map<string, number>();

for (const post of posts) {
  const tags = post.data.tags || [];
  for (const tag of tags) {
    const key = tag.toLowerCase();
    tagMap.set(key, (tagMap.get(key) || 0) + 1);
  }
}

// Convert to sorted array
const tags = [...tagMap.entries()]
  .map(([tag, count]) => ({ tag, count }))
  .sort((a, b) => a.tag.localeCompare(b.tag));
---

<Layout title="Tags">
  <h1>Tags</h1>

  <ul class="tag-list">
    {tags.map(({ tag, count }) => (
      <li>
        <a href={`/blog/tags/${tag}/`}>
          {tag} <span class="count">({count})</span>
        </a>
      </li>
    ))}
  </ul>
</Layout>

<style>
  .tag-list {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .tag-list li {
    margin: 0;
  }

  .tag-list a {
    display: block;
    padding: 0.5rem 0.75rem;
    background: #f5f5f5;
    border-radius: 6px;
    text-decoration: none;
    color: #333;
    transition: background 0.15s ease;
  }

  .tag-list a:hover {
    background: #e8e8e8;
  }

  .count {
    color: #666;
    font-size: 0.85rem;
  }
</style>
```

------

# 🧩 What this gives you

- A clean alphabetical list of all tags
- Post counts for each tag
- Automatic linking to tag archive pages
- Shared styling with the rest of the system
- Zero maintenance for your friend
- A predictable, scalable structure

It’s the kind of page that quietly elevates the whole blog experience.







Absolutely, Rich — here’s a **clean, modern, zero‑dependency client‑side search component** that works across both sites. It’s intentionally lightweight, fast, and easy to drop into your shared library. No external libraries, no build‑time plugins — just a small, elegant search index and a reactive UI.

It fits beautifully into the modular architecture you’ve been building.

------

# 🔎 **Shared Search Component (`Search.astro`)**

Place this in:

```
shared/components/Search.astro
```

This component:

- loads a small JSON search index
- filters results instantly as the user types
- works for blog posts, paintings, or any content type
- is fully client‑side
- is framework‑agnostic (pure Astro + vanilla JS)
- is accessible and keyboard‑friendly

```astro
---
interface SearchItem {
  title: string;
  url: string;
  body: string;
}

interface Props {
  indexUrl: string; // e.g. "/search-index.json"
  placeholder?: string;
}

const { indexUrl, placeholder = "Search…" } = Astro.props;
---

<div class="search">
  <input
    type="search"
    id="search-input"
    placeholder={placeholder}
    autocomplete="off"
  />

  <ul id="search-results"></ul>
</div>

<script>
  let index = [];

  async function loadIndex() {
    const res = await fetch("{{indexUrl}}".replace("{{indexUrl}}", "{{indexUrl}}"));
    index = await res.json();
  }

  loadIndex();

  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    results.innerHTML = "";

    if (!q) return;

    const matches = index.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.body.toLowerCase().includes(q)
    );

    for (const m of matches.slice(0, 10)) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = m.url;
      a.textContent = m.title;
      li.appendChild(a);
      results.appendChild(li);
    }
  });
</script>

<style>
  .search {
    margin: 2rem 0;
  }

  input[type="search"] {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  #search-results {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0;
  }

  #search-results li {
    margin: 0.5rem 0;
  }

  #search-results a {
    text-decoration: none;
    color: var(--accent);
  }

  #search-results a:hover {
    text-decoration: underline;
  }
</style>
```

------

# 📦 **Search Index Generator (`search-index.json`)**

Place this file in each site’s `public/` folder:

```
sites/<site>/public/search-index.json
```

You generate it at build time using Astro’s `getCollection` API.

Create:

```
sites/<site>/src/scripts/generateSearchIndex.ts
import { getCollection } from "astro:content";
import fs from "node:fs";
import path from "node:path";

export async function generateSearchIndex() {
  const blog = await getCollection("blog");
  const pages = await getCollection("pages").catch(() => []);
  const paintings = await getCollection("paintings").catch(() => []);

  const items = [...blog, ...pages, ...paintings].map((entry) => ({
    title: entry.data.title,
    url: entry.slug.startsWith("/")
      ? entry.slug
      : `/${entry.collection}/${entry.slug}/`,
    body: entry.body.replace(/[#>*_`]/g, "").slice(0, 500),
  }));

  const out = path.join(process.cwd(), "public", "search-index.json");
  fs.writeFileSync(out, JSON.stringify(items, null, 2));
}
```

Then call it in `astro.config.mjs`:

```js
import { generateSearchIndex } from "./src/scripts/generateSearchIndex.js";

export default {
  hooks: {
    "astro:build:done": async () => {
      await generateSearchIndex();
    },
  },
};
```

------

# 🧩 How to use the search component in a page

Example:

```astro
---
import Layout from "../../../shared/components/Layout.astro";
import Search from "../../../shared/components/Search.astro";
---

<Layout title="Search">
  <h1>Search</h1>
  <Search indexUrl="/search-index.json" />
</Layout>
```

------

# 🟦 Why this fits your system so well

- **Shared** across both sites
- **Zero dependencies**
- **Fast** (tiny JSON index)
- **Modular** (drop‑in component)
- **Predictable** (no magic, no plugins)
- **Friendly** for your friend — she gets instant search without touching code

It’s the kind of component that quietly elevates the whole experience.

If you want, I can sketch a **shared “Command Palette”** (like VS Code’s ⌘K) that gives keyboard‑driven navigation across both sites.







