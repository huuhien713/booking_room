import { useEffect, useState } from 'react'

export const useViewPort = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth);

    useEffect(() => {
        const handleScreenWidth = () => {
            const width = window.innerWidth || document.documentElement.clientWidth;
            setScreenWidth(width);
        }
        handleScreenWidth();
        window.addEventListener('resize', handleScreenWidth);
        return () => {
            window.removeEventListener('resize', handleScreenWidth);
        }
    }, []);

    return ([screenWidth]);
}