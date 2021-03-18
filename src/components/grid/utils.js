/**
 * Description:
 * Encode positon coordinates to grid coordinates
 * @param {Number} x           X position coordinate to be encoded to grid coordinates.
 * @param {Number} y           Y position coordinate to be encoded to grid coordinates.
 * @param {Number} blockSize   Size of a grid block.
 * @param {Number} pixelSize   Size of a pixel based on broser viewport size.
 */
 export const encodeCoordinates = ({x, y}, blockSize, pixelSize) => {
    const denominator = blockSize * pixelSize;
    return {
        x: Math.floor(x/denominator),
        y: Math.floor(y/denominator),
    }
}
/**
 * Description:
 * Decode grid coordinates into posiiton coordinates
 * @param {Number} x           X grid coordinate to be decode into position coordinate.
 * @param {Number} y           Y grid coordinate to be decode into position coordinate.
 * @param {Number} blockSize   Size of a grid block.
 * @param {Number} pixelSize   Size of a pixel based on broser viewport size.
 */
 export const decodeCoordinates = ({x, y}, blockSize, pixelSize) => {
    const denominator = blockSize * pixelSize;
    return {
        x: Math.floor(x*denominator),
        y: Math.floor(y*denominator),
    }
}


export const isObstacle = (obstacleList, coordinates) => {
    console.log(obstacleList, coordinates);
    const { x, y } = coordinates;
    return obstacleList.some((obstacle) => {
        const {pos, size} = obstacle;
        const [ox, oy] = pos;
        const [width, height] = size;

        return x >= ox && x <= ox + (width - 1) && y >= oy && y <= oy + (height -1);
    });
}