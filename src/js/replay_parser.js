let renderer = {};

renderer.setReplay = function(replay) {
  this.state = {};
  this.frames = replay;
  this.config = this.firstFrame().game_config;
}

renderer.setRenderer = function(renderer) {
  this.renderer = renderer;
}

renderer.firstFrame = function() {
  return this.frames[0];
}

renderer.renderFrame = function(frameIndex, renderer) {
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
    renderer.ellipse(food.position[0] * xScale, food.position[1] * yScale, xScale, yScale);
  });
}

export { renderer };
