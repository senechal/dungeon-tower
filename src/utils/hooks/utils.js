import { MOVEMENT_DIRECTIONS } from './constants';

/**
 * Description:
 * Check if the direction is correct.
 * @param {String} direction direction.
 */
export const isRight = (direction) => direction === MOVEMENT_DIRECTIONS.right;
export const isLeft = (direction) => direction === MOVEMENT_DIRECTIONS.left;
export const isDown = (direction) => direction === MOVEMENT_DIRECTIONS.down;
export const isUp = (direction) => direction === MOVEMENT_DIRECTIONS.up;

/**
 * Description:
 * Create a step function to be used in a setter.
 * Step function add a step to state if inside min/max values.
 * @param {Number} min  min value a step could take.
 * @param {Number} max  max value a step could take.
 * @param {Number} step step size.
 */
export const makeStep = (min, max, step) => (curr) => {
    const pos = curr + step;
    if(pos < min) return min;
    if(pos > max) return max;
    return pos;
}

/**
 * Description:
 * Return Target position base on x y cordinates and direction.
 * @param {String} direction  facing direction.
 * @param {Number} x          x coordinate.
 * @param {Number} y          y coordinate.
 * @param {Number} blockSize  size fo the grid block.
 */
export const getTargetPosition = (direction, x, y, blockSize) => {
    return {
        [MOVEMENT_DIRECTIONS.right]: { x: x + blockSize, y },
        [MOVEMENT_DIRECTIONS.left]: { x: x - blockSize, y },
        [MOVEMENT_DIRECTIONS.down]: {x: x, y: y + blockSize },
        [MOVEMENT_DIRECTIONS.up]: {x: x, y: y - blockSize },
    }[direction];
};