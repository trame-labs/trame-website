// Remotion entry: the hero scene as a 1920 × 1080 video, in French and in English.
import { Composition, registerRoot } from 'remotion';
import { DURATION, FPS, TrameVideo } from './Video.jsx';

function Root() {
  return (
    <>
      <Composition id="AgentDemo-fr" component={TrameVideo} defaultProps={{ lang: 'fr' }} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} />
      <Composition id="AgentDemo-en" component={TrameVideo} defaultProps={{ lang: 'en' }} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} />
    </>
  );
}

registerRoot(Root);
