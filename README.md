# trame-website

Marketing site for [trame-labs.com](https://trame-labs.com) — a React site pre-rendered to static HTML, built from the Claude Design project *Trame Labs Design System* (`ui_kits/website`).

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # one static HTML page per route in dist/, plus 404.html, sitemap.xml, robots.txt
npm run preview   # serve the build
```

## Structure

```
src/
  styles/        design tokens (Figma variables + semantic aliases), base + layout classes (index.css)
                 site.css: the blocks of the « Site Trame V1 » mock-up, nested under .v1 (same class names as the mock-up)
  components/
    ui/          Button, Icon (Material Symbols), Logo (vector lockups), LoomBackground/LoomLogo (hero animation)
    layout/      Nav (with the FR/EN switch), Footer, Rails/Divider (the hairline column frame)
    blocks.jsx   PageHero (dark loom hero), ClosingCta (knitted landscape), DemoButton, LinkButton
    Sprite.jsx   SVG icons used by the example cards
  sections/      Home, Hero (home hero with the woven emblem)
  pages/         one file per page (use cases, sectors, finance engineer, integrations, security, demo, legal)
  content/       routes.js (site map, labels in FR and EN)
  lib/router.js  tiny History API router (Link, navigate, usePageMeta); English pages live under /en
  entry-server.jsx  renders one URL to HTML at build time
scripts/
  prerender.js   writes dist/<route>/index.html with its own head (title, description, canonical, hreflang, Open Graph)
  lib/i18n.js    useT(): copy is written as t('français', 'English') pairs next to the markup
  lib/behaviors.js  interactions of the example cards (rows that open, "seen by" switch), ported from the mock-up
public/
  favicon.svg
```

## Languages

Every page exists in French (`/securite`) and English (`/en/securite`); the FR / EN switch in the nav keeps the visitor on the same page.
To change a text, edit both sides of its `t('…', '…')` pair in the page file.

## Pages

`/`, `/cas-usage/{cash-analytique,pnl-analytique,chiffre-affaires,consolidation,budget-realise}`, `/secteurs/{saas,retail-e-commerce}`, `/finance-engineer`, `/integrations`, `/securite`, `/demo`, `/mentions-legales`, and the same under `/en`. Unknown paths show the 404 page.

To add a page: create it in `pages/`, call `usePageMeta(title, description)` in it, and add its path to `PAGES` in `App.jsx`. The build pre-renders it in both languages and adds it to the sitemap.

## SEO and hosting

`npm run build` renders every page to static HTML, so search engines, link previews and AI crawlers get the full content and the page's own title, description, canonical URL, `hreflang` pair and Open Graph tags without running JavaScript. The browser then hydrates the page and navigation stays client-side.

Deploy `dist/` to any static host. No SPA fallback is needed: the host should serve `404.html` for unknown paths (Vercel, Netlify, Cloudflare Pages and GitHub Pages do so by default). Canonical URLs have no trailing slash (`/securite`): keep the host's trailing-slash setting consistent with that.

## Known gaps

- **Forms**: the demo form and the newsletter form don't submit anywhere yet (TODO in `pages/Demo.jsx` and `Footer.jsx`). "Se connecter" points to `#`.
- **To confirm before going live** (bracketed in the copy): legal notice (RCS, publication director, host address, privacy policy, cookies), security page (SOC 2 report type and date, items marked [À confirmer], page update date), the Adrien Leleu quote (badge « Citation proposée, à valider »), the Jahia and Mooncard figures.
- `LogoMarquee.jsx` (drifting integration logos) is no longer used since the mock-up dropped the home integrations section; kept for reuse.
