import Button from '../ui/Button.jsx';
import Logo from '../ui/Logo.jsx';
import { Divider, Rails } from './Rails.jsx';
import { scrollToId } from '../../lib/helpers.js';

const COLUMNS = [
  ['Menu', [['Fonctionnalités', '#features-section'], ['Bénéfices', '#benefit-section'], ['Cas d’usage', '#use-case-section']]],
  ['Blog', [['The Finance Shift', 'https://financeshift.substack.com/']]],
  ['Contact', [['contact@trame-labs.com', 'mailto:contact@trame-labs.com'], ['LinkedIn', 'https://www.linkedin.com/company/trame-labs']]],
];

function FooterLink({ label, href }) {
  const internal = href.startsWith('#');
  return (
    <a className="tl-footer-link" href={href}
      onClick={internal ? (e) => { e.preventDefault(); scrollToId(href.slice(1)); } : undefined}
      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="tl-footer">
      <Rails tone="warm">
        <div className="tl-wrap tl-footer-grid" style={{ paddingTop: 56, paddingBottom: 56 }}>
          {COLUMNS.map(([title, items]) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <h3 className="tl-footer-title">{title}</h3>
              {items.map(([label, href]) => <FooterLink key={label} label={label} href={href} />)}
            </div>
          ))}
          {/* TODO: wire to the newsletter provider — currently a no-op. */}
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 className="tl-footer-title" style={{ marginBottom: 0 }}>Abonnez-vous !</h3>
            <p style={{ margin: '0 0 12px', fontSize: 18, lineHeight: 1.5 }}>Inscrivez-vous à notre newsletter pour recevoir les derniers conseils, actualités et analyses</p>
            <input className="tl-footer-input" type="email" required placeholder="votre email" aria-label="Email" />
            <Button type="submit" size="lg" style={{ width: '100%', fontSize: 18 }}>S’abonner</Button>
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
