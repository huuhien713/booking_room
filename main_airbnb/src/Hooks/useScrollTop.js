import { useState, useEffect } from 'react';

export const useScrollTop = () => {

    const [scrollTop, setScrollTop] = useState(0);

    const handleScrollY = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        setScrollTop(scrollY);
    }

    useEffect(() => {
        handleScrollY();
        document.addEventListener('scroll', handleScrollY);
        return () => {
            document.removeEventListener('scroll', handleScrollY);
        }
    }, []);

    return ([scrollTop]);
}