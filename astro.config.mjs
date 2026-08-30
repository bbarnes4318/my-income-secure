import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Pages stay static and prerendered. The node adapter exists for the single
// server route, src/pages/api/checkout.js, which opts in with
// `export const prerender = false`. Deployed as a standalone container.
export default defineConfig({
  site: 'https://www.myincomesecure.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  adapter: node({ mode: 'standalone' }),
});
