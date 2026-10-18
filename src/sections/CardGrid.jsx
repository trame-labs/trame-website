import { IMG } from '../lib/helpers.js';

/** Four-up grid of square image cards with a title and description (Cas d’usage, Bénéfices). */
export default function CardGrid({ items, alt = '', cardBackground }) {
  return (
    <div className="tl-grid-4">
      {items.map(([file, title, desc]) => (
        <article key={title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', background: cardBackground }}>
            <img src={IMG(file, 800)} alt={alt} loading="lazy" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }} />
          </div>
          <h3 className="tl-h3">{title}</h3>
          <p className="tl-lead tl-lead--sm">{desc}</p>
        </article>
      ))}
    </div>
  );
}
