// Home hero: the Trame Chat at work, and the P&L's context building up beside it. Thomas asks to add the Lucca
// payroll to the analytical P&L; the agent reads the context, reconciles payroll with the books, flags a gap and asks
// for approval. The rules file, sources, controls and change history fill in as it goes; the P&L itself sits behind
// « Voir le modèle ». A scripted scene in the product's look (Chat page of trame-monorepo, demo branch).
import { useEffect, useRef, useState } from 'react';
import { useT } from '../../lib/i18n.js';
import { prefersReducedMotion } from '../../lib/helpers.js';
import '../../styles/agent-demo.css';

// The scene, beat by beat (ms on screen). Rendering reads which beats have been reached.
const BEATS = [
  ['idle', 900], ['type', 2600], ['sent', 500],
  ['r1a', 1200], ['r1b', 1100], ['r1c', 1200], ['r1d', 1200], ['text1', 2000],
  ['r2a', 1400], ['r2b', 700], ['r2c', 700], ['r2d', 700], ['r2e', 1300], ['text2', 2000],
  ['ask', 3000], ['valid', 900], ['r3', 1100], ['r3b', 1100], ['r3c', 1200], ['done', 9000],
];
const IDX = Object.fromEntries(BEATS.map(([id], i) => [id, i]));
const LOGO = { hubspot: '/assets/logos/hubspot.svg', pennylane: '/assets/logos/pennylane.png', xero: '/assets/logos/xero.svg', lucca: '/assets/logos/lucca.png' };

const Icon = ({ d }) => <svg viewBox="0 0 24 24" aria-hidden="true">{d.map((p) => <path key={p} d={p} />)}</svg>;
const ICONS = {
  home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V21h14V9.5'],
  chat: ['M4 5h16v11H8l-4 4z'],
  boards: ['M4 4h7v7H4z', 'M13 4h7v4h-7z', 'M13 10h7v10h-7z', 'M4 13h7v7H4z'],
  tables: ['M4 4h16v16H4z', 'M4 10h16', 'M10 4v16'],
  plug: ['M9 3v5', 'M15 3v5', 'M6 8h12v3a6 6 0 0 1-12 0z', 'M12 17v4'],
  sparkles: ['M9.94 14.06 4.5 12l5.44-2.06L12 4.5l2.06 5.44L19.5 12l-5.44 2.06L12 19.5z', 'M19 3v4', 'M17 5h4'],
  check: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'm8.5 12 2.5 2.5 4.5-5'],
  flag: ['M5 21V4', 'M5 4h11l-2 4 2 4H5'],
  ext: ['M7 17 17 7', 'M8 7h9v9'],
  doc: ['M6 3h9l4 4v14H6z', 'M14 3v5h5', 'M9 12h6', 'M9 16h6'],
  lock: ['M6 11h12v9H6z', 'M8.5 11V8a3.5 3.5 0 0 1 7 0v3'],
  trend: ['m4 16 5-5 4 4 7-7', 'M15 8h5v5'],
};

/** The product's tool run: the step in flight with a pulsing dot, then one checked line « N étapes · … ». */
function ToolRun({ steps, shown, running, t }) {
  const list = steps.slice(0, shown);
  if (running) return <p className="ad-run"><span className="ad-dot" />{list[list.length - 1]}</p>;
  return <p className="ad-run done"><Icon d={ICONS.check} /><span>{t(`${list.length} étapes`, `${list.length} steps`)} · {list.join(' · ')}</span></p>;
}

export default function AgentDemo() {
  const t = useT();
  const [beat, setBeat] = useState(0);
  const [typed, setTyped] = useState(0);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);
  const [sheet, setSheet] = useState(null); // 'model' | 'control' | null
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
    if (still || !visible || hover || sheet) return undefined;
    const timer = setTimeout(() => setBeat((b) => (b + 1) % BEATS.length), BEATS[beat][1]);
    return () => clearTimeout(timer);
  }, [beat, visible, hover, sheet, still]);

  // The prompt types itself into the composer.
  useEffect(() => {
    if (id === 'idle') { setTyped(0); setSheet(null); }
    if (id !== 'type' || still) return undefined;
    const every = (BEATS[IDX.type][1] * 0.85) / prompt.length;
    const timer = setInterval(() => setTyped((n) => Math.min(n + 1, prompt.length)), every);
    return () => clearInterval(timer);
  }, [id, still, prompt.length]);

  const run1 = [
    t('Lecture du contexte de « P&L analytique »', 'Reading the context of “Analytical P&L”'),
    t('Sources : HubSpot, Pennylane, Xero', 'Sources: HubSpot, Pennylane, Xero'),
    t('Salaires en compta : comptes 641 et 645, sans département', 'Salaries in the books: accounts 641 and 645, no department'),
    t('Lecture de l’export Lucca : 412 salariés, 28 rubriques', 'Reading the Lucca export: 412 employees, 28 pay items'),
  ];
  const run2 = [
    t('Rapprochement des rubriques Lucca avec les comptes 641 et 645', 'Matching Lucca pay items to accounts 641 and 645'),
    t('Effectifs : 412 = 412', 'Headcount: 412 = 412'),
    t('Brut : 1 642 310 € = 1 642 310 €', 'Gross pay: €1,642,310 = €1,642,310'),
    t('Charges : 366 683 € = 366 683 €', 'Social charges: €366,683 = €366,683'),
    t('Primes : écart de 4 000 €', 'Bonuses: €4,000 gap'),
  ];
  const run3 = [
    t('Ventilation de la masse salariale par département', 'Splitting payroll by department'),
    t('Mise à jour du modèle et de son contexte', 'Updating the model and its context'),
    t('Reforecast T4 recalculé ; board pack de septembre arrêté, inchangé', 'Q4 reforecast recalculated; September board pack closed, unchanged'),
  ];
  const count = (from, n) => Math.min(n, beat - IDX[from] + 1);
  const valid = at('valid');

  // The rules document: its first section, the rest folded, then the section the agent writes (proposed until approved).
  const rules = [
    [t('Comptes 641 et 645, par entité, via l’écriture de paie du mois.', 'Accounts 641 and 645, by entity, via the month’s payroll entry.'), id === 'r1c'],
  ];
  const added = [
    t('Source : la paie Lucca du mois, rapprochée des comptes 641 et 645.', 'Source: the month’s Lucca payroll, reconciled with accounts 641 and 645.'),
    t('Chaque salaire va au département du salarié.', 'Each salary goes to the employee’s department.'),
  ];

  const history = [
    at('valid') && { who: 'Thomas', what: t('Valide la ventilation par département', 'Approves the split by department'), when: '14:03', status: 'validated' },
    at('ask') && { who: 'agent', what: t('Propose la règle Ventilation par département', 'Proposes the Split by department rule'), when: '14:02', status: valid ? 'validated' : 'proposed' },
    at('r2e') && { who: 'agent', what: t('Crée le contrôle Paie ↔ compta', 'Creates the Payroll ↔ books control'), when: '14:02', status: 'done' },
    at('r1d') && { who: 'agent', what: t('Ajoute Lucca aux sources', 'Adds Lucca to the sources'), when: '14:01', status: 'done' },
    { who: 'Claire', what: t('Met à jour la règle Chiffre d’affaires', 'Updates the Revenue rule'), when: '03/09', status: 'validated' },
  ].filter(Boolean).slice(0, 2);
  const STATUS = {
    proposed: t('Proposé', 'Proposed'), validated: t('Validé', 'Approved'), done: t('Fait', 'Done'),
  };

  const sources = [
    ['hubspot', 'HubSpot', 'CRM'],
    ['pennylane', 'Pennylane', 'Acme France'],
    ['xero', 'Xero', 'Acme UK'],
    ...(at('r1d') ? [['lucca', 'Lucca', t('Paie', 'Payroll'), true]] : []),
  ];

  const depts = [
    [t('Production', 'Delivery'), '−1 412,6', '−1,412.6'],
    [t('Commercial', 'Sales'), '−251,3', '−251.3'],
    [t('Direction générale', 'Management'), '−198,7', '−198.7'],
    [t('Finance et RH', 'Finance and HR'), '−146,3', '−146.3'],
  ];
  const split = at('r3');

  return (
    <div
      ref={rootRef}
      className="ad"
      role="group"
      aria-label={t('Démonstration : le chat Trame ajoute la paie au P&L et enrichit son contexte', 'Demo: the Trame chat adds payroll to the P&L and builds its context')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <nav className="ad-rail" aria-hidden="true">
        <b>A</b>
        <span><Icon d={ICONS.home} /></span>
        <span className="on"><Icon d={ICONS.chat} /></span>
        <span><Icon d={ICONS.boards} /></span>
        <span><Icon d={ICONS.tables} /></span>
        <span className="end"><Icon d={ICONS.plug} /></span>
      </nav>

      <section className="ad-chat">
        <div className="ad-thread">
          {at('sent') && <div className="ad-user">{prompt}</div>}
          {at('r1a') && (
            <div className="ad-agent">
              <span className="ad-avatar"><Icon d={ICONS.sparkles} /></span>
              <div className="ad-body">
                <ToolRun steps={run1} shown={count('r1a', 4)} running={within('r1a', 'r1d')} t={t} />
                {at('text1') && <p className="ad-text">{t(<>La masse salariale (<b>2 008 993 €</b> en septembre) n’a pas de département. Je rapproche Lucca de la compta avant de ventiler.</>, <>Payroll (<b>€2,008,993</b> in September) has no department. I reconcile Lucca with the books before splitting.</>)}</p>}
                {at('r2a') && <ToolRun steps={run2} shown={count('r2a', 5)} running={within('r2a', 'r2e')} t={t} />}
                {at('text2') && <p className="ad-text">{t(<>3 contrôles concordent. <b>1 écart de 4 000 €</b> : une prime saisie dans Lucca après l’écriture de paie. Je la laisse à justifier.</>, <>3 checks match. <b>A €4,000 gap</b>: a bonus keyed into Lucca after the payroll entry. I leave it to be justified.</>)}</p>}
                {at('ask') && (
                  <div className="ad-ask">
                    <p>{t('Ajouter la règle « Ventilation par département » ?', 'Add the “Split by department” rule?')}</p>
                    <button type="button" className={valid ? 'pressed' : undefined} disabled={valid} onClick={() => setBeat(IDX.valid)}>{valid ? t('Validé', 'Approved') : t('Valider', 'Approve')}</button>
                  </div>
                )}
                {at('r3') && <ToolRun steps={run3} shown={count('r3', 3)} running={within('r3', 'r3c')} t={t} />}
                {at('done') && <p className="ad-text">{t('C’est fait, le reforecast suit. ', 'Done, and the reforecast follows. ')}<button type="button" className="ad-link" onClick={() => setSheet('model')}>{t('Ouvrir le P&L', 'Open the P&L')}</button></p>}
              </div>
            </div>
          )}
        </div>
        <div className="ad-composer">
          <span>{id === 'type' ? <>{prompt.slice(0, typed)}<i className="ad-caret" /></> : <em>{t('Posez votre question sur vos chiffres…', 'Ask a question about your figures…')}</em>}</span>
          <b aria-hidden="true">↑</b>
        </div>
      </section>

      <aside className={within('r1a', 'r1b') ? 'ad-ctx reading' : 'ad-ctx'} aria-label={t('Contexte du P&L analytique', 'Context of the analytical P&L')}>
        <div className="ad-ctx-head">
          <div><p>{t('Contexte', 'Context')}</p><span>{t('P&L analytique', 'Analytical P&L')}</span></div>
          <button type="button" className={at('done') ? 'ad-model ready' : 'ad-model'} onClick={() => setSheet('model')}>{t('Ouvrir', 'Open')} <Icon d={ICONS.ext} /></button>
        </div>

        <section className="ad-sec">
          <h4>{t('Règles', 'Rules')}</h4>
          <div className="ad-doc">
            <p className="ad-doc-head"><Icon d={ICONS.doc} /><span>{t('Règles du P&L analytique', 'Analytical P&L rules')}</span><em>{at('r2a') ? 15 : 14} sections</em></p>
            <div className="ad-doc-body">
              <h5>{t('Masse salariale', 'Payroll')}</h5>
              <ul>{rules.map(([text, hl]) => <li key={text} className={hl ? 'hl' : undefined}>{text}</li>)}</ul>
              <p className="fold">{t('+ 13 sections : chiffre d’affaires, achats…', '+ 13 sections: revenue, purchases…')}</p>
              {at('r2a') && (
                <div className={valid ? 'added ok' : 'added'}>
                  <h5>{t('Ventilation par département', 'Split by department')}<span className={valid ? 'badge validated' : 'badge proposed'}>{valid ? t('Validé', 'Approved') : t('Proposé', 'Proposed')}</span></h5>
                  <ul>{added.map((text) => <li key={text}>{text}</li>)}</ul>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="ad-sec">
          <h4>{t('Sources', 'Sources')}</h4>
          <ul className="ad-sources">
            {sources.map(([key, name, what, isNew]) => (
              <li key={key} title={what} className={[isNew && 'new', id === 'r1b' && !isNew && 'hl'].filter(Boolean).join(' ') || undefined}>
                <img src={LOGO[key]} alt="" width="16" height="16" />{name}
              </li>
            ))}
          </ul>
        </section>

        <section className="ad-sec">
          <h4>{t('Modèles connectés', 'Connected models')}</h4>
          <ul className="ad-controls">
            <li><button type="button" onClick={() => setSheet('board')}><Icon d={ICONS.boards} />Board pack<Icon d={ICONS.ext} /></button>{at('r3c') ? <span className="frozen"><Icon d={ICONS.lock} />{t('Sept. arrêté, inchangé', 'Sep closed, unchanged')}</span> : <span className="muted">{t('lit ce P&L', 'reads this P&L')}</span>}</li>
            <li className={at('r3b') ? 'new' : undefined}><button type="button" onClick={() => setSheet('reforecast')}><Icon d={ICONS.trend} />{t('Reforecast T4', 'Q4 reforecast')}<Icon d={ICONS.ext} /></button>{at('r3b') ? <span className="updated">{t('Recalculé', 'Recalculated')}</span> : <span className="muted">{t('lit ce P&L', 'reads this P&L')}</span>}</li>
          </ul>
        </section>

        <section className="ad-sec">
          <h4>{t('Contrôles', 'Controls')}</h4>
          <ul className="ad-controls">
            <li><button type="button" onClick={() => setSheet('unmapped')}>{t('Comptes non affectés', 'Unmapped accounts')}<Icon d={ICONS.ext} /></button><span className="ok">0</span></li>
            {at('r2e') && (
              <li className="new"><button type="button" onClick={() => setSheet('control')}>{t('Paie ↔ compta', 'Payroll ↔ books')}<Icon d={ICONS.ext} /></button><span className="flag"><Icon d={ICONS.flag} />{t('1 écart · 4 000 €', '1 gap · €4,000')}</span></li>
            )}
          </ul>
        </section>

        <section className="ad-sec">
          <h4>{t('Historique', 'History')}</h4>
          <ul className="ad-history">
            {history.map((h) => (
              <li key={h.what}>
                <span className={h.who === 'agent' ? 'who agent' : 'who'}>{h.who === 'agent' ? <Icon d={ICONS.sparkles} /> : h.who[0]}</span>
                <span className="what"><b>{h.who === 'agent' ? t('Agent', 'Agent') : h.who}</b> · {h.what}</span>
                <span className={`badge ${h.status}`}>{STATUS[h.status]}</span>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {sheet && (
        <div className="ad-sheet" role="dialog" aria-label={sheet === 'model' ? t('Modèle P&L analytique', 'Analytical P&L model') : t('Table de contrôle', 'Control table')}>
          <div className="ad-sheet-head">
            <p>{{ model: t('P&L analytique · sept. 2026 · k€', 'Analytical P&L · Sep 2026 · €k'), control: t('Contrôle · Paie ↔ compta · septembre', 'Control · Payroll ↔ books · September'), unmapped: t('Contrôle · Comptes non affectés', 'Control · Unmapped accounts'), board: t('Board pack · septembre 2026', 'Board pack · September 2026'), reforecast: t('Reforecast T4 · masse salariale par département', 'Q4 reforecast · payroll by department') }[sheet]}</p>
            <button type="button" aria-label={t('Fermer', 'Close')} onClick={() => setSheet(null)}>×</button>
          </div>
          {sheet === 'model' && (
            <table className="ad-table">
              <tbody>
                <tr><td>{t('Chiffre d’affaires', 'Revenue')}</td><td>{t('4 207,2', '4,207.2')}</td></tr>
                <tr className={split ? 'strong' : undefined}><td>{t('Masse salariale', 'Payroll')}{at('r2e') && <em className="ad-flag"><Icon d={ICONS.flag} />{t('écart 4 000 €', '€4,000 gap')}</em>}</td><td>{t('−2 008,9', '−2,008.9')}</td></tr>
                {split && depts.map(([name, fr, en]) => <tr key={name} className="dept"><td>{name}</td><td>{t(fr, en)}</td></tr>)}
                <tr><td>{t('Sous-traitance', 'Subcontracting')}</td><td>{t('−67,3', '−67.3')}</td></tr>
                <tr><td>{t('Frais généraux', 'Overheads')}</td><td>{t('−482,1', '−482.1')}</td></tr>
                <tr className="total"><td>EBITDA</td><td>{t('1 648,9', '1,648.9')}</td></tr>
              </tbody>
            </table>
          )}
          {sheet === 'control' && (
            <table className="ad-table">
              <thead><tr><th>{t('Contrôle', 'Check')}</th><th>Lucca</th><th>{t('Compta', 'Books')}</th><th>{t('Statut', 'Status')}</th></tr></thead>
              <tbody>
                <tr><td>{t('Effectifs', 'Headcount')}</td><td>412</td><td>412</td><td className="ok">OK</td></tr>
                <tr><td>{t('Salaire brut', 'Gross pay')}</td><td>{t('1 642 310', '1,642,310')}</td><td>{t('1 642 310', '1,642,310')}</td><td className="ok">OK</td></tr>
                <tr><td>{t('Charges sociales', 'Social charges')}</td><td>{t('366 683', '366,683')}</td><td>{t('366 683', '366,683')}</td><td className="ok">OK</td></tr>
                <tr className="gap"><td>{t('Primes · Marc D.', 'Bonuses · Marc D.')}</td><td>{t('4 000', '4,000')}</td><td>0</td><td><em className="ad-flag"><Icon d={ICONS.flag} />{t('À justifier', 'To justify')}</em></td></tr>
              </tbody>
            </table>
          )}
          {sheet === 'board' && <p className="ad-empty">{t('Le board pack de septembre est arrêté depuis le 07/10 : il ne change pas. La ventilation par département y entrera avec le mois d’octobre.', 'The September board pack has been closed since 7 Oct: it does not change. The split by department enters it with October.')}</p>}
          {sheet === 'reforecast' && (
            <table className="ad-table">
              <thead><tr><th>{t('Masse salariale · k€', 'Payroll · €k')}</th><th>{t('Oct.', 'Oct')}</th><th>{t('Nov.', 'Nov')}</th><th>{t('Déc.', 'Dec')}</th></tr></thead>
              <tbody>
                <tr><td>{t('Production', 'Delivery')}</td><td>{t('−1 418,0', '−1,418.0')}</td><td>{t('−1 431,2', '−1,431.2')}</td><td>{t('−1 446,9', '−1,446.9')}</td></tr>
                <tr><td>{t('Commercial', 'Sales')}</td><td>{t('−253,8', '−253.8')}</td><td>{t('−268,1', '−268.1')}</td><td>{t('−268,1', '−268.1')}</td></tr>
                <tr><td>{t('Direction générale', 'Management')}</td><td>{t('−198,7', '−198.7')}</td><td>{t('−198,7', '−198.7')}</td><td>{t('−198,7', '−198.7')}</td></tr>
                <tr><td>{t('Finance et RH', 'Finance and HR')}</td><td>{t('−146,3', '−146.3')}</td><td>{t('−152,9', '−152.9')}</td><td>{t('−152,9', '−152.9')}</td></tr>
              </tbody>
            </table>
          )}
          {sheet === 'unmapped' && <p className="ad-empty">{t('Tous les comptes de charges ont une ligne du P&L.', 'Every expense account has a P&L line.')}</p>}
        </div>
      )}
      {at('done') && !still && !sheet && <button type="button" className="ad-replay" onClick={() => setBeat(0)}>{t('Rejouer', 'Replay')}</button>}
    </div>
  );
}
