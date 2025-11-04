import React, { ReactNode } from 'react';
import useSwipe from '../hooks/useSwipe';

interface SwipeableRowProps {
    children: ReactNode;
    leftActions?: ReactNode;
    rightActions?: ReactNode;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
}

const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, leftActions, rightActions, onSwipeLeft, onSwipeRight }) => {
    const { handlers, offsetX, isSwiping } = useSwipe({
        threshold: 60,
        onSwipeLeft,
        onSwipeRight,
    });
    
    const transition = isSwiping ? 'none' : 'transform 0.3s ease-out';
    
    return (
        <div className="relative w-full overflow-hidden">
            {leftActions && (
                <div className="absolute inset-y-0 left-0 flex items-center" style={{ width: '100px', transform: `translateX(${Math.max(0, offsetX) - 100}px)`, transition }}>
                    {leftActions}
                </div>
            )}
             {rightActions && (
                <div className="absolute inset-y-0 right-0 flex items-center" style={{ width: '100px', transform: `translateX(${Math.min(0, offsetX) + 100}px)`, transition }}>
                    {rightActions}
                </div>
            )}
            <div
                {...handlers}
                style={{ transform: `translateX(${offsetX}px)`, transition, touchAction: 'pan-y' }}
                className="relative w-full z-10"
            >
                {children}
            </div>
        </div>
    );
};

export default SwipeableRow;
