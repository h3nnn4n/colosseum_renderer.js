let renderer = {};

renderer.setReplay = function(replay) {
  this.frames = replay;
  this.config = this.firstFrame().game_config;
}

renderer.setRenderer = function(renderer) {
  this.renderer = renderer;
}

renderer.firstFrame = function() {
  return this.frames[0];
}

export { renderer };
