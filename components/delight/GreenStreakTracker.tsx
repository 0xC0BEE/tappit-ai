import * as React from 'react';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { LeafIcon } from '../icons.tsx';
import { useHaptics, HapticPattern } from '../../hooks/useHaptics.ts';

interface GreenStreakTrackerProps {
    streak: number;
    setStreak: React.Dispatch<React.SetStateAction<number>>;
    onStreakComplete: () => void;
}

const GreenStreakTracker: React.FC<GreenStreakTrackerProps> = ({ streak, setStreak, onStreakComplete }) => {
    const { playHaptic } = useHaptics();

    const handleLogTap = () => {
        const newStreak = streak + 1;
        if (newStreak >= 7) {
            onStreakComplete();
            playHaptic(HapticPattern.Success);
        } else {
            setStreak(newStreak);
            playHaptic(HapticPattern.Click);
        }
    };

    return (
        <GlassCard className="p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Green Streak</h2>
            <p className="text-gray-300 mb-4">Log a tap for 7 days in a row to plant a real tree.</p>

            <div className="flex justify-between items-center my-6">
                {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${index < streak ? 'bg-bamboo-8' : 'bg-white/10'}`}>
                            {index < streak && <LeafIcon className="w-5 h-5 text-white" />}
                        </div>
                        <span className="text-xs text-gray-400 mt-1">Day {index + 1}</span>
                    </div>
                ))}
            </div>

            <HapticButton 
                onClick={handleLogTap}
                className="w-full bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors"
            >
                Log Today's Tap
            </HapticButton>
        </GlassCard>
    );
};

export default GreenStreakTracker;