import React from 'react';
import GlassCard from './GlassCard.tsx';
import { CarbonSavedGem, FollowUpGem, IcebreakerGem, SmartTagGem } from '../gems/index.ts';

const GemSidebar: React.FC = () => {
    return (
        <GlassCard className="p-4 space-y-4">
            <h2 className="text-xl font-bold text-white text-center mb-2">AI Gems</h2>
            <IcebreakerGem />
            <FollowUpGem />
            <SmartTagGem />
            <CarbonSavedGem />
        </GlassCard>
    );
};

export default GemSidebar;
