import React from 'react';
import GemWrapper from './GemWrapper.tsx';

const SmartTagGem: React.FC = () => (
    <GemWrapper title="Smart Tags" description="AI-suggested tags for organization.">
        <div className="flex flex-wrap gap-2">
            <span className="bg-bamboo-8/50 text-white text-xs font-semibold px-2 py-1 rounded-full">#TechCrunch</span>
            <span className="bg-blue-500/50 text-white text-xs font-semibold px-2 py-1 rounded-full">#Investor</span>
        </div>
    </GemWrapper>
);

export default SmartTagGem;
