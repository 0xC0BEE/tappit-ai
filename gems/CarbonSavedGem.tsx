import React from 'react';
import GemWrapper from './GemWrapper.tsx';

const CarbonSavedGem: React.FC = () => (
    <GemWrapper title="Carbon Footprint" description="Estimated carbon saved by using a digital card.">
        <p className="text-2xl font-bold text-bamboo-7">2.7g CO₂</p>
        <p className="text-gray-400 text-sm">saved this week</p>
    </GemWrapper>
);

export default CarbonSavedGem;
