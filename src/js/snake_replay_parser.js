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

  const xScale = renderer.width / this.config.grid_width;
  const yScale = renderer.height / this.config.grid_height;

  const xScaleImage = xScale * 0.5;
  const yScaleImage = yScale * 0.5;

  const imageBackgroundScale = 1.2;

  renderer.textSize(32);
  renderer.text(frameIndex, 10, 30);

  renderer.fill(255, 0, 0);
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
