import { useEffect, useState, useRef } from 'react';
import {
    getTargetPosition,
    isRight,
    isLeft,
    isDown,
    isUp,
} from './utils'
import { useAnimation } from './useAnimation';

export const useMovementArray = (pixelSize, gridSize, offset) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(48);
    const [facing, setFacing] = useState('down');
    const [walking, setWalking] = useState(false);
    const directionsRef = useRef([]);
    const refX = useRef(x);
    const refY = useRef(y);
    const currStepTarget = useRef(null);
    const currStepDirection = useRef(undefined);
    const [startAnimation, stopAnimation] = useAnimation(60, () => {
        if(currStepTarget.current !== null){
            if(currStepTarget.current.x === refX.current && currStepTarget.current.y === refY.current){
                currStepTarget.current = null;
            }
        }
        if(currStepTarget.current === null){
            currStepDirection.current = directionsRef.current.shift();
            if(currStepDirection.current){
                currStepTarget.current = getTargetPosition(currStepDirection.current, refX.current, refY.current, gridSize);
                setFacing(currStepDirection.current);
            } else {
                setWalking(false);
                stopAnimation();
            }
        }
        const direction = currStepDirection.current;
        if(isRight(direction)){
            refX.current += 1;
            setX(x => x + 1);
        }
        if(isLeft(direction)){
            refX.current -= 1;
            setX(x => x - 1);
        }
        if(isDown(direction)){
            refY.current += 1;
            setY(y => y + 1);
        }
        if(isUp(direction)){
            refY.current -= 1;
            setY(y => y - 1);
        }

    });

    useEffect(() => {
        if(walking === true){
            startAnimation();
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
                x: x * pixelSize,
                y: y * pixelSize,
            },
            walking,
            facing,
        },
        grid: {
            coordinates: {
                x: -x * pixelSize + (pixelSize * offset.x),
                y: -y * pixelSize + (pixelSize * offset.y),
            },
        }
    }
}