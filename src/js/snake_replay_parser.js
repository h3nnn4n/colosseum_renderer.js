let renderer = {};

renderer.setReplay = function (replay) {
  this.state = {};
  this.frames = replay;
  this.config = this.firstFrame().game_config;
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
  const gridWidth =  this.config.grid_height;

  const xScale = renderer.width / gridWidth;
  const yScale = renderer.height / gridHeight;

  const xHalfCellOffset = xScale / 2.0;
  const yHalfCellOffset = yScale / 2.0;

  const xScaleImage = xScale * 1.0;
  const yScaleImage = yScale * 1.0;

  renderer.textSize(32);
  renderer.text(frameIndex, 10, 30);
  renderer.fill(255, 0, 0);

  // Draw the grid
  renderer.stroke("light gray");
  for (let x = 0; x < gridWidth; x++) {
    renderer.line(
      x * xScale, 0,
      x * xScale, gridHeight * yScale,
    );
  }

  for (let y = 0; y < gridHeight; y++) {
    renderer.line(
      0                  , y * yScale ,
      gridWidth * xScale , y * yScale ,
    );
  }

  // Draw the snakes
  agentIds.forEach((agentId) => {
    const snake = snakes[agentId];

    renderer.fill("light green");
    renderer.stroke("light green");
    renderer.strokeWeight(xScale * 0.75);
    renderer.strokeCap(renderer.PROJECT);
    for (let i = 0; i < snake.positions.length - 1; ++i) {
      const current = snake.positions[i];
      const next = snake.positions[i+1];

      renderer.line(
        current[0] * xScale + xHalfCellOffset, current[1] * yScale + yHalfCellOffset,
        next[0]    * xScale + xHalfCellOffset, next[1]    * yScale + yHalfCellOffset,
      );
    }

    renderer.fill("green");
    renderer.stroke("green");
    renderer.strokeCap(renderer.ROUND);
    renderer.strokeWeight(1);
    renderer.circle(
      snake.head_position[0] * xScale + xHalfCellOffset,
      snake.head_position[1] * yScale + yHalfCellOffset,
      xScale,
    );
  });
  renderer.strokeWeight(1);

  // Draw the food
  renderer.fill("red");
  renderer.stroke("red");
  renderer.strokeCap(renderer.ROUND);
  foods.forEach((food) => {
    renderer.image(
      renderer.cherry,
      food[0] * xScale,
      food[1] * yScale,
      xScaleImage,
      yScaleImage,
    );
  });
};

export { renderer };
