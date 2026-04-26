import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react(), mdx()],
  site: 'https://adhyyannarang.com',
  base: '/writing',
  vite: {
    plugins: [tailwindcss()],
  },
});
