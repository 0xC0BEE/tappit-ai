import { useState, useRef, TouchEvent, MouseEvent } from 'react';

interface SwipeConfig {
    threshold: number;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
}

export const useSwipe = ({ threshold = 50, onSwipeLeft, onSwipeRight }: SwipeConfig) => {
    const [offsetX, setOffsetX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const startX = useRef(0);
    const isDragging = useRef(false);

    const getClientX = (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>): number => {
        return 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const handleDragStart = (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
        isDragging.current = true;
        startX.current = getClientX(e);
        setIsSwiping(true);
    };

    const handleDragMove = (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        const currentX = getClientX(e);
        const diff = currentX - startX.current;
        setOffsetX(diff);
    };

    const handleDragEnd = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        setIsSwiping(false);
        
        if (offsetX < -threshold && onSwipeLeft) {
            onSwipeLeft();
        } else if (offsetX > threshold && onSwipeRight) {
            onSwipeRight();
        }

        setOffsetX(0);
    };

    const handlers = {
        onTouchStart: handleDragStart,
        onTouchMove: handleDragMove,
        onTouchEnd: handleDragEnd,
        onMouseDown: handleDragStart,
        onMouseMove: handleDragMove,
        onMouseUp: handleDragEnd,
        onMouseLeave: handleDragEnd,
    };

    return { handlers, offsetX, isSwiping };
};

export default useSwipe;
