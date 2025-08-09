// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: 'https://meatymushrooms.in', // required for sitemap URLs
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
