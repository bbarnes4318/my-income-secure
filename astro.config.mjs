import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Every page is prerendered and ships as a static file. The adapter exists for
// the single server route — src/pages/api/checkout.js, which opts in with
// `export const prerender = false` — and on Vercel that becomes one serverless
// function. Nothing else runs on a server.
//
// `trailingSlash: 'always'` applies to API routes as well as pages, so the
// endpoint lives at /api/checkout/ WITH the slash. lib/checkout.js posts to
// exactly that. Do not change one without the other; this has broken before.
export default defineConfig({
  site: 'https://www.myincomesecure.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  adapter: vercel(),
  // Off so it stops showing up in local screenshots — it's dev-only tooling
  // and was never going to ship in the production build either way.
  devToolbar: { enabled: false },
});
