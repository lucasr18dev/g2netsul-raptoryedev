// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // URL final do site do seu cliente (ou domínio temporário)
  site: 'https://lucasr18dev.github.io',
  base: '/g2netsul-raptoryedev',
  
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap()],
});