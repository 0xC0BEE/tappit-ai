import React from 'react';
import GemWrapper from './GemWrapper.tsx';

const FollowUpGem: React.FC = () => (
    <GemWrapper title="AI Follow-Up" description="Drafted follow-up email ready to send.">
        <div className="text-sm text-gray-300 p-2 bg-black/20 rounded-lg">
            <p>Subject: Great connecting at TechCrunch!</p>
            <p>Hi Jane, It was a pleasure meeting you...</p>
        </div>
    </GemWrapper>
);

export default FollowUpGem;
