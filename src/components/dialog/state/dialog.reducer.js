import { OPEN_DIALOG, CLOSE_DIALOG } from './ActionTypes';

const initialState = {
    messages: [],
    npcName: '',
    show: false,
};

export default function dialogReducer(state=initialState, action){
    switch(action.type){
        case OPEN_DIALOG: {
            return {
                messages: [...action.messages],
                npcName: action.npcName,
                show: true,
            };
        }
        case CLOSE_DIALOG: {
            return initialState;
        }
        default:
            return state;
    }
};