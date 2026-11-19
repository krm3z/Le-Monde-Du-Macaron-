import { defineConfig } from 'astro/config';
import boutique from './data/boutique.json' with { type: 'json' };

// Site 100 % statique (dossier de sortie : dist/), compatible Cloudflare Pages.
export default defineConfig({
  site: boutique.site_url,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
