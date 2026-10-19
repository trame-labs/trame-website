import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import Logo from '../ui/Logo.jsx';
import { Link } from '../../lib/router.js';
import { PAGES, SECTORS, USE_CASES } from '../../content/routes.js';

const NAV_HEIGHT = 68;

export default function Nav({ onDemo, path }) {
  // `top` = the nav is over the dark hero: keep the dark style (and the hero's rail colour)
  // until the hero has scrolled out from under it.
  const [top, setTop] = useState(true);
  const [menu, setMenu] = useState(false); // use-case dropdown
  const [mobile, setMobile] = useState(false); // burger panel
  const ddRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero');
      setTop(hero ? hero.getBoundingClientRect().bottom > NAV_HEIGHT : window.scrollY < 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [path]);

  // Close menus on navigation, outside click and Escape.
  useEffect(() => { setMenu(false); setMobile(false); }, [path]);
  useEffect(() => {
    const onDown = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setMenu(false); };
    const onKey = (e) => { if (e.key === 'Escape') { setMenu(false); setMobile(false); } };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, []);

  const dark = top && !mobile;
  const line = dark ? 'rgba(252,252,252,.16)' : 'var(--border-default)';
  const linkStyle = (active) => ({
    font: '500 14px var(--font-sans)', textDecoration: 'none', whiteSpace: 'nowrap', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 2,
    color: dark ? (active ? 'var(--brand-yellow-500)' : 'var(--soft-green-200)') : (active ? 'var(--text-strong)' : 'var(--text-body)'),
  });
  const inUseCases = path.startsWith('/cas-usage') || path.startsWith('/secteurs');

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: dark ? 'var(--surface-inverse)' : 'rgba(240,245,235,.88)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      boxShadow: `inset 0 -1px 0 ${line}`, transition: 'background-color 220ms cubic-bezier(.2,.7,.2,1)',
    }}>
      <div style={{
        width: 'calc(100% - 48px)', maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: NAV_HEIGHT,
        display: 'flex', alignItems: 'center', gap: 36, boxShadow: `inset 1px 0 0 ${line}, inset -1px 0 0 ${line}`,
      }}>
        <Link to="/" aria-label="Trame Labs — accueil" style={{ display: 'flex' }}>
          <Logo height={24} tone={dark ? 'light' : 'dark'} />
        </Link>
        <nav className="tl-nav-links" aria-label="Navigation principale">
          <div ref={ddRef} style={{ position: 'relative' }}>
            <button type="button" aria-expanded={menu} onClick={() => setMenu((m) => !m)} style={linkStyle(inUseCases)}>
              Cas d’usage <Icon name="expand_more" size={18} />
            </button>
            {menu && (
              <div className="tl-dd">
                <div>
                  <p className="tl-dd-label">Par besoin</p>
                  {USE_CASES.map((u) => <Link key={u.to} to={u.to} className="tl-dd-item"><b>{u.label}</b><span>{u.desc}</span></Link>)}
                </div>
                <div>
                  <p className="tl-dd-label">Par secteur</p>
                  {SECTORS.map((u) => <Link key={u.to} to={u.to} className="tl-dd-item"><b>{u.label}</b><span>{u.desc}</span></Link>)}
                </div>
              </div>
            )}
          </div>
          {PAGES.map((p) => <Link key={p.to} to={p.to} style={linkStyle(path === p.to)}>{p.label}</Link>)}
        </nav>
        <span className="tl-nav-spacer" />
        <span className="tl-nav-lang" style={{ font: '500 13px var(--font-sans)', color: dark ? 'var(--soft-green-300)' : 'var(--text-muted)' }}>FR</span>
        <Button size="sm" variant={dark ? 'signal' : 'primary'} onClick={onDemo}>Réserver une démo</Button>
        <button type="button" className="tl-burger" aria-expanded={mobile} aria-label={mobile ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMobile((m) => !m)}
          style={{ color: dark ? 'var(--neutral-10)' : 'var(--text-strong)' }}>
          <Icon name={mobile ? 'close' : 'menu'} size={24} />
        </button>
      </div>
      {mobile && (
        <nav className="tl-mnav" aria-label="Menu mobile">
          <p className="tl-dd-label">Cas d’usage</p>
          {USE_CASES.map((u) => <Link key={u.to} to={u.to}>{u.label}</Link>)}
          <p className="tl-dd-label">Secteurs</p>
          {SECTORS.map((u) => <Link key={u.to} to={u.to}>{u.label}</Link>)}
          <p className="tl-dd-label">Trame</p>
          {PAGES.map((p) => <Link key={p.to} to={p.to}>{p.label}</Link>)}
          <Link to="/demo">Réserver une démo</Link>
        </nav>
      )}
    </header>
  );
}
