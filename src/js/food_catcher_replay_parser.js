let renderer = {};

renderer.setReplay = function (replay) {
  console.log('setting replay');
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

  const xScaleImage = xScale * 1.5;
  const yScaleImage = yScale * 1.5;

  const imageBackgroundScale = 1.2;

  renderer.textSize(32);
  renderer.text(frameIndex, 10, 30);

  renderer.fill(255, 0, 0);
  foods.forEach((food) => {
    renderer.image(
      renderer.cherry,
      food.position[0] * xScale - xScaleImage * 0.5,
      food.position[1] * yScale - yScaleImage * 0.5,
      xScaleImage,
      yScaleImage
    );
  });

  renderer.fill(0, 255, 0);
  bases.forEach((base) => {
    renderer.ellipse(
      base.position[0] * xScale,
      base.position[1] * yScale,
      xScale * imageBackgroundScale,
      yScale * imageBackgroundScale
    );
    renderer.image(
      renderer.hut,
      base.position[0] * xScale - xScaleImage * 0.5,
      base.position[1] * yScale - yScaleImage * 0.5,
      xScaleImage,
      yScaleImage
    );
  });

  renderer.fill(0, 0, 255);
  actors.forEach((actor) => {
    renderer.ellipse(
      actor.position[0] * xScale,
      actor.position[1] * yScale,
      xScale * imageBackgroundScale,
      yScale * imageBackgroundScale
    );
    renderer.image(
      renderer.monocle,
      actor.position[0] * xScale - xScaleImage * 0.5,
      actor.position[1] * yScale - yScaleImage * 0.5,
      xScaleImage,
      yScaleImage
    );
  });
};

export { renderer };
