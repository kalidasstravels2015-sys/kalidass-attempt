import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kalidasstravels.in',
  integrations: [
    tailwind(),
    react(),
    sitemap(),
  ],
});
