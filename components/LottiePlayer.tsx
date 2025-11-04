import React, { useEffect, useRef } from 'react';

// A simplified Lottie player using the official web component
// In a real app, you might install a package like `@lottiefiles/react-lottie-player`
// Fix: The type declaration for <lottie-player> has been moved to types.ts to be globally available.

interface LottiePlayerProps {
    src: string;
    className?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, className }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Dynamically load the lottie-player script
        if (!document.querySelector('#lottie-player-script')) {
            const script = document.createElement('script');
            script.id = 'lottie-player-script';
            script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
            document.body.appendChild(script);
        }
    }, []);
    
    return (
        <div ref={ref} className={className}>
            <lottie-player
                src={src}
                background="transparent"
                speed="1"
                loop
                autoplay
            />
        </div>
    );
};

export default LottiePlayer;