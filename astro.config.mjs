import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import compress from '@playform/compress';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  site: 'https://kalidasstravels.in',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-IN',
          ta: 'ta-IN',
        },
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    compress({
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
          removeComments: true,
          collapseWhitespace: true,
        }
      }
    }),
  ],
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Kalidass Travels',
          short_name: 'Kalidass',
          description: 'Premium Travel Experience in South India',
          theme_color: '#4f46e5',
          icons: [
            {
              src: '/images/logo.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/images/logo.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
          maximumFileSizeToCacheInBytes: 5000000,
        }
      })
    ]
  }
});
