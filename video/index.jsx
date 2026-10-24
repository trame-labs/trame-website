// Remotion entry: the hero's chat scene as a screen-only video, in French and in English.
import { Composition, registerRoot } from 'remotion';
import { DURATION, FPS, HEIGHT, TrameVideo, WIDTH } from './Video.jsx';

function Root() {
  return (
    <>
      <Composition id="AgentDemo-fr" component={TrameVideo} defaultProps={{ lang: 'fr' }} durationInFrames={DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="AgentDemo-en" component={TrameVideo} defaultProps={{ lang: 'en' }} durationInFrames={DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
    </>
  );
}

registerRoot(Root);
