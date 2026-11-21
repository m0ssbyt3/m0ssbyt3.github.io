import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

// GitHub Pages friendly: the deploy workflow passes SITE_URL / SITE_BASE.
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const configuredBase = process.env.SITE_BASE ?? (repository && !repository.endsWith('.github.io') ? `/${repository}` : '/');
const base = configuredBase || '/';
const basePrefix = base === '/' ? '' : base.replace(/\/$/, '');

// Markdown is authored with root-relative URLs (/images/..., /writeups/...) so it also resolves
// inside the admin preview. On a project page the built site lives under a base path, so prefix
// those URLs at build time.
function baseInternalUrls() {
  const prefix = (value) => (value.startsWith('/') && !value.startsWith('//') ? `${basePrefix}${value}` : value);
  return (tree) => {
    const visit = (node) => {
      if (node?.tagName === 'img' && typeof node.properties?.src === 'string') {
        node.properties.src = prefix(node.properties.src);
        node.properties.loading ??= 'lazy';
      }
      if (node?.tagName === 'a' && typeof node.properties?.href === 'string') {
        node.properties.href = prefix(node.properties.href);
      }
      if (Array.isArray(node?.children)) node.children.forEach(visit);
    };
    visit(tree);
  };
}

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://mossbyte.dev',
  base,
  output: 'static',
  devToolbar: { enabled: false },
  server: { port: 6767, host: false },
  markdown: {
    shikiConfig: { theme: 'vesper', wrap: true },
    processor: unified({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, baseInternalUrls] })
  }
});
