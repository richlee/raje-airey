import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rajeairey.co.uk',
  integrations: [sitemap()],
  build: {
    // Generate clean URLs without .html extension
    format: 'directory',
  },
});
