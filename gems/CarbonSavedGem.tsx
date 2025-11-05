import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { LeafIcon } from '../components/icons.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { analyticsData } from '../data/analytics.ts';

const CarbonSavedGem: React.FC = () => {
    const carbonSaved = analyticsData.carbonSaved.current;

    return (
        <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
                <LeafIcon className="w-6 h-6 text-bamboo-7" />
                <p className="text-3xl font-bold text-white">{carbonSaved.toFixed(1)}g</p>
            </div>
            <p className="text-sm text-gray-300 mt-1">
                of CO₂ saved by using a digital card instead of paper.
            </p>
        </div>
    );
};

export default CarbonSavedGem;
