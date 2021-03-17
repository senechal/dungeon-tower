import { useRef } from 'react';

export const useAnimation = (fps, callback) => {
    const animationRef = useRef();
    const thenRef = useRef();
    const step = (...args) => {
        animationRef.current = requestAnimationFrame(() => step(...args));
        const fpsInterval = 1000/fps;
        const now = Date.now();
        const elapsed = now - thenRef.current;
        if(elapsed > fpsInterval){
            thenRef.current = now - (elapsed % fpsInterval);
            callback(...args);
        }
    }
    const start = (...args) => {
        thenRef.current = Date.now();
        step(...args);
    }
    const stop = () => {
        cancelAnimationFrame(animationRef.current);
    }
    return [start, stop];
}