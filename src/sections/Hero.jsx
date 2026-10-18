import { useEffect, useRef } from 'react';
import Button from '../components/ui/Button.jsx';
import { Rails } from '../components/layout/Rails.jsx';
import LoomBackground from '../components/ui/LoomBackground.jsx';
import { IMG, prefersReducedMotion } from '../lib/helpers.js';

// [image, position, parallax factor, float phase]
const FLOATERS = [
  ['dwVAi75NIQiojV0MTDruu6z2NNA.png', { left: 0, top: '14%' }, -0.18, 0],
  ['wGfE0Pq2G4druNK7mMrmpxKDH6w.png', { right: 0, top: 0 }, -0.3, 1.3],
  ['CVp8EhqQ1k0rw6UCzQgruVAamI.png', { right: '6%', bottom: 0 }, -0.12, 2.6],
];

export default function Hero({ onDemo }) {
  const bgRef = useRef(null);
  const mainRef = useRef(null);
  const floatRefs = useRef([]);

  // Parallax + gentle float, written straight to the DOM so the section doesn't re-render every frame.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf;
    const t0 = performance.now();
    const loop = (now) => {
      const y = Math.min(window.scrollY, 1200);
      const t = (now - t0) / 1400;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${y * 0.25}px)`;
      if (mainRef.current) mainRef.current.style.transform = `translateY(${y * -0.04}px)`;
      FLOATERS.forEach(([, , k, ph], i) => {
        const el = floatRefs.current[i];
        if (el) el.style.transform = `translateY(${y * k + Math.sin(t + ph) * 6}px)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Rails tone="dark">
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-inverse)' }}>
        {/* Loom animation stays within the content column, between the side rails. */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: '0 auto', width: 'calc(100% - 48px)', maxWidth: 1200, overflow: 'hidden' }}>
          <div ref={bgRef} style={{ position: 'absolute', inset: 0 }}>
            <LoomBackground />
          </div>
        </div>

        <div className="tl-wrap" style={{ position: 'relative', paddingTop: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
          <h1 className="tl-h1" style={{ maxWidth: 820, color: 'var(--text-on-inverse)' }}>Vos données financières, prêtes pour l’IA</h1>
          <p className="tl-lead" style={{ maxWidth: 640, color: 'var(--text-on-inverse)' }}>
            Vos décisions ne devraient plus dépendre d’un assemblage de tableurs et d’exports. Trame Labs unifie vos données financières en une base vivante et auditable, sur laquelle l’IA peut enfin analyser, expliquer et agir.
          </p>
          <Button size="lg" variant="signal" onClick={onDemo}>Réserver une démo</Button>
        </div>

        <div className="tl-wrap" style={{ position: 'relative', paddingTop: 72, paddingBottom: 120 }}>
          <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto', padding: '4% 10% 8%' }}>
            <img ref={mainRef} src={IMG('aywmkcDXDCDsMg6cfZr8B6rNNs.png', 2048)} alt="Tableau de bord Trame" fetchpriority="high"
              style={{ width: '100%', display: 'block', borderRadius: 12, boxShadow: '0 40px 90px rgba(0,0,0,.35)' }} />
            {FLOATERS.map(([file, pos], i) => (
              <img key={file} ref={(el) => { floatRefs.current[i] = el; }} src={IMG(file, 1024)} alt=""
                style={{ position: 'absolute', width: '28%', ...pos, borderRadius: 12, boxShadow: '0 24px 60px rgba(0,0,0,.35)', willChange: 'transform' }} />
            ))}
          </div>
        </div>
      </section>
    </Rails>
  );
}
