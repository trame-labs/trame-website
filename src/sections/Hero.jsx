import { useEffect, useRef } from 'react';
import { Rails } from '../components/layout/Rails.jsx';
import LoomBackground from '../components/ui/LoomBackground.jsx';
import LoomLogo from '../components/ui/LoomLogo.jsx';
import { prefersReducedMotion } from '../lib/helpers.js';

/** Home hero: loom threads, the copy, the product example (children), then the Trame emblem woven from the threads. */
export default function Hero({ kicker, title, lead, pills, ctas, children }) {
  const bgRef = useRef(null);
  const mainRef = useRef(null);

  // Parallax, written straight to the DOM so the section doesn't re-render every frame.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf;
    const loop = () => {
      const y = Math.min(window.scrollY, 1200);
      if (bgRef.current) bgRef.current.style.transform = `translateY(${y * 0.25}px)`;
      if (mainRef.current) mainRef.current.style.transform = `translateY(${y * -0.04}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Rails tone="dark">
      <section id="hero" style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-inverse)' }}>
        {/* Loom animation stays within the content column, between the side rails. */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: '0 auto', width: 'calc(100% - 48px)', maxWidth: 1200, overflow: 'hidden' }}>
          <div ref={bgRef} style={{ position: 'absolute', inset: 0 }}>
            <LoomBackground />
          </div>
        </div>

        <div className="tl-wrap" style={{ position: 'relative', paddingTop: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
          {kicker && <span className="tl-eyebrow" style={{ color: 'var(--brand-yellow-500)' }}>{kicker}</span>}
          <h1 className="tl-h1" style={{ maxWidth: 820, color: 'var(--text-on-inverse)' }}>{title}</h1>
          <p className="tl-lead tl-hero-lede" style={{ maxWidth: 640, color: 'var(--text-on-inverse)' }}>{lead}</p>
          {pills && <ul className="tl-hero-pills">{pills.map((p) => <li key={p}>{p}</li>)}</ul>}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>{ctas}</div>
        </div>

        <div className="tl-wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 72 }}>
          <div ref={mainRef} className="tl-hero-visual">{children}</div>
        </div>

        {/* The Trame emblem woven from the threads, below the product example. */}
        <div className="tl-loom-band">
          <LoomLogo />
        </div>
      </section>
    </Rails>
  );
}
