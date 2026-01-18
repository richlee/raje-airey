I can absolutely give you the **full Markdown document**, Rich — clean, structured, and ready for you to save as a `.md` file on your side. I can’t generate downloadable files directly, but you can copy/paste the text below into any editor (VS Code, Obsidian, GitHub, etc.) and save it as:

```
design-brief.md
```

Here’s the complete Markdown version.

------

# **📘 DESIGN BRIEF — Raje Airey Dual‑Site Ecosystem**

*A modular, Divi‑inspired Astro system for Art + Counselling*

------

## **1. Project Overview**

Raje Airey needs two modern, fast, low‑maintenance websites:

1. **Art Portfolio** — showcasing paintings, exhibitions, and creative work
2. **Counselling Practice** — presenting services, writing, and wellbeing resources

Both sites must feel visually connected, warm, and approachable — reflecting her personality and professional identity — while remaining technically simple for her to update.

The system is built using:

- **Astro** (static, fast, maintainable)
- **Shared component library** (one design system, two sites)
- **Decap CMS** (friendly editing experience)
- **Cloudflare Pages** (zero‑maintenance hosting)

The aesthetic is **inspired by Divi** (her current theme), but implemented cleanly and natively — no WordPress, no Divi code, no licensing issues.

------

## **2. Design Goals**

### **2.1 Visual Style (Divi‑Inspired)**

The design language should evoke the feel of Divi without copying it:

- Soft rounded corners
- Pastel accent colours
- Friendly sans‑serif typography (Poppins / Lato)
- Large hero sections with centred text
- Card‑based layouts with generous spacing
- Subtle shadows and hover animations
- Warm, approachable tone
- Clean, modern, minimal UI

### **2.2 Tone & Personality**

- Calm
- Warm
- Professional
- Creative
- Human‑centred
- Non‑technical

------

## **3. Technical Architecture**

### **3.1 Two Sites, One System**

```
/sites/art
/sites/counselling
/shared/components
/shared/styles
/shared/layout
```

### **3.2 Shared Component Library**

All core UI elements live in `/shared/components`:

- Layout
- SEO metadata
- Breadcrumbs
- SiteSwitcher
- ListPosts
- ListPaintings
- BlogPost
- Gallery
- Pagination
- TagList
- Search

This ensures:

- one design system
- one place to maintain
- consistent UX across both sites

### **3.3 Content Architecture**

Using `astro:content`:

**Art site**

- `paintings` collection
- `pages` collection
- optional `blog`

**Counselling site**

- `blog` collection
- `pages` collection

### **3.4 CMS Workflow (Decap CMS)**

Raje edits:

- paintings
- blog posts
- pages
- tags
- featured flags
- images

All via a simple browser interface.

------

## **4. Aesthetic System (Theme Layer)**

### **4.1 CSS Variables**

```css
:root {
  --radius: 12px;
  --shadow: 0 8px 24px rgba(0,0,0,0.08);
  --accent: #6c63ff;
  --accent-light: #f3f1ff;
  --font-body: "Poppins", "Lato", system-ui, sans-serif;
  --font-heading: "Poppins", system-ui, sans-serif;
}
```

### **4.2 Buttons**

- Rounded
- Shadowed
- Gentle hover lift

### **4.3 Cards**

- Rounded corners
- Soft shadows
- Smooth hover transitions

### **4.4 Hero Sections**

- Large vertical spacing
- Soft background
- Centred text

### **4.5 Typography**

- Poppins or Lato
- Large headings
- Comfortable line height

------

## **5. Page Types**

### **5.1 Art Site**

- Homepage (featured paintings + site switcher)
- Paintings index
- Painting detail pages
- Blog (optional)
- About
- Contact

### **5.2 Counselling Site**

- Homepage (intro + latest posts + site switcher)
- Blog index
- Blog posts
- Tag index
- Tag archive pages
- About
- Services
- Contact

------

## **6. Shared Components (Detailed)**

### **6.1 Layout**

- Wraps all pages
- Injects SEO metadata
- Provides global styles
- Optional hero image

### **6.2 SEO**

- Title
- Description
- Canonical URL
- OpenGraph
- Twitter cards

### **6.3 Breadcrumbs**

- Lightweight
- Accessible
- Works for blog + paintings

### **6.4 ListPosts**

- Responsive grid
- Optional cover images
- Excerpts
- Dates

### **6.5 ListPaintings**

- Responsive gallery
- Featured filtering
- Sold badge
- Medium / dimensions / price

### **6.6 BlogPost**

- Clean typography
- Optional cover image
- Optional date

### **6.7 Pagination**

- Simple previous/next
- Clean URLs

### **6.8 TagList**

- Clickable tags
- Works with tag archive pages

### **6.9 Search**

- Client‑side
- Zero dependencies
- Uses generated JSON index

### **6.10 SiteSwitcher**

- Links art ↔ counselling
- Soft button style

------

## **7. Editing Workflow (for Raje)**

### **7.1 Paintings**

- Upload image
- Add title, date, medium, dimensions
- Mark as sold
- Optional price
- Optional featured flag

### **7.2 Blog Posts**

- Title
- Cover image
- Date
- Tags
- Body (Markdown)

### **7.3 Pages**

- Simple Markdown content

Everything deploys automatically.

------

## **8. Hosting & Deployment**

### **8.1 Cloudflare Pages**

- Fast
- Secure
- Zero maintenance
- Automatic builds on commit

### **8.2 GitHub Repo**

- Single monorepo
- Two sites + shared library

------

## **9. Performance & Accessibility**

- Astro’s partial hydration ensures fast loads
- Images optimised via `<img loading="lazy">`
- Semantic HTML
- Accessible navigation
- Keyboard‑friendly search

------

## **10. Future Enhancements**

- Command palette (⌘K)
- Light/dark theme toggle
- Exhibition timeline
- Newsletter integration
- Client testimonials
- Painting categories

------

# **Summary**

This design brief captures the entire system:

- Two sites
- One shared design system
- Divi‑inspired aesthetic
- Astro + Decap CMS
- Modular components
- Fast, maintainable, future‑proof

It’s everything she needs, without the weight of WordPress or Divi — and everything you need to keep the system elegant and sustainable.

------

If you want, I can also prepare a **README.md version** tailored for your GitHub repo so the whole architecture is documented right where it lives.