
// Fix: Change to namespace import to ensure JSX types are available globally.
import * as React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import GlassCard from '../GlassCard.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import HapticButton from '../HapticButton.tsx';

const GiveawayCard: React.FC = () => {
    return (
        <GlassCard className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Weekly Giveaway!</h2>
            <p className="text-gray-300 my-2">Log a tap this week for a chance to win a limited edition Tappit card.</p>
            <HapticButton className="mt-4 w-full bg-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-indigo-500/30 hover:bg-indigo-600 transition-colors">
                Learn More
            </HapticButton>
        </GlassCard>
    );
};

export default GiveawayCard;