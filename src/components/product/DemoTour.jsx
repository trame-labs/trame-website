// Home hero: a click-through of the real product, from screenshots of the « P&L analytique » demo (Acme Groupe,
// trame-monorepo branch demo/pnl-dashboards). Each screen has hotspots where the product is clickable; « Suivant »
// walks the same path for visitors who would rather not aim. Hotspot boxes are % of the 1440 × 900 screenshots.
import { useEffect, useState } from 'react';
import { useT } from '../../lib/i18n.js';
import '../../styles/demo-tour.css';

const SRC = (id) => `/assets/product/${id}.webp`;
const CLOSE = { x: 96.6, y: 5.9, w: 2.9, h: 4.4 };

// Hotspots: where to click on each screen, and which screen it leads to.
const SCREENS = {
  '1-pnl': { spots: [{ to: '2-menu', box: { x: 67.2, y: 54.6, w: 7.5, h: 4.4 }, pulse: true }] },
  '2-menu': { spots: [{ to: '4-detail', box: { x: 71, y: 57.9, w: 21.6, h: 4 }, pulse: true }, { to: '3-calc', box: { x: 71, y: 61.9, w: 21.6, h: 4 } }] },
  '4-detail': { spots: [{ to: '5-account', box: { x: 72.8, y: 24.8, w: 26.7, h: 5.6 }, pulse: true }, { to: '1-pnl', box: CLOSE }] },
  '5-account': { spots: [{ to: '6-ledger', box: { x: 74.2, y: 93.8, w: 11.2, h: 3.8 }, pulse: true }, { to: '1-pnl', box: CLOSE }] },
  '6-ledger': { spots: [{ to: '3-calc', box: { x: 45, y: 0.5, w: 25.6, h: 4.9 }, pulse: true }] },
  '3-calc': { spots: [{ to: '7-lineage', box: { x: 73.2, y: 47.6, w: 18, h: 3 }, pulse: true }, { to: '1-pnl', box: CLOSE }] },
  '7-lineage': { spots: [{ to: '1-pnl', box: CLOSE, pulse: true }] },
};
const PATH = ['1-pnl', '2-menu', '4-detail', '5-account', '6-ledger', '3-calc', '7-lineage'];

export default function DemoTour() {
  const t = useT();
  const [screen, setScreen] = useState('1-pnl');

  // Fetch the other screens once the page has loaded, so each click shows its screen at once.
  useEffect(() => {
    const preload = () => PATH.slice(1).forEach((id) => { new Image().src = SRC(id); });
    if (document.readyState === 'complete') preload();
    else window.addEventListener('load', preload, { once: true });
  }, []);

  const caption = {
    '1-pnl': t('Le P&L analytique d’Acme Groupe, calculé sur les écritures de ses 4 entités. Cliquez sur Frais IT de juin.', 'Acme Group’s analytical P&L, computed from the entries of its 4 entities. Click June’s IT costs.'),
    '2-menu': t('Deux questions sur n’importe quel chiffre : de quoi il est fait, et comment il est calculé.', 'Two questions on any figure: what it is made of, and how it is calculated.'),
    '4-detail': t('−79 373 € décomposés par entité, par nature et par compte, chaque niveau avec sa part. Ouvrez Acme Services SAS.', '−€79,373 broken down by entity, nature and account, each level with its share. Open Acme Services SAS.'),
    '5-account': t('Jusqu’aux 5 écritures du compte 651100 : Notion, Lucca, Microsoft 365, Jira, Slack. Ouvrez-les dans la table.', 'Down to the 5 entries of account 651100: Notion, Lucca, Microsoft 365, Jira, Slack. Open them in the table.'),
    '6-ledger': t('Le grand livre filtré : 5 lignes, −3 452,77 €, au centime près du chiffre de départ. Revenez au P&L.', 'The filtered ledger: 5 lines, −€3,452.77, to the cent of the starting figure. Back to the P&L.'),
    '3-calc': t('Comment le chiffre est calculé : définition, calcul, sources et règles de mapping. Suivez le lineage.', 'How the figure is calculated: definition, calculation, sources and mapping rules. Follow the lineage.'),
    '7-lineage': t('Le lineage : du grand livre Fulll et de l’export de paie, par les référentiels, jusqu’au P&L.', 'The lineage: from the Fulll ledger and the payroll export, through the reference tables, to the P&L.'),
  };
  const step = PATH.indexOf(screen);
  const next = PATH[(step + 1) % PATH.length];

  return (
    <figure className="dt" aria-label={t('Visite du produit Trame', 'Tour of the Trame product')}>
      <div className="dt-frame">
        <div className="dt-bar" aria-hidden="true"><i /><i /><i /><span>app.trame-labs.com</span></div>
        <div className="dt-screen">
          {/* All screens are in the page so a click swaps them without a flash; only the current one is shown. */}
          {PATH.map((id, i) => (
            <img
              key={id}
              src={SRC(id)}
              alt={id === screen ? caption[id] : ''}
              aria-hidden={id === screen ? undefined : true}
              width="2240"
              height="1400"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={id === screen ? 'on' : undefined}
            />
          ))}
          {SCREENS[screen].spots.map((s) => (
            <button
              key={screen + s.to}
              type="button"
              className={s.pulse ? 'dt-spot pulse' : 'dt-spot'}
              style={{ left: `${s.box.x}%`, top: `${s.box.y}%`, width: `${s.box.w}%`, height: `${s.box.h}%` }}
              aria-label={caption[s.to]}
              onClick={() => setScreen(s.to)}
            />
          ))}
        </div>
      </div>
      <figcaption className="dt-cap">
        <span className="dt-step">{step + 1} / {PATH.length}</span>
        <p aria-live="polite">{caption[screen]}</p>
        <span className="dt-nav">
          {step > 0 && <button type="button" onClick={() => setScreen('1-pnl')}>{t('Recommencer', 'Start over')}</button>}
          <button type="button" className="next" onClick={() => setScreen(next)}>{step === PATH.length - 1 ? t('Revoir', 'See again') : t('Suivant →', 'Next →')}</button>
        </span>
      </figcaption>
    </figure>
  );
}
