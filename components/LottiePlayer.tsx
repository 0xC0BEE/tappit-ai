// Fix: Changed React import from default to namespace to align with project convention and help resolve JSX type errors.
import * as React from 'react';
// FIX: Use the full CDN URL to resolve the Vite build error.
import { motion } from 'https://aistudiocdn.com/framer-motion@^11.3.19';
import { TreeIcon } from './icons.tsx';

// Lottie is banned. This component is now a placeholder that uses Framer Motion and SVG.
interface LottiePlayerProps {
    src: string; // src is no longer used but kept for prop compatibility
    className?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ className }) => {
    return (
        <div className={className}>
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            >
                <TreeIcon className="w-full h-full text-bamboo-7" />
            </motion.div>
        </div>
    );
};

export default LottiePlayer;