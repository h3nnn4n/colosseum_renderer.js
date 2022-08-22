import p5 from 'p5';

import { renderer_manager } from '@/js/replay_parser';
import { getMatchReplay, getMatchGame } from '@/js/match_loader';
import monocle from '@/images/monocle.png';
import cherry from '@/images/cherry.png';
import hut from '@/images/hut.png';

// FIXME: This could be much, much cleaner
const url = document.querySelectorAll('[data-match-replay-id]')[0].dataset['matchReplayId'];
console.log(`replay match url is: ${url}`);
const matchReplay = getMatchReplay(url);
const game = getMatchGame(url);

const r = renderer_manager.getRenderer(game);
r.setReplay(matchReplay);

const skipFrame = 5;
const frameCount = r.frames.length;

let skipFrameCounter = 0;
let currentFrame = 0;

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

    skipFrameCounter += 1;

    if (skipFrameCounter >= skipFrame) {
      currentFrame += 1;
      skipFrameCounter = 0;
    }

    if (currentFrame >= frameCount) {
      currentFrame = 0;
    }
  };
};

new p5(sketch);
