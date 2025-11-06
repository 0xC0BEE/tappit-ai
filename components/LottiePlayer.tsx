// Fix: Use namespace import for React to ensure the JSX namespace is correctly resolved for module augmentation.
import * as React from 'react';

// Fix: Define LottiePlayerElement as a module-level interface. This resolves TypeScript errors
// with JSX augmentation by ensuring the type is declared before it's referenced within `declare global`.
interface LottiePlayerElement extends HTMLElement {
  play: () => void;
}

// Fix: Extracted attributes into a dedicated interface for clarity and to resolve potential type augmentation issues.
interface LottiePlayerAttributes extends React.HTMLAttributes<LottiePlayerElement> {
  src: string;
  background?: string;
  speed?: string;
  loop?: boolean;
  autoplay?: boolean;
}

// Fix: Moved lottie-player type declarations into this file to resolve module augmentation issues.
// By defining the custom element types here, we ensure they are available within this module's scope.
// Fix: Replaced `React.DetailedHTMLProps` with its underlying types (`React.ClassAttributes` & `LottiePlayerAttributes`)
// to resolve a potential type resolution issue with module augmentation for custom elements.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': React.ClassAttributes<LottiePlayerElement> & LottiePlayerAttributes;
    }
  }
}

interface LottiePlayerProps {
    src: string;
    className?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, className }) => {
    // Use a ref to get direct access to the lottie-player DOM element
    // The ref now correctly uses the LottiePlayerElement type.
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
