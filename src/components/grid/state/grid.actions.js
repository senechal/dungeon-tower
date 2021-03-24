import { INIT_NEW_AREA, CHANGE_MATRIX_POSITION } from "./actionTypes"

export const initArea = (areaConfig) => {
    return {
        type: INIT_NEW_AREA,
        areaConfig,
    }
};

export const changePositionValue = (pos, value = 1) => {
    return {
        type: CHANGE_MATRIX_POSITION,
        pos,
        value,
    }
};