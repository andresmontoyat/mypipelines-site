import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://mypipelines.andresmontoyat.co',
  integrations: [
    expressiveCode({
      themes: ['dracula'],
      plugins: [pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: false,
        overridesByLang: { 'bash,sh,zsh': { showLineNumbers: false, wrap: false } },
      },
    }),
    mdx(),
    pagefind(),
    sitemap(),
  ],
  vite: { plugins: [tailwindcss()] },
});
