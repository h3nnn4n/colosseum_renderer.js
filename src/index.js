// Test import of a JavaScript module
import { example } from '@/js/example'

// Test import of an asset
import webpackLogo from '@/images/webpack-logo.svg'

// Test import of styles
import '@/styles/index.scss'

// Import p5
import p5 from "p5";

// Appending to the DOM
const logo = document.createElement('img')
logo.src = webpackLogo

const heading = document.createElement('h1')
heading.textContent = example()

// Test a background image url in CSS
const imageBackground = document.createElement('div')
imageBackground.classList.add('image')

// Test a public folder asset
const imagePublic = document.createElement('img')
imagePublic.src = '/assets/example.png'

const app = document.querySelector('#root')
app.append(logo, heading, imageBackground, imagePublic)

const sketch = p5 => {
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;

  window.p5 = p5;

  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight);
  };

  p5.draw = () => {
    p5.background("#111");
    p5.ellipse(50,50,80,80);
  };
};

new p5(sketch);

import { getMatch, getMatchReplayUrl, getMatchReplay } from '@/js/match_loader'

let matchId = '5de4ea39-c600-4af4-b064-b4e88c4c9cde';
let match = getMatch(matchId);
console.log(match);

let matchReplay = getMatchReplay(matchId);
console.log(matchReplay);
