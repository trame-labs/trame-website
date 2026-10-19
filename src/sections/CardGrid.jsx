import { IMG } from '../lib/helpers.js';
import { Link } from '../lib/router.js';

/** Four-up grid of square image cards with a title and description (Cas d’usage). A fourth item field makes the card a link. */
export default function CardGrid({ items, alt = '', cardBackground }) {
  return (
    <div className="tl-grid-4">
      {items.map(([file, title, desc, href]) => {
        const body = (
          <>
            <div style={{ borderRadius: 12, overflow: 'hidden', background: cardBackground }}>
              <img src={IMG(file, 800)} alt={alt} loading="lazy" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }} />
            </div>
            <h3 className="tl-h3">{title}{href && <span aria-hidden="true"> →</span>}</h3>
            <p className="tl-lead tl-lead--sm">{desc}</p>
          </>
        );
        return href
          ? <Link key={title} to={href} className="tl-card-link" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{body}</Link>
          : <article key={title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{body}</article>;
      })}
    </div>
  );
}
