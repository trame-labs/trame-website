// Formatting by hand (not Intl), so the pre-rendered HTML and the browser agree to the character.
import { useLang } from './i18n.js';
import { monthOf, yearOf } from '../content/simulator.js';

const NBSP = '\u00a0'; // the narrow no-break space is near invisible in Geist
const MONTHS = {
  fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

/** Number, money, percent, month and date formatting for the current language. */
export function useFmt() {
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
