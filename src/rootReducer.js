import { combineReducers } from 'redux'
import game from './components/game/state/game.reducer';
import dialog from './components/dialog/state/dialog.reducer';
import player from './components/player/state/player.reducer';
import grid from './components/grid/state/grid.reducer';

export default combineReducers({
    game,
    dialog,
    player,
    grid,
});