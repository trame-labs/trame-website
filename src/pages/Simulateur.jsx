// Simulator: a fictional board pack where every figure opens onto its definition, its calculation, its components
// and the source documents in HubSpot, Pennylane and Xero. Data and calculations live in content/simulator.js.
import { useMemo, useState } from 'react';
import { usePageMeta } from '../lib/router.js';
import { useLang, useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton, PageHero } from '../components/blocks.jsx';
import {
  CLOSE, CHURN_AVG6, CONTRACTS, DEFAULT_HYPOTHESES, ENTITIES, FX, INVOICES, NEW_ARR_AVG6, SYNC,
  compute, deferredAt, fingerprint, mrrAt, monthOf, yearOf,
} from '../content/simulator.js';
import '../styles/pages/Simulateur.css';

// Formatting by hand (not Intl), so the pre-rendered HTML and the browser agree to the character.
const NBSP = '\u00a0'; // the narrow no-break space is near invisible in Geist
const MONTHS = {
  fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

function useFmt() {
  const lang = useLang();
  const num = (v, dec = 0) => {
    const [i, d] = Math.abs(v).toFixed(dec).split('.');
    const g = i.replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'fr' ? NBSP : ',');
    return (v < 0 && Number(i + (d || '')) !== 0 ? '−' : '') + g + (d ? (lang === 'fr' ? ',' : '.') + d : '');
  };
  const money = (v, { ccy = 'EUR', unit = '', dec = 0, sign = false } = {}) => {
    const n = num((v / (unit === 'M' ? 1e6 : unit === 'k' ? 1e3 : 1)), dec);
    const s = sign && v > 0 ? '+' : '';
    const sym = ccy === 'GBP' ? '£' : '€';
    if (lang === 'fr') return `${s}${n}${NBSP}${unit}${sym}`;
    return n.startsWith('−') ? `−${sym}${n.slice(1)}${unit}` : `${s}${sym}${n}${unit}`;
  };
  const pct = (v, dec = 1) => (lang === 'fr' ? `${num(v * 100, dec)}${NBSP}%` : `${num(v * 100, dec)}%`);
  const month = (m) => `${MONTHS[lang][monthOf(m) - 1]} ${yearOf(m)}`;
  const date = ([y, m, d, time]) => {
    const s = lang === 'fr' ? `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}` : `${d} ${MONTHS.en[m - 1]} ${y}`;
    return time ? `${s}${lang === 'fr' ? ' · ' : ', '}${time}` : s;
  };
  const firstDay = (m) => date([yearOf(m), monthOf(m), 1]);
  return { lang, num, money, pct, month, date, firstDay };
}

/** Amounts, rates and formulas get the mono figures; text values (even starting with a digit) wrap as text. */
const isAmount = (v) => /^[−+\d£€]/.test(v) && !/[A-Za-zÀ-ÿ]{3,}/.test(v);

const SYS = { hubspot: 'HubSpot', pennylane: 'Pennylane', xero: 'Xero', trame: 'Trame' };
const ACCOUNT = {
  FR: { revenue: '706000 · Prestations de services', deferred: '487000 · Produits constatés d’avance' },
  UK: { revenue: '200 · Sales', deferred: '835 · Income in advance' },
};
const CLOSED_ON = [2026, 10, 7];
const OWNER = 'Claire Martin';

/** The four levels of a figure: definition, calculation, components, sources. One builder per indicator. */
function useLineage(r, h, setH) {
  const t = useT();
  const f = useFmt();
  const local = (c, v, o) => f.money(v, { ccy: ENTITIES[c.entity].ccy, ...o });
  const lastInvoice = (c) => INVOICES.filter((i) => i.contract === c && i.start <= CLOSE).pop();
  const period = (inv) => (inv.months === 1 ? f.month(inv.start) : `${f.month(inv.start)} → ${f.month(inv.start + inv.months - 1)}`);
  const billing = { A: t('Annuelle, d’avance', 'Annual, in advance'), Q: t('Trimestrielle, d’avance', 'Quarterly, in advance'), M: t('Mensuelle', 'Monthly') };

  const dealSource = (c, extra = []) => ({
    sys: 'hubspot', title: `Deal #${c.deal} · ${c.name}`, at: SYNC.hubspot.at,
    lines: [
      [t('Étape', 'Stage'), c.end != null && c.end < CLOSE ? t('Client perdu', 'Churned customer') : t('Gagné', 'Closed won')],
      ...(c.kind === 'subscription' ? [
        [t('Montant récurrent mensuel', 'Monthly recurring amount'), local(c, c.mrr)],
        ...(c.steps || []).map(([from, v]) => [t(`Avenant au ${f.firstDay(from)}`, `Amendment from ${f.firstDay(from)}`), local(c, v)]),
        [t('Début', 'Start'), f.month(c.start)],
        [t('Fin', 'End'), c.end == null ? t('Sans date de fin', 'No end date') : f.month(c.correction ? c.correction.from : c.end)],
        [t('Facturation', 'Billing'), billing[c.billing]],
      ] : [[t('Montant', 'Amount'), local(c, c.amount)]]),
      ...extra,
    ],
  });
  const invoiceSource = (inv) => ({
    sys: ENTITIES[inv.contract.entity].source, at: SYNC[ENTITIES[inv.contract.entity].source].at,
    title: `${t('Facture', 'Invoice')} ${inv.number} · ${inv.contract.name}`,
    lines: [
      [t('Émise le', 'Issued on'), f.firstDay(inv.start)],
      [t('Période couverte', 'Period covered'), period(inv)],
      [t('Montant HT', 'Amount excl. VAT'), local(inv.contract, inv.amount)],
      [t('Entité', 'Entity'), ENTITIES[inv.contract.entity].name],
    ],
  });
  const correctionSource = (c) => c.correction && ({
    sys: 'trame', title: t('Correction manuelle', 'Manual correction'), flag: true,
    lines: [
      [t('Champ', 'Field'), t('Date de fin du contrat', 'Contract end date')],
      [t('Dans HubSpot', 'In HubSpot'), f.month(c.correction.from)],
      [t('Retenue', 'Applied'), f.month(c.correction.to)],
      [t('Justificatif', 'Evidence'), t('Avenant n° 2 signé le 28/08/2026 : résiliation au 30/09', 'Amendment no. 2 signed on 28 Aug 2026: termination on 30 Sep')],
      [t('Par', 'By'), `${OWNER}, ${t('DAF', 'CFO')} · ${f.date(c.correction.on)}`],
    ],
  });

  const fxRow = [t('Taux de change', 'Exchange rate'), `£1 = ${f.money(FX, { dec: 3 })}`];

  return {
    arr: {
      definition: t(
        'Revenu récurrent annualisé : MRR des abonnements actifs au dernier jour du mois, multiplié par 12.',
        'Annual recurring revenue: MRR of the subscriptions active on the last day of the month, multiplied by 12.',
      ),
      rules: [
        t('Un contrat est actif de son mois de début à son mois de fin inclus, selon HubSpot et ses avenants.', 'A contract is active from its start month to its end month inclusive, per HubSpot and its amendments.'),
        t('Les services et frais de mise en place sont exclus de l’ARR.', 'Services and set-up fees are excluded from ARR.'),
        t(`La livre sterling est convertie au taux de clôture du 30/09 (£1 = ${f.money(FX, { dec: 3 })}), pour tout l’historique.`, `Pounds sterling are converted at the closing rate on 30 Sep (£1 = ${f.money(FX, { dec: 3 })}), for the whole history.`),
      ],
      calc: {
        rows: [
          ...Object.entries(r.arrByEntity).map(([e, rows]) => {
            const sum = rows.reduce((s, x) => s + x.local, 0);
            return {
              label: `${ENTITIES[e].name} · ${SYS[ENTITIES[e].source]}`,
              sub: e === 'UK'
                ? `${rows.length} ${t('contrats', 'contracts')} · ${local({ entity: e }, sum / 12)} × 12 × ${f.num(FX, 3)}`
                : `${rows.length} ${t('contrats', 'contracts')} · ${local({ entity: e }, sum / 12)} × 12`,
              value: f.money(rows.reduce((s, x) => s + x.eur, 0), { unit: 'k', dec: 1 }),
            };
          }),
          { label: t('ARR du groupe', 'Group ARR'), value: f.money(r.arr, { unit: 'k', dec: 1 }), total: true },
        ],
      },
      components: {
        caption: t(`${r.arrRows.length} abonnements actifs au 30/09`, `${r.arrRows.length} active subscriptions at 30 Sep`),
        rows: r.arrRows.map(({ c, eur }) => ({
          id: c.id, label: c.name, flag: !!c.correction,
          sub: `${ENTITIES[c.entity].name} · ${local(c, mrrAt(c, CLOSE))} / ${t('mois', 'month')}${c.correction ? ' · ' + t('corrigé', 'corrected') : ''}`,
          value: f.money(eur, { unit: 'k', dec: 1 }),
        })),
      },
      sources: (id) => {
        const c = CONTRACTS.find((x) => x.id === id);
        return [
          correctionSource(c),
          dealSource(c),
          invoiceSource(lastInvoice(c)),
          {
            sys: ENTITIES[c.entity].source, at: SYNC[ENTITIES[c.entity].source].at,
            title: t('Écriture de chiffre d’affaires, septembre', 'Revenue entry, September'),
            lines: [[t('Compte', 'Account'), ACCOUNT[c.entity].revenue], [t('Montant', 'Amount'), local(c, mrrAt(c, CLOSE))], ...(c.entity === 'UK' ? [fxRow] : [])],
          },
        ].filter(Boolean);
      },
    },

    pca: {
      definition: t(
        'Produits constatés d’avance : part des factures émises d’avance qui couvre des mois postérieurs au 30/09.',
        'Deferred revenue: the part of invoices issued in advance that covers months after 30 Sep.',
      ),
      rules: [
        t('Étalement linéaire, mois par mois, sur la période couverte par la facture.', 'Straight-line spreading, month by month, over the period the invoice covers.'),
        t('Les services sont reconnus à la livraison : jamais étalés.', 'Services are recognised on delivery: never spread.'),
        t('Comptes : 487000 chez Orbis SAS (Pennylane), 835 chez Orbis Ltd (Xero).', 'Accounts: 487000 at Orbis SAS (Pennylane), 835 at Orbis Ltd (Xero).'),
      ],
      calc: {
        rows: [
          ...Object.entries(r.pcaByEntity).map(([e, rows]) => ({
            label: `${ENTITIES[e].name} · ${t('compte', 'account')} ${ENTITIES[e].deferred}`,
            sub: `${rows.length} ${t('factures', 'invoices')} · ${local({ entity: e }, rows.reduce((s, x) => s + x.local, 0))}${e === 'UK' ? ` × ${f.num(FX, 3)}` : ''}`,
            value: f.money(rows.reduce((s, x) => s + x.eur, 0), { unit: 'k', dec: 1 }),
          })),
          { label: t('PCA du groupe au 30/09', 'Group deferred revenue at 30 Sep'), value: f.money(r.pca, { unit: 'k', dec: 1 }), total: true },
        ],
      },
      components: {
        caption: t(`${r.pcaRows.length} factures avec une part à reporter`, `${r.pcaRows.length} invoices with a part to defer`),
        rows: r.pcaRows.map(({ inv, eur }) => ({
          id: inv.number, label: `${inv.number} · ${inv.contract.name}`,
          sub: `${period(inv)} · ${inv.start + inv.months - 1 - CLOSE}/${inv.months} ${t('mois restants', 'months left')}`,
          value: f.money(eur, { unit: 'k', dec: 1 }),
        })),
      },
      sources: (id) => {
        const inv = INVOICES.find((x) => x.number === id);
        const c = inv.contract, left = inv.start + inv.months - 1 - CLOSE;
        return [
          invoiceSource(inv),
          dealSource(c),
          {
            sys: 'trame', title: t('Étalement au 30/09', 'Spreading at 30 Sep'),
            lines: [
              [t('Formule', 'Formula'), `${local(c, inv.amount)} × ${left}/${inv.months}`],
              [t('À reporter', 'To defer'), local(c, deferredAt(inv))],
              ...(c.entity === 'UK' ? [fxRow, [t('En euros', 'In euros'), f.money(deferredAt(inv) * FX)]] : []),
            ],
          },
          {
            sys: ENTITIES[c.entity].source, at: SYNC[ENTITIES[c.entity].source].at,
            title: t('Écriture de PCA au 30/09', 'Deferred revenue entry at 30 Sep'),
            lines: [[t('Débit', 'Debit'), ACCOUNT[c.entity].revenue], [t('Crédit', 'Credit'), ACCOUNT[c.entity].deferred], [t('Montant', 'Amount'), local(c, deferredAt(inv))]],
          },
        ];
      },
    },

    churn: {
      definition: t(
        'Churn MRR brut du mois : MRR perdu sur les contrats résiliés, divisé par le MRR au 1er du mois.',
        'Gross MRR churn for the month: MRR lost on terminated contracts, divided by MRR on the first day of the month.',
      ),
      rules: [
        t('La date de résiliation est la date de fin effective du contrat, avenants compris.', 'The termination date is the contract’s effective end date, amendments included.'),
        t('Les baisses de prix sont comptées à part (contraction), pas comme du churn.', 'Price decreases are counted separately (contraction), not as churn.'),
        t('Même conversion en euros que l’ARR.', 'Same conversion to euros as ARR.'),
      ],
      calc: {
        rows: [
          { label: t('MRR au 1er septembre', 'MRR on 1 September'), value: f.money(r.churn.opening, { unit: 'k', dec: 1 }) },
          { label: t('Nouveaux contrats', 'New contracts'), sub: r.churn.newList.map((c) => c.name).join(', '), value: f.money(r.churn.added, { unit: 'k', dec: 1, sign: true }), pos: true },
          { label: t('Expansion', 'Expansion'), sub: t('Opale : avenant au 01/09', 'Opale: amendment from 1 Sep'), value: f.money(r.churn.expansion, { unit: 'k', dec: 1, sign: true }), pos: true },
          { label: t('Churn', 'Churn'), sub: r.churn.churnList.map((c) => c.name).join(', '), value: f.money(-r.churn.churn, { unit: 'k', dec: 1 }), neg: true },
          { label: t('MRR au 30 septembre', 'MRR on 30 September'), value: f.money(r.churn.closing, { unit: 'k', dec: 1 }), total: true },
          { label: t('Churn du mois', 'Churn for the month'), sub: `${f.money(r.churn.churn, { unit: 'k', dec: 1 })} ÷ ${f.money(r.churn.opening, { unit: 'k', dec: 1 })}`, value: f.pct(r.churn.rate), total: true },
        ],
      },
      components: {
        caption: t('Contrats terminés fin août, et un contrat écarté', 'Contracts ended at the end of August, and one contract set aside'),
        rows: [
          ...r.churn.churnList.map((c) => ({
            id: c.id, label: c.name, sub: `${ENTITIES[c.entity].name} · ${t('fin', 'end')} ${f.month(c.end)}`,
            value: f.money(-toEurLocal(c, mrrAt(c, CLOSE - 1)), { unit: 'k', dec: 1 }), neg: true,
          })),
          ...CONTRACTS.filter((c) => c.correction).map((c) => ({
            id: c.id, label: c.name, flag: true,
            sub: t('Écarté : fin corrigée au 30/09 par avenant', 'Set aside: end corrected to 30 Sep by amendment'),
            value: f.money(0, { unit: 'k', dec: 1 }),
          })),
        ],
      },
      sources: (id) => {
        const c = CONTRACTS.find((x) => x.id === id);
        return [
          correctionSource(c),
          dealSource(c, c.correction ? [] : [[t('MRR perdu', 'Lost MRR'), local(c, mrrAt(c, CLOSE - 1))]]),
          invoiceSource(lastInvoice(c)),
        ].filter(Boolean);
      },
    },

    forecast: {
      definition: t(
        'ARR projeté à fin septembre 2027, à partir de l’ARR arrêté et de trois hypothèses explicites. Mêmes hypothèses, même résultat.',
        'ARR projected to the end of September 2027, from the closed ARR and three explicit assumptions. Same assumptions, same result.',
      ),
      rules: [
        t(`Churn mensuel par défaut : moyenne des 6 derniers mois (${f.pct(CHURN_AVG6, 2)}).`, `Default monthly churn: average of the last 6 months (${f.pct(CHURN_AVG6, 2)}).`),
        t(`Nouvel ARR signé par mois par défaut : moyenne des 6 derniers mois (${f.money(NEW_ARR_AVG6, { unit: 'k', dec: 1 })}).`, `Default new ARR signed per month: average of the last 6 months (${f.money(NEW_ARR_AVG6, { unit: 'k', dec: 1 })}).`),
        t('Hausse de prix appliquée au 1er janvier sur l’ARR en place. Chaque changement d’hypothèse est daté et signé.', 'Price increase applied on 1 January to the ARR in place. Every change of assumption is dated and signed.'),
      ],
      calc: {
        sliders: [
          { key: 'churn', label: t('Churn mensuel', 'Monthly churn'), min: 0, max: 0.03, step: 0.001, show: (v) => f.pct(v) },
          { key: 'newArr', label: t('Nouvel ARR signé par mois', 'New ARR signed per month'), min: 0, max: 250000, step: 5000, show: (v) => f.money(v, { unit: 'k' }) },
          { key: 'price', label: t('Hausse de prix au 1er janvier', 'Price increase on 1 January'), min: 0, max: 0.1, step: 0.005, show: (v) => f.pct(v) },
        ],
        h, setH,
        rows: [
          { label: t('ARR arrêté au 30/09/2026', 'Closed ARR at 30 Sep 2026'), value: f.money(r.arr, { unit: 'k', dec: 1 }) },
          { label: t('Churn sur 12 mois', 'Churn over 12 months'), value: f.money(-r.forecast.reduce((s, x) => s + x.lost, 0), { unit: 'k', dec: 1 }), neg: true },
          { label: t('Nouvel ARR signé', 'New ARR signed'), value: f.money(r.forecast.reduce((s, x) => s + x.added, 0), { unit: 'k', dec: 1, sign: true }), pos: true },
          { label: t('Hausse de prix', 'Price increase'), value: f.money(r.forecast.reduce((s, x) => s + x.priceUp, 0), { unit: 'k', dec: 1, sign: true }), pos: true },
          { label: t('ARR projeté au 30/09/2027', 'Projected ARR at 30 Sep 2027'), value: f.money(r.arr12, { unit: 'k', dec: 1 }), total: true },
        ],
      },
      components: {
        caption: t('12 mois projetés', '12 projected months'),
        rows: r.forecast.map((x) => ({
          id: String(x.m), label: f.month(x.m),
          sub: `${f.money(-x.lost, { unit: 'k', dec: 1 })} · ${f.money(x.added, { unit: 'k', dec: 1, sign: true })}${x.priceUp ? ` · ${f.money(x.priceUp, { unit: 'k', dec: 1, sign: true })} ${t('prix', 'price')}` : ''}`,
          value: f.money(x.close, { unit: 'k', dec: 1 }),
        })),
      },
      sources: (id) => {
        const x = r.forecast.find((y) => String(y.m) === id);
        const changed = (k) => h[k] !== DEFAULT_HYPOTHESES[k];
        const origin = (k) => (changed(k) ? t('modifiée dans ce simulateur', 'changed in this simulator') : t('par défaut, calculée sur l’historique', 'default, computed from history'));
        return [
          {
            sys: 'trame', title: `${t('Calcul de', 'Calculation for')} ${f.month(x.m)}`,
            lines: [
              [t('ARR d’ouverture', 'Opening ARR'), f.money(x.open, { unit: 'k', dec: 1 })],
              [`${t('Churn', 'Churn')} (${f.pct(h.churn)})`, f.money(-x.lost, { unit: 'k', dec: 1 })],
              [t('Nouvel ARR signé', 'New ARR signed'), f.money(x.added, { unit: 'k', dec: 1, sign: true })],
              ...(x.priceUp ? [[`${t('Hausse de prix', 'Price increase')} (${f.pct(h.price)})`, f.money(x.priceUp, { unit: 'k', dec: 1, sign: true })]] : []),
              [t('ARR de clôture', 'Closing ARR'), f.money(x.close, { unit: 'k', dec: 1 })],
            ],
          },
          {
            sys: 'trame', title: t('Hypothèses utilisées', 'Assumptions used'), flag: ['churn', 'newArr', 'price'].some(changed),
            lines: [
              [t('Churn mensuel', 'Monthly churn'), `${f.pct(h.churn)} · ${origin('churn')}`],
              [t('Nouvel ARR par mois', 'New ARR per month'), `${f.money(h.newArr, { unit: 'k' })} · ${origin('newArr')}`],
              [t('Hausse de prix', 'Price increase'), `${f.pct(h.price)} · ${changed('price') ? origin('price') : t('aucune décidée', 'none decided')}`],
            ],
          },
        ];
      },
    },
  };
}

const toEurLocal = (c, v) => (c.entity === 'UK' ? v * FX : v);

function Rows({ rows, pick, onPick, label }) {
  return (
    <table className="rows">
      <tbody>
        {rows.map((x, i) => (
          <tr
            key={x.id || i}
            className={[onPick && 'pick', onPick && pick === x.id && 'on', x.total && 'total', x.flag && 'flag'].filter(Boolean).join(' ') || undefined}
            onClick={onPick ? () => onPick(x.id) : undefined}
            onKeyDown={onPick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(x.id); } } : undefined}
            tabIndex={onPick ? 0 : undefined}
            role={onPick ? 'button' : undefined}
            aria-pressed={onPick ? pick === x.id : undefined}
            aria-label={onPick ? `${label} ${x.label}` : undefined}
          >
            <td>{x.label}{x.sub && <span className="src">{x.sub}</span>}</td>
            <td className={['v', x.pos && 'pos', x.neg && 'neg'].filter(Boolean).join(' ')}>{x.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Simulateur() {
  const t = useT();
  const f = useFmt();
  usePageMeta(
    t('Simulateur : chaque chiffre, de l’indicateur à la pièce | Trame', 'Simulator: every figure, from the indicator to the source document | Trame'),
    t('Un board pack fictif où chaque indicateur s’ouvre sur sa définition, son calcul, ses contrats et ses pièces dans HubSpot, Pennylane et Xero.', 'A fictional board pack where every indicator opens onto its definition, its calculation, its contracts and its documents in HubSpot, Pennylane and Xero.'),
  );

  const [kpi, setKpi] = useState('arr');
  const [picks, setPicks] = useState({});
  const [h, setH] = useState(DEFAULT_HYPOTHESES);
  const [check, setCheck] = useState({ status: 'idle' });

  const closed = useMemo(() => compute(DEFAULT_HYPOTHESES), []);
  const closedFp = useMemo(() => fingerprint(closed, DEFAULT_HYPOTHESES), [closed]);
  const r = useMemo(() => compute(h), [h]);
  const fp = fingerprint(r, h);
  const modified = Object.keys(h).some((k) => h[k] !== DEFAULT_HYPOTHESES[k]);
  const lineage = useLineage(r, h, setH)[kpi];
  const pick = picks[kpi] ?? lineage.components.rows[0].id;
  const sources = lineage.sources(pick);

  const tiles = [
    { id: 'arr', label: 'ARR', value: f.money(r.arr, { unit: 'M', dec: 2 }), sub: `${f.money((r.churn.closing - r.churn.opening) * 12, { unit: 'k', dec: 1, sign: true })} ${t('sur le mois', 'this month')}` },
    { id: 'pca', label: t('Produits constatés d’avance', 'Deferred revenue'), value: f.money(r.pca, { unit: 'k' }), sub: t(`${r.pcaRows.length} factures, 2 entités`, `${r.pcaRows.length} invoices, 2 entities`) },
    { id: 'churn', label: t('Churn MRR de septembre', 'September MRR churn'), value: f.pct(r.churn.rate), sub: `${t('moyenne 6 mois', '6-month average')} ${f.pct(CHURN_AVG6)}`, warn: r.churn.rate > CHURN_AVG6 * 1.5 },
    { id: 'forecast', label: t('ARR projeté, sept. 2027', 'Projected ARR, Sep 2027'), value: f.money(r.arr12, { unit: 'M', dec: 2 }), sub: modified ? t('hypothèses modifiées', 'assumptions changed') : `${f.pct(r.arr12 / r.arr - 1)} ${t('sur 12 mois', 'over 12 months')}`, modified },
  ];

  const recompute = () => {
    setCheck({ status: 'running' });
    setTimeout(() => {
      const again = compute(h);
      setCheck({ status: 'done', same: fingerprint(again, h) === fp, fp: fingerprint(again, h) });
    }, 900);
  };

  const levels = [
    { n: '01', title: t('Définition', 'Definition') },
    { n: '02', title: t('Calcul', 'Calculation') },
    { n: '03', title: t('Composants', 'Components') },
    { n: '04', title: t('Sources', 'Sources') },
  ];

  return (
    <main className="v1">
      <PageHero
        kicker={t('Simulateur', 'Simulator')}
        title={t('Cliquez sur un chiffre. Descendez jusqu’à la pièce.', 'Click a figure. Go all the way down to the document.')}
        lead={<>{t('Le board pack d’Orbis, une société fictive : une entité en France sur Pennylane, une au Royaume-Uni sur Xero, un CRM HubSpot.', 'The board pack of Orbis, a fictional company: one entity in France on Pennylane, one in the UK on Xero, a HubSpot CRM.')} <span>{t('Chaque indicateur s’ouvre sur sa définition, son calcul, ses contrats et ses pièces.', 'Every indicator opens onto its definition, its calculation, its contracts and its documents.')}</span></>}
        ctas={<><LinkButton to="#simulateur" size="lg" variant="signal">{t('Ouvrir le board pack', 'Open the board pack')}</LinkButton><DemoButton variant="ghostInverse" /></>}
      />
      <Rails>
        <section className="band tight paper" id="simulateur">
          <div className="wrap">
            <div className="card sim">
              <div className="card-head">
                <p className="card-title">{t('Orbis · board pack de septembre 2026', 'Orbis · September 2026 board pack')} <span>{t('· groupe, en euros', '· group, in euros')}</span></p>
                <span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>{t('Arrêté le', 'Closed on')} {f.date(CLOSED_ON)}</span>
              </div>

              <ul className="sim-sync" aria-label={t('Sources synchronisées', 'Synced sources')}>
                <li data-sys="hubspot"><b>HubSpot</b> {SYNC.hubspot.deals} deals</li>
                <li data-sys="pennylane"><b>Pennylane</b> {SYNC.pennylane.invoices} {t('factures', 'invoices')} · Orbis SAS</li>
                <li data-sys="xero"><b>Xero</b> {SYNC.xero.invoices} {t('factures', 'invoices')} · Orbis Ltd</li>
                <li className="at">{t('Synchronisé le', 'Synced on')} {f.date(SYNC.xero.at)}</li>
              </ul>

              <div className="sim-kpis" role="group" aria-label={t('Indicateurs', 'Indicators')}>
                {tiles.map((x) => (
                  <button key={x.id} type="button" className={['sim-kpi', x.warn && 'warn', x.modified && 'mod'].filter(Boolean).join(' ')} aria-pressed={kpi === x.id} onClick={() => setKpi(x.id)}>
                    <span className="k">{x.label}</span>
                    <span className="num">{x.value}</span>
                    <span className="d">{x.sub}</span>
                    <span className="go">{kpi === x.id ? t('Détail ouvert', 'Detail open') : t('Voir d’où vient ce chiffre', 'See where this figure comes from')}</span>
                  </button>
                ))}
              </div>

              <ol className="sim-lineage" aria-live="polite">
                <li>
                  <span className="n">{levels[0].n}</span>
                  <div>
                    <h3>{levels[0].title}</h3>
                    <p className="def">{lineage.definition}</p>
                    <ul className="rules">{lineage.rules.map((x) => <li key={x}>{x}</li>)}</ul>
                    <p className="owner">{t('Définition écrite par', 'Definition written by')} {OWNER}, {t('DAF', 'CFO')} · {t('validée le', 'approved on')} {f.date([2026, 9, 3])} · v3</p>
                  </div>
                </li>
                <li>
                  <span className="n">{levels[1].n}</span>
                  <div>
                    <h3>{levels[1].title}</h3>
                    {lineage.calc.sliders && (
                      <div className="sim-sliders">
                        {lineage.calc.sliders.map((s) => (
                          <label key={s.key}>
                            <span>{s.label} <b>{s.show(h[s.key])}</b></span>
                            <input type="range" min={s.min} max={s.max} step={s.step} value={h[s.key]} onChange={(e) => { setH({ ...h, [s.key]: Number(e.target.value) }); setCheck({ status: 'idle' }); }} />
                          </label>
                        ))}
                        {modified && <button type="button" className="sim-reset" onClick={() => { setH(DEFAULT_HYPOTHESES); setCheck({ status: 'idle' }); }}>{t('Revenir aux hypothèses de l’arrêté', 'Back to the closing assumptions')}</button>}
                      </div>
                    )}
                    <div className="sim-box"><Rows rows={lineage.calc.rows} /></div>
                  </div>
                </li>
                <li className="sim-drill">
                  <span className="n">{levels[2].n}</span>
                  <div>
                    <h3>{levels[2].title} <span>{lineage.components.caption}</span></h3>
                    <div className="sim-box scroll">
                      <Rows rows={lineage.components.rows} pick={pick} label={t('Voir les sources de', 'See the sources of')} onPick={(id) => setPicks({ ...picks, [kpi]: id })} />
                    </div>
                  </div>
                  <span className="n">{levels[3].n}</span>
                  <div>
                    <h3>{levels[3].title} <span>{lineage.components.rows.find((x) => x.id === pick)?.label}</span></h3>
                    <ul className="sim-sources">
                      {sources.map((s) => (
                        <li key={s.title} data-sys={s.sys} className={s.flag ? 'flag' : undefined}>
                          <p className="head"><span className="sys">{SYS[s.sys]}</span><b>{s.title}</b></p>
                          <dl>{s.lines.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className={isAmount(v) ? 'num' : undefined}>{v}</dd></div>)}</dl>
                          {s.at && <p className="at">{t('Lu le', 'Read on')} {f.date(s.at)}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ol>

              <div className="sim-check">
                <button type="button" className="sim-recalc" onClick={recompute} disabled={check.status === 'running'}>
                  {check.status === 'running' ? t('Recalcul en cours…', 'Recalculating…') : t('Tout recalculer depuis les sources', 'Recalculate everything from the sources')}
                </button>
                <p aria-live="polite">
                  {check.status === 'idle' && <>{t('Empreinte de l’arrêté', 'Closing fingerprint')} <code>{closedFp}</code>{modified && <> · {t('empreinte actuelle', 'current fingerprint')} <code>{fp}</code></>}</>}
                  {check.status === 'running' && t(`Relecture de ${SYNC.hubspot.deals} deals et ${SYNC.pennylane.invoices + SYNC.xero.invoices} factures, application des règles…`, `Re-reading ${SYNC.hubspot.deals} deals and ${SYNC.pennylane.invoices + SYNC.xero.invoices} invoices, applying the rules…`)}
                  {check.status === 'done' && (modified
                    ? <>{t('Même résultat avec les mêmes hypothèses', 'Same result with the same assumptions')} <code>{check.fp}</code>. {t('Le forecast diffère de l’arrêté', 'The forecast differs from the closing')} <code>{closedFp}</code> {t('parce que ses hypothèses ont changé ; ARR, PCA et churn sont identiques.', 'because its assumptions changed; ARR, deferred revenue and churn are identical.')}</>
                    : <><b>{t('Identique à l’arrêté.', 'Identical to the closing.')}</b> {t('Mêmes données, mêmes règles, même résultat :', 'Same data, same rules, same result:')} <code>{check.fp}</code></>)}
                </p>
              </div>
              <div className="card-foot"><span>{t('Cliquez sur un indicateur, puis sur une ligne pour voir ses pièces.', 'Click an indicator, then a row to see its documents.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></div>
            </div>
          </div>
        </section>
        <section className="band tight">
          <div className="wrap">
            <div className="intro">
              <p className="label">{t('Ce que montre le simulateur', 'What the simulator shows')}</p>
              <h2 className="h2">{t('Un chiffre qu’on peut défendre devant le board et devant les CAC.', 'A figure you can defend to the board and to the auditors.')}</h2>
            </div>
            <div className="feats">
              <div className="feat"><h3>{t('Défini', 'Defined')}</h3><p>{t('Chaque indicateur a une définition écrite, des règles et une personne qui l’a validée. Plus de débat sur ce que « ARR » veut dire.', 'Every indicator has a written definition, rules and a person who approved it. No more debate about what “ARR” means.')}</p></div>
              <div className="feat"><h3>{t('Traçable', 'Traceable')}</h3><p>{t('Du board pack au deal HubSpot, à la facture Pennylane ou Xero et à l’écriture. Les corrections manuelles sont visibles, avec leur justificatif.', 'From the board pack to the HubSpot deal, the Pennylane or Xero invoice and the journal entry. Manual corrections are visible, with their evidence.')}</p></div>
              <div className="feat"><h3>{t('Reproductible', 'Reproducible')}</h3><p>{t('Mêmes données et mêmes règles donnent le même résultat, à l’euro près. Le mois arrêté est figé : vous le retrouvez tel que présenté.', 'The same data and rules give the same result, to the euro. The closed month is frozen: you find it exactly as presented.')}</p></div>
            </div>
          </div>
        </section>
        <ClosingCta
          title={t('Le même board pack, sur vos données.', 'The same board pack, on your data.')}
          sub={t('Branchez votre compta, votre CRM et votre facturation : nous refaisons ce parcours avec vos chiffres, en démo.', 'Connect your accounting, your CRM and your invoicing: we walk through the same path with your figures, in a demo.')}
        />
      </Rails>
    </main>
  );
}
