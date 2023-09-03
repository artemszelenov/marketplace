import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind";

// пока не используем, нужен домен
// import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), tailwind()]
});