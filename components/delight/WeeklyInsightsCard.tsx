// Fix: Use namespace import for React to resolve JSX type errors.
import * as React from 'react';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { ZapIcon } from '../icons.tsx';
import WeeklyInsightsModal from '../modals/WeeklyInsightsModal.tsx';

const WeeklyInsightsCard: React.FC = () => {
    // Fix: Use React.useState
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    return (
        <>
            <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Weekly AI Insights</h2>
                        <p className="text-gray-300">You made 12 new connections last week. That's a 20% increase!</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-full">
                        <ZapIcon className="w-6 h-6 text-bamboo-7" />
                    </div>
                </div>
                <HapticButton
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 w-full bg-white/20 text-white font-semibold py-2 rounded-lg text-sm"
                >
                    View Full Report
                </HapticButton>
            </GlassCard>
            <WeeklyInsightsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default WeeklyInsightsCard;
