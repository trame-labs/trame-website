// Fictional company behind the home page's product screen: Orbis, a SaaS group with a French entity on Pennylane, a UK entity on Xero
// and HubSpot as its CRM. Everything below is derived from the contracts, with pure functions: same inputs, same figures.

/** '2026-09' → month index (year × 12 + month − 1), so months can be compared and added. */
export const ym = (s) => { const [y, m] = s.split('-').map(Number); return y * 12 + m - 1; };
export const yearOf = (m) => Math.floor(m / 12);
export const monthOf = (m) => (m % 12) + 1; // 1 → 12

export const CLOSE = ym('2026-09'); // month being closed
export const FX = 1.172; // £1 in €, closing rate on 30/09, applied to the whole history (rule)
export const ENTITIES = {
  FR: { name: 'Orbis SAS', source: 'pennylane', ccy: 'EUR', revenue: '706000', deferred: '487000' },
  UK: { name: 'Orbis Ltd', source: 'xero', ccy: 'GBP', revenue: '200', deferred: '835' },
};
const PERIOD = { A: 12, Q: 3, M: 1 }; // billing in advance: annual, quarterly, monthly

let deal = 4410;
const sub = (id, name, entity, mrr, start, billing, end = null, more = {}) =>
  ({ id, name, entity, kind: 'subscription', mrr, start: ym(start), billing, end: end ? ym(end) : null, deal: deal++, ...more });

export const CONTRACTS = [
  sub('C01', 'Alvéole', 'FR', 18000, '2024-01', 'A'),
  sub('C02', 'Brindille', 'FR', 9500, '2025-03', 'Q'),
  sub('C03', 'Cassiopée Conseil', 'FR', 6200, '2025-06', 'M'),
  sub('C04', 'Dolmen', 'FR', 2900, '2024-09', 'A', '2026-08'),
  sub('C05', 'Écume', 'FR', 14500, '2025-10', 'A'),
  sub('C06', 'Fenouil', 'FR', 4800, '2026-02', 'M'),
  sub('C07', 'Granit', 'FR', 22000, '2024-04', 'A'),
  sub('C08', 'Hélix', 'FR', 7300, '2025-11', 'Q'),
  sub('C09', 'Isba', 'FR', 5100, '2026-09', 'M'),
  sub('C10', 'Jasmin Logistique', 'FR', 12800, '2025-01', 'A'),
  sub('C11', 'Kaolin', 'FR', 1900, '2025-05', 'M', '2026-05'),
  // HubSpot said 31/08; the signed amendment says 30/09. Corrected in Trame, so Lumen is not September churn.
  sub('C12', 'Lumen', 'FR', 8600, '2024-10', 'Q', '2026-09', {
    correction: { field: 'end', from: ym('2026-08'), to: ym('2026-09'), by: 'Claire Martin', on: [2026, 10, 6] },
  }),
  sub('C13', 'Mistral Santé', 'FR', 16200, '2026-04', 'A'),
  sub('C14', 'Nacre', 'FR', 2400, '2025-08', 'M', '2026-03'),
  sub('C15', 'Opale', 'FR', 10400, '2025-02', 'M', null, { steps: [[ym('2026-09'), 13200]] }),
  sub('C16', 'Pivoine', 'FR', 5600, '2026-06', 'Q'),
  sub('C17', 'Ashgrove', 'UK', 15000, '2024-05', 'A'),
  sub('C18', 'Bramble', 'UK', 8200, '2025-09', 'Q'),
  sub('C19', 'Copperfield', 'UK', 12500, '2026-09', 'A'),
  sub('C20', 'Dovetail', 'UK', 6900, '2025-04', 'M', null, { steps: [[ym('2026-07'), 8400]] }),
  sub('C21', 'Elmstead', 'UK', 9800, '2024-11', 'A'),
  sub('C22', 'Foxglove', 'UK', 1600, '2025-12', 'M', '2026-06'),
  sub('C23', 'Gorse', 'UK', 1800, '2025-02', 'Q', '2026-08'),
  sub('C24', 'Hawthorn', 'UK', 11200, '2026-05', 'M'),
  sub('C25', 'Inkwell', 'UK', 5400, '2025-07', 'Q'),
  sub('C26', 'Juniper', 'UK', 13700, '2024-02', 'A'),
  // One-off services: invoiced, never in ARR, never spread.
  { id: 'S01', name: 'Granit', entity: 'FR', kind: 'service', amount: 24000, start: ym('2026-09'), deal: deal++ },
  { id: 'S02', name: 'Copperfield', entity: 'UK', kind: 'service', amount: 9000, start: ym('2026-09'), deal: deal++ },
];

/** Monthly recurring revenue of a contract in month m, in its own currency. */
export function mrrAt(c, m) {
  if (c.kind !== 'subscription' || m < c.start || (c.end != null && m > c.end)) return 0;
  let v = c.mrr;
  for (const [from, value] of c.steps || []) if (m >= from) v = value;
  return v;
}

export const toEur = (c, amount) => (c.entity === 'UK' ? amount * FX : amount);
export const subscriptions = CONTRACTS.filter((c) => c.kind === 'subscription');
export const mrr = (m) => subscriptions.reduce((s, c) => s + toEur(c, mrrAt(c, m)), 0);

/** Invoices issued up to the closing month: subscriptions billed in advance for their period, services once. */
export const INVOICES = (() => {
  const list = [];
  for (const c of CONTRACTS) {
    if (c.kind === 'service') { list.push({ contract: c, start: c.start, months: 1, amount: c.amount }); continue; }
    const p = PERIOD[c.billing];
    for (let s = c.start; s <= CLOSE && (c.end == null || s <= c.end); s += p) {
      const months = c.end == null ? p : Math.min(p, c.end - s + 1);
      list.push({ contract: c, start: s, months, amount: mrrAt(c, s) * months });
    }
  }
  list.sort((a, b) => a.start - b.start || a.contract.id.localeCompare(b.contract.id));
  const seq = { FR: 1000, UK: 1000 };
  for (const inv of list) {
    const n = ++seq[inv.contract.entity];
    inv.number = inv.contract.entity === 'FR' ? `F-${yearOf(inv.start)}-${n}` : `INV-${n}`;
  }
  return list;
})();

/** Part of an invoice covering months after the closing month (straight-line, by month). */
export function deferredAt(inv, m = CLOSE) {
  if (inv.contract.kind !== 'subscription') return 0;
  const remaining = inv.start + inv.months - 1 - m;
  return remaining > 0 ? (inv.amount * remaining) / inv.months : 0;
}

/** MRR bridge of month m, in €: opening (end of m − 1) + new + expansion − contraction − churn = closing. */
export function bridge(m) {
  const b = { opening: 0, added: 0, expansion: 0, contraction: 0, churn: 0, closing: 0, newList: [], churnList: [] };
  for (const c of subscriptions) {
    const a = toEur(c, mrrAt(c, m - 1)), z = toEur(c, mrrAt(c, m));
    b.opening += a; b.closing += z;
    if (!a && z) { b.added += z; b.newList.push(c); }
    else if (a && !z) { b.churn += a; b.churnList.push(c); }
    else if (z > a) b.expansion += z - a;
    else b.contraction += a - z;
  }
  b.rate = b.opening ? b.churn / b.opening : 0;
  return b;
}

const last6 = Array.from({ length: 6 }, (_, i) => CLOSE - 5 + i);

/** Forecast inputs from history: the 6-month averages, rounded to the sliders' steps. */
export const DEFAULT_HYPOTHESES = {
  churn: Math.round((last6.reduce((s, m) => s + bridge(m).rate, 0) / 6) * 1000) / 1000, // 0.1 % steps
  newArr: Math.round((last6.reduce((s, m) => s + bridge(m).added * 12, 0) / 6) / 5000) * 5000, // €5k steps
  price: 0, // price increase on 1 January, % of ARR
};
export const CHURN_AVG6 = last6.reduce((s, m) => s + bridge(m).rate, 0) / 6;
export const NEW_ARR_AVG6 = last6.reduce((s, m) => s + bridge(m).added * 12, 0) / 6;

/** ARR month by month for the next 12 months: churn on the opening ARR, new bookings, price increase in January. */
export function forecast(h, arr0) {
  const rows = [];
  let open = arr0;
  for (let i = 1; i <= 12; i++) {
    const m = CLOSE + i;
    const lost = open * h.churn;
    const priceUp = monthOf(m) === 1 ? (open - lost) * h.price : 0;
    const close = open - lost + h.newArr + priceUp;
    rows.push({ m, open, lost, added: h.newArr, priceUp, close });
    open = close;
  }
  return rows;
}

/** All the figures of the board pack, recomputed from the raw data. */
export function compute(h = DEFAULT_HYPOTHESES) {
  const arrRows = subscriptions
    .filter((c) => mrrAt(c, CLOSE))
    .map((c) => ({ c, local: mrrAt(c, CLOSE) * 12, eur: toEur(c, mrrAt(c, CLOSE) * 12) }))
    .sort((a, b) => b.eur - a.eur);
  const byEntity = (rows, key) => Object.fromEntries(Object.keys(ENTITIES).map((e) => [e, rows.filter((r) => r[key].entity === e)]));
  const arr = arrRows.reduce((s, r) => s + r.eur, 0);

  const pcaRows = INVOICES
    .map((inv) => ({ inv, local: deferredAt(inv), eur: toEur(inv.contract, deferredAt(inv)) }))
    .filter((r) => r.local > 0)
    .sort((a, b) => b.eur - a.eur);
  const pca = pcaRows.reduce((s, r) => s + r.eur, 0);

  const sept = bridge(CLOSE);
  const path = forecast(h, arr);
  return {
    arr, arrRows, arrByEntity: byEntity(arrRows.map((r) => ({ ...r, contract: r.c })), 'contract'),
    pca, pcaRows, pcaByEntity: byEntity(pcaRows.map((r) => ({ ...r, contract: r.inv.contract })), 'contract'),
    churn: sept, churnAvg6: CHURN_AVG6,
    forecast: path, arr12: path[path.length - 1].close,
  };
}

/** Short, stable fingerprint of a result (FNV-1a over the rounded figures). */
export function fingerprint(r, h) {
  const s = JSON.stringify([r.arr, r.pca, r.churn.churn, r.churn.opening, r.arr12, h].map((x) => (typeof x === 'number' ? Math.round(x) : x)));
  let x = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 0x01000193) >>> 0; }
  return x.toString(16).padStart(8, '0');
}

/** What each source holds, as the sync reports it. */
export const SYNC = {
  hubspot: { deals: CONTRACTS.length, at: [2026, 10, 7, '08:10'] },
  pennylane: { invoices: INVOICES.filter((i) => i.contract.entity === 'FR').length, at: [2026, 10, 7, '08:12'] },
  xero: { invoices: INVOICES.filter((i) => i.contract.entity === 'UK').length, at: [2026, 10, 7, '08:13'] },
};
