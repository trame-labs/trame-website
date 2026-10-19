// Building blocks for the inner pages, made from the home page's pieces (rails, headings, grids, closing landscape).
import Button from './ui/Button.jsx';
import Icon from './ui/Icon.jsx';
import { Rails } from './layout/Rails.jsx';
import LoomBackground from './ui/LoomBackground.jsx';
import SectionHeading from '../sections/SectionHeading.jsx';
import CardGrid from '../sections/CardGrid.jsx';
import { Kicker } from '../sections/SectionHeading.jsx';

/** Dark page header with the loom threads, centred like the home hero; `children` is the visual under the copy. */
export function PageHero({ kicker, title, lead, onDemo, secondary, children }) {
  return (
    <Rails tone="dark">
      <section id="hero" style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-inverse)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, margin: '0 auto', width: 'calc(100% - 48px)', maxWidth: 1200, overflow: 'hidden' }}>
          <LoomBackground />
        </div>
        <div className="tl-wrap" style={{ position: 'relative', paddingTop: 104, paddingBottom: children ? 0 : 96, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
          <span className="tl-eyebrow" style={{ color: 'var(--brand-yellow-500)' }}>{kicker}</span>
          <h1 className="tl-h1 tl-h1--page" style={{ maxWidth: 860, color: 'var(--text-on-inverse)' }}>{title}</h1>
          {lead && <p className="tl-lead" style={{ maxWidth: 620, color: 'var(--text-on-inverse)' }}>{lead}</p>}
          {onDemo && (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button size="lg" variant="signal" onClick={onDemo}>Réserver une démo</Button>
              {secondary}
            </div>
          )}
        </div>
        {children && (
          <div className="tl-wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 64, paddingBottom: 96 }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>{children}</div>
          </div>
        )}
      </section>
    </Rails>
  );
}

/** Closing section over the knitted landscape (same as the home page). */
export function ClosingCta({ title = 'Apportez un chiffre qui ne tombe pas', sub, onDemo, label = 'Réserver une démo', href }) {
  return (
    <section className="tl-cta-frame">
      <div className="tl-wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
        <h2 className="tl-h2 tl-h2--xl" style={{ maxWidth: 860, color: 'var(--text-ink)' }}>{title}</h2>
        {sub && <p className="tl-lead tl-lead--sm" style={{ maxWidth: 600, color: 'var(--neutral-600)' }}>{sub}</p>}
        <Button size="lg" href={href} onClick={href ? undefined : onDemo} style={{ marginTop: 8 }}>{label}</Button>
      </div>
      <img className="tl-cta-landscape" src="/assets/illustrations/knit-landscape.png" alt="" width="1412" height="648" loading="lazy" />
    </section>
  );
}

/** A section with the standard heading; `aside` puts content on the right (copy left, visual right). */
export function Section({ id, kicker, title, lead, aside, children, maxWidth = 680 }) {
  const head = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionHeading kicker={kicker} maxWidth={maxWidth}>{title}</SectionHeading>
      {lead && <p className="tl-lead" style={{ maxWidth: 560 }}>{lead}</p>}
    </div>
  );
  if (aside) {
    return (
      <section id={id} className="tl-wrap tl-section tl-split">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>{head}{children}</div>
        <div>{aside}</div>
      </section>
    );
  }
  return (
    <section id={id} className="tl-wrap tl-section" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {head}
      {children}
    </section>
  );
}

/**
 * White example table, styled like the product screenshots.
 * rows: [label, source, ...values] arrays, or { cells, total } objects. `text` sets values as prose instead of figures.
 */
export function DataCard({ title, chip, columns, rows, note, foot, text = false }) {
  return (
    <figure className={'tl-data' + (text ? ' tl-data--text' : '')}>
      <div className="tl-data-head">
        <span className="tl-data-title">{title}</span>
        {chip && <span className="tl-data-chip">{chip}</span>}
      </div>
      <div className="tl-data-scroll">
        <table>
          {columns && <thead><tr>{columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>}
          <tbody>
            {rows.map((row, i) => {
              const { cells, total } = Array.isArray(row) ? { cells: row } : row;
              const [label, src, ...values] = cells;
              return (
                <tr key={i} className={total ? 'is-total' : undefined}>
                  <td>{label}{src && <span className="tl-data-src">{src}</span>}</td>
                  {values.map((v, j) => <td key={j} className="tl-data-v">{v}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {note && <p className="tl-data-note">{note}</p>}
      <figcaption className="tl-data-foot"><span>{foot}</span><em>Exemple fictif</em></figcaption>
    </figure>
  );
}

/** Dated log (decisions, access, definitions). items: [time, kind, text, detail]. */
export function Journal({ title, chip, items, foot }) {
  return (
    <figure className="tl-data">
      <div className="tl-data-head"><span className="tl-data-title">{title}</span>{chip && <span className="tl-data-chip">{chip}</span>}</div>
      <ol className="tl-journal">
        {items.map(([time, kind, text, detail]) => (
          <li key={time + text}><time>{time}</time><div><span className="tl-journal-kind">{kind}</span>{text}{detail && <span className="tl-data-src">{detail}</span>}</div></li>
        ))}
      </ol>
      <figcaption className="tl-data-foot"><span>{foot}</span><em>Exemple fictif</em></figcaption>
    </figure>
  );
}

/** “Aujourd’hui / Avec Trame” pairs. */
export function Compare({ rows }) {
  return <DataCard title="Aujourd’hui, avec Trame" columns={['Aujourd’hui', 'Avec Trame']} rows={rows.map(([a, b]) => [a, null, b])} foot="Ce qui change dès le premier mois." text />;
}

/** Numbered steps in the four-column grid. items: [title, desc]. */
export function Steps({ items }) {
  return (
    <ol className="tl-grid-4 tl-steps">
      {items.map(([title, desc], i) => (
        <li key={title}>
          <span className="tl-step-n">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="tl-h3">{title}</h3>
          <p className="tl-lead tl-lead--sm">{desc}</p>
        </li>
      ))}
    </ol>
  );
}

/** Icon + title + text, like the home “Bénéfices”. items: [materialIcon, title, desc]. */
export function IconGrid({ items, cols = 3 }) {
  return (
    <div className={`tl-grid-${cols}`}>
      {items.map(([icon, title, desc]) => (
        <article key={title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="tl-icon-tile"><Icon name={icon} size={28} /></span>
          <h3 className="tl-h3">{title}</h3>
          <p className="tl-lead tl-lead--sm">{desc}</p>
        </article>
      ))}
    </div>
  );
}

export function Quote({ text, who }) {
  return (
    <figure className="tl-quote">
      <blockquote>« {text} »</blockquote>
      <figcaption>{who}</figcaption>
    </figure>
  );
}

/** Questions to ask Trame or your AI. items: [question, topic]. */
export function Questions({ items }) {
  return (
    <div className="tl-grid-3">
      {items.map(([q, topic]) => (
        <div key={q} className="tl-ask">
          <Icon name="chat_bubble" size={20} />
          <p>« {q} »</p>
          <span>{topic}</span>
        </div>
      ))}
    </div>
  );
}

export function Faq({ items }) {
  return (
    <section className="tl-wrap tl-section tl-split tl-split--top">
      <SectionHeading kicker="Questions fréquentes">Ce que l’on nous demande</SectionHeading>
      <div className="tl-faq">
        {items.map(([q, a]) => (
          <details key={q}>
            <summary>{q}<Icon name="add" size={20} /></summary>
            <p className="tl-lead tl-lead--sm">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Other use cases, as the home page's image cards. */
export function Related({ title = 'Sur les mêmes chiffres', items }) {
  return (
    <section className="tl-wrap tl-section" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <SectionHeading kicker="Cas d’usage">{title}</SectionHeading>
      <CardGrid items={items.map((u) => [u.img, u.label, u.desc, u.to])} alt="Aperçu du cas d’usage" />
    </section>
  );
}

/** One-line proof band (customer + result). */
export function ProofBand({ who, what }) {
  return (
    <div className="tl-wrap" style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', textAlign: 'center' }}>
      <Kicker>{who}</Kicker>
      <span className="tl-lead tl-lead--sm" style={{ color: 'var(--text-strong)' }}>{what}</span>
    </div>
  );
}

/** A question asked to Claude and its answer on closed numbers. */
export function Answer({ who, question, figure, answer, trace }) {
  return (
    <figure className="tl-data">
      <div className="tl-data-head"><span className="tl-data-title">{who}</span><span className="tl-data-chip">Branché sur Trame</span></div>
      <div className="tl-answer">
        <p className="tl-answer-q">{question}</p>
        <p className="tl-answer-a"><span className="tl-answer-n">{figure}</span>{answer}</p>
      </div>
      <figcaption className="tl-data-foot"><span>{trace}</span><em>Exemple fictif</em></figcaption>
    </figure>
  );
}
