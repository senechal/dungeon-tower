import { useEffect, useState, useRef } from 'react';
import {
    getTargetPosition,
    isRight,
    isLeft,
    isDown,
    isUp,
} from './utils'
import { useAnimation } from './useAnimation';

export const useMovementArray = (speed, blockSize, offset, onMovementStart=Function.prototype, onMovementEnds=Function.prototype) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(48);
    const [facing, setFacing] = useState('down');
    const [walking, setWalking] = useState(false);
    const directionsRef = useRef([]);
    const refX = useRef(x);
    const refY = useRef(y);
    const currStepTarget = useRef(null);
    const currStepDirection = useRef(undefined);

    const [startAnimation, stopAnimation] = useAnimation(speed, () => {
        //If Movement Target still set, and arrived on target, clear target.
        if(currStepTarget.current !== null &&
            currStepTarget.current.x === refX.current &&
            currStepTarget.current.y === refY.current){
            currStepTarget.current = null;
        }
        // If target is not set, get next direction.
        if(currStepTarget.current === null){
            currStepDirection.current = directionsRef.current.shift();
            // If next direction Found, get new target position, and change direction
            // If not end movement and stop animation.
            if(currStepDirection.current){
                currStepTarget.current = getTargetPosition(currStepDirection.current, refX.current, refY.current, blockSize);
                setFacing(currStepDirection.current);
            } else {
                setWalking(false);
                stopAnimation();
                onMovementEnds();
            }
        }
        if(isRight(currStepDirection.current)){
            refX.current += 1;
            setX(x => x + 1);
        }
        if(isLeft(currStepDirection.current)){
            refX.current -= 1;
            setX(x => x - 1);
        }
        if(isDown(currStepDirection.current)){
            refY.current += 1;
            setY(y => y + 1);
        }
        if(isUp(currStepDirection.current)){
            refY.current -= 1;
            setY(y => y - 1);
        }
    });

    useEffect(() => {
        if(walking === true){
            startAnimation();
            onMovementStart();
        }
        return stopAnimation;
    }, [walking]); //eslint-disable-line


    return {
        setMovements: (arr) => {
            directionsRef.current = arr;
            setWalking(true);
        },
        character: {
            coordinates:{
                x: x * window.pixelSize,
                y: y * window.pixelSize,
            },
            walking,
            facing,
        },
        grid: {
            moving: walking,
            coordinates: {
                x: -x * window.pixelSize + (window.pixelSize * offset.x),
                y: -y * window.pixelSize + (window.pixelSize * offset.y),
            },
        }
    }
}