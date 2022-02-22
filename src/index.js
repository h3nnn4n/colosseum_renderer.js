import '@/styles/index.scss'
import p5 from "p5";

import { renderer } from '@/js/replay_parser';
import { getMatch, getMatchReplay } from '@/js/match_loader';

const matchId = '02b57c3e-04d7-4c71-bd44-1963fb6e1377';
const match = getMatch(matchId);
console.log(match);

const matchReplay = getMatchReplay(matchId);
console.log(matchReplay[0]);

const r = renderer;
r.setReplay(matchReplay);

console.log(r.config.grid_width, r.config.grid_height);
console.log(r.frames[25])
console.log(r.frames[25].agent_actions)

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
