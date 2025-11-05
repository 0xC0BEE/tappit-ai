import React from 'react';

interface LottiePlayerProps {
    src: string;
    className?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, className }) => {
    return (
        <lottie-player
            src={src}
            background="transparent"
            speed="1"
            loop
            autoplay
            className={className}
        ></lottie-player>
    );
};

export default LottiePlayer;