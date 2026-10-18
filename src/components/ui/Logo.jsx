import { useId } from 'react';
import { LOGO_PATHS as P } from './logoPaths.js';

const TONES = {
  dark:   { fill: '#002615', grid: '63,58,46' },
  light:  { fill: '#FEFEFC', grid: '252,252,252' },
  signal: { fill: '#F0F5EB', grid: '252,252,252' },
};
const LAYOUTS = {
  primary:      { w: 499.333, h: 98.377, emblem: [0, 0], trame: [117.898, 20.251], labs: [359.816, 20.251] },
  short:        { w: 333, h: 99, emblem: [0, 0], trame: [118.304, 18.042] },
  alt:          { w: 519.333, h: 98.377, trame: [0, 20.251], emblem: [233.309, 0], labs: [351.206, 20.251] },
  stacked:      { w: 214, h: 220, emblem: [57.205, 0], trame: [0, 92.377], labs: [43, 162] },
  stackedShort: { w: 214, h: 151, emblem: [57.205, 0], trame: [0, 92.377] },
  mark:         { w: 99, h: 99, emblem: [0, 0] },
};

/** Trame Labs logo lockups, rebuilt from the Figma vector parts. */
export default function Logo({ variant = 'primary', tone = 'dark', height = 32, grid = true, title = 'Trame Labs', style, className }) {
  const L = LAYOUTS[variant] || LAYOUTS.primary;
  const T = TONES[tone] || TONES.dark;
  const id = 'tlg' + useId().replace(/:/g, '');
  return (
    <svg role="img" aria-label={title} className={className} viewBox={`0 0 ${L.w} ${L.h}`} height={height} width={(height * L.w) / L.h} style={{ display: 'block', ...style }}>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="98.378" y2="0">
          <stop offset="0" stopColor={`rgb(${T.grid})`} stopOpacity="0" />
          <stop offset="0.5" stopColor={`rgb(${T.grid})`} stopOpacity="0.3" />
          <stop offset="1" stopColor={`rgb(${T.grid})`} stopOpacity="0" />
        </linearGradient>
      </defs>
      {L.emblem && (
        <g transform={`translate(${L.emblem[0]} ${L.emblem[1]})`}>
          <g transform="translate(5.986 7.808)"><path d={P.emblem} fill={T.fill} /></g>
          {grid && <g transform="matrix(0 1 -1 0 98.898 0)"><path d={P.grid} fill={`url(#${id})`} /></g>}
        </g>
      )}
      {L.trame && <g transform={`translate(${L.trame[0]} ${L.trame[1]})`}><path d={P.trame} fill={T.fill} /></g>}
      {L.labs && <g transform={`translate(${L.labs[0]} ${L.labs[1]})`}><path d={P.labs} fill={T.fill} /></g>}
    </svg>
  );
}
