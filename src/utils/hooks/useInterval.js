import { useEffect, useState, useRef } from "react"

export const useInterval = (callback, period) => {
    const [pulse, setPulse] = useState(false);
    const interval = useRef();

    useEffect(() => {
        interval.current = setInterval(() => {
            setPulse(p => !p);
        }, period);
        return () => clearInterval(interval.current);
    }, []);//eslint-disable-line

    useEffect(() => {
        callback(pulse);
    }, [pulse]); //eslint-disable-line
}