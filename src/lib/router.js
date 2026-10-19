// Minimal History API router: no dependency, one page per pathname.
import { createElement, useEffect, useState } from 'react';

const listeners = new Set();

export function navigate(to) {
  const url = new URL(to, window.location.origin);
  if (url.pathname + url.hash !== window.location.pathname + window.location.hash) window.history.pushState({}, '', url.pathname + url.hash);
  listeners.forEach((fn) => fn());
}

/** Current pathname plus hash; re-renders on navigate() and on back/forward. */
export function useLocation() {
  const read = () => ({ path: window.location.pathname.replace(/\/+$/, '') || '/', hash: window.location.hash.slice(1) });
  const [loc, setLoc] = useState(read);
  useEffect(() => {
    const update = () => setLoc(read());
    listeners.add(update);
    window.addEventListener('popstate', update);
    return () => { listeners.delete(update); window.removeEventListener('popstate', update); };
  }, []);
  return loc;
}

/** <a> that navigates client-side; external links and modified clicks behave normally. */
export function Link({ to, onClick, children, ...rest }) {
  const external = /^(https?:|mailto:)/.test(to);
  const handle = (e) => {
    onClick?.(e);
    if (external || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return createElement('a', { href: to, onClick: handle, ...(external && to.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}), ...rest }, children);
}

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
