import p5 from 'p5';

import { renderer } from '@/js/replay_parser';
import { getMatchReplay } from '@/js/match_loader';
import monocle from '@/images/monocle.png';
import cherry from '@/images/cherry.png';
import hut from '@/images/hut.png';

// FIXME: This could be much, much cleaner
const url = document.querySelectorAll('[data-match-replay-id]')[0].dataset['matchReplayId'];
const matchReplay = getMatchReplay(url);

const r = renderer;
r.setReplay(matchReplay);

let currentFrame = 0;
let frameCount = r.frames.length;

const sketch = (p5) => {
  const canvasWidth = 800;
  const canvasHeight = 800;

  window.p5 = p5;

  p5.preload = () => {
    p5.monocle = p5.loadImage(monocle);
    p5.cherry = p5.loadImage(cherry);
    p5.hut = p5.loadImage(hut);
  };

  p5.setup = () => {
    let canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('#replay-canvas-container');
  };

  p5.draw = () => {
    p5.background('#d3dae1');
    r.renderFrame(currentFrame, p5);

    currentFrame += 1;
    if (currentFrame >= frameCount) {
      currentFrame = 0;
    }
  };
};

new p5(sketch);
