// Home hero: the Trame Chat at work. Thomas asks to add the Lucca payroll to the analytical P&L; the agent reads
// the P&L's context, reconciles payroll with the books, flags a gap, asks for approval, then the P&L and its context
// update. A scripted scene in the product's own look (Chat page and context panel of trame-monorepo, demo branch).
import { useEffect, useRef, useState } from 'react';
import { useT } from '../../lib/i18n.js';
import { prefersReducedMotion } from '../../lib/helpers.js';
import '../../styles/agent-demo.css';

// The scene, beat by beat (ms on screen). Rendering reads which beats have been reached.
const BEATS = [
  ['idle', 900], ['type', 2600], ['sent', 600],
  ['r1a', 1100], ['r1b', 1100], ['r1c', 1200], ['r1d', 1100], ['text1', 2600],
  ['r2a', 1000], ['r2b', 800], ['r2c', 800], ['r2d', 800], ['r2e', 1100], ['text2', 2400],
  ['ask', 2800], ['valid', 500], ['r3', 1500], ['done', 9000],
];
const IDX = Object.fromEntries(BEATS.map(([id], i) => [id, i]));

const Sparkles = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.94 14.06 4.5 12l5.44-2.06L12 4.5l2.06 5.44L19.5 12l-5.44 2.06L12 19.5z" /><path d="M19 3v4M17 5h4" /></svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>
);

/** The product's tool run: the step in flight with a pulsing dot, then one checked line « N étapes · … ». */
function ToolRun({ steps, shown, running, t }) {
  const list = steps.slice(0, shown);
  if (running) return <p className="ad-run"><span className="ad-dot" />{list[list.length - 1]}</p>;
  return <p className="ad-run done"><Check /><span>{t(`${list.length} étapes`, `${list.length} steps`)} · {list.join(' · ')}</span></p>;
}

export default function AgentDemo() {
  const t = useT();
  const [beat, setBeat] = useState(0);
  const [typed, setTyped] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);
  const rootRef = useRef(null);
  const id = BEATS[beat][0];
  const at = (b) => beat >= IDX[b];
  const within = (a, b) => beat >= IDX[a] && beat <= IDX[b];

  const prompt = t('Ajoute la paie Lucca au P&L analytique, ventilée par département.', 'Add the Lucca payroll to the analytical P&L, split by department.');

  // Reduced motion: the finished scene, no playback. Otherwise play while the scene is on screen.
  useEffect(() => {
    if (prefersReducedMotion()) { setStill(true); setBeat(IDX.done); setTyped(prompt.length); return undefined; }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, [prompt.length]);

  useEffect(() => {
    if (still || !visible || paused) return undefined;
    const timer = setTimeout(() => setBeat((b) => (b + 1) % BEATS.length), BEATS[beat][1]);
    return () => clearTimeout(timer);
  }, [beat, visible, paused, still]);

  // The prompt types itself into the composer.
  useEffect(() => {
    if (id === 'idle') setTyped(0);
    if (id !== 'type' || still) return undefined;
    const every = (BEATS[IDX.type][1] * 0.85) / prompt.length;
    const timer = setInterval(() => setTyped((n) => Math.min(n + 1, prompt.length)), every);
    return () => clearInterval(timer);
  }, [id, still, prompt.length]);

  const run1 = [
    t('Lecture du contexte de « P&L analytique »', 'Reading the context of “Analytical P&L”'),
    t('Modèle : 14 lignes, sources HubSpot, Pennylane et Xero', 'Model: 14 lines, sources HubSpot, Pennylane and Xero'),
    t('Salaires en compta : comptes 641 et 645, 2 entités', 'Salaries in the books: accounts 641 and 645, 2 entities'),
    t('Import Lucca : paie de septembre, 412 salariés', 'Lucca import: September payroll, 412 employees'),
  ];
  const run2 = [
    t('Rapprochement des 28 rubriques Lucca avec les comptes 641 et 645', 'Matching the 28 Lucca pay items to accounts 641 and 645'),
    t('Contrôle effectifs : 412 = 412', 'Headcount check: 412 = 412'),
    t('Contrôle brut : 1 642 310 € = 1 642 310 €', 'Gross pay check: €1,642,310 = €1,642,310'),
    t('Contrôle charges : 366 683 € = 366 683 €', 'Social charges check: €366,683 = €366,683'),
    t('Contrôle primes : écart de 4 000 €', 'Bonus check: €4,000 gap'),
  ];
  const run3 = [
    t('Ventilation de la masse salariale par département', 'Splitting payroll by department'),
    t('Mise à jour de « P&L analytique » et de son contexte', 'Updating “Analytical P&L” and its context'),
  ];
  const count = (from, n) => Math.min(n, beat - IDX[from] + 1);

  const depts = [
    [t('Production', 'Delivery'), '−1 412,6', '−1,412.6'],
    [t('Commercial', 'Sales'), '−251,3', '−251.3'],
    [t('Direction générale', 'Management'), '−198,7', '−198.7'],
    [t('Finance et RH', 'Finance and HR'), '−146,3', '−146.3'],
  ];
  const num = (fr, en) => t(fr, en);
  const done = at('done');
  const gap = at('text2');

  return (
    <div
      ref={rootRef}
      className="ad"
      role="group"
      aria-label={t('Démonstration : le chat Trame ajoute la paie au P&L', 'Demo: the Trame chat adds payroll to the P&L')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="ad-tabs" aria-hidden="true">
        <span>Tables</span><span className="on">Chat</span><span>{t('P&L analytique', 'Analytical P&L')}</span>
      </div>
      <div className="ad-app">
        <aside className="ad-side" aria-hidden="true">
          <div className="ad-ws"><b>A</b>Acme Groupe</div>
          <p className="ad-over">Navigation</p>
          <span>{t('Accueil', 'Home')}</span><span className="on">Chat</span><span>{t('Tableaux de bord', 'Dashboards')}</span>
          <p className="ad-over">Trames</p>
          <span>Reporting</span><span className="sub">{t('P&L analytique', 'Analytical P&L')}</span><span>{t('Contrôles', 'Controls')}</span>
          {done && <span className="sub new">{t('Paie ↔ compta', 'Payroll ↔ books')}</span>}
          <p className="ad-over">Sources</p>
          <span data-src="hubspot">HubSpot</span><span data-src="pennylane">Pennylane</span><span data-src="xero">Xero</span>
          {done && <span data-src="lucca" className="new">Lucca · {t('Paie', 'Payroll')}</span>}
        </aside>

        <section className="ad-chat">
          <div className="ad-thread">
            {at('sent') && <div className="ad-user">{prompt}</div>}
            {at('r1a') && (
              <div className="ad-agent">
                <span className="ad-avatar"><Sparkles /></span>
                <div className="ad-body">
                  <ToolRun steps={run1} shown={count('r1a', 4)} running={within('r1a', 'r1d')} t={t} />
                  {at('text1') && (
                    <p className="ad-text">{t(
                      <>Le P&L lit déjà <b>HubSpot, Pennylane et Xero</b>. La masse salariale y est d’un seul bloc, <b>2 008 993 €</b> en septembre, sans département. Lucca connaît le département de chaque salarié : je rapproche d’abord sa paie de la compta.</>,
                      <>The P&L already reads <b>HubSpot, Pennylane and Xero</b>. Payroll sits there as one block, <b>€2,008,993</b> in September, with no department. Lucca knows each employee’s department: I first reconcile its payroll with the books.</>,
                    )}</p>
                  )}
                  {at('r2a') && <ToolRun steps={run2} shown={count('r2a', 5)} running={within('r2a', 'r2e')} t={t} />}
                  {gap && (
                    <div className="ad-card">
                      <ul className="ad-checks">
                        <li>{t('Effectifs', 'Headcount')}<span>412 = 412</span></li>
                        <li>{t('Salaire brut', 'Gross pay')}<span>{num('1 642 310 €', '€1,642,310')}</span></li>
                        <li>{t('Charges sociales', 'Social charges')}<span>{num('366 683 €', '€366,683')}</span></li>
                        <li className="gap">{t('Primes', 'Bonuses')}<span>{t('écart 4 000 €', '€4,000 gap')}</span></li>
                      </ul>
                      <p>{t('Prime de Marc D. (Commercial) saisie dans Lucca le 28/09, après l’envoi de l’écriture de paie. Je la laisse en écart à justifier, sans toucher à la compta.', 'A bonus for Marc D. (Sales) keyed into Lucca on 28 Sep, after the payroll entry was sent. I leave it as a gap to justify, without touching the books.')}</p>
                    </div>
                  )}
                  {at('ask') && (
                    <div className="ad-ask">
                      <p>{t('Ventiler la masse salariale de septembre par département ?', 'Split September’s payroll by department?')}</p>
                      <span>
                        <button type="button" className={at('valid') ? 'pressed' : undefined} disabled={at('valid')} onClick={() => setBeat(IDX.valid)}>{at('valid') ? t('Validé', 'Approved') : t('Valider', 'Approve')}</button>
                        <button type="button" className="ghost" tabIndex={-1}>{t('Voir les 412 lignes', 'See the 412 lines')}</button>
                      </span>
                    </div>
                  )}
                  {at('r3') && <ToolRun steps={run3} shown={count('r3', 2)} running={id === 'r3'} t={t} />}
                  {done && <p className="ad-text">{t('C’est fait : le P&L ventile la masse salariale par département, et l’écart de 4 000 € est suivi dans Contrôles.', 'Done: the P&L splits payroll by department, and the €4,000 gap is tracked in Controls.')}</p>}
                </div>
              </div>
            )}
          </div>
          <div className="ad-composer">
            <span className={id === 'type' || id === 'sent' ? 'typing' : undefined}>
              {id === 'type' ? <>{prompt.slice(0, typed)}<i className="ad-caret" /></> : <em>{t('Posez votre question sur vos chiffres…', 'Ask a question about your figures…')}</em>}
            </span>
            <b aria-hidden="true">↑</b>
          </div>
        </section>

        <aside className="ad-panel" aria-label={t('P&L analytique et son contexte', 'Analytical P&L and its context')}>
          <div className="ad-panel-head">
            <p>{t('P&L analytique', 'Analytical P&L')}</p>
            <span>{t('Sept. 2026 · k€ · consolidé', 'Sep 2026 · €k · consolidated')}</span>
          </div>
          <table className="ad-pnl">
            <tbody>
              <tr><td>{t('Chiffre d’affaires', 'Revenue')}</td><td>{num('4 207,2', '4,207.2')}</td></tr>
              <tr className={['ad-mass', id === 'r1c' && 'hl', done && 'open'].filter(Boolean).join(' ')}>
                <td>{t('Masse salariale', 'Payroll')}{gap && <em className="ad-gap">{t('écart 4 000 €', '€4,000 gap')}</em>}</td>
                <td>{num('−2 008,9', '−2,008.9')}</td>
              </tr>
              {done && depts.map(([name, fr, en]) => <tr key={name} className="ad-dept"><td>{name}</td><td>{num(fr, en)}</td></tr>)}
              <tr><td>{t('Sous-traitance', 'Subcontracting')}</td><td>{num('−67,3', '−67.3')}</td></tr>
              <tr><td>{t('Frais généraux', 'Overheads')}</td><td>{num('−482,1', '−482.1')}</td></tr>
              <tr className="total"><td>EBITDA</td><td>{num('1 648,9', '1,648.9')}</td></tr>
            </tbody>
          </table>
          <div className={within('r1a', 'r1b') ? 'ad-ctx hl' : 'ad-ctx'}>
            <p className="ad-over">{t('Contexte du P&L', 'P&L context')}</p>
            <dl>
              <dt>Sources</dt>
              <dd><span data-src="hubspot">HubSpot</span><span data-src="pennylane">Pennylane</span><span data-src="xero">Xero</span>{done && <span data-src="lucca" className="new">Lucca</span>}</dd>
              <dt>{t('Règles', 'Rules')}</dt>
              <dd>{t('7xx → Chiffre d’affaires · 641, 645 → Masse salariale', '7xx → Revenue · 641, 645 → Payroll')}{done && <span className="new block">{t('641, 645 ventilés par département (Lucca)', '641, 645 split by department (Lucca)')}</span>}</dd>
              <dt>{t('Contrôles', 'Controls')}</dt>
              <dd>{done ? <span className="new">{t('Paie ↔ compta · 3 OK · 1 écart', 'Payroll ↔ books · 3 OK · 1 gap')}</span> : '—'}</dd>
              <dt>{t('Décisions', 'Decisions')}</dt>
              <dd>{done ? <span className="new">{t('Thomas · 24/10 · ventilation validée', 'Thomas · 24 Oct · split approved')}</span> : '—'}</dd>
            </dl>
          </div>
        </aside>
      </div>
      {done && !still && <button type="button" className="ad-replay" onClick={() => setBeat(0)}>{t('Rejouer', 'Replay')}</button>}
    </div>
  );
}
