// The hero's chat scene as a video, screen only (the site supplies the frame around it): the site's AgentDemo
// driven frame by frame, from the empty chat to the final state held a few seconds. One composition per language.
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { loadFont as loadGeist } from '@remotion/google-fonts/Geist';
import { loadFont as loadGeistMono } from '@remotion/google-fonts/GeistMono';
import AgentDemo, { BEATS, IDX, PROMPT } from '../src/components/product/AgentDemo.jsx';
import { LangContext } from '../src/lib/i18n.js';

loadGeist('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin', 'latin-ext'] });
loadGeistMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

export const FPS = 30;
export const SCALE = 1.5; // the scene is 1120 × 620 on the site
export const WIDTH = 1120 * SCALE;
export const HEIGHT = 620 * SCALE;
const f = (ms) => Math.round((ms * FPS) / 1000);

// The site's beats, with a shorter wait before typing; the final state is held, then the video ends.
const DUR = BEATS.map(([id, ms]) => (id === 'idle' ? f(600) : id === 'done' ? f(4500) : f(ms)));
const STARTS = DUR.map((_, i) => DUR.slice(0, i).reduce((a, b) => a + b, 0));
export const DURATION = STARTS[STARTS.length - 1] + DUR[DUR.length - 1];

/** Where the scene is at a given frame: its beat and the prompt typed so far. */
function playheadAt(frame, lang) {
  let beat = 0;
  for (let i = 0; i < STARTS.length; i++) if (frame >= STARTS[i]) beat = i;
  const len = PROMPT[lang].length;
  const typed = Math.max(0, Math.min(len, Math.floor(((frame - STARTS[IDX.type]) / (DUR[IDX.type] * 0.85)) * len)));
  return { beat, typed };
}

export function TrameVideo({ lang }) {
  const frame = useCurrentFrame();
  return (
    <LangContext.Provider value={lang}>
      <AbsoluteFill style={{ background: '#fafaf6', fontFamily: '"Geist", sans-serif', WebkitFontSmoothing: 'antialiased' }}>
        <div style={{ width: 1120, transform: `scale(${SCALE})`, transformOrigin: 'top left' }}>
          <AgentDemo playhead={playheadAt(frame, lang)} asset={(path) => staticFile(path.replace(/^\//, ''))} />
        </div>
      </AbsoluteFill>
    </LangContext.Provider>
  );
}
