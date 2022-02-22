import '@/styles/index.scss'
import p5 from "p5";

import { renderer } from '@/js/replay_parser';
import { getMatchReplay } from '@/js/match_loader';

const matchId = '02b57c3e-04d7-4c71-bd44-1963fb6e1377';

const matchReplay = getMatchReplay(matchId);

const r = renderer;
r.setReplay(matchReplay);

let currentFrame = 0;
let frameCount = r.frames.length;

const sketch = p5 => {
  const canvasWidth = 800;
  const canvasHeight = 800;

  window.p5 = p5;

  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight);
  };

  p5.draw = () => {
    p5.background("#3f3f3f");
    r.renderFrame(currentFrame, p5);

    currentFrame += 1;
    if (currentFrame >= frameCount) {
      currentFrame = 0;
    }
  };
};

new p5(sketch);
