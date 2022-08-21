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
  return {};
};

renderer.renderFrame = function () {
};

export { renderer };
