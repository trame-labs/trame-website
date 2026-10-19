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
  styles/        design tokens (Figma variables + semantic aliases), base + responsive layout classes
  components/
    ui/          Button, Icon (Material Symbols), Logo (vector lockups), BarField
    layout/      Nav, Footer, Rails/Divider (the hairline column frame)
    DemoModal.jsx
  components/blocks.jsx  building blocks for inner pages (PageHero, Section, DataCard, Journal, Steps, IconGrid, Faq, Related, ClosingCta…)
  sections/      Home (all sections), Hero, CardGrid, SectionHeading
  pages/         UseCasePage (template for the 5 use cases), Saas, Retail, FinanceEngineer, Integrations, Securite, Demo, MentionsLegales
  content/       routes.js (site map), useCases.js (use-case page copy)
  lib/router.js  tiny History API router (Link, navigate, usePageMeta)
  lib/helpers.js IMG() CDN helper, scrollToId()
public/
  favicon.svg
```

## Pages

`/`, `/cas-usage/{cash-analytique,pnl-analytique,chiffre-affaires,consolidation,budget-realise}`, `/secteurs/{saas,retail-e-commerce}`, `/finance-engineer`, `/integrations`, `/securite`, `/demo`, `/mentions-legales`. Unknown paths show the home page.

Client-side routing: the host must serve `index.html` for every path (SPA fallback). `vite dev` and `vite preview` already do.

## Known gaps

- **Images** are hotlinked from the live site's Framer CDN (`framerusercontent.com`), except the closing-section landscape (`public/assets/illustrations/knit-landscape.png`). Download the rest into `public/` before decommissioning Framer.
- **Hero background** is a canvas animation (`src/components/ui/LoomBackground.jsx`): bars slide along warp threads like heddles on a loom while a weft line sweeps across. It renders a still frame when the visitor prefers reduced motion and pauses when the hero is off-screen.
- **Forms**: the demo modal and newsletter form don't submit anywhere yet (see the TODO in `DemoModal.jsx`).
- The “Avis” nav link from the design was dropped — the page has no testimonials section yet.
- Copy follows the internal “Site Trame V1” mock-up, condensed into the existing sections. To validate before going live: the Jahia figure (written sign-off) and the Mooncard figure (self-reported).
- Inner-page copy is condensed from the internal V1 mock-up. To confirm before going live: Jahia and Mooncard figures, SOC 2 type and report date, the four consolidation checks (must exist in the product), the finance-engineer definition, payroll connectors vs file import, and the bracketed items in Mentions légales (RCS, publication director, host).
- Held back from the integrations catalogue until confirmed: Salesforce, Snowflake, Looker Studio, Power BI.
