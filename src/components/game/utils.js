import * as areas from './areas';
import { Grid, AStarFinder} from 'pathfinding';


export const getArea = (areaId) => {
    return areas[areaId];
};

const getMovements = (path) => {
    const movements = [];
    const [ startPoint, ...points ] = path;
    let lastPoint = startPoint;
    points.forEach((point) => {
        const [x, y] = point;
        const [lastX, lastY] = lastPoint;
        const diffX = x - lastX;
        const diffY = y - lastY;

        if(diffX < 0){
            movements.push('left');
        } else if(diffX > 0){
            movements.push('right');
        }
        if(diffY < 0){
            movements.push('up');
        } else if(diffY > 0){
            movements.push('down');
        }
        lastPoint = point;
    });
    return movements;
};

export const getPath = (start, end, matrix) => {
    const finderGrid = new Grid(matrix);
    const finder = new AStarFinder({
        allowDiagonal: false
    });
    const finderPath = finder.findPath(start.x, start.y, end.x, end.y, finderGrid);
    return getMovements(finderPath);
};