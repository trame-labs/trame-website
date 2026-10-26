// Writes one static HTML page per route and language into dist/, with its own head (title, description,
// canonical, hreflang, Open Graph), plus 404.html, sitemap.xml and robots.txt.
// Runs after `vite build` (browser bundle, dist/index.html as the template) and `vite build --ssr` (dist-ssr/).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SITE = 'https://trame-labs.com';
const OG_IMAGE = { src: '/assets/illustrations/knit-landscape.png', width: 1412, height: 648 };
const LANGS = [
  { lang: 'fr', prefix: '', locale: 'fr_FR' },
  { lang: 'en', prefix: '/en', locale: 'en_GB' },
];

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');
const { render, ROUTES } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const urlFor = (prefix, path) => SITE + (prefix + (path === '/' ? '' : path) || '/');

function page(url, lang, { html, meta }, head) {
  if (!meta) throw new Error(`${url}: the page does not call usePageMeta()`);
  const out = template
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/ *<\/head>/, `${head(meta).map((tag) => `    ${tag}\n`).join('')}  </head>`)
    .replace('<div id="root"></div>', `<div id="root" data-path="${esc(url)}">${html}</div>`);
  if (!out.includes(`data-path="${esc(url)}"`)) throw new Error('index.html no longer has <div id="root"></div>');
  return out;
}

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

const sitemap = [];
for (const path of ROUTES) {
  const alternates = LANGS.map(({ lang, prefix }) => ({ lang, href: urlFor(prefix, path) }));
  for (const { lang, prefix, locale } of LANGS) {
    const url = (prefix + (path === '/' ? '' : path)) || '/';
    const canonical = urlFor(prefix, path);
    const result = render(url);
    const head = (meta) => [
      meta.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${canonical}" />`,
      ...(meta.noindex ? [] : [
        ...alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`),
        `<link rel="alternate" hreflang="x-default" href="${alternates[0].href}" />`,
      ]),
      '<meta property="og:type" content="website" />',
      '<meta property="og:site_name" content="Trame Labs" />',
      `<meta property="og:locale" content="${locale}" />`,
      `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:title" content="${esc(meta.title)}" />`,
      `<meta property="og:description" content="${esc(meta.description)}" />`,
      `<meta property="og:image" content="${SITE}${OG_IMAGE.src}" />`,
      `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
      `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
    ];
    write(resolve(dist, '.' + url, 'index.html'), page(url, lang, result, head));
    if (!result.meta.noindex) sitemap.push({ loc: canonical, alternates });
  }
}

// Unknown paths: hosts (Vercel, Netlify, Cloudflare Pages, GitHub Pages) serve 404.html with a 404 status.
write(resolve(dist, '404.html'), page('/404', 'fr', render('/404'), () => ['<meta name="robots" content="noindex" />']));

write(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap.map(({ loc, alternates }) => `  <url>
    <loc>${loc}</loc>
${alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates[0].href}" />
  </url>`).join('\n')}
</urlset>
`);

write(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pre-rendered ${sitemap.length} pages + 404.html, sitemap.xml, robots.txt`);
