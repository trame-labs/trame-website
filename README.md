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
  sections/      Home (all sections), Hero, CardGrid, SectionHeading
  lib/helpers.js IMG() CDN helper, scrollToId()
public/
  assets/backgrounds/woven-bars-dark.svg   hero background
  favicon.svg
```

## Known gaps

- **Images** are hotlinked from the live site's Framer CDN (`framerusercontent.com`). Download them into `public/` before decommissioning Framer.
- **Hero background**: the design's `assets/backgrounds/woven-bars-dark.png` couldn't be exported in full, so `woven-bars-dark.svg` is a generated stand-in with the same motif. Drop the real PNG into `public/assets/backgrounds/` and update the URL in `src/sections/Hero.jsx`.
- **Forms**: the demo modal and newsletter form don't submit anywhere yet (see the TODO in `DemoModal.jsx`).
- The “Avis” nav link from the design was dropped — the page has no testimonials section yet.
- Fonctionnalités tabs 2–5 have no description copy on the live site.
