import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/helpers.js';
import { fitCanvas, pitchFor, rng, threadXs } from './loomGrid.js';

// Bar spans of the Trame emblem (Figma units, top → bottom). Ten bars on ten neighbouring threads.
const EMBLEM = [
  [10.4, 55.47], [10.4, 55.47], [0, 21.12], [0, 21.12], [10.56, 73.91],
  [10.56, 73.91], [0, 21.12], [0, 21.12], [10.4, 55.47], [10.4, 55.47],
];
const EMBLEM_PITCH = 8.85; // Figma units between emblem bars
const WHITE = [254, 254, 252];
const DECOR = [[217, 254, 188], [255, 217, 119], [240, 245, 235]]; // soft green, warm, off-white

/** A bar with dithered, grainy edges, pre-rendered once per size. */
function grainyBar(w, h, [r, g, b], dpr, seed) {
  const m = 5; // grain margin, CSS px
  const cw = Math.ceil((w + m * 2) * dpr), ch = Math.ceil((h + m * 2) * dpr);
  const c = document.createElement('canvas');
  c.width = cw; c.height = ch;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(cw, ch);
  const rand = rng(seed);
  for (let py = 0; py < ch; py++) {
    const y = py / dpr - m;
    for (let px = 0; px < cw; px++) {
      const x = px / dpr - m;
      const dx = Math.max(-x, x - w, 0), dy = Math.max(-y, y - h, 0);
      // Solid inside; speckle that thins out over a few pixels beyond the edge.
      const p = dx || dy ? 0.6 * Math.pow(Math.max(0, 1 - Math.hypot(dx, dy) / m), 1.5) : 1;
      if (rand() < p) {
        const i = (py * cw + px) * 4;
        img.data[i] = r; img.data[i + 1] = g; img.data[i + 2] = b; img.data[i + 3] = 255;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  return { canvas: c, m };
}

function layout(w, h, dpr) {
  const xs = threadXs(w);
  const pitch = pitchFor(w);
  const bw = Math.round(pitch * 0.72);
  const s = pitch / EMBLEM_PITCH;
  const start = Math.max(0, Math.floor(xs.length / 2) - 5);
  const emblemTop = Math.round(h * 0.16);
  const r = rng(23);
  const bars = [];

  EMBLEM.forEach(([top, bottom], i) => {
    if (!xs[start + i]) return;
    const bh = Math.round((bottom - top) * s);
    bars.push({ x: xs[start + i] - bw / 2, y: emblemTop + top * s, bh, color: WHITE, delay: 0.1 + Math.abs(i - 4.5) * 0.03, float: 0 });
  });

  // Decorative pairs on either side of the emblem, leaving one empty thread around it.
  const blocked = (c) => c >= start - 1 && c <= start + EMBLEM.length;
  for (let c = 1; c < xs.length - 1; ) {
    const n = 2 + (r() < 0.3 ? 1 : 0);
    if ([...Array(n)].some((_, k) => blocked(c + k) || c + k >= xs.length)) { c++; continue; }
    const color = DECOR[Math.floor(r() * DECOR.length)];
    const bh = Math.round(h * (0.25 + r() * 0.4));
    const y = Math.round(h * (0.05 + r() * 0.55));
    const delay = r() * 0.3, phase = r() * Math.PI * 2, speed = 0.4 + r() * 0.4;
    for (let k = 0; k < n; k++) bars.push({ x: xs[c + k] - bw / 2, y, bh, color, delay: delay + k * 0.02, float: 1, phase, speed });
    c += n + 1 + Math.floor(r() * 3);
  }

  bars.forEach((b, i) => {
    b.sprite = grainyBar(bw, b.bh, b.color, dpr, 97 + i * 13);
  });
  return { bars, bw, lineY: Math.round(h * 0.12) };
}

const STAGGER = 0.35; // max per-bar delay, as a share of the scroll progress
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (v) => Math.min(1, Math.max(0, v));

/**
 * The emblem woven in threads. At the top of the page every bar sits on one line; as the visitor
 * scrolls, the bars slide along their warp threads and build the Trame logo, with coloured pairs
 * settling on either side. Scrolling back up un-weaves it.
 */
export default function LoomLogo({ style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    let raf, w = 0, h = 0, scene, visible = true, shown = reduced ? 1 : 0;
    const t0 = performance.now();

    const resize = () => {
      const [cw, ch, dpr] = fitCanvas(canvas, ctx);
      w = cw; h = ch;
      scene = layout(w, h, dpr);
    };

    // 0 at the top of the page, 1 once the band's centre reaches the middle of the viewport.
    const scrollTarget = () => {
      const rect = canvas.getBoundingClientRect();
      const range = Math.max(240, rect.top + window.scrollY + h / 2 - window.innerHeight / 2);
      return clamp01(window.scrollY / range);
    };

    const draw = (now) => {
      const t = (now - t0) / 1000;
      if (!reduced) shown += (scrollTarget() - shown) * 0.12; // smooth out wheel steps
      ctx.clearRect(0, 0, w, h);
      for (const b of scene.bars) {
        const e = easeInOut(clamp01((shown - b.delay) / (1 - STAGGER)));
        let y = scene.lineY + (b.y - scene.lineY) * e;
        if (b.float && !reduced) y += Math.sin(t * b.speed + b.phase) * 10 * e;
        const { canvas: spr, m } = b.sprite;
        ctx.drawImage(spr, b.x - m, y - m, scene.bw + m * 2, b.bh + m * 2);
      }
      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(performance.now()); });
    ro.observe(canvas);
    // Pause while the band is off-screen.
    const io = new IntersectionObserver(([entry]) => {
      const was = visible; visible = entry.isIntersecting;
      if (visible && !was && !reduced) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', ...style }} />;
}
