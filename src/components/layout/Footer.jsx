import Button from '../ui/Button.jsx';
import Logo from '../ui/Logo.jsx';
import { Divider, Rails } from './Rails.jsx';
import { Link } from '../../lib/router.js';
import { PAGES, SECTORS, USE_CASES } from '../../content/routes.js';

const COLUMNS = [
  ['Cas d’usage', USE_CASES.map((u) => [u.label, u.to])],
  ['Trame', [...SECTORS, ...PAGES].map((p) => [p.label, p.to])],
  ['Contact', [['contact@trame-labs.com', 'mailto:contact@trame-labs.com'], ['LinkedIn', 'https://www.linkedin.com/company/trame-labs'], ['Finance Shift, la newsletter', 'https://financeshift.substack.com/'], ['Mentions légales', '/mentions-legales']]],
];

function FooterLink({ label, href }) {
  return <Link className="tl-footer-link" to={href}>{label}</Link>;
}

export default function Footer() {
  return (
    <footer className="tl-footer">
      <Rails tone="warm">
        <div className="tl-wrap tl-footer-grid" style={{ paddingTop: 56, paddingBottom: 56 }}>
          {COLUMNS.map(([title, items]) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h3 className="tl-footer-title">{title}</h3>
              {items.map(([label, href]) => <FooterLink key={label} label={label} href={href} />)}
            </div>
          ))}
          {/* TODO: wire to the newsletter provider — currently a no-op. */}
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 className="tl-footer-title" style={{ marginBottom: 0 }}>Abonnez-vous !</h3>
            <p style={{ margin: '0 0 8px', fontSize: 15, lineHeight: 1.5 }}>Inscrivez-vous à notre newsletter pour recevoir les derniers conseils, actualités et analyses</p>
            <input className="tl-footer-input" type="email" required placeholder="votre email" aria-label="Email" />
            <Button type="submit" style={{ width: '100%' }}>S’abonner</Button>
          </form>
        </div>

        <Divider tone="warm" />
        <div className="tl-wrap">
          <div style={{ padding: '64px 0 40px' }}>
            <Logo variant="alt" height={98} title="Trame Labs" style={{ width: '100%', height: 'auto' }} />
          </div>
          <p style={{ margin: 0, padding: '0 0 32px', fontSize: 15, color: 'var(--text-ink)' }}>© 2026 Trame labs. Tous droits réservés. Designed by arianemoder.</p>
        </div>
      </Rails>
    </footer>
  );
}
