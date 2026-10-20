# trame-website

Marketing site for [trame-labs.com](https://trame-labs.com) — a one-page React site with a “Réserver une démo” modal, built from the Claude Design project *Trame Labs Design System* (`ui_kits/website`).

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static output in dist/
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
  lib/i18n.js    useT(): copy is written as t('français', 'English') pairs next to the markup
  lib/behaviors.js  interactions of the example cards (rows that open, "seen by" switch), ported from the mock-up
public/
  favicon.svg
```

## Languages

Every page exists in French (`/securite`) and English (`/en/securite`); the FR / EN switch in the nav keeps the visitor on the same page.
To change a text, edit both sides of its `t('…', '…')` pair in the page file.

## Pages

`/`, `/cas-usage/{cash-analytique,pnl-analytique,chiffre-affaires,consolidation,budget-realise}`, `/secteurs/{saas,retail-e-commerce}`, `/finance-engineer`, `/integrations`, `/securite`, `/demo`, `/mentions-legales`, and the same under `/en`. Unknown paths show the home page.

Client-side routing: the host must serve `index.html` for every path (SPA fallback). `vite dev` and `vite preview` already do.

## Known gaps

- **Forms**: the demo form and the newsletter form don't submit anywhere yet (TODO in `pages/Demo.jsx` and `Footer.jsx`). "Se connecter" points to `#`.
- **To confirm before going live** (bracketed in the copy): legal notice (RCS, publication director, host address, privacy policy, cookies), security page (SOC 2 report type and date, items marked [À confirmer], page update date), the Adrien Leleu quote (badge « Citation proposée, à valider »), the Jahia and Mooncard figures.
- `LogoMarquee.jsx` (drifting integration logos) is no longer used since the mock-up dropped the home integrations section; kept for reuse.
