// Minimal History API router: no dependency, one page per pathname.
// English pages live under /en (same slugs as French); `path` is always the language-neutral path.
import { createElement, useContext, useEffect, useState } from 'react';
import { LangContext } from './i18n.js';

const listeners = new Set();

/** '/en/securite' → { lang: 'en', path: '/securite' }; '/securite' → { lang: 'fr', path: '/securite' }. */
export function splitLang(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/en' || clean.startsWith('/en/')) return { lang: 'en', path: clean.slice(3) || '/' };
  return { lang: 'fr', path: clean };
}

/** Prefixes an internal path with the language: localize('/demo#rdv', 'en') → '/en/demo#rdv'. */
export function localize(to, lang) {
  if (lang !== 'en' || !to.startsWith('/')) return to;
  const [p, h] = to.split('#');
  return '/en' + (p === '/' ? '' : p) + (h !== undefined ? '#' + h : '');
}

export function navigate(to) {
  const url = new URL(to, window.location.href);
  if (url.pathname + url.hash !== window.location.pathname + window.location.hash) window.history.pushState({}, '', url.pathname + url.hash);
  listeners.forEach((fn) => fn());
}

const read = () => ({ ...splitLang(window.location.pathname), hash: window.location.hash.slice(1) });

/** Current language, language-neutral path and hash; re-renders on navigate() and on back/forward. */
export function useLocation() {
  const [loc, setLoc] = useState(read);
  useEffect(() => {
    const update = () => setLoc(read());
    listeners.add(update);
    window.addEventListener('popstate', update);
    return () => { listeners.delete(update); window.removeEventListener('popstate', update); };
  }, []);
  return loc;
}

/**
 * <a> that navigates client-side. Internal paths get the current language prefix
 * (pass `lang` to force one, as the language switch does); '#id' links stay on the page.
 */
export function Link({ to, lang, onClick, children, ...rest }) {
  const current = useContext(LangContext);
  const external = /^(https?:|mailto:)/.test(to);
  const href = external || to.startsWith('#') ? to : localize(to, lang || current);
  const handle = (e) => {
    onClick?.(e);
    if (external || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href);
  };
  return createElement('a', { href, onClick: handle, ...(external && to.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}), ...rest }, children);
}

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
