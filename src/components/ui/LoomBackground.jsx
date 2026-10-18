import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/helpers.js';
import { fitCanvas, rng, threadXs } from './loomGrid.js';

/**
 * Vertical warp threads fading from the top down, with soft light pulses running along them
 * as if the threads were being drawn through the loom.
 */
export default function LoomBackground({ style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    let raf, w = 0, h = 0, threads = [], visible = true;
    const t0 = performance.now();

    const resize = () => {
      [w, h] = fitCanvas(canvas, ctx);
      const r = rng(11);
      threads = threadXs(w).map((x) => ({
        x,
        period: 5 + r() * 6,    // seconds between pulses on this thread
        phase: r(),
        len: 0.18 + r() * 0.22, // pulse length, as a share of the height
      }));
    };

    const draw = (now) => {
      const t = reduced ? 0 : (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      // Threads: strongest at the top, easing off but staying present where the logo is woven.
      const fade = ctx.createLinearGradient(0, 0, 0, h);
      fade.addColorStop(0, 'rgba(252,252,252,0.30)');
      fade.addColorStop(0.45, 'rgba(252,252,252,0.12)');
      fade.addColorStop(1, 'rgba(252,252,252,0.10)');
      ctx.fillStyle = fade;
      for (const th of threads) ctx.fillRect(th.x, 0, 1, h);

      // Pulses travel down each thread and fade out as they go.
      if (!reduced) {
        for (const th of threads) {
          const p = ((t / th.period + th.phase) % 1) * 1.6 - 0.3; // -0.3 → 1.3 so it enters and leaves fully
          const len = th.len * h;
          const head = p * h;
          const tail = head - len;
          if (head < 0 || tail > h) continue;
          const strength = Math.max(0, 1 - head / h) * 0.9;
          const g = ctx.createLinearGradient(0, tail, 0, head);
          g.addColorStop(0, 'rgba(233,252,148,0)');
          g.addColorStop(1, `rgba(233,252,148,${strength.toFixed(3)})`);
          ctx.fillStyle = g;
          ctx.fillRect(th.x - 0.5, tail, 2, len);
        }
      }

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
