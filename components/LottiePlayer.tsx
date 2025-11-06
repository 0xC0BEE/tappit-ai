// Fix: Use namespace import for React to ensure the JSX namespace is correctly resolved for module augmentation.
import * as React from 'react';

// Fix: Add lottie-player type definitions locally to resolve JSX errors.
// The global `types/lottie.d.ts` file was not being picked up by the build system.
declare global {
    // This interface is now globally available for use in component refs.
    interface LottiePlayerElement extends HTMLElement {
        play: () => void;
    }
  
    namespace JSX {
        interface IntrinsicElements {
            'lottie-player': React.DetailedHTMLProps<
                React.HTMLAttributes<LottiePlayerElement> & {
                    src: string;
                    background?: string;
                    speed?: string;
                    loop?: boolean;
                    autoplay?: boolean;
                },
                LottiePlayerElement
            >;
        }
    }
}


// Fix: Removed duplicate lottie-player type definitions.
// Global types are now consolidated in `types/lottie.d.ts`
// to prevent conflicts and ensure reliable module augmentation.
interface LottiePlayerProps {
    src: string;
    className?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, className }) => {
    // Use a ref to get direct access to the lottie-player DOM element
    // The ref correctly uses the LottiePlayerElement type, which is now globally available.
    const ref = React.useRef<LottiePlayerElement>(null);

    // This effect runs once on mount to set up the player
    React.useEffect(() => {
        const player = ref.current;
        if (player) {
            // The 'load' event is fired by the lottie-player web component when the animation data is fully loaded.
            // Listening for 'load' instead of 'ready' is more reliable for preventing race conditions.
            const handleLoad = () => {
                // Using an imperative call to play() is more reliable than the autoplay attribute.
                player.play();
            };
            
            player.addEventListener('load', handleLoad);
            
            // Clean up the event listener when the component unmounts
            return () => {
                if (player) {
                    player.removeEventListener('load', handleLoad);
                }
            };
        }
    }, []); // The empty dependency array ensures this effect runs only once on mount.

    return (
        <lottie-player
            ref={ref}
            src={src}
            background="transparent"
            speed="1"
            loop
            // Remove the 'autoplay' attribute and control playback manually for reliability.
            className={className}
        ></lottie-player>
    );
};

export default LottiePlayer;