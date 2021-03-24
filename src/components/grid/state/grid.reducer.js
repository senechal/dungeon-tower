import { INIT_NEW_AREA, CHANGE_MATRIX_POSITION } from "./actionTypes";
import cloneDeep from 'lodash/cloneDeep';
import { getObstacleMatrix } from "../utils";

const initialState = {
    areaConfig: {},
    matrix: [],
    hasMatrix: false,
}

export default function gridReducer(state=initialState, action){
    switch(action.type){
        case INIT_NEW_AREA:
            return {
                areaConfig: cloneDeep(action.areaConfig),
                matrix: getObstacleMatrix(action.areaConfig.grid, action.areaConfig.walls),
                hasMatrix: true,
            }
        case CHANGE_MATRIX_POSITION: {
            const matrix = cloneDeep(state.matrix);
            matrix[action.pos.y][action.pos.x] = action.value;
            return {
                ...state,
                matrix,
            }
        }
        default:
            return state;
    }
};