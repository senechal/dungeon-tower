import { useEffect, useState, useRef } from 'react';
import  { getPath } from '@components/game/utils';
import  { encodeCoordinates, decodeCoordinates } from '@components/grid';
import  { changePositionValue } from '@components/grid/state/grid.actions';
import {
    getTargetPosition,
    isRight,
    isLeft,
    isDown,
    isUp,
} from './utils'
import { useAnimation } from './useAnimation';
import { useSelector, useDispatch } from 'react-redux';

export const useMovementArray = (args) => {
    const {
        speed,
        initialPosition: gridInitialPosition = { x:0, y:3 },
        blockSize,
        offset={x: 0, y: 0},
        onMovementStart=Function.prototype,
        onMovementEnds=Function.prototype
    } = args;
    const { matrix, hasMatrix } = useSelector(state => state.grid);
    const dispatch = useDispatch();
    const initialPosition = decodeCoordinates(gridInitialPosition, blockSize, 1);

    const [x, setX] = useState(initialPosition.x);
    const [y, setY] = useState(initialPosition.y);
    const [facing, setFacing] = useState('down');
    const [walking, setWalking] = useState(false);
    const directionsRef = useRef([]);
    const refX = useRef(x);
    const refY = useRef(y);
    const currStepTarget = useRef(null);
    const currStepDirection = useRef(undefined);
    const prevDirection = useRef(undefined);

    const [startAnimation, stopAnimation] = useAnimation(speed, () => {
        //If Movement Target still set, and arrived on target, clear target.
        if(currStepTarget.current !== null &&
            currStepTarget.current.x === refX.current &&
            currStepTarget.current.y === refY.current){
                dispatch(changePositionValue(encodeCoordinates(prevDirection.current, blockSize, 1), 0));
                currStepTarget.current = null;
        }
        // If target is not set, get next direction.
        if(currStepTarget.current === null){
            currStepDirection.current = directionsRef.current.shift();
            // If next direction Found, get new target position, and change direction
            // If not end movement and stop animation.
            if(currStepDirection.current){
                prevDirection.current = {x: refX.current, y: refY.current};
                currStepTarget.current = getTargetPosition(currStepDirection.current, refX.current, refY.current, blockSize);
                dispatch(changePositionValue(encodeCoordinates(currStepTarget.current, blockSize, 1)));
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

    useEffect(() => {
        if(hasMatrix){
            dispatch(changePositionValue(gridInitialPosition));
        }
    },[hasMatrix]); //eslint-disable-line

    return {
        setMovements: (arr) => {
            directionsRef.current = arr;
            setWalking(true);
        },
        moveTo: (to) => {
            const local = currStepTarget.current || {x, y}
            const from = encodeCoordinates(local, blockSize, 1);
            const path = getPath(from, to, matrix);
            directionsRef.current = path;
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