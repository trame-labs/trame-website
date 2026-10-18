import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/helpers.js';

// Brand colours for the bars: soft green, signal yellow, warm, off-white.
const PALETTE = [[217, 254, 188], [233, 252, 148], [255, 217, 119], [240, 245, 235], [195, 217, 180]];

/** Seeded PRNG so the composition is stable between renders. */
function rng(seed) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

/**
 * Lays out an even grid of warp threads, then groups of 2–3 bars that ride on neighbouring
 * threads. Each bar slides along its thread, lifting and dropping like a loom's heddles.
 */
function buildThreads(width, height) {
  const r = rng(11);
  const BW = Math.max(14, Math.round(width / 54));
  const PITCH = BW + Math.round(BW * 0.4);
  const cols = Math.floor(width / PITCH);
  const offset = (width - cols * PITCH) / 2 + PITCH / 2;     // centre the grid in the column
  const lines = Array.from({ length: cols }, (_, i) => Math.round(offset + i * PITCH));
  const groups = [];
  for (let c = 1; c < cols - 1; ) {
    const n = Math.min(2 + Math.floor(r() * 2), cols - 1 - c);
    const color = PALETTE[Math.floor(r() * PALETTE.length)];
    groups.push({
      bars: lines.slice(c, c + n).map((x) => x - BW / 2), color,
      base: r() * height,                 // resting centre
      len: height * (0.08 + r() * 0.16),  // bar length
      amp: height * (0.06 + r() * 0.18),  // travel along the thread
      speed: 0.25 + r() * 0.45,
      phase: r() * Math.PI * 2,
      alpha: 0.4 + r() * 0.4,
      lag: 0.35 + r() * 0.5,              // phase offset between neighbouring bars
    });
    c += n + 2 + Math.floor(r() * 4);
  }
  return { groups, lines, BW };
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
      const { groups, lines, BW } = threads;

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

      // Vignette keeps the headline readable: dark ellipse behind the copy + top-down fade.
      ctx.save();
      ctx.translate(w / 2, h * 0.22);
      ctx.scale(1, (h * 0.45) / (w * 0.6));
      const vg = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.6);
      vg.addColorStop(0, 'rgba(0,38,21,.92)');
      vg.addColorStop(0.55, 'rgba(0,38,21,.7)');
      vg.addColorStop(1, 'rgba(0,38,21,0)');
      ctx.fillStyle = vg;
      ctx.fillRect(-w, -h * 3, w * 2, h * 6);
      ctx.restore();
      const lg = ctx.createLinearGradient(0, 0, 0, h);
      lg.addColorStop(0, 'rgba(0,38,21,.6)');
      lg.addColorStop(0.6, 'rgba(0,38,21,.25)');
      lg.addColorStop(1, 'rgba(0,38,21,.1)');
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, w, h);

      // Warp threads drawn over the vignette, strongest at the top and fading downwards.
      const tg = ctx.createLinearGradient(0, 0, 0, h);
      tg.addColorStop(0, 'rgba(252,252,252,0.30)');
      tg.addColorStop(0.45, 'rgba(252,252,252,0.12)');
      tg.addColorStop(1, 'rgba(252,252,252,0.04)');
      ctx.fillStyle = tg;
      for (const x of lines) ctx.fillRect(x, 0, 1, h);

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
