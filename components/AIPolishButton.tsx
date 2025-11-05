import React, { useState } from 'react';
import { WandIcon } from './icons.tsx';
import HapticButton from './HapticButton.tsx';
import { useHaptics, HapticPattern } from '../hooks/useHaptics.ts';

declare global {
    interface Window {
        confetti?: (options: any) => void;
    }
}

interface AIPolishButtonProps {
    onClick: () => Promise<void>;
}

const AIPolishButton: React.FC<AIPolishButtonProps> = ({ onClick }) => {
    const [loading, setLoading] = useState(false);
    const { playHaptic } = useHaptics();

    const handleClick = async () => {
        setLoading(true);
        try {
            await onClick();
            playHaptic(HapticPattern.Success);
            if (window.confetti) {
                window.confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        } catch (error) {
            console.error("AI Polish failed:", error);
            alert("Sorry, the AI couldn't polish your card right now. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <HapticButton
            onClick={handleClick}
            disabled={loading}
            className="w-full relative overflow-hidden flex items-center justify-center bg-gradient-to-r from-bamboo-7 to-bamboo-9 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:from-bamboo-8 hover:to-bamboo-10 transition-all duration-300 disabled:opacity-70"
        >
            {loading && (
                <div className="absolute inset-0 bg-white/20 animate-pulse [animation-duration:1s]"></div>
            )}
            <WandIcon className="w-5 h-5 mr-2" />
            <span>{loading ? 'Polishing...' : 'AI Polish'}</span>
        </HapticButton>
    );
};

export default AIPolishButton;
