// @ts-check
import { defineConfig } from 'astro/config';

// For GitHub Pages at https://pankajkmr036.github.io/ruca-nails/
// If you move to a custom domain (e.g. rucanails.in): set site to that URL and base to '/'.
export default defineConfig({
  site: 'https://pankajkmr036.github.io',
  base: '/ruca-nails',
  trailingSlash: 'ignore',
});
