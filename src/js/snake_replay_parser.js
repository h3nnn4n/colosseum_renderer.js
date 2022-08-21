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

  const xScaleImage = xScale * 0.5;
  const yScaleImage = yScale * 0.5;

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

    renderer.circle(
      snake.head_position[0] * xScale - xScale * 0.5,
      snake.head_position[1] * yScale - yScale * 0.5,
      100,
    );

    snake.positions.forEach((position) => {
      renderer.circle(
        position[0] * xScale - xScale * 0.5,
        position[1] * yScale - yScale * 0.5,
        50,
      );
    });
  });

  // Draw the food
  foods.forEach((food) => {
    renderer.image(
      renderer.cherry,
      food[0] * xScale - xScaleImage * 0.5,
      food[1] * yScale - yScaleImage * 0.5,
      xScaleImage,
      yScaleImage
    );
  });
};

export { renderer };
