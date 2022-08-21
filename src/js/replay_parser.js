import { renderer as dummy_renderer } from '@/js/dummy_replay_parser';
import { renderer as food_catcher_renderer } from '@/js/dummy_replay_parser';

let renderer_manager = {}

renderer_manager.getRenderer = function(game_name) {
  if (game_name == "food_catcher") return food_catcher_renderer;

  console.warn(`game ${game_name} is not supported by this renderer`);

  return dummy_renderer;
}

export { renderer_manager };
