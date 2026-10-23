// One screen of the product for the home hero: Orbis's September board pack, where every figure opens the lineage
// panel (fetch → transformations → result, and the decision behind it). Styles follow the Trame Design System
// (Metrics, DataGrid, LineagePanel); figures come from content/simulator.js.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useT } from '../../lib/i18n.js';
import { useFmt } from '../../lib/format.js';
import { prefersReducedMotion } from '../../lib/helpers.js';
import {
  CHURN_AVG6, CLOSE, CONTRACTS, DEFAULT_HYPOTHESES, ENTITIES, FX, INVOICES, SYNC,
  compute, fingerprint, mrrAt,
} from '../../content/simulator.js';
import '../../styles/product-screen.css';

const KPIS = ['arr', 'pca', 'churn', 'forecast'];
const SRC_NAME = { hubspot: 'HubSpot', pennylane: 'Pennylane', xero: 'Xero' };

/** Lineage of an indicator or a contract: the selected value, the transformation chain and the decision. */
function useLineage(r) {
  const t = useT();
  const f = useFmt();
  const k = (v, o) => f.money(v, { unit: 'k', dec: 1, ...o });
  const local = (c, v) => f.money(v, { ccy: ENTITIES[c.entity].ccy });
  const uk = r.arrRows.filter((x) => x.c.entity === 'UK');
  const lumen = CONTRACTS.find((c) => c.correction);
  const lumenDecision = {
    who: 'Claire', when: f.date([2026, 10, 6]),
    quote: t('Avenant signé le 28/08 : Lumen est résilié au 30/09, pas au 31/08.', 'Amendment signed on 28 Aug: Lumen ends on 30 Sep, not 31 Aug.'),
  };
  const arrDecision = {
    who: 'Claire', when: f.date([2026, 9, 3]),
    quote: t('ARR = MRR des abonnements actifs × 12, hors services et mise en place.', 'ARR = MRR of active subscriptions × 12, excluding services and set-up.'),
  };

  const kpi = {
    arr: {
      title: 'ARR', value: `ARR · 30/09/2026 → ${f.money(r.arr)}`,
      chain: [
        { dot: 'hubspot', op: 'Fetch', text: 'hubspot.deals', note: t(`${SYNC.hubspot.deals} deals · ${r.arrRows.length} abonnements actifs au 30/09`, `${SYNC.hubspot.deals} deals · ${r.arrRows.length} active subscriptions at 30 Sep`) },
        { dot: 'computed', op: t('Filtre', 'Filter'), text: t('hors services et mise en place', 'excluding services and set-up'), note: t('2 contrats exclus', '2 contracts excluded') },
        { dot: 'computed', op: t('Conversion', 'Conversion'), text: `Orbis Ltd · £ → € × ${f.num(FX, 3)}`, note: t(`${uk.length} contrats`, `${uk.length} contracts`) },
        { dot: 'computed', op: t('Somme', 'Sum'), text: 'MRR × 12', note: Object.entries(r.arrByEntity).map(([e, rows]) => `${e} ${k(rows.reduce((s, x) => s + x.eur, 0))}`).join(' + ') },
      ],
      result: f.money(r.arr), decision: arrDecision,
    },
    pca: {
      title: t('Produits constatés d’avance', 'Deferred revenue'), value: `${t('PCA', 'Deferred')} · 30/09/2026 → ${f.money(r.pca)}`,
      chain: [
        { dot: 'pennylane', op: 'Fetch', text: 'pennylane.invoices', note: t(`${SYNC.pennylane.invoices} factures · Orbis SAS`, `${SYNC.pennylane.invoices} invoices · Orbis SAS`) },
        { dot: 'xero', op: 'Fetch', text: 'xero.invoices', note: t(`${SYNC.xero.invoices} factures · Orbis Ltd`, `${SYNC.xero.invoices} invoices · Orbis Ltd`) },
        { dot: 'computed', op: t('Filtre', 'Filter'), text: t('facturé d’avance, au-delà du 30/09', 'billed in advance, beyond 30 Sep'), note: t(`${r.pcaRows.length} factures`, `${r.pcaRows.length} invoices`) },
        (() => {
          const { inv } = r.pcaRows[0];
          const left = inv.start + inv.months - 1 - CLOSE;
          return { dot: 'computed', op: 'PRORATA', text: t('montant × mois restants ÷ mois couverts', 'amount × months left ÷ months covered'), note: `${inv.number} : ${local(inv.contract, inv.amount)} × ${left}/${inv.months}` };
        })(),
      ],
      result: f.money(r.pca),
      decision: { who: 'Claire', when: f.date([2026, 9, 3]), quote: t('Étalement linéaire mensuel. Les services sont reconnus à la livraison.', 'Straight-line monthly spreading. Services are recognised on delivery.') },
    },
    churn: {
      title: t('Churn MRR · septembre', 'MRR churn · September'), value: `Churn · ${t('sept.', 'Sep')} 2026 → ${f.pct(r.churn.rate)}`,
      chain: [
        { dot: 'hubspot', op: 'Fetch', text: 'hubspot.deals', note: t(`MRR au 1er septembre : ${k(r.churn.opening)}`, `MRR on 1 September: ${k(r.churn.opening)}`) },
        { dot: 'computed', op: 'Churn', text: r.churn.churnList.map((c) => c.name).join(', '), note: k(-r.churn.churn) },
        { dot: 'manual', op: t('Exclusion', 'Exclusion'), text: lumen.name, note: t('fin corrigée au 30/09 · avenant n° 2', 'end corrected to 30 Sep · amendment no. 2') },
        { dot: 'computed', op: t('Ratio', 'Ratio'), text: `${k(r.churn.churn)} ÷ ${k(r.churn.opening)}`, note: t(`moyenne 6 mois : ${f.pct(CHURN_AVG6)}`, `6-month average: ${f.pct(CHURN_AVG6)}`) },
      ],
      result: f.pct(r.churn.rate), decision: lumenDecision,
    },
    forecast: {
      title: t('ARR projeté · sept. 2027', 'Projected ARR · Sep 2027'), value: `ARR · 30/09/2027 → ${f.money(r.arr12)}`,
      chain: [
        { dot: 'computed', op: t('Entrée', 'Input'), text: t('ARR arrêté au 30/09/2026', 'Closed ARR at 30 Sep 2026'), note: f.money(r.arr) },
        { dot: 'computed', op: t('Hypothèse', 'Assumption'), text: t(`churn ${f.pct(DEFAULT_HYPOTHESES.churn)} / mois`, `churn ${f.pct(DEFAULT_HYPOTHESES.churn)} / month`), note: t('moyenne des 6 derniers mois', 'average of the last 6 months') },
        { dot: 'computed', op: t('Hypothèse', 'Assumption'), text: t(`nouvel ARR ${f.money(DEFAULT_HYPOTHESES.newArr, { unit: 'k' })} / mois`, `new ARR ${f.money(DEFAULT_HYPOTHESES.newArr, { unit: 'k' })} / month`), note: t('moyenne des 6 derniers mois', 'average of the last 6 months') },
        { dot: 'computed', op: t('Projection', 'Projection'), text: t('12 mois, mois par mois', '12 months, month by month'), note: t('mêmes hypothèses, même résultat', 'same assumptions, same result') },
      ],
      result: f.money(r.arr12),
      decision: { who: 'Claire', when: f.date([2026, 10, 7]), quote: t('Hypothèses par défaut : moyennes sur 6 mois, revues à chaque arrêté.', 'Default assumptions: 6-month averages, reviewed at every close.') },
    },
  };

  const contract = (id) => {
    const c = CONTRACTS.find((x) => x.id === id);
    const src = ENTITIES[c.entity].source;
    const inv = INVOICES.filter((i) => i.contract === c && i.start <= CLOSE).pop();
    const arr = mrrAt(c, CLOSE) * 12;
    const period = inv.months === 1 ? f.month(inv.start) : `${f.month(inv.start)} → ${f.month(inv.start + inv.months - 1)}`;
    return {
      title: c.name, value: `${c.name} · ARR → ${local(c, arr)}`,
      chain: [
        { dot: 'hubspot', op: 'Fetch', text: `hubspot.deals #${c.deal}`, note: t(`MRR ${local(c, mrrAt(c, CLOSE))} · depuis ${f.month(c.start)}`, `MRR ${local(c, mrrAt(c, CLOSE))} · since ${f.month(c.start)}`) },
        { dot: src, op: 'Fetch', text: `${src}.invoices ${inv.number}`, note: `${local(c, inv.amount)} · ${period}` },
        ...(c.correction ? [{ dot: 'manual', op: t('Correction', 'Correction'), text: t(`fin de contrat ${f.month(c.correction.from)} → ${f.month(c.correction.to)}`, `contract end ${f.month(c.correction.from)} → ${f.month(c.correction.to)}`), note: `Claire · ${f.date(c.correction.on)}` }] : []),
        { dot: 'computed', op: t('Annualisation', 'Annualisation'), text: 'MRR × 12', note: c.entity === 'UK' ? `${t('puis', 'then')} £ → € × ${f.num(FX, 3)} = ${f.money(arr * FX)}` : t('actif au 30/09', 'active at 30 Sep') },
      ],
      result: local(c, arr), decision: c.correction ? lumenDecision : arrDecision,
    };
  };

  return (open) => (open.kind === 'kpi' ? kpi[open.id] : contract(open.id));
}

export default function ProductScreen() {
  const t = useT();
  const f = useFmt();
  const r = useMemo(() => compute(), []);
  const fp = useMemo(() => fingerprint(r, DEFAULT_HYPOTHESES), [r]);
  const lineageOf = useLineage(r);

  const [open, setOpen] = useState({ kind: 'kpi', id: 'arr' });
  const [trace, setTrace] = useState(true);
  const [check, setCheck] = useState('idle');
  const [auto, setAuto] = useState(true);
  const rootRef = useRef(null);

  // On phones the panel would cover the board: start closed, and no walkthrough.
  const phone = () => window.matchMedia('(max-width: 720px)').matches;
  useEffect(() => { if (phone()) { setOpen(null); setAuto(false); } }, []);

  // Until the visitor touches it, the screen walks through the four indicators while it is on screen.
  useEffect(() => {
    if (!auto || prefersReducedMotion() || phone()) return undefined;
    let timer = null;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) {
        timer = setInterval(() => setOpen((o) => ({ kind: 'kpi', id: KPIS[(KPIS.indexOf(o?.kind === 'kpi' ? o.id : 'forecast') + 1) % KPIS.length] })), 4500);
      }
    }, { threshold: 0.5 });
    io.observe(rootRef.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [auto]);

  const select = (next) => { setTrace(true); setCheck('idle'); setOpen(next); };
  const recompute = () => {
    setCheck('running');
    setTimeout(() => setCheck(fingerprint(compute(), DEFAULT_HYPOTHESES) === fp ? 'same' : 'diff'), 700);
  };

  const L = open && lineageOf(open);
  const tiles = [
    { id: 'arr', label: 'ARR', value: f.money(r.arr, { unit: 'M', dec: 2 }), delta: `↑ ${f.money((r.churn.closing - r.churn.opening) * 12, { unit: 'k', dec: 1 })} ${t('sur le mois', 'this month')}`, tone: 'up' },
    { id: 'pca', label: t('PCA', 'Deferred revenue'), value: f.money(r.pca, { unit: 'k' }), delta: t(`${r.pcaRows.length} factures · 2 entités`, `${r.pcaRows.length} invoices · 2 entities`) },
    { id: 'churn', label: t('Churn MRR', 'MRR churn'), value: f.pct(r.churn.rate), delta: t(`moyenne 6 mois ${f.pct(CHURN_AVG6)}`, `6-month avg ${f.pct(CHURN_AVG6)}`), tone: 'warn' },
    { id: 'forecast', label: t('ARR sept. 2027', 'ARR Sep 2027'), value: f.money(r.arr12, { unit: 'M', dec: 2 }), delta: t(`+${f.pct(r.arr12 / r.arr - 1)} sur 12 mois`, `+${f.pct(r.arr12 / r.arr - 1)} over 12 months`) },
  ];
  const lumen = CONTRACTS.find((c) => c.correction);
  const rows = [...r.arrRows.slice(0, 5), r.arrRows.find((x) => x.c === lumen)];

  return (
    <div
      ref={rootRef}
      className="ps"
      role="group"
      aria-label={t('Aperçu du produit : un board pack où chaque chiffre ouvre son lignage', 'Product preview: a board pack where every figure opens its lineage')}
      onPointerDown={() => setAuto(false)}
      onKeyDown={() => setAuto(false)}
    >
      <div className="ps-bar" aria-hidden="true"><i /><i /><i /><span>app.trame-labs.com/orbis/board-pack</span></div>
      <div className="ps-app">
        <aside className="ps-side" aria-hidden="true">
          <div className="ps-ws"><b>O</b>Orbis</div>
          <p className="ps-over">Workspace</p>
          <span>{t('Accueil', 'Home')}</span><span>{t('Intégrations', 'Integrations')}</span>
          <p className="ps-over">{t('Tables', 'Tables')}</p>
          <span className="on">Board pack</span><span>{t('Revenus différés', 'Deferred revenue')}</span><span>Churn</span><span>Forecast</span>
          <div className="ps-sources">
            <p className="ps-over">{t('Sources', 'Sources')}</p>
            {['hubspot', 'pennylane', 'xero'].map((s) => <span key={s} data-dot={s}>{SRC_NAME[s]} <em>{SYNC[s].at[3]}</em></span>)}
          </div>
        </aside>

        <div className="ps-main">
          <div className="ps-head">
            <p className="ps-title">Board pack <span>— {t('septembre 2026', 'September 2026')}</span></p>
            <span className="ps-badge">{t('Certifié', 'Certified')}</span>
            <span className="ps-meta">{t('Arrêté le', 'Closed on')} {f.date([2026, 10, 7])}</span>
            <span className="ps-spacer" />
            <label className="ps-toggle">
              <span>{t('Traçabilité', 'Lineage')}</span>
              <button type="button" role="switch" aria-checked={trace} className={trace ? 'on' : undefined} onClick={() => { setTrace(!trace); if (trace) setOpen(null); }} />
            </label>
          </div>

          <div className="ps-body">
            <div className="ps-kpis">
              {tiles.map((x) => (
                <button key={x.id} type="button" className="ps-kpi" aria-pressed={open?.kind === 'kpi' && open.id === x.id} onClick={() => select({ kind: 'kpi', id: x.id })}>
                  <span className="ps-over">{x.label}</span>
                  <span className="v">{x.value}</span>
                  <span className={x.tone ? `d ${x.tone}` : 'd'}>{x.delta}</span>
                </button>
              ))}
            </div>

            <div className="ps-grid-wrap">
              <table className={trace ? 'ps-grid trace' : 'ps-grid'}>
                <thead>
                  <tr><th>{t('Client', 'Customer')}</th><th className="hide-s">{t('Source', 'Source')}</th><th className="num">MRR</th><th className="hide-s">{t('Fin de contrat', 'Contract end')}</th><th className="num">ARR (€)</th></tr>
                </thead>
                <tbody>
                  {rows.map(({ c, eur }) => (
                    <tr key={c.id} className={open?.kind === 'row' && open.id === c.id ? 'on' : undefined} onClick={() => select({ kind: 'row', id: c.id })}>
                      <td><button type="button" className="ps-cell" onClick={(e) => { e.stopPropagation(); select({ kind: 'row', id: c.id }); }}>{c.name}</button></td>
                      <td className="hide-s"><span data-dot={ENTITIES[c.entity].source}>{SRC_NAME[ENTITIES[c.entity].source]}</span></td>
                      <td className="num">{f.money(mrrAt(c, CLOSE), { ccy: ENTITIES[c.entity].ccy })}</td>
                      <td className={c.correction ? 'hide-s manual' : 'hide-s'}>{c.end == null ? '—' : f.month(c.end)}</td>
                      <td className="num">{f.num(eur)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="ps-legend"><span className="sw" /> {t('Valeur modifiée par un humain', 'Value edited by a person')} <span className="sep">·</span> {t(`${r.arrRows.length} contrats, 6 affichés`, `${r.arrRows.length} contracts, 6 shown`)}</p>
            </div>
          </div>

          <aside className={L ? 'ps-panel open' : 'ps-panel'} aria-label={t('Lignage', 'Lineage')} aria-live="polite">
            {L && (
              <>
                <div className="ps-panel-head">
                  <div><p className="ps-over">{t('Lignage', 'Lineage')}</p><h4>{L.title}</h4></div>
                  <button type="button" className="ps-x" aria-label={t('Fermer', 'Close')} onClick={() => setOpen(null)}>×</button>
                </div>
                <div className="ps-sec">
                  <p className="ps-over">{t('Valeur sélectionnée', 'Selected value')}</p>
                  <p className="ps-sel">{L.value}</p>
                </div>
                <div className="ps-sec">
                  <p className="ps-over">{t('Chaîne de transformation', 'Transformation chain')}</p>
                  <ol className="ps-chain">
                    {L.chain.map((s) => (
                      <li key={s.op + s.text} data-dot={s.dot}><b>{s.op}</b> — {s.text}<small>{s.note}</small></li>
                    ))}
                    <li data-dot="result"><b>{t('Résultat', 'Result')}</b> — {L.result}</li>
                  </ol>
                </div>
                <div className="ps-sec">
                  <p className="ps-over">{t('Décision', 'Decision')}</p>
                  <p className="ps-dec"><b>{L.decision.who}</b> · {L.decision.when}<br />{t(`« ${L.decision.quote} »`, `“${L.decision.quote}”`)}</p>
                </div>
                <div className="ps-sec ps-check">
                  <button type="button" onClick={recompute} disabled={check === 'running'}>{check === 'running' ? t('Recalcul…', 'Recalculating…') : t('Recalculer depuis les sources', 'Recalculate from the sources')}</button>
                  <span>{check === 'same' ? <>✓ {t('Identique', 'Identical')} · <code>{fp}</code></> : <>{t('Empreinte', 'Fingerprint')} <code>{fp}</code></>}</span>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
