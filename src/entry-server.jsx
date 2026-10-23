// Build-time entry: renders one URL to HTML for scripts/prerender.js.
import { renderToString } from 'react-dom/server';
import App, { PAGES } from './App.jsx';
import { setServerUrl, takePageMeta } from './lib/router.js';

export const ROUTES = Object.keys(PAGES);

/** render('/en/securite') → { html, meta: { title, description, noindex } } */
export function render(url) {
  setServerUrl(url);
  const html = renderToString(<App />);
  return { html, meta: takePageMeta() };
}
