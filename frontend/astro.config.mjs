import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

// пока не используем, нужен домен
// import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000
  },
  integrations: [tailwind(), prefetch(), svelte()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});