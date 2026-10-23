import Button from '../ui/Button.jsx';
import Logo from '../ui/Logo.jsx';
import { Divider, Rails } from './Rails.jsx';
import { Link } from '../../lib/router.js';
import { useT } from '../../lib/i18n.js';
import { PAGES, SECTORS, USE_CASES } from '../../content/routes.js';

function FooterLink({ label, href }) {
  return <Link className="tl-footer-link" to={href}>{label}</Link>;
}

export default function Footer() {
  const t = useT();
  const L = ([fr, en]) => t(fr, en);
  const columns = [
    [t('Cas d’usage', 'Use cases'), USE_CASES.map((u) => [L(u.label), u.to])],
    ['Trame', [...SECTORS, ...PAGES].map((p) => [L(p.label), p.to])],
    [t('Ressources', 'Resources'), [
      [t('Finance Shift, la newsletter', 'Finance Shift, the newsletter'), 'https://financeshift.substack.com/'],
      ['LinkedIn', 'https://www.linkedin.com/company/trame-labs'],
      [t('Réserver une démo', 'Book a demo'), '/demo'],
      ['contact@trame-labs.com', 'mailto:contact@trame-labs.com'],
    ]],
  ];
  const guarantees = [
    t('Hébergé en Europe', 'Hosted in Europe'), 'SOC 2', t('RGPD', 'GDPR'),
    t('Aucun entraînement sur vos données', 'No training on your data'), t('Accès en lecture seule à vos outils', 'Read-only access to your tools'),
  ];
  return (
    <footer className="tl-footer">
      <Rails tone="warm">
        <div className="tl-wrap tl-footer-guar">{guarantees.map((g) => <span key={g}>{g}</span>)}</div>
        <Divider tone="warm" />
        <div className="tl-wrap tl-footer-grid" style={{ paddingTop: 56, paddingBottom: 56 }}>
          {columns.map(([title, items]) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h3 className="tl-footer-title">{title}</h3>
              {items.map(([label, href]) => <FooterLink key={label} label={label} href={href} />)}
            </div>
          ))}
          {/* TODO: wire to the newsletter provider — currently a no-op. */}
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 className="tl-footer-title" style={{ marginBottom: 0 }}>{t('Abonnez-vous !', 'Subscribe')}</h3>
            <p style={{ margin: '0 0 8px', fontSize: 15, lineHeight: 1.5 }}>{t('Inscrivez-vous à notre newsletter pour recevoir les derniers conseils, actualités et analyses', 'Sign up to our newsletter for the latest advice, news and analysis')}</p>
            <input className="tl-footer-input" type="email" required placeholder={t('votre email', 'your email')} aria-label="Email" />
            <Button type="submit" style={{ width: '100%' }}>{t('S’abonner', 'Subscribe')}</Button>
          </form>
        </div>

        <Divider tone="warm" />
        <div className="tl-wrap">
          <div style={{ padding: '64px 0 24px' }}>
            <Logo variant="alt" height={98} title="Trame Labs" style={{ width: '100%', height: 'auto' }} />
          </div>
          <p className="tl-footer-sig">{t('Chaque chiffre a sa trame.', 'Every figure has its thread.')}</p>
          <div className="tl-footer-legal">
            <span>© 2026 Trame Labs SAS · 32 rue de Paris, 92100 Boulogne-Billancourt</span>
            <span style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
              <FooterLink label={t('Mentions légales', 'Legal notice')} href="/mentions-legales" />
              <FooterLink label={t('Sécurité', 'Security')} href="/securite" />
              <span>Designed by arianemoder</span>
            </span>
          </div>
        </div>
      </Rails>
    </footer>
  );
}
