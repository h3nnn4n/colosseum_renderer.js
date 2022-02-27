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
  return this.frames[0];
};

renderer.renderFrame = function (frameIndex, renderer) {
  const frame = this.frames[frameIndex];
  const actors = frame.world_state.actors;
  const bases = frame.world_state.bases;
  const foods = frame.world_state.foods;

  const xScale = renderer.width / this.config.grid_width;
  const yScale = renderer.height / this.config.grid_height;

  renderer.textSize(32);
  renderer.text(frameIndex, 10, 30);

  renderer.fill(255, 0, 0);
  foods.forEach((food) => {
    renderer.image(
      renderer.cherry,
      food.position[0] * xScale - xScale,
      food.position[1] * yScale - yScale,
      xScale * 2,
      yScale * 2
    );
  });

  renderer.fill(0, 255, 0);
  bases.forEach((base) => {
    renderer.ellipse(base.position[0] * xScale, base.position[1] * yScale, xScale, yScale);
    renderer.image(
      renderer.hut,
      base.position[0] * xScale - xScale,
      base.position[1] * yScale - yScale,
      xScale * 2,
      yScale * 2
    );
  });

  renderer.fill(0, 0, 255);
  actors.forEach((actor) => {
    renderer.ellipse(actor.position[0] * xScale, actor.position[1] * yScale, xScale, yScale);
    renderer.image(
      renderer.monocle,
      actor.position[0] * xScale - xScale,
      actor.position[1] * yScale - yScale,
      xScale * 2,
      yScale * 2
    );
  });
};

export { renderer };
