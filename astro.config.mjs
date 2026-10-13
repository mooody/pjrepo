import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import settings from './src/data/settings.json' with { type: 'json' };
export default defineConfig({
  site: process.env.SITE_URL || settings.url,
  integrations: [sitemap()],
  output: 'static',
});
