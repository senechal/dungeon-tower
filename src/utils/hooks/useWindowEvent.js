import { useEffect } from 'react';

export const useWindowEvent = (event, callback) => {
    useEffect(() => {
        document.addEventListener(event, callback);
        return () => document.removeEventListener(event, callback);
    }, [event, callback]);
};
