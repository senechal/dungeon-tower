import { useEffect, useState, useCallback} from 'react';

export const usePixelSize = () => {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    useEffect(() => {
        const updatePixelSize = () => {
            window.pixelSize = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
                );
            forceUpdate();
          };
          window.addEventListener('resize', updatePixelSize);
          updatePixelSize();
          return () => window.removeEventListener('resize', updatePixelSize)
    }, [forceUpdate]);
}