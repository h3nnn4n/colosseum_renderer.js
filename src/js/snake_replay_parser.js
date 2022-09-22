let renderer = {};

renderer.setReplay = function (replay) {
  this.state = {};
  this.frames = replay;
  this.config = this.firstFrame().game_config;

  this.colors = [
    '#a3ac5e', // https://www.color-hex.com/color/a3ac5e
    '#ac675e', // https://www.color-hex.com/color/ac675e
    '#5e7cac', // https://www.color-hex.com/color/5e7cac
    '#5eac8e', // https://www.color-hex.com/color/5eac8e
    '#8e5eac', // https://www.color-hex.com/color/8e5eac
  ];
};

renderer.setRenderer = function (renderer) {
  this.renderer = renderer;
};

renderer.firstFrame = function () {
  let frame = this.frames[0];
  return frame;
};

renderer.renderFrame = function (frameIndex, renderer) {
  const frame = this.frames[frameIndex];
  const snakes = frame.world_state.snakes;
  const foods = frame.world_state.foods;
  const agentIds = frame.agent_ids;

  const gridHeight = this.config.grid_width;
  const gridWidth = this.config.grid_height;

  const xScale = renderer.width / gridWidth;
  const yScale = renderer.height / gridHeight;

  const xHalfCellOffset = xScale / 2.0;
  const yHalfCellOffset = yScale / 2.0;

  const xScaleImage = xScale * 1.0;
  const yScaleImage = yScale * 1.0;

  // Draw the grid
  renderer.stroke('light gray');
  for (let x = 0; x < gridWidth; x++) {
    renderer.line(x * xScale, 0, x * xScale, gridHeight * yScale);
  }

  for (let y = 0; y < gridHeight; y++) {
    renderer.line(0, y * yScale, gridWidth * xScale, y * yScale);
  }

  // Draw the snakes
  for (let i = 0; i < agentIds.length; ++i) {
    const agentId = agentIds[i];
    const snakeColor = this.colors[i];
    const headColor = renderer.lerpColor(
      renderer.color(this.colors[i]),
      renderer.color(0, 0, 0),
      0.2
    );
    const snake = snakes[agentId];

    if (!snake.alive) continue;

    renderer.fill(snakeColor);
    renderer.stroke(snakeColor);
    renderer.strokeWeight(xScale * 0.75);
    renderer.strokeCap(renderer.PROJECT);
    for (let i = 0; i < snake.positions.length - 1; ++i) {
      const current = snake.positions[i];
      const next = snake.positions[i + 1];

      renderer.line(
        current[0] * xScale + xHalfCellOffset,
        current[1] * yScale + yHalfCellOffset,
        next[0] * xScale + xHalfCellOffset,
        next[1] * yScale + yHalfCellOffset
      );
    }

    renderer.strokeCap(renderer.ROUND);
    renderer.strokeWeight(1);

    renderer.fill(headColor);
    renderer.stroke(headColor);
    renderer.rectMode(renderer.CENTER);
    renderer.rect(
      snake.head_position[0] * xScale + xHalfCellOffset,
      snake.head_position[1] * yScale + yHalfCellOffset,
      xScale * 0.75,
      yScale * 0.75
    );
    renderer.rectMode(renderer.CORNER);
  }

  // Draw the food
  renderer.fill('red');
  renderer.stroke('red');
  renderer.strokeWeight(1);
  renderer.strokeCap(renderer.ROUND);
  foods.forEach((food) => {
    renderer.image(renderer.cherry, food[0] * xScale, food[1] * yScale, xScaleImage, yScaleImage);
  });

  // Draw the epoch at the top left
  renderer.stroke('#282818');
  renderer.fill('#282818');
  renderer.textSize(32);
  renderer.text(frameIndex, 10, 30);
  renderer.fill(255, 0, 0);
};

export { renderer };
