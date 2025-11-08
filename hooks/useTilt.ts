

// Fix: Use namespace import for React to ensure the JSX namespace is correctly resolved.
import * as React from 'react';
import { springTransition } from '../utils/spring.ts';

const useTilt = (options = { max: 15, perspective: 1000, scale: 1.05 }) => {
    // Fix: Use React.useRef and React.useState
    const ref = React.useRef<HTMLDivElement>(null);
    const [style, setStyle] = React.useState({});

    // Fix: Use React.useEffect
    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = element.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            const rotateX = (options.max * (y - 0.5) * -2).toFixed(2);
            const rotateY = (options.max * (x - 0.5) * 2).toFixed(2);

            setStyle({
                transform: `perspective(${options.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${options.scale}, ${options.scale}, ${options.scale})`,
                transition: 'transform 0.05s ease-out'
            });
        };

        const handleMouseLeave = () => {
            setStyle({
                transform: `perspective(${options.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
                ...springTransition
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            // Fix: Pass the handler function `handleMouseLeave` instead of the string 'mouseleave'.
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [options.max, options.perspective, options.scale]);

    return { ref, style };
};

export default useTilt;
