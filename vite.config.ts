import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin, type ViteDevServer } from 'vite';

import { caseStudies as buildCaseStudies } from './src/data/caseStudies';
import { SITE_URL } from './src/data/site';
import type { CaseStudy } from './src/types/portfolio';

const CATALOG_ID = 'virtual:case-study-catalog';
const RESOLVED_CATALOG_ID = `\0${CATALOG_ID}`;
const CASE_STUDY_DIR = fileURLToPath(new URL('./src/data/caseStudies/', import.meta.url)).replace(/\\/g, '/');

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
  sizedImage?: boolean;
}

function catalogOf(studies: CaseStudy[]) {
  return studies.map((study) => ({
    slug: study.slug,
    title: study.title,
    screens: study.gallery.length,
  }));
}

function routesOf(studies: CaseStudy[]): RouteMeta[] {
  return [
    {
      path: '/projects',
      title: 'Projects — Dicky Maulana',
      description:
        'Every project, not only the highlights: warehouse platforms, ERP and tax integrations, field apps, and things built for myself — each with what it does and what I contributed.',
    },
    {
      path: '/experience',
      title: 'The journey — Dicky Maulana',
      description:
        'From automation bots to the architecture behind a microservices platform: the roles, the systems, and what each chapter taught.',
    },
    ...studies.map((study) => {
      const card = `/og/${study.slug}.jpg`;
      const cover = study.gallery.find((shot) => shot.shape === 'wide') ?? study.gallery[0];
      const hasCard = existsSync(fileURLToPath(new URL(`./public${card}`, import.meta.url)));

      return {
        path: `/projects/${study.slug}`,
        title: `${study.title} — Dicky Maulana`,
        description: study.lede,
        image: hasCard ? `${SITE_URL}${card}` : cover ? `${SITE_URL}${cover.src}` : undefined,
        sizedImage: hasCard,
      };
    }),
  ];
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setMeta(html: string, attr: 'name' | 'property', key: string, value: string): string {
  const pattern = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

function renderRoute(html: string, route: RouteMeta): string {
  const url = `${SITE_URL}${route.path}`;
  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(route.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);

  out = setMeta(out, 'name', 'description', route.description);
  out = setMeta(out, 'property', 'og:url', url);
  out = setMeta(out, 'property', 'og:title', route.title);
  out = setMeta(out, 'property', 'og:description', route.description);
  out = setMeta(out, 'name', 'twitter:title', route.title);
  out = setMeta(out, 'name', 'twitter:description', route.description);

  if (route.image) {
    out = setMeta(out, 'property', 'og:image', route.image);
    out = setMeta(out, 'name', 'twitter:image', route.image);
    out = setMeta(out, 'property', 'og:image:alt', route.title);
    if (!route.sizedImage) out = out.replace(/\s*<meta property="og:image:(width|height)" content="\d+" \/>/g, '');
  }

  return out;
}

function portfolioPages(): Plugin {
  let server: ViteDevServer | undefined;

  return {
    name: 'portfolio-pages',
    configureServer(devServer) {
      server = devServer;
    },
    resolveId(id) {
      return id === CATALOG_ID ? RESOLVED_CATALOG_ID : undefined;
    },
    async load(id) {
      if (id !== RESOLVED_CATALOG_ID) return undefined;

      const studies = server
        ? ((await server.ssrLoadModule('/src/data/caseStudies/index.ts')) as { caseStudies: CaseStudy[] }).caseStudies
        : buildCaseStudies;

      return `export default ${JSON.stringify(catalogOf(studies))};`;
    },
    handleHotUpdate({ file, server: devServer }) {
      if (!file.replace(/\\/g, '/').startsWith(CASE_STUDY_DIR)) return;

      const catalog = devServer.moduleGraph.getModuleById(RESOLVED_CATALOG_ID);
      if (catalog) devServer.moduleGraph.invalidateModule(catalog);
      devServer.ws.send({ type: 'full-reload' });
    },
    writeBundle(options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset' || !options.dir) return;

      const html = String(index.source);
      const outDir = options.dir;

      routesOf(buildCaseStudies).forEach((route) => {
        const dir = path.join(outDir, route.path.slice(1));
        mkdirSync(dir, { recursive: true });
        writeFileSync(path.join(dir, 'index.html'), renderRoute(html, route));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), portfolioPages()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'production'
          ? '[hash:base64:6]'
          : '[name]__[local]__[hash:base64:4]',
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2022',
  },
});
