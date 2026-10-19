import { IMG } from '../lib/helpers.js';

const INTEGRATION_LOGOS = [
  '4ThL0I7TikN74C9ZhVytj0ADM.jpeg', 'JAXrUYNhY6YXBPyO9X2GUZ757c.png', 'BfnITmS7aDNbGxR16z5rcghsEU.png', '0m7Kj150IYcbJ6XHGu1ADWhTX8.svg',
  'hyofzHc5RkniNlMjBW3pA9mKs.png', 'fLKC2tJ1qrnhMPmD3BX4u7NNdhM.jpeg', 'x8kFNV0kAjF1112stpbRplnHF8.webp', 'O6sZkwK1sJdHkymQhTiQfXnT6dw.webp',
  'N79fmGiEUwCwudqNst3vmpm8iM.png', 'ESRb8XUsjcdJw0KFUcsr08lAw.png', 'sOGQgqQpB2kY0xjSKtyV0iwdZgk.webp',
];

// Three marquee columns of logo tiles: the outer ones drift down, the middle one up.
const LOGO_COLUMNS = [0, 1, 2].map((c) => INTEGRATION_LOGOS.filter((_, i) => i % 3 === c));

export default function LogoMarquee() {
  return (
    <div className="tl-logo-marquee">
      {LOGO_COLUMNS.map((logos, c) => (
        <ul key={c} className={'tl-logo-col' + (c === 1 ? ' tl-logo-col--up' : '')}>
          {/* Rendered four times so the -50% translate loops seamlessly. */}
          {[...logos, ...logos, ...logos, ...logos].map((file, i) => (
            <li key={i} className="tl-logo-tile" aria-hidden={i >= logos.length || undefined}>
              <img src={IMG(file, 256)} alt={i < logos.length ? 'Intégration' : ''} loading="lazy" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
