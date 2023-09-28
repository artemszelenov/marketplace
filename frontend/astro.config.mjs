import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';

// пока не используем, нужен домен
// import sitemap from "@astrojs/sitemap"

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000
  },
  integrations: [tailwind(), prefetch(), solidJs()]
});