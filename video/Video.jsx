// The hero scene as a video: an opening title, the site's chat scene driven frame by frame (with a step caption above
// it and the P&L opened at the end), then a closing card. One composition per language (Root.jsx).
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { loadFont as loadGeist } from '@remotion/google-fonts/Geist';
import { loadFont as loadGeistMono } from '@remotion/google-fonts/GeistMono';
import AgentDemo, { BEATS, IDX, PROMPT } from '../src/components/product/AgentDemo.jsx';
import Logo from '../src/components/ui/Logo.jsx';
import { LangContext } from '../src/lib/i18n.js';

loadGeist('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin', 'latin-ext'] });
loadGeistMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

export const FPS = 30;
const f = (ms) => Math.round((ms * FPS) / 1000);

// The site's beats, with a shorter wait before typing and a held end; then the P&L opens.
const DUR = BEATS.map(([id, ms]) => (id === 'idle' ? f(400) : id === 'done' ? f(3500) : f(ms)));
const STARTS = DUR.map((_, i) => DUR.slice(0, i).reduce((a, b) => a + b, 0));
const SHEET_AT = STARTS[STARTS.length - 1] + DUR[DUR.length - 1];
const SCENE = SHEET_AT + f(4000);
const INTRO = f(2200);
const OUTRO = f(3400);
export const DURATION = INTRO + SCENE + OUTRO;

const COPY = {
  fr: {
    title: 'Votre finance engineer, dans le chat.',
    steps: [
      [IDX.type, 'Une demande, en français'],
      [IDX.r1a, 'L’agent lit le contexte du P&L'],
      [IDX.r2a, 'Il rapproche la paie et la compta'],
      [IDX.ask, 'Vous validez'],
      [IDX.r3, 'Le contexte et les modèles connectés suivent'],
    ],
    sheet: 'Le P&L, ventilé par département',
    tagline: 'Chaque chiffre expliqué, chaque changement validé.',
    cta: 'Réserver une démo',
  },
  en: {
    title: 'Your finance engineer, in the chat.',
    steps: [
      [IDX.type, 'Ask in plain language'],
      [IDX.r1a, 'The agent reads the P&L’s context'],
      [IDX.r2a, 'It reconciles payroll with the books'],
      [IDX.ask, 'You approve'],
      [IDX.r3, 'The context and connected models follow'],
    ],
    sheet: 'The P&L, split by department',
    tagline: 'Every figure explained, every change approved.',
    cta: 'Book a demo',
  },
};

const BG = '#002615';
const INK = '#f0f5eb';
const SIGNAL = '#e9fc94';
const ease = { easing: Easing.bezier(0.25, 0.1, 0.25, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };

/** Where the scene is at a given frame: its beat, the prompt typed so far, and the sheet open at the end. */
function playheadAt(frame, lang) {
  let beat = 0;
  for (let i = 0; i < STARTS.length; i++) if (frame >= STARTS[i]) beat = i;
  const len = PROMPT[lang].length;
  const typed = Math.max(0, Math.min(len, Math.floor(((frame - STARTS[IDX.type]) / (DUR[IDX.type] * 0.85)) * len)));
  return { beat, typed, sheet: frame >= SHEET_AT ? 'model' : null };
}

/** Thin vertical threads, as on the site's hero. */
function Threads() {
  return (
    <AbsoluteFill>
      {Array.from({ length: 13 }, (_, i) => (
        <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: 120 + i * 140, width: 1, background: 'rgba(240,245,235,.07)' }} />
      ))}
    </AbsoluteFill>
  );
}

function Intro({ frame, copy }) {
  const opacity = interpolate(frame, [0, 12, INTRO - 10, INTRO], [0, 1, 1, 0], ease);
  const y = interpolate(frame, [0, 18], [16, 0], ease);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 36, opacity, transform: `translateY(${y}px)` }}>
      <Logo tone="light" height={64} />
      <p style={{ margin: 0, fontSize: 64, fontWeight: 500, letterSpacing: '-0.02em', color: INK }}>{copy.title}</p>
    </AbsoluteFill>
  );
}

function Scene({ frame, lang, copy }) {
  const playhead = playheadAt(frame, lang);
  const opacity = interpolate(frame, [0, 10, SCENE - 10, SCENE], [0, 1, 1, 0], ease);
  const scale = interpolate(frame, [0, SCENE], [1.42, 1.48], ease);
  const steps = copy.steps.filter(([from]) => playhead.beat >= from);
  const caption = playhead.sheet ? copy.sheet : steps.length ? steps[steps.length - 1][1] : '';
  const number = playhead.sheet ? '' : steps.length ? String(steps.length) : '';
  const captionKey = playhead.sheet ? 'sheet' : steps.length;
  const captionStart = playhead.sheet ? SHEET_AT : steps.length ? STARTS[steps[steps.length - 1][0]] : 0;
  const captionIn = interpolate(frame - captionStart, [0, 8], [0, 1], ease);
  return (
    <AbsoluteFill style={{ opacity }}>
      <div key={captionKey} style={{ position: 'absolute', top: 44, left: 148, display: 'flex', alignItems: 'baseline', gap: 18, opacity: captionIn, transform: `translateY(${(1 - captionIn) * 8}px)` }}>
        {number && <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 30, color: SIGNAL }}>{number} / 5</span>}
        <span style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-0.01em', color: INK }}>{caption}</span>
      </div>
      <div style={{ position: 'absolute', top: 128, left: '50%', width: 1120, transform: `translateX(-50%) scale(${scale})`, transformOrigin: 'center top' }}>
        <AgentDemo playhead={playhead} asset={(path) => staticFile(path.replace(/^\//, ''))} />
      </div>
    </AbsoluteFill>
  );
}

function Outro({ frame, copy }) {
  const opacity = interpolate(frame, [0, 12], [0, 1], ease);
  const y = interpolate(frame, [0, 18], [16, 0], ease);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 30, opacity, transform: `translateY(${y}px)` }}>
      <Logo tone="light" height={72} />
      <p style={{ margin: 0, fontSize: 44, fontWeight: 500, color: INK }}>{copy.tagline}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 12 }}>
        <span style={{ padding: '16px 30px', borderRadius: 999, background: SIGNAL, color: BG, fontSize: 30, fontWeight: 600 }}>{copy.cta}</span>
        <span style={{ fontSize: 32, color: INK, opacity: 0.85 }}>trame-labs.com</span>
      </div>
    </AbsoluteFill>
  );
}

export function TrameVideo({ lang }) {
  const frame = useCurrentFrame();
  const copy = COPY[lang];
  return (
    <LangContext.Provider value={lang}>
      <AbsoluteFill style={{ background: BG, fontFamily: '"Geist", sans-serif', WebkitFontSmoothing: 'antialiased' }}>
        <Threads />
        {frame < INTRO && <Intro frame={frame} copy={copy} />}
        {frame >= INTRO && frame < INTRO + SCENE && <Scene frame={frame - INTRO} lang={lang} copy={copy} />}
        {frame >= INTRO + SCENE && <Outro frame={frame - INTRO - SCENE} copy={copy} />}
      </AbsoluteFill>
    </LangContext.Provider>
  );
}
