import Button from '../ui/Button.jsx';
import { IMG, scrollToId } from '../../lib/helpers.js';

const COLUMNS = [
  ['Menu', [['Fonctionnalités', '#features-section'], ['Bénéfices', '#benefit-section'], ['Cas d’usage', '#use-case-section']]],
  ['Blog', [['The Finance Shift', 'https://financeshift.substack.com/']]],
  ['Contact', [['contact@trame-labs.com', 'mailto:contact@trame-labs.com'], ['Linkedin', 'https://www.linkedin.com/company/trame-labs']]],
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface-page)', boxShadow: 'inset 0 1px 0 var(--border-subtle)' }}>
      <div className="tl-wrap tl-footer-grid" style={{ paddingTop: 64, paddingBottom: 40 }}>
        {COLUMNS.map(([title, items]) => (
          <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="tl-eyebrow">{title}</span>
            {items.map(([label, href]) => {
              const internal = href.startsWith('#');
              return (
                <a key={label} href={href}
                  onClick={internal ? (e) => { e.preventDefault(); scrollToId(href.slice(1)); } : undefined}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  style={{ color: 'var(--text-strong)', textDecoration: 'none', fontSize: 14 }}>
                  {label}
                </a>
              );
            })}
          </div>
        ))}
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 500 }}>Abonnez-vous !</span>
          <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-body)' }}>Inscrivez-vous à notre newsletter pour recevoir les derniers conseils, actualités et analyses</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="email" required placeholder="Email" aria-label="Email"
              style={{ flex: 1, minWidth: 0, height: 40, padding: '0 12px', borderRadius: 6, border: 'none', boxShadow: 'var(--hairline-strong)', font: '400 14px var(--font-sans)', background: '#fff', outline: 'none' }} />
            <Button type="submit" size="md">Submit</Button>
          </div>
        </form>
      </div>
      <div className="tl-wrap" style={{ paddingTop: 8 }}>
        <img src={IMG('oryGb4kiK0VEZHRE6bgxNFbsJCc.png', 2048)} alt="Trame labs" loading="lazy" style={{ width: '100%', display: 'block' }} />
      </div>
      <div className="tl-wrap" style={{ paddingTop: 20, paddingBottom: 28, fontSize: 12, color: 'var(--text-muted)' }}>
        © 2026 Trame labs. Tous droits réservés. Designed by arianemoder.
      </div>
    </footer>
  );
}
