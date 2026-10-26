// The hero's scene as a video, screen only (the site supplies the frame around it): the site's AgentDemo driven frame
// by frame, with a camera that zooms on the P&L's figures (the chat stays whole screen) and a cursor. It opens on the
// P&L, opens advertising onto its accounts, closes it, edits the P&L in the chat (approving the reconciliation, picking
// the Lucca field) and goes back to the P&L, changed, where it opens the flagged gap. The end fades through the background to the P&L
// as it was, so the video loops.
// One composition per language.
import { useLayoutEffect, useRef } from 'react';
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { loadFont as loadGeist } from '@remotion/google-fonts/Geist';
import { loadFont as loadGeistMono } from '@remotion/google-fonts/GeistMono';
import AgentDemo, { BEATS, PROMPT } from '../src/components/product/AgentDemo.jsx';
import { LangContext } from '../src/lib/i18n.js';

loadGeist('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin', 'latin-ext'] });
loadGeistMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
const W = 1120; // the scene is 1120 × 630 on the site: 16:9, rendered at 1920 × 1080
const H = 630;
const SCALE = WIDTH / W;

// The site's beats, tighter (ms). The last one holds the changed P&L, then the fade.
const MS = {
  pnl: 2800, pop: 3200, edit: 2400, idle: 700, type: 2400, sent: 1000,
  r1a: 2400, r1b: 1600, r1c: 1000, r1d: 1000, text1: 2600,
  r2a: 1100, r2b: 600, r2c: 600, r2d: 600, r2e: 1200, text2: 2600, ask: 3000, valid: 900,
  field: 3200, pick: 900, r3: 1000, r3b: 1000, r3c: 1200, done: 2600, after: 9000,
};
const START = {};
let total = 0;
for (const [id, ms] of BEATS) { START[id] = total; total += MS[id] ?? ms; }
const END = total;
const GAP_AT = START.after + 3700; // the flagged September cell opens onto its gap
const GAP_END = GAP_AT + 3000;
const FADE = 700; // through the background, back to the first frame
// The whole video plays this much slower than its script (beats, cursor, camera, typing, animations alike).
const PACE = 1.25;
export const DURATION = Math.round((END * PACE * FPS) / 1000);

const ease = Easing.inOut(Easing.cubic);
const ramp = (ms, from, to, a, b) => interpolate(ms, [from, to], [a, b], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

// The camera: from each shot's time, 900 ms to frame a point of an element (ax, ay: 0–1 across it) at a zoom.
// No selector: the whole screen. Shots stay at least 900 ms apart.
const MOVE = 900;
const SHOTS = [
  { at: 0 },
  { at: START.pop + 100, sel: '.ad-pop', ay: 0.6, zoom: 1.35 },
  { at: START.edit }, // the chat, whole screen throughout
  { at: START.after + 300, sel: '.ad-pnl tr.paySales', ax: 0.51, zoom: 1.1 }, // labels to M/M, September's flag in view
  { at: GAP_AT, sel: '.ad-pop', zoom: 1.35 },
  { at: GAP_END + 100 },
];

// The clicks, each just before what it sets off. The cursor reaches its target GO ms after setting off and rests there
// HOVER ms before clicking, so the eye gets there first.
const CLICK = {
  cell: START.pop - 60, close: START.edit - 60, edit: START.idle - 60, approve: START.valid, pick: START.pick,
  open: START.after - 60, gap: GAP_AT - 60, gapClose: GAP_END - 60,
};
const CLICKS = Object.values(CLICK);
const GO = 1000;
const HOVER = 1200;
const goFor = (click) => click - HOVER - GO;

// The cursor: where it heads (an element, and an offset in scene px), and from when (jump: no move, it is hidden then;
// from: where it starts when the last target is gone). It shows three times: to open the chat, to approve and go back
// to the P&L, to open the flagged gap.
const CURSOR = [
  { at: 300, sel: '.ad-pnl tr.mkt td.cur .ad-cell', dx: 140, dy: 110 },
  { at: goFor(CLICK.cell), sel: '.ad-pnl tr.mkt td.cur .ad-cell' },
  { at: goFor(CLICK.close), sel: '.ad-pop-head button' },
  { at: goFor(CLICK.edit), sel: '.ad-page-edit', from: '.ad-pnl tr.mrr td.cur .ad-cell' }, // where the popup closed
  { at: goFor(CLICK.approve) - 200, sel: '.ad-ask button', dx: -220, dy: 70, jump: true },
  { at: goFor(CLICK.approve), sel: '.ad-ask button' },
  { at: goFor(CLICK.pick), sel: '.ad-choice li:first-child button', ax: 0.3 },
  { at: goFor(CLICK.open), sel: '.ad-link', ax: 0.4 },
  { at: goFor(CLICK.gap) - 100, sel: '.ad-pnl td.anomaly .ad-cell', dx: 130, dy: 90, jump: true },
  { at: goFor(CLICK.gap), sel: '.ad-pnl td.anomaly .ad-cell' },
  { at: goFor(CLICK.gapClose), sel: '.ad-pop-head button' },
];
const SHOWN = [[300, CLICK.edit + 460], [goFor(CLICK.approve) - 200, START.after + 300], [goFor(CLICK.gap) - 100, GAP_END + 300]];

/** An element's point in scene px (offsets ignore the camera's transform), or null when it isn't on screen. */
function pointOf(root, sel, ax = 0.5, ay = 0.5) {
  const el = sel && root.querySelector(sel);
  if (!el) return null;
  let x = 0;
  let y = 0;
  for (let n = el; n && n !== root; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; }
  return { x: x + el.offsetWidth * ax, y: y + el.offsetHeight * ay };
}

function frameOf(root, shot) {
  const p = pointOf(root, shot.sel, shot.ax, shot.ay);
  return p ? { ...p, zoom: shot.zoom } : { x: W / 2, y: H / 2, zoom: 1 };
}

/** Where the camera looks at a given time: scale and translation of the scene, kept inside the screen. */
function cameraAt(root, ms) {
  let i = 0;
  while (i + 1 < SHOTS.length && SHOTS[i + 1].at <= ms) i++;
  const to = frameOf(root, SHOTS[i]);
  const from = i > 0 ? frameOf(root, SHOTS[i - 1]) : to;
  const k = ramp(ms, SHOTS[i].at, SHOTS[i].at + MOVE, 0, 1);
  const mix = (a, b) => a + (b - a) * k;
  const s = SCALE * mix(from.zoom, to.zoom);
  const clamp = (v, min) => Math.min(0, Math.max(min, v));
  return { s, tx: clamp(WIDTH / 2 - mix(from.x, to.x) * s, WIDTH - W * s), ty: clamp(HEIGHT / 2 - mix(from.y, to.y) * s, HEIGHT - H * s) };
}

function cursorAt(root, ms) {
  const target = (c) => {
    const p = pointOf(root, c.sel, c.ax, c.ay);
    return p && { x: p.x + (c.dx ?? 0), y: p.y + (c.dy ?? 0) };
  };
  let i = 0;
  while (i + 1 < CURSOR.length && CURSOR[i + 1].at <= ms) i++;
  const to = target(CURSOR[i]);
  const from = (i > 0 && (target(CURSOR[i - 1]) || (CURSOR[i].from && target({ sel: CURSOR[i].from })))) || to;
  if (!to) return null;
  const k = i > 0 && !CURSOR[i].jump ? ramp(ms, CURSOR[i].at, CURSOR[i].at + GO, 0, 1) : 1;
  return { x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k };
}

/** Where the scene is at a given time: its beat, the prompt typed so far, each beat's age. */
function playheadAt(ms, lang) {
  let beat = 0;
  BEATS.forEach(([id], i) => { if (ms >= START[id]) beat = i; });
  const len = PROMPT[lang].length;
  const typed = Math.max(0, Math.min(len, Math.floor(((ms - START.type) / (MS.type * 0.85)) * len)));
  const gap = ms >= GAP_AT && ms < GAP_END;
  const since = (b) => ms - (b === 'pop' && gap ? GAP_AT : START[b]);
  return { beat, typed, sheet: null, pop: gap ? { key: 'paySales', i: 5 } : null, since };
}

const FIRST = { beat: 0, typed: 0, sheet: null, since: () => 100000 };

const Pointer = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" style={{ display: 'block', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.3))' }}>
    <path d="M4 2.5v17.2l4.6-4.4 2.9 6.6 3-1.3-2.9-6.5h6.4z" fill="#0f1b17" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export function TrameVideo({ lang }) {
  const frame = useCurrentFrame();
  const ms = (frame * 1000) / FPS / PACE; // script time
  const stage = useRef(null);
  const cursor = useRef(null);
  const ring = useRef(null);

  // The camera and the cursor follow the scene's layout, so they are placed once it has rendered the frame.
  useLayoutEffect(() => {
    const root = stage.current.querySelector('.ad');
    const { s, tx, ty } = cameraAt(root, ms);
    stage.current.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;

    const at = cursorAt(root, ms);
    const shown = at ? Math.max(...SHOWN.map(([a, b]) => Math.min(ramp(ms, a, a + 250, 0, 1), ramp(ms, b, b + 300, 1, 0)))) : 0;
    const press = Math.max(...CLICKS.map((c) => 1 - Math.min(1, Math.abs(ms - c) / 150)));
    cursor.current.style.opacity = shown;
    if (at) cursor.current.style.transform = `translate(${at.x - 4}px, ${at.y - 2}px) scale(${1 - 0.15 * press})`;
    const click = CLICKS.find((c) => ms >= c && ms < c + 500);
    ring.current.style.opacity = click == null || !at ? 0 : 0.5 * (1 - (ms - click) / 500); // gone with what was clicked
    if (at && click != null) ring.current.style.transform = `translate(${at.x}px, ${at.y}px) scale(${0.4 + (ms - click) / 500})`;
  });

  return (
    <LangContext.Provider value={lang}>
      <AbsoluteFill style={{ background: '#fafaf6', fontFamily: '"Geist", sans-serif', WebkitFontSmoothing: 'antialiased' }}>
        <div ref={stage} style={{ position: 'absolute', width: W, height: H, transformOrigin: '0 0' }}>
          <AgentDemo playhead={playheadAt(ms, lang)} asset={(path) => staticFile(path.replace(/^\//, ''))} />
          <div ref={ring} style={{ position: 'absolute', left: -18, top: -18, width: 36, height: 36, borderRadius: '50%', background: '#339966', opacity: 0, zIndex: 3, pointerEvents: 'none' }} />
          <div ref={cursor} style={{ position: 'absolute', left: 0, top: 0, opacity: 0, zIndex: 4, transformOrigin: '4px 2px' }}><Pointer /></div>
        </div>
        {ms > END - FADE && (
          <AbsoluteFill style={{ background: '#fafaf6', opacity: ramp(ms, END - FADE, END - FADE / 2, 0, 1) }}>
            <div style={{ width: W, height: H, transform: `scale(${SCALE})`, transformOrigin: '0 0', opacity: ramp(ms, END - FADE / 2, END - 1000 / FPS / PACE, 0, 1) }}>
              <AgentDemo playhead={FIRST} asset={(path) => staticFile(path.replace(/^\//, ''))} />
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    </LangContext.Provider>
  );
}
