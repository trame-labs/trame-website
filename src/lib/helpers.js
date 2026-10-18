/** Images are served from the live site's Framer CDN (download into /public before going offline). */
export const IMG = (file, width = 1600) => `https://framerusercontent.com/images/${file}?scale-down-to=${width}`;

/** Smooth-scrolls to a section, leaving room for the sticky 68px nav. */
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
