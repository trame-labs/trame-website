// Shared thread grid so the background threads and the logo bars line up exactly.

/** Distance between warp threads, in CSS px. */
export const pitchFor = (width) => (width < 700 ? 24 : 38);

/** X positions of every thread across `width`, centred in the column. */
export function threadXs(width) {
  const pitch = pitchFor(width);
  const cols = Math.floor(width / pitch);
  const offset = (width - cols * pitch) / 2 + pitch / 2;
  return Array.from({ length: cols }, (_, i) => Math.round(offset + i * pitch));
}

/** Seeded PRNG so compositions are stable between renders. */
export function rng(seed) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

/** Sizes a canvas to its CSS box at device resolution; returns [width, height]. */
export function fitCanvas(canvas, ctx) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return [w, h, dpr];
}
