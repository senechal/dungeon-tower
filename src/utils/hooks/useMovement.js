import { useState } from 'react';
import {
    isRight,
    isLeft,
    isDown,
    isUp,
    makeStep,
} from './utils';

import { useAnimation } from './useAnimationOld';

export const useMovement = ({initPos={x:0, y:48}, grid={ x:13, y:10 }, speed = 30} = {}) => {
    const [x, setX] = useState(initPos.x);
    const [y, setY] = useState(initPos.y);
    const [facing, setFacing] = useState('down');
    const [walking, setWalking] = useState(false);
    const [pixelSize, setPizelSize] = useState(null);
    useAnimation((heldDirection) => {
        if(!pixelSize){
            setPizelSize(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')));
        }
        if(heldDirection){
            if(isRight(heldDirection) && heldDirection === facing){
                setX(makeStep(0, (grid.x - 1) * 16, 1));
            }
            if(isLeft(heldDirection) && heldDirection === facing){
                setX(makeStep(0, (grid.x - 1) * 16, -1));
            }
            if(isDown(heldDirection) && heldDirection === facing){
                setY(makeStep(42, ((grid.y -2 ) * 16) - 6, 1));
            }
            if(isUp(heldDirection) && heldDirection === facing){
                setY(makeStep(42, ((grid.y -2 ) * 16) - 6, -1));
            }
            setFacing(heldDirection);
            setWalking(true);
        } else {
            setWalking(false);
        }


    }, speed);

    return {
        character: {
            coordinates:{
                x: x * pixelSize,
                y: y * pixelSize,
            },
            walking,
            facing,

        },
        map: {
            coordinates: {
                x: -x * pixelSize + (pixelSize * 80),
                y: -y * pixelSize + (pixelSize * 64),
            }
        }
    }
}