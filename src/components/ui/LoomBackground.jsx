import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/helpers.js';

// Brand colours for the bars: soft green, signal yellow, warm, off-white.
const PALETTE = [[217, 254, 188], [233, 252, 148], [255, 217, 119], [240, 245, 235], [195, 217, 180]];

/** Seeded PRNG so the composition is stable between renders. */
function rng(seed) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

/**
 * Builds groups of 2–3 bars ("warp threads") across the width. Each bar slides along its
 * thread, lifting and dropping like a loom's heddles.
 */
function buildThreads(width, height) {
  const r = rng(11);
  const BW = Math.max(14, Math.round(width / 54));
  const GAP = Math.round(BW * 0.4);
  const groups = [];
  for (let x = BW; x < width - BW; ) {
    const n = 2 + Math.floor(r() * 2);
    const color = PALETTE[Math.floor(r() * PALETTE.length)];
    const bars = [];
    for (let k = 0; k < n; k++) bars.push(x + k * (BW + GAP));
    groups.push({
      bars, color,
      base: r() * height,                 // resting centre
      len: height * (0.08 + r() * 0.16),  // bar length
      amp: height * (0.06 + r() * 0.18),  // travel along the thread
      speed: 0.25 + r() * 0.45,
      phase: r() * Math.PI * 2,
      alpha: 0.4 + r() * 0.4,
      lag: 0.35 + r() * 0.5,              // phase offset between neighbouring bars
    });
    x += n * (BW + GAP) + BW * (1.5 + r() * 4);
  }
  return { groups, BW };
}

export default function LoomBackground({ style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    let raf, w = 0, h = 0, threads, visible = true;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      threads = buildThreads(w, h);
    };

    const draw = (now) => {
      const t = reduced ? 0 : (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      const { groups, BW } = threads;

      // Fine warp threads behind everything.
      ctx.fillStyle = 'rgba(252,252,252,0.05)';
      for (const g of groups) for (const x of g.bars) ctx.fillRect(x + BW / 2, 0, 1, h);

      // The weft: a soft horizontal shuttle that crosses every ~9s and lights up the bars it passes.
      const shuttleX = ((t / 9) % 1) * (w + 400) - 200;
      const shuttleY = h * (0.55 + 0.25 * Math.sin(t / 5));

      ctx.filter = 'blur(2px)';
      for (const g of groups) {
        g.bars.forEach((x, i) => {
          const y = g.base + Math.sin(t * g.speed + g.phase - i * g.lag) * g.amp - g.len / 2;
          const near = Math.max(0, 1 - Math.abs(x - shuttleX) / 220);
          const a = Math.min(0.95, g.alpha + near * 0.45);
          const [r, gg, b] = g.color;
          ctx.fillStyle = `rgba(${r},${gg},${b},${a})`;
          ctx.fillRect(x, y, BW, g.len);
        });
      }
      ctx.filter = 'none';

      const grad = ctx.createLinearGradient(shuttleX - 200, 0, shuttleX + 200, 0);
      grad.addColorStop(0, 'rgba(233,252,148,0)');
      grad.addColorStop(0.5, 'rgba(233,252,148,0.35)');
      grad.addColorStop(1, 'rgba(233,252,148,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(shuttleX - 200, shuttleY, 400, 1.5);

      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(0); });
    ro.observe(canvas);
    // Stop animating while the hero is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      const was = visible; visible = entry.isIntersecting;
      if (visible && !was && !reduced) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', ...style }} />;
}
