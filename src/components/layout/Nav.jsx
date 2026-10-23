import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import Logo from '../ui/Logo.jsx';
import { Link, localize, navigate, useLocation } from '../../lib/router.js';
import { useLang, useT } from '../../lib/i18n.js';
import { PAGES, SECTORS, USE_CASES } from '../../content/routes.js';

const NAV_HEIGHT = 68;

/** FR / EN: the same page in the other language. */
function LangSwitch({ style }) {
  const lang = useLang();
  const { path, hash } = useLocation();
  const to = path + (hash ? '#' + hash : '');
  return (
    <span className="tl-lang" role="group" aria-label="Langue / Language" style={style}>
      <Link to={to} lang="fr" hrefLang="fr" aria-current={lang === 'fr' ? 'true' : undefined}>FR</Link>
      <Link to={to} lang="en" hrefLang="en" aria-current={lang === 'en' ? 'true' : undefined}>EN</Link>
    </span>
  );
}

export default function Nav({ path }) {
  const t = useT();
  const lang = useLang();
  const L = ([fr, en]) => t(fr, en);
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
      <div className="tl-nav-inner" style={{
        width: 'calc(100% - 48px)', maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: NAV_HEIGHT,
        display: 'flex', alignItems: 'center', gap: 36, boxShadow: `inset 1px 0 0 ${line}, inset -1px 0 0 ${line}`,
      }}>
        <Link to="/" aria-label={t('Trame Labs, accueil', 'Trame Labs, home')} style={{ display: 'flex' }}>
          <Logo height={24} tone={dark ? 'light' : 'dark'} />
        </Link>
        <nav className="tl-nav-links" aria-label={t('Navigation principale', 'Main navigation')}>
          <div ref={ddRef} style={{ position: 'relative' }}>
            <button type="button" aria-expanded={menu} onClick={() => setMenu((m) => !m)} style={linkStyle(inUseCases)}>
              {t('Cas d’usage', 'Use cases')} <Icon name="expand_more" size={18} />
            </button>
            {menu && (
              <div className="tl-dd">
                <div>
                  <p className="tl-dd-label">{t('Par besoin', 'By need')}</p>
                  {USE_CASES.map((u) => <Link key={u.to} to={u.to} className="tl-dd-item"><b>{L(u.label)}</b><span>{L(u.desc)}</span></Link>)}
                </div>
                <div>
                  <p className="tl-dd-label">{t('Par secteur', 'By sector')}</p>
                  {SECTORS.map((u) => <Link key={u.to} to={u.to} className="tl-dd-item"><b>{L(u.label)}</b><span>{L(u.desc)}</span></Link>)}
                  <Link to="/#mois" className="tl-dd-item tl-dd-card"><b>{t('Un mois avec votre finance engineer', 'A month with your finance engineer')}</b><span>{t('Ce que Trame fait pour vous, au fil du mois →', 'What Trame does for you, through the month →')}</span></Link>
                </div>
              </div>
            )}
          </div>
          {PAGES.map((p) => <Link key={p.to} to={p.to} style={linkStyle(path === p.to)} aria-current={path === p.to ? 'page' : undefined}>{L(p.label)}</Link>)}
        </nav>
        <span className="tl-nav-spacer" />
        <span className="tl-nav-lang"><LangSwitch style={{ color: dark ? 'var(--soft-green-200)' : 'var(--text-body)' }} /></span>
        {/* TODO: point to the product's sign-in URL. */}
        <a href="#" className="tl-nav-login" style={linkStyle(false)}>{t('Se connecter', 'Sign in')}</a>
        <Button size="sm" variant={dark ? 'signal' : 'primary'} href={localize('/demo', lang)} onClick={(e) => { e.preventDefault(); navigate(localize('/demo', lang)); }}>{t('Réserver une démo', 'Book a demo')}</Button>
        <button type="button" className="tl-burger" aria-expanded={mobile} aria-label={mobile ? t('Fermer le menu', 'Close menu') : t('Ouvrir le menu', 'Open menu')} onClick={() => setMobile((m) => !m)}
          style={{ color: dark ? 'var(--neutral-10)' : 'var(--text-strong)' }}>
          <Icon name={mobile ? 'close' : 'menu'} size={24} />
        </button>
      </div>
      {mobile && (
        <nav className="tl-mnav" aria-label={t('Menu mobile', 'Mobile menu')}>
          <p className="tl-dd-label">{t('Cas d’usage', 'Use cases')}</p>
          {USE_CASES.map((u) => <Link key={u.to} to={u.to}>{L(u.label)}</Link>)}
          <p className="tl-dd-label">{t('Secteurs', 'Sectors')}</p>
          {SECTORS.map((u) => <Link key={u.to} to={u.to}>{L(u.label)}</Link>)}
          <p className="tl-dd-label">Trame</p>
          {PAGES.map((p) => <Link key={p.to} to={p.to}>{L(p.label)}</Link>)}
          <Link to="/demo">{t('Réserver une démo', 'Book a demo')}</Link>
          <a href="#">{t('Se connecter', 'Sign in')}</a>
          <LangSwitch style={{ display: 'inline-flex', marginTop: 14, color: 'var(--text-strong)' }} />
        </nav>
      )}
    </header>
  );
}
