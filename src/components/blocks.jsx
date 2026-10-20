// Building blocks shared by the pages: the dark loom hero, the closing landscape and the demo button.
import Button from './ui/Button.jsx';
import { Rails } from './layout/Rails.jsx';
import LoomBackground from './ui/LoomBackground.jsx';
import { localize, navigate } from '../lib/router.js';
import { useLang, useT } from '../lib/i18n.js';

export function LinkButton({ to, children, ...rest }) {
  const lang = useLang();
  const href = to.startsWith('#') ? to : localize(to, lang);
  return <Button href={href} onClick={(e) => { e.preventDefault(); navigate(href); }} {...rest}>{children}</Button>;
}

export function DemoButton({ size = 'lg', variant = 'signal', ...rest }) {
  const t = useT();
  return <LinkButton to="/demo" size={size} variant={variant} {...rest}>{t('Réserver une démo', 'Book a demo')}</LinkButton>;
}

/**
 * Dark page header with the loom threads, centred like the home hero.
 * kicker: eyebrow (node); lead: node (a <span> inside is set in the muted tone, as in the mock-up);
 * pills: short claims with ticks; ctas: buttons (defaults to the demo button, false for none); children: the visual under the copy.
 */
export function PageHero({ kicker, title, lead, pills, ctas, children }) {
  return (
    <Rails tone="dark">
      <section id="hero" style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-inverse)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, margin: '0 auto', width: 'calc(100% - 48px)', maxWidth: 1200, overflow: 'hidden' }}>
          <LoomBackground />
        </div>
        <div className="tl-wrap" style={{ position: 'relative', paddingTop: 104, paddingBottom: children ? 0 : 96, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
          {kicker && <span className="tl-eyebrow tl-hero-eyebrow" style={{ color: 'var(--brand-yellow-500)' }}>{kicker}</span>}
          <h1 className="tl-h1 tl-h1--page" style={{ maxWidth: 900, color: 'var(--text-on-inverse)' }}>{title}</h1>
          {lead && <p className="tl-lead tl-hero-lede" style={{ maxWidth: 680, color: 'var(--text-on-inverse)' }}>{lead}</p>}
          {pills && <ul className="tl-hero-pills">{pills.map((p) => <li key={p}>{p}</li>)}</ul>}
          {ctas !== false && <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>{ctas || <DemoButton />}</div>}
        </div>
        {children && (
          <div className="tl-wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 64, paddingBottom: 96 }}>
            <div className="tl-hero-visual">{children}</div>
          </div>
        )}
      </section>
    </Rails>
  );
}

export function ClosingCta({ title, sub, action }) {
  return (
    <section className="tl-cta-frame">
      <div className="tl-wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
        <h2 className="tl-h2 tl-h2--xl" style={{ maxWidth: 860, color: 'var(--text-ink)' }}>{title}</h2>
        {sub && <p className="tl-lead tl-lead--sm" style={{ maxWidth: 640, color: 'var(--neutral-600)' }}>{sub}</p>}
        <div style={{ marginTop: 8 }}>{action || <DemoButton variant="primary" />}</div>
      </div>
      <img className="tl-cta-landscape" src="/assets/illustrations/knit-landscape.png" alt="" width="1412" height="648" loading="lazy" />
    </section>
  );
}
