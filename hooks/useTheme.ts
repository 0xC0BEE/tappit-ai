
import { useEffect } from 'react';

export const useTheme = () => {
    useEffect(() => {
        const hour = new Date().getHours();
        const isDayTime = hour > 6 && hour < 19;
        
        if (!isDayTime) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Optional: you could set up an interval to check periodically
        // but for most use cases, checking once on load is sufficient.
    }, []);
};
