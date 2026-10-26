// Home hero: the analytical P&L, where every figure opens onto where it comes from (and its SQL, folded); the P&L's
// « Modifier » opens the Trame Chat on it, centred, then beside the P&L's context once the agent works; then the P&L
// again, changed. Thomas asks to add the sales and marketing payroll to the sales and marketing costs. The agent finds
// those costs hold no payroll, reconciles Lucca with the books and has Thomas approve it, then has him pick which Lucca
// field gives the department. Beside the chat, the rules, sources, controls and change history fill in as it goes.
// Back on the P&L, the Sales and Marketing payroll sits in Sales & marketing, and CAC includes it. A scripted scene in
// the product's look (trame-monorepo, demo branch). The video (video/, Remotion) drives the same scene frame by frame
// through `playhead`.
import { useEffect, useRef, useState } from 'react';
import { useT } from '../../lib/i18n.js';
import { prefersReducedMotion } from '../../lib/helpers.js';
import '../../styles/agent-demo.css';

// The scene, beat by beat (ms on screen). Rendering reads which beats have been reached.
export const BEATS = [
  ['pnl', 2500], ['pop', 4000], ['edit', 1500], ['idle', 900], ['type', 3000], ['sent', 1000],
  ['r1a', 1300], ['r1b', 1300], ['r1c', 1300], ['r1d', 1300], ['text1', 3000],
  ['r2a', 1400], ['r2b', 800], ['r2c', 800], ['r2d', 800], ['r2e', 1400], ['text2', 3000],
  ['ask', 3000], ['valid', 1000], ['field', 3500], ['pick', 1000],
  ['r3', 1200], ['r3b', 1200], ['r3c', 1400], ['done', 2600], ['after', 8000],
];
export const IDX = Object.fromEntries(BEATS.map(([id], i) => [id, i]));
export const PROMPT = {
  fr: 'Ajoute la paie sales et marketing aux coûts Sales & marketing.',
  en: 'Add the sales and marketing payroll to the sales and marketing costs.',
};
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
  db: ['M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z', 'M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6', 'M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3'],
  code: ['m8 8-4 4 4 4', 'm16 8 4 4-4 4'],
  edit: ['M4 20h4L19 9l-4-4L4 16z', 'm13.5 6.5 4 4'],
  sigma: ['M18 5H6l6 7-6 7h12'],
  chevron: ['m7 10 5 5 5-5'],
};

// The P&L month by month (k€, April → September 2026). Payroll comes from Lucca, by department.
const MONTHS = [['avr.', 'Apr'], ['mai', 'May'], ['juin', 'Jun'], ['juil.', 'Jul'], ['août', 'Aug'], ['sept.', 'Sep']];
const P = {
  subscriptions: [3665.3, 3735.3, 3790.6, 3862.8, 3923.4, 3985.0],
  services: [205.3, 198.4, 214.7, 209.8, 216.5, 222.2],
  hosting: [181.3, 181.1, 188.2, 180.9, 187.6, 185.7], // hosting and subcontracting
  marketing: [168.5, 175.2, 171.9, 160.3, 176.8, 182.0],
  tools: [58.1, 59.0, 60.2, 61.5, 62.8, 64.2],
  overheads: [118.3, 120.9, 118.0, 119.1, 118.3, 117.5],
  paySupport: [272.1, 274.9, 277.8, 280.7, 283.5, 286.4],
  paySales: [314.2, 317.6, 324.5, 331.3, 338.1, 341.5],
  payMarketing: [157.6, 159.3, 162.7, 166.1, 169.6, 171.3],
  payRnd: [842.9, 847.3, 851.7, 858.7, 866.5, 873.5],
  payGna: [326.5, 329.1, 336.6, 334.4, 334.6, 336.2],
  newCustomers: [12, 13, 11, 12, 13, 14],
  // Contracted at month end (HubSpot), so a little above the month's recognised subscriptions.
  mrr: [3701.6, 3763.2, 3829.4, 3891.0, 3952.7, 4018.3],
  customers: [1240, 1252, 1262, 1273, 1285, 1298],
};
// Each cost section's lines: a share of it, rounded to 0.1, and the rest.
const cut = (series, share) => {
  const a = series.map((v) => Math.round(v * share * 10) / 10);
  return [a, series.map((v, i) => Math.round((v - a[i]) * 10) / 10)];
};
[P.cloud, P.subcontracting] = cut(P.hosting, 0.64);
[P.ads, P.agencies] = cut(P.marketing, 0.877);
[P.licences, P.maintenance] = cut(P.tools, 0.7);
[P.rent, P.fees] = cut(P.overheads, 0.55);
// Where each line's figures come from: its accounts, with their share of the line (the last takes the rest).
const ACCOUNTS = {
  subs: [['7061', 'Abonnements · Acme France', 'Subscriptions · Acme France', 0.62], ['7061', 'Abonnements · Acme UK', 'Subscriptions · Acme UK']],
  svc: [['7062', 'Services · Acme France', 'Services · Acme France', 0.7], ['7062', 'Services · Acme UK', 'Services · Acme UK']],
  cloud: [['6228', 'Hébergement cloud', 'Cloud hosting']],
  sub: [['604', 'Sous-traitance', 'Subcontracting']],
  mkt: [['6231', 'Annonces et publicité', 'Advertising', 0.742], ['6233', 'Salons et événements', 'Trade shows and events']],
  agencies: [['6226', 'Agences marketing', 'Marketing agencies']],
  licences: [['6516', 'Licences logicielles', 'Software licences']],
  maintenance: [['6156', 'Maintenance', 'Maintenance']],
  rent: [['6132', 'Loyers', 'Rent']],
  fees: [['6227', 'Honoraires', 'Fees', 0.78], ['6064', 'Fournitures', 'Supplies']],
  pay: [['641', 'Salaires', 'Salaries', 0.72], ['645', 'Charges sociales', 'Social charges']],
};
const ISO = ['2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09'];
const add = (...series) => series[0].map((_, i) => series.reduce((sum, v) => sum + v[i], 0));
const ratio = (a, b, by = 1) => a.map((v, i) => (v / b[i]) * by);

/** The product's tool run: the step in flight with a pulsing dot, then one checked line « N étapes · … ». */
function ToolRun({ steps, shown, running, t, style }) {
  const list = steps.slice(0, shown);
  if (running) return <p className="ad-run" style={style}><span className="ad-dot" />{list[list.length - 1]}</p>;
  return <p className="ad-run done" style={style}><Icon d={ICONS.check} /><span>{t(`${list.length} étapes`, `${list.length} steps`)} · {list.join(' · ')}</span></p>;
}

/**
 * playhead (video only): { beat, typed, sheet, pop, since } set from outside, frame by frame; no timers. pop opens a
 * figure's lineage ({ key, i }) beyond the scripted one. since(beat) is the time in ms since that beat (or 'sheet')
 * began: each element's CSS animation is paused there (see .ad.static).
 * asset: maps a /public path to where it is served (the video's static files).
 */
export default function AgentDemo({ playhead, asset = (path) => path }) {
  const t = useT();
  const controlled = playhead != null;
  const [beatState, setBeat] = useState(0);
  const [typedState, setTyped] = useState(0);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);
  const [sheetState, setSheet] = useState(null); // 'control' | 'board' | … | null
  const [peek, setPeek] = useState(false); // the P&L opened from the chat, mid-scene
  const [popState, setPop] = useState(null); // a figure's lineage, opened by hand: { key, i, sql }
  const [querySql, setQuerySql] = useState(false); // the P&L's query, unfolded in its context
  const [folds, setFolds] = useState({}); // context sections opened or closed by hand: { [key]: open }
  const rootRef = useRef(null);
  const beat = controlled ? playhead.beat : beatState;
  const typed = controlled ? playhead.typed : typedState;
  const sheet = controlled ? playhead.sheet ?? null : sheetState;
  const id = BEATS[beat][0];
  const at = (b) => beat >= IDX[b];
  const within = (a, b) => beat >= IDX[a] && beat <= IDX[b];
  const enter = (b) => (controlled ? { '--since': playhead.since(b) } : undefined);
  const view = peek || ['pnl', 'pop', 'edit', 'after'].includes(id) ? 'pnl' : 'chat';
  const pop = popState ?? playhead?.pop ?? (id === 'pop' ? { key: 'mkt', i: MONTHS.length - 1 } : null);
  const centered = beat < IDX.r1a; // the chat, before the agent starts working: centred, the P&L as its context

  const prompt = t(PROMPT.fr, PROMPT.en);

  // Reduced motion: the finished scene, no playback. Otherwise play while the scene is on screen.
  useEffect(() => {
    if (controlled) return undefined;
    if (prefersReducedMotion()) { setStill(true); setBeat(IDX.done); setTyped(prompt.length); return undefined; }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, [prompt.length, controlled]);

  useEffect(() => {
    if (controlled || still || !visible || hover || sheet || peek || popState) return undefined;
    const timer = setTimeout(() => setBeat((b) => (b + 1) % BEATS.length), BEATS[beat][1]);
    return () => clearTimeout(timer);
  }, [beat, visible, hover, sheet, peek, popState, still, controlled]);

  // The prompt types itself into the composer.
  useEffect(() => {
    if (controlled) return undefined;
    if (id === 'pnl' || id === 'idle') { setTyped(0); setSheet(null); setPop(null); setQuerySql(false); setFolds({}); }
    if (id !== 'type' || still) return undefined;
    const every = (BEATS[IDX.type][1] * 0.85) / prompt.length;
    const timer = setInterval(() => setTyped((n) => Math.min(n + 1, prompt.length)), every);
    return () => clearInterval(timer);
  }, [id, still, prompt.length, controlled]);

  // The rail: the chat leaves the P&L (and replays the chat from the P&L page); the P&L opens over the chat.
  const openChat = () => {
    setPop(null);
    if (peek) setPeek(false);
    else if (view === 'pnl') setBeat(IDX.idle);
  };
  const openPnl = () => { setSheet(null); setPeek(true); };
  // Closing the lineage while it plays moves on to « Modifier », which opens the chat on the P&L.
  const closePop = () => { setPop(null); if (id === 'pop') setBeat(IDX.edit); };
  const edit = () => { setPop(null); setPeek(false); setBeat(IDX.idle); };

  const run1 = [
    t('Lecture du contexte du P&L', 'Reading the P&L context'),
    t('Coûts Sales & marketing : dépenses marketing seulement', 'Sales and marketing costs: marketing spend only'),
    t('Salaires en compta, sans département', 'Salaries in the books, no department'),
    t('Ajout de Lucca : 412 salariés', 'Adding Lucca: 412 employees'),
  ];
  const run2 = [
    t('Rapprochement Lucca ↔ compta', 'Matching Lucca with the books'),
    t('Effectifs : OK', 'Headcount: OK'),
    t('Salaires bruts : OK', 'Gross pay: OK'),
    t('Charges : OK', 'Social charges: OK'),
    t('Primes : écart de 4 000 €', 'Bonuses: €4,000 gap'),
  ];
  const run3 = [
    t('Départements Sales et Marketing : 74 salariés', 'Sales and Marketing departments: 74 employees'),
    t('Ajout aux coûts Sales & marketing ; CAC et reforecast recalculés', 'Added to sales and marketing costs; CAC and reforecast recalculated'),
    t('Board pack de septembre inchangé (arrêté)', 'September board pack unchanged (closed)'),
  ];
  // The Lucca fields that could give each employee's department; Thomas picks the first.
  const fields = [
    [t('Département', 'Department'), t('412 / 412 salariés renseignés', '412 / 412 employees filled in')],
    [t('Centre de coût', 'Cost centre'), t('388 / 412 renseignés', '388 / 412 filled in')],
    [t('Équipe', 'Team'), t('401 / 412 renseignés', '401 / 412 filled in')],
  ];
  const count = (from, n) => Math.min(n, beat - IDX[from] + 1);
  const valid = at('valid');
  const picked = at('pick');

  // The rules document: its first section, the rest folded, then the section the agent writes (proposed until approved).
  const rules = [
    [t('Comptes 641 et 645, par entité.', 'Accounts 641 and 645, by entity.'), id === 'r1c'],
  ];
  const added = [
    t('Comptes 641 et 645, ventilés par Lucca.', 'Accounts 641 and 645, split with Lucca.'),
    picked ? t('Département : le champ « Département » de Lucca.', 'Department: Lucca’s “Department” field.') : t('Département : champ Lucca à choisir.', 'Department: Lucca field to pick.'),
    t('Sales et Marketing → Sales & marketing.', 'Sales and Marketing → Sales & marketing.'),
  ];

  // The P&L's query: the books mapped to P&L lines; once the agent has changed it, Sales and Marketing payroll by Lucca
  // department.
  const query = at('r3b')
    ? `SELECT l.month,\n  CASE WHEN e.department IN ('Sales', 'Marketing')\n    THEN 'pay_' || lower(e.department)\n    ELSE m.line END AS line,\n  sum(l.debit - l.credit) AS amount\nFROM ledger_lines l\nJOIN pnl_mapping m USING (account)\nLEFT JOIN lucca.employees e\n  ON m.line = 'pay' AND e.employee_id = l.employee_id\nGROUP BY 1, 2`
    : `SELECT l.month, m.line,\n  sum(l.debit - l.credit) AS amount\nFROM ledger_lines l\nJOIN pnl_mapping m USING (account)\nGROUP BY 1, 2`;

  // The P&L's history: this change only, one line per change, newest first; Thomas's approvals update their line.
  const history = [
    at('r3b') && { b: 'r3b', what: t('Ajoute la paie aux coûts Sales & marketing', 'Adds payroll to sales and marketing costs'), status: 'done' },
    at('field') && { b: 'field', what: t('Propose la règle Paie sales & marketing', 'Proposes the Sales & marketing payroll rule'), status: picked ? 'validated' : 'proposed' },
    at('r2e') && { b: 'r2e', what: t('Crée le contrôle Lucca ↔ compta', 'Creates the Lucca ↔ books control'), status: valid ? 'validated' : 'done' },
    at('r1d') && { b: 'r1d', what: t('Ajoute Lucca aux sources', 'Adds Lucca to the sources'), status: 'done' },
  ].filter(Boolean);
  const STATUS = {
    proposed: t('Proposé', 'Proposed'), validated: t('Validé', 'Approved'), done: t('Fait', 'Done'),
  };

  const sources = [
    ['hubspot', 'HubSpot', 'CRM'],
    ['pennylane', 'Pennylane', 'Acme France'],
    ['xero', 'Xero', 'Acme UK'],
    ...(at('r1d') ? [['lucca', 'Lucca', t('Paie', 'Payroll'), true]] : []),
  ];
  /**
   * A section of the context: folded with its count until the agent works in it (opens: the beat it does, none: always
   * open); opened or closed by hand on the site.
   */
  const fold = (key, title, opens, count, body) => {
    const open = folds[key] ?? (!opens || at(opens));
    return (
      <section className="ad-sec">
        <h4>
          <button type="button" className="ad-sec-toggle" aria-expanded={open} onClick={() => setFolds({ ...folds, [key]: !open })}>
            <Icon d={ICONS.chevron} />{title}{!open && count != null && <em>{count}</em>}
          </button>
        </h4>
        {open && <div className="ad-sec-body" style={opens && folds[key] == null ? enter(opens) : undefined}>{body}</div>}
      </section>
    );
  };
  const sourceList = (hl) => (
    <ul className="ad-sources">
      {sources.map(([key, name, what, isNew]) => (
        <li key={key} title={what} style={isNew ? enter('r1d') : undefined} className={[isNew && 'new', hl && !isNew && 'hl'].filter(Boolean).join(' ') || undefined}>
          <img src={asset(LOGO[key])} alt="" width="16" height="16" />{name}
        </li>
      ))}
    </ul>
  );

  // The P&L, month by month: payroll is one unallocated line; once the Sales and Marketing payroll is split out, it
  // joins Sales & marketing and CAC includes it. EBITDA does not move.
  const split = at('r3');
  const locale = t('fr-FR', 'en-GB');
  const num = (n) => n.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const k = (n) => num(n);
  const cost = (n) => `−${num(n)}`;
  const pct = (n) => t(`${num(n)} %`, `${num(n)}%`);
  const whole = (r, n) => {
    if (r.kind === 'ratio') return r.f(n);
    const v = n.toLocaleString(locale, { maximumFractionDigits: 0 });
    return r.f === cost ? `−${v}` : v;
  };
  const revenue = add(P.subscriptions, P.services);
  const payroll = split ? add(P.paySupport, P.payRnd, P.payGna) : add(P.paySupport, P.paySales, P.payMarketing, P.payRnd, P.payGna);
  const sm = split ? add(P.marketing, P.paySales, P.payMarketing) : P.marketing;
  const gross = revenue.map((v, i) => v - P.hosting[i]);
  const ebitda = revenue.map((v, i) => gross[i] - sm[i] - P.tools[i] - P.overheads[i] - payroll[i]);
  const pay = (key, fr, en, extra) => split && { key, kind: 'item', isNew: true, label: t(`Paie · ${fr}`, `Payroll · ${en}`), v: P[key], f: cost, accounts: 'pay', lucca: en, ...extra };
  const rows = [
    { key: 'mrr', kind: 'kpi', label: 'MRR', v: P.mrr, f: k, crm: true },
    { key: 'rev', kind: 'total', label: t('Chiffre d’affaires reconnu', 'Recognised revenue'), v: revenue, f: k, parts: ['subs', 'svc'] },
    { key: 'subs', kind: 'item', label: t('Abonnements', 'Subscriptions'), v: P.subscriptions, f: k, accounts: 'subs' },
    { key: 'svc', kind: 'item', label: 'Services', v: P.services, f: k, accounts: 'svc' },
    { key: 'cor', kind: 'section', label: t('Coût des ventes', 'Cost of revenue'), v: P.hosting, f: cost, parts: ['cloud', 'sub'] },
    { key: 'cloud', kind: 'item', label: t('Hébergement cloud', 'Cloud hosting'), v: P.cloud, f: cost, accounts: 'cloud' },
    { key: 'sub', kind: 'item', label: t('Sous-traitance', 'Subcontracting'), v: P.subcontracting, f: cost, accounts: 'sub' },
    { key: 'gm', kind: 'total', label: t('Marge brute', 'Gross margin'), v: gross, f: k, parts: ['rev', 'cor'] },
    { key: 'gmp', kind: 'ratio', label: t('% marge brute', 'Gross margin %'), v: ratio(gross, revenue, 100), f: pct, pts: true, parts: ['gm', 'rev'], formula: t('Marge brute ÷ CA reconnu', 'Gross margin ÷ revenue'), expr: 'gm / rev' },
    { key: 'sm', kind: 'section', label: 'Sales & marketing', v: sm, f: cost, parts: ['mkt', 'agencies', 'paySales', 'payMarketing'] },
    { key: 'mkt', kind: 'item', label: t('Publicité et événements', 'Advertising and events'), v: P.ads, f: cost, accounts: 'mkt' },
    { key: 'agencies', kind: 'item', label: t('Agences marketing', 'Marketing agencies'), v: P.agencies, f: cost, accounts: 'agencies' },
    pay('paySales', 'Sales', 'Sales', { gap: at('r2e') }), // the September bonus missing from the books
    pay('payMarketing', 'Marketing', 'Marketing'),
    { key: 'cac', kind: 'ratio', label: 'CAC', v: ratio(sm, P.newCustomers), f: k, payroll: true, lowerIsBetter: true, parts: ['sm'], customers: true, formula: t('Sales & marketing ÷ nouveaux clients', 'Sales & marketing ÷ new customers'), expr: 'sm / new_customers' },
    { key: 'rnd', kind: 'section', label: 'R&D', v: P.tools, f: cost, parts: ['licences', 'maintenance'] },
    { key: 'licences', kind: 'item', label: t('Licences logicielles', 'Software licences'), v: P.licences, f: cost, accounts: 'licences' },
    { key: 'maintenance', kind: 'item', label: 'Maintenance', v: P.maintenance, f: cost, accounts: 'maintenance' },
    { key: 'gna', kind: 'section', label: t('Frais généraux', 'General and admin'), v: P.overheads, f: cost, parts: ['rent', 'fees'] },
    { key: 'rent', kind: 'item', label: t('Loyers', 'Rent'), v: P.rent, f: cost, accounts: 'rent' },
    { key: 'fees', kind: 'item', label: t('Honoraires et fournitures', 'Fees and supplies'), v: P.fees, f: cost, accounts: 'fees' },
    { key: 'pay', kind: 'section', label: t('Masse salariale non ventilée', 'Unallocated payroll'), v: payroll, f: cost, gap: at('r2e') && !split, accounts: 'pay' },
    { key: 'ebitda', kind: 'total', label: 'EBITDA', v: ebitda, f: k, parts: ['gm', 'sm', 'rnd', 'gna', 'pay'] },
    { key: 'ebp', kind: 'ratio', label: t('% marge EBITDA', 'EBITDA margin %'), v: ratio(ebitda, revenue, 100), f: pct, pts: true, parts: ['ebitda', 'rev'], formula: t('EBITDA ÷ CA reconnu', 'EBITDA ÷ revenue'), expr: 'ebitda / rev' },
  ].filter(Boolean);
  const byKey = Object.fromEntries(rows.map((r) => [r.key, r]));
  const money = (n) => (r) => (r.f === k ? t(`${num(n)} k€`, `€${num(n)}k`) : r.f === cost ? t(`−${num(n)} k€`, `−€${num(n)}k`) : r.f(n));

  /** Where a figure comes from: its accounts (or Lucca's payroll), the lines it adds up, or its formula; and its SQL. */
  const lineage = (r, i) => ({ ...source(r, i), gap: r.gap && i === MONTHS.length - 1 });
  const source = (r, i) => {
    const month = ISO[i];
    if (r.crm) {
      return {
        lines: [[null, t('Clients actifs en fin de mois', 'Active customers at month end'), P.customers[i].toLocaleString(locale)]],
        icon: ICONS.db,
        source: t('HubSpot · contrats récurrents actifs en fin de mois', 'HubSpot · recurring contracts active at month end'),
        sql: `SELECT sum(monthly_amount) AS mrr\nFROM hubspot.deals\nWHERE recurring\n  AND active_on = last_day('${month}-01')`,
      };
    }
    if (r.accounts) {
      const accounts = ACCOUNTS[r.accounts];
      let rest = r.v[i];
      const lines = accounts.map(([code, fr, en, share], j) => {
        const v = Math.round((j < accounts.length - 1 ? r.v[i] * share : rest) * 10) / 10;
        rest -= v;
        return [code, t(fr, en), r.f(v)];
      });
      if (r.lucca) {
        return {
          lines, icon: ICONS.db,
          source: t(`Comptes 641 et 645, département ${r.lucca} dans Lucca`, `Accounts 641 and 645, ${r.lucca} department in Lucca`),
          sql: `SELECT l.account, sum(l.debit - l.credit) AS amount\nFROM ledger_lines l\nJOIN lucca.employees e USING (employee_id)\nWHERE l.account IN ('641', '645')\n  AND e.department = '${r.lucca}'\n  AND l.month = '${month}'\nGROUP BY l.account`,
        };
      }
      const codes = [...new Set(accounts.map(([code]) => `'${code}'`))].join(', ');
      return {
        lines, icon: ICONS.db,
        source: t('Plan comptable · Pennylane (Acme France), Xero (Acme UK)', 'Chart of accounts · Pennylane (Acme France), Xero (Acme UK)'),
        sql: `SELECT account, sum(debit - credit) AS amount\nFROM ledger_lines\nWHERE account IN (${codes})\n  AND month = '${month}'\nGROUP BY account`,
      };
    }
    const parts = r.parts.map((key) => byKey[key]).filter(Boolean);
    const lines = parts.map((p) => [null, p.label, p.f(p.v[i])]);
    if (r.customers) lines.push([null, t('Nouveaux clients', 'New customers'), String(P.newCustomers[i])]);
    return {
      lines, icon: ICONS.sigma,
      source: r.formula ?? t('Somme de ses lignes', 'Sum of its lines'),
      sql: r.expr
        ? `SELECT ${r.expr} AS ${r.key}\nFROM analytical_pnl\nWHERE month = '${month}'`
        : `SELECT sum(amount) AS ${r.key}\nFROM analytical_pnl\nWHERE month = '${month}'\n  AND line IN (${parts.map((p) => `'${p.key}'`).join(', ')})`,
    };
  };
  /**
   * Last month on the one before, in points for a percentage and in % otherwise, with its tone: good news is up for
   * revenue and margins, down for costs and CAC.
   */
  const mom = (r) => {
    const [a, b] = r.v.slice(-2);
    const d = r.pts ? b - a : (b / a - 1) * 100;
    const sign = d < 0 ? '−' : '+';
    const text = r.pts ? `${sign}${num(Math.abs(d))} pt` : t(`${sign}${num(Math.abs(d))} %`, `${sign}${num(Math.abs(d))}%`);
    const better = (d > 0) !== (r.f === cost || !!r.lowerIsBetter);
    return [text, Math.abs(d) < 0.05 ? 'var' : better ? 'var up' : 'var down'];
  };
  const changed = id === 'after' ? enter('after') : undefined;


  return (
    <div
      ref={rootRef}
      className={controlled ? 'ad static' : 'ad'}
      role="group"
      aria-label={t('Démonstration : le chat Trame ajoute la paie au P&L, qui se met à jour', 'Demo: the Trame chat adds payroll to the P&L, which updates')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <nav className="ad-rail">
        <b aria-hidden="true">A</b>
        <span aria-hidden="true"><Icon d={ICONS.home} /></span>
        <button type="button" className={view === 'chat' ? 'chat on' : 'chat'} aria-label={t('Chat', 'Chat')} onClick={openChat}><Icon d={ICONS.chat} /></button>
        <button type="button" className={view === 'pnl' ? 'pnl on' : 'pnl'} aria-label={t('P&L analytique', 'Management P&L')} onClick={openPnl}><Icon d={ICONS.boards} /></button>
        <span aria-hidden="true"><Icon d={ICONS.tables} /></span>
        <span aria-hidden="true" className="end"><Icon d={ICONS.plug} /></span>
      </nav>

      {view === 'pnl' && (
        <section className="ad-page" style={id === 'after' ? enter('after') : undefined} aria-label={t('P&L analytique', 'Management P&L')}>
          <div className="ad-page-head">
            <div className="ad-page-title">
              <h3>{t('P&L analytique', 'Management P&L')}</h3>
              <ul className="ad-page-sources" aria-label={t('Sources', 'Sources')}>
                {sources.map(([key, name, , isNew]) => (
                  <li key={key} className={isNew && id === 'after' ? 'new' : undefined} style={isNew && id === 'after' ? enter('after') : undefined}><img src={asset(LOGO[key])} alt="" width="14" height="14" />{name}</li>
                ))}
              </ul>
            </div>
            <div className="ad-page-tools" aria-hidden="true">
              <span className="ad-filter"><em>{t('Entité', 'Entity')}</em>Acme<Icon d={ICONS.chevron} /></span>
              <span className="ad-filter"><em>{t('Période', 'Period')}</em>{t('avr. – sept. 2026', 'Apr – Sep 2026')}<Icon d={ICONS.chevron} /></span>
              <span className="ad-seg"><b>{t('Mois', 'Month')}</b><span>{t('Trimestre', 'Quarter')}</span><span>{t('Année', 'Year')}</span></span>
            </div>
            <button type="button" className="ad-page-edit" onClick={edit}><Icon d={ICONS.edit} />{t('Modifier', 'Edit')}</button>
          </div>
          <div className="ad-pnl">
            <table>
              <thead>
                <tr>
                  <th>{t('k€', '€k')}</th>
                  {MONTHS.map(([fr, en], i) => <th key={en} className={i === MONTHS.length - 1 ? 'cur' : i < 4 ? 'early' : undefined}>{t(fr, en)}</th>)}
                  <th>{t('M/M', 'MoM')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, row) => {
                  const fresh = r.isNew || (r.payroll && split);
                  const [change, tone] = mom(r);
                  return (
                    <tr key={r.key} className={[r.kind, r.key, fresh && 'new'].filter(Boolean).join(' ')} style={fresh ? changed : undefined}>
                      <td>
                        {r.label}
                      </td>
                      {r.v.map((n, i) => {
                        const last = i === MONTHS.length - 1;
                        const open = pop?.key === r.key && pop.i === i;
                        const from = open && lineage(r, i);
                        const gap = r.gap && last;
                        return (
                          <td key={MONTHS[i][1]} className={[last ? 'cur' : i < 4 && 'early', gap && 'anomaly'].filter(Boolean).join(' ') || undefined} title={gap ? t('Écart de 4 000 € avec la compta', '€4,000 gap with the books') : undefined}>
                            {gap && <Icon d={ICONS.flag} />}
                            <button type="button" className="ad-cell" aria-expanded={open} onClick={() => (open ? closePop() : setPop({ key: r.key, i }))}>{whole(r, n)}</button>
                            {open && (
                              <div className={row < rows.length / 2 ? 'ad-pop down' : 'ad-pop'} role="dialog" style={enter('pop')} aria-label={t('D’où vient ce chiffre', 'Where this figure comes from')}>
                                <div className="ad-pop-head">
                                  <p>{r.label} · {t(MONTHS[i][0], MONTHS[i][1])} 2026</p>
                                  <button type="button" aria-label={t('Fermer', 'Close')} onClick={closePop}>×</button>
                                </div>
                                <b className="ad-pop-value">{money(n)(r)}</b>
                                <ul>{from.lines.map(([code, label, v]) => <li key={label}><span>{code && <code>{code}</code>}{label}</span><span>{v}</span></li>)}</ul>
                                {from.gap && <p className="ad-pop-warn"><Icon d={ICONS.flag} />{t('Prime de 4 000 € saisie dans Lucca, absente de la compta et donc de ce montant : à justifier.', '€4,000 bonus keyed into Lucca, missing from the books and so from this figure: to justify.')}</p>}
                                <p className="ad-pop-src"><Icon d={from.icon} />{from.source}</p>
                                <button type="button" className="ad-sql-toggle" aria-expanded={!!pop.sql} onClick={() => setPop({ ...pop, sql: !pop.sql })}><Icon d={ICONS.code} />{pop.sql ? t('Masquer le SQL', 'Hide SQL') : t('Voir le SQL', 'View SQL')}</button>
                                {pop.sql && <pre className="ad-sql">{from.sql}</pre>}
                              </div>
                            )}
                          </td>
                        );
                      })}
                      <td className={tone}>{change}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {view === 'chat' && (
        <section className={centered ? 'ad-chat centered' : 'ad-chat'} style={enter('idle')}>
          {centered && !at('sent') && <h3 className="ad-hello">{t('Que voulez-vous faire sur ce P&L ?', 'What would you like to do with this P&L?')}</h3>}
          {(!centered || at('sent')) && <div className="ad-thread">
            {at('sent') && <div className="ad-user" style={enter('sent')}>{prompt}</div>}
            {at('r1a') && (
              <div className="ad-agent" style={enter('r1a')}>
                <span className="ad-avatar"><Icon d={ICONS.sparkles} /></span>
                <div className="ad-body">
                  <ToolRun steps={run1} shown={count('r1a', 4)} running={within('r1a', 'r1d')} t={t} />
                  {at('text1') && <p className="ad-text" style={enter('text1')}>{t(<>Les coûts Sales & marketing de septembre (<b>182 k€</b>) n’ont aucune paie : en compta, elle n’a pas de département. Je rapproche d’abord Lucca de la compta.</>, <>September’s sales and marketing costs (<b>€182k</b>) hold no payroll: in the books, it has no department. I first reconcile Lucca with the books.</>)}</p>}
                  {at('r2a') && <ToolRun steps={run2} shown={count('r2a', 5)} running={within('r2a', 'r2e')} t={t} style={enter('r2a')} />}
                  {at('text2') && <p className="ad-text" style={enter('text2')}>{t(<>Lucca et la compta concordent, sauf <b>une prime de 4 000 €</b> absente de la compta. Je la signale.</>, <>Lucca and the books match, except <b>a €4,000 bonus</b> missing from the books. I’ve flagged it.</>)}</p>}
                  {at('ask') && (
                    <div className="ad-ask" style={enter('ask')}>
                      <p>{t('Valider le rapprochement Lucca ↔ compta ?', 'Approve the Lucca ↔ books reconciliation?')}</p>
                      <button type="button" className={valid ? 'pressed' : undefined} disabled={valid} onClick={() => setBeat(IDX.valid)}>{valid ? t('Validé', 'Approved') : t('Valider', 'Approve')}</button>
                    </div>
                  )}
                  {at('field') && (
                    <div className="ad-choice" style={enter('field')}>
                      <p>{t('Quel champ Lucca donne le département ?', 'Which Lucca field gives the department?')}</p>
                      <ul>
                        {fields.map(([label, note], j) => (
                          <li key={label}>
                            <button type="button" className={picked ? (j === 0 ? 'on' : 'off') : undefined} disabled={picked} onClick={() => setBeat(IDX.pick)}>
                              <b>{label}</b><span>{note}</span>{j === 0 && <em>{picked ? t('Choisi', 'Picked') : t('Recommandé', 'Recommended')}</em>}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {at('r3') && <ToolRun steps={run3} shown={count('r3', 3)} running={within('r3', 'r3c')} t={t} style={enter('r3')} />}
                  {at('done') && <p className="ad-text" style={enter('done')}>{t('C’est fait. ', 'Done. ')}<button type="button" className="ad-link" onClick={() => setBeat(IDX.after)}>{t('Voir le P&L', 'View the P&L')}</button></p>}
                </div>
              </div>
            )}
          </div>}
          <div className="ad-composer">
            {centered && <p className="ad-attach"><span><Icon d={ICONS.boards} />{t('P&L analytique', 'Management P&L')} · Acme</span></p>}
            <span style={enter('type')}>{id === 'type' ? <>{prompt.slice(0, typed)}<i className="ad-caret" /></> : <em>{t('Posez votre question sur vos chiffres…', 'Ask a question about your figures…')}</em>}</span>
            <b aria-hidden="true">↑</b>
          </div>
        </section>
      )}

      {view === 'chat' && !centered && (
        <aside className={within('r1a', 'r1b') ? 'ad-ctx reading' : 'ad-ctx'} style={enter('r1a')} aria-label={t('Contexte du P&L analytique', 'Context of the management P&L')}>
          <div className="ad-ctx-head">
            <div><p>{t('Contexte', 'Context')}</p><span>{t('P&L analytique', 'Management P&L')}</span></div>
            <button type="button" className={at('done') ? 'ad-model ready' : 'ad-model'} onClick={openPnl}>{t('Ouvrir', 'Open')} <Icon d={ICONS.ext} /></button>
          </div>

          {fold('rules', t('Règles', 'Rules'), null, null, (
            <div className="ad-doc">
              <p className="ad-doc-head"><Icon d={ICONS.doc} /><span>{t('Règles du P&L analytique', 'Management P&L rules')}</span><em>{at('field') ? 15 : 14} sections</em></p>
              <div className="ad-doc-body">
                <h5>{t('Masse salariale', 'Payroll')}</h5>
                <ul>{rules.map(([text, hl]) => <li key={text} className={hl ? 'hl' : undefined}>{text}</li>)}</ul>
                <p className="fold">{t('+ 13 sections : chiffre d’affaires, achats…', '+ 13 sections: revenue, purchases…')}</p>
                {at('field') && (
                  <div className={picked ? 'added ok' : 'added'} style={enter('field')}>
                    <h5>{t('Paie sales & marketing', 'Sales & marketing payroll')}<span className={picked ? 'badge validated' : 'badge proposed'}>{picked ? t('Validé', 'Approved') : t('Proposé', 'Proposed')}</span></h5>
                    <ul>{added.map((text) => <li key={text}>{text}</li>)}</ul>
                  </div>
                )}
              </div>
              <div className="ad-query">
                <button type="button" className="ad-sql-toggle" aria-expanded={querySql} onClick={() => setQuerySql(!querySql)}><Icon d={ICONS.code} />{querySql ? t('Masquer la requête SQL', 'Hide the SQL query') : t('Requête SQL', 'SQL query')}<Icon d={ICONS.chevron} /></button>
                {at('r3b') && <span className="updated" style={enter('r3b')}>{t('Modifiée', 'Updated')}</span>}
              </div>
              {querySql && <pre className="ad-sql">{query}</pre>}
            </div>
          ))}

          {fold('sources', t('Sources', 'Sources'), 'r1d', sources.length, sourceList(id === 'r1c'))}

          {fold('models', t('Modèles connectés', 'Connected models'), 'r3b', 2, (
            <ul className="ad-controls">
              <li><button type="button" onClick={() => setSheet('board')}><Icon d={ICONS.boards} />Board pack<Icon d={ICONS.ext} /></button>{at('r3c') ? <span className="frozen"><Icon d={ICONS.lock} />{t('Sept. arrêté, inchangé', 'Sep closed, unchanged')}</span> : <span className="muted">{t('lit ce P&L', 'reads this P&L')}</span>}</li>
              <li className={at('r3b') ? 'new' : undefined} style={at('r3b') ? enter('r3b') : undefined}><button type="button" onClick={() => setSheet('reforecast')}><Icon d={ICONS.trend} />{t('Reforecast T4', 'Q4 reforecast')}<Icon d={ICONS.ext} /></button>{at('r3b') ? <span className="updated">{t('Recalculé', 'Recalculated')}</span> : <span className="muted">{t('lit ce P&L', 'reads this P&L')}</span>}</li>
            </ul>
          ))}

          {fold('controls', t('Contrôles', 'Controls'), 'r2e', at('r2e') ? 2 : 1, (
            <ul className="ad-controls">
              <li><button type="button" onClick={() => setSheet('unmapped')}>{t('Comptes non affectés', 'Unmapped accounts')}<Icon d={ICONS.ext} /></button><span className="ok">0</span></li>
              {at('r2e') && (
                <li className="new" style={enter('r2e')}><button type="button" onClick={() => setSheet('control')}>{t('Lucca ↔ compta', 'Lucca ↔ books')}<Icon d={ICONS.ext} /></button><span className="flag"><Icon d={ICONS.flag} />{t('1 écart · 4 000 €', '1 gap · €4,000')}</span></li>
              )}
            </ul>
          ))}

          {fold('history', t('Historique', 'History'), 'r1d', history.length || null, (
            <ul className="ad-history">
              {history.map((h) => (
                <li key={h.what} style={enter(h.b)}>
                  <span className="who agent"><Icon d={ICONS.sparkles} /></span>
                  <span className="what"><b>{t('Agent', 'Agent')}</b> · {h.what}</span>
                  <span className={`badge ${h.status}`}>{STATUS[h.status]}</span>
                </li>
              ))}
            </ul>
          ))}
        </aside>
      )}

      {sheet && view === 'chat' && (
        <div className="ad-sheet" style={enter('sheet')} role="dialog" aria-label={t('Table de contrôle', 'Control table')}>
          <div className="ad-sheet-head">
            <p>{{ control: t('Contrôle · Lucca ↔ compta · septembre', 'Control · Lucca ↔ books · September'), unmapped: t('Contrôle · Comptes non affectés', 'Control · Unmapped accounts'), board: t('Board pack · septembre 2026', 'Board pack · September 2026'), reforecast: t('Reforecast T4 · paie sales & marketing', 'Q4 reforecast · sales and marketing payroll') }[sheet]}</p>
            <button type="button" aria-label={t('Fermer', 'Close')} onClick={() => setSheet(null)}>×</button>
          </div>
          {sheet === 'control' && (
            <table className="ad-table">
              <thead><tr><th>{t('Contrôle', 'Check')}</th><th>Lucca</th><th>{t('Compta', 'Books')}</th><th>{t('Statut', 'Status')}</th></tr></thead>
              <tbody>
                <tr><td>{t('Effectifs', 'Headcount')}</td><td>412</td><td>412</td><td className="ok">OK</td></tr>
                <tr><td>{t('Salaire brut', 'Gross pay')}</td><td>{t('1 446 410', '1,446,410')}</td><td>{t('1 446 410', '1,446,410')}</td><td className="ok">OK</td></tr>
                <tr><td>{t('Charges sociales', 'Social charges')}</td><td>{t('562 490', '562,490')}</td><td>{t('562 490', '562,490')}</td><td className="ok">OK</td></tr>
                <tr className="gap"><td>{t('Primes · Marc D.', 'Bonuses · Marc D.')}</td><td>{t('4 000', '4,000')}</td><td>0</td><td><em className="ad-flag"><Icon d={ICONS.flag} />{t('À justifier', 'To justify')}</em></td></tr>
              </tbody>
            </table>
          )}
          {sheet === 'board' && <p className="ad-empty">{t('Le board pack de septembre est arrêté depuis le 07/10 : il ne change pas. La paie sales & marketing y entrera avec le mois d’octobre.', 'The September board pack has been closed since 7 Oct: it does not change. The sales and marketing payroll enters it with October.')}</p>}
          {sheet === 'reforecast' && (
            <table className="ad-table">
              <thead><tr><th>{t('Masse salariale · k€', 'Payroll · €k')}</th><th>{t('Oct.', 'Oct')}</th><th>{t('Nov.', 'Nov')}</th><th>{t('Déc.', 'Dec')}</th></tr></thead>
              <tbody>
                <tr><td>Sales</td><td>{t('−344,0', '−344.0')}</td><td>{t('−353,8', '−353.8')}</td><td>{t('−353,8', '−353.8')}</td></tr>
                <tr><td>Marketing</td><td>{t('−172,4', '−172.4')}</td><td>{t('−177,4', '−177.4')}</td><td>{t('−177,4', '−177.4')}</td></tr>
              </tbody>
            </table>
          )}
          {sheet === 'unmapped' && <p className="ad-empty">{t('Tous les comptes de charges ont une ligne du P&L.', 'Every expense account has a P&L line.')}</p>}
        </div>
      )}
      {id === 'after' && !peek && !still && !controlled && <button type="button" className="ad-replay" onClick={() => setBeat(0)}>{t('Rejouer', 'Replay')}</button>}
    </div>
  );
}
