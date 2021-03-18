import { combineReducers } from 'redux'
import game from './components/game/state/game.reducer';
import dialog from './components/dialog/state/dialog.reducer';

export default combineReducers({
    game,
    dialog,
});