import * as React from 'react';
import { motion } from 'https://aistudiocdn.com/framer-motion@^11.3.19';
import { TreeIcon } from './icons.tsx';

interface PulsingTreeAnimationProps {
    className?: string;
}

const PulsingTreeAnimation: React.FC<PulsingTreeAnimationProps> = ({ className }) => {
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

export default PulsingTreeAnimation;