import { useEffect, useState } from 'react';
import Button from '../ui/Button.jsx';
import Logo from '../ui/Logo.jsx';
import { scrollToId } from '../../lib/helpers.js';

const NAV_HEIGHT = 68;

const LINKS = [
  ['use-case-section', 'Cas d’usage'],
  ['features-section', 'Fonctionnalités'],
  ['benefit-section', 'Bénéfices'],
  ['integration-section', 'Intégrations'],
];

export default function Nav({ onDemo }) {
  // `top` = the nav is over the dark hero: keep the dark style (and the hero's rail colour)
  // until the hero has scrolled out from under it.
  const [top, setTop] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero');
      setTop(hero ? hero.getBoundingClientRect().bottom > NAV_HEIGHT : window.scrollY < 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const line = top ? 'rgba(252,252,252,.16)' : 'var(--border-default)';
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: top ? 'var(--surface-inverse)' : 'rgba(240,245,235,.88)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      boxShadow: `inset 0 -1px 0 ${line}`, transition: 'background-color 220ms cubic-bezier(.2,.7,.2,1)',
    }}>
      <div style={{
        width: 'calc(100% - 48px)', maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: NAV_HEIGHT,
        display: 'flex', alignItems: 'center', gap: 36, boxShadow: `inset 1px 0 0 ${line}, inset -1px 0 0 ${line}`,
      }}>
        <a href="#" aria-label="Trame Labs — accueil" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'flex' }}>
          <Logo height={24} tone={top ? 'light' : 'dark'} />
        </a>
        <nav className="tl-nav-links" aria-label="Navigation principale">
          {LINKS.map(([id, label]) => (
            <a key={id} href={'#' + id} onClick={(e) => { e.preventDefault(); scrollToId(id); }}
              style={{ font: '500 14px var(--font-sans)', textDecoration: 'none', color: top ? 'var(--soft-green-200)' : 'var(--text-body)', whiteSpace: 'nowrap' }}>
              {label}
            </a>
          ))}
        </nav>
        <span className="tl-nav-spacer" />
        <span className="tl-nav-lang" style={{ font: '500 13px var(--font-sans)', color: top ? 'var(--soft-green-300)' : 'var(--text-muted)' }}>FR</span>
        <Button size="sm" variant={top ? 'signal' : 'primary'} onClick={onDemo}>Réserver une démo</Button>
      </div>
    </header>
  );
}
