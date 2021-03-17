import { useRef} from 'react';
import { MOVEMENT_KEYS } from './constants';
import { useWindowEvent } from './useWindowEvent';

export const useArrowDirections = () => {
    const heldDirections = useRef([]);
    useWindowEvent('keydown', (event) => {
        const direction = MOVEMENT_KEYS[event.which];
        if (direction && !heldDirections.current.includes(direction)){
            heldDirections.current = [direction, ...heldDirections.current];
        }
    });
    useWindowEvent('keyup', (event) => {
        const direction = MOVEMENT_KEYS[event.which];
        if(direction && heldDirections.current.includes(direction)){
            return heldDirections.current = heldDirections.current.filter(dir => dir !== direction);
        }
    });

    return heldDirections;
};