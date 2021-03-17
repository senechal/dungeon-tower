import { useRef, useCallback, useEffect } from 'react';
import { useArrowDirections } from './useArrowDirections';

export const useAnimation = (callback, fps=60) => {
    const heldDirections = useArrowDirections();
    const animation = useRef();
    const then = useRef();

    const step = useCallback(() => {
        const fpsInterval = 1000/fps;
        const [heldDirection] = heldDirections.current;
        animation.current = requestAnimationFrame(step);
        const now = Date.now();
        const elapsed = now - then.current;
        if(elapsed > fpsInterval){
            then.current = now - (elapsed % fpsInterval)
            callback(heldDirection);
        }
    }, [callback, heldDirections, fps]);
    useEffect(() => {
        then.current = Date.now();
        step();
        return () => cancelAnimationFrame(animation.current);
    }, [step]);
};