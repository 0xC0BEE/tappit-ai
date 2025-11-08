import * as React from 'react';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';

const ReferralCard: React.FC = () => {
    return (
        <GlassCard className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Refer a Friend</h2>
            <p className="text-gray-300 my-2">Invite a friend to Tappit AI and you both get a free month of Pro!</p>
            <HapticButton className="mt-4 w-full bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors">
                Get Your Referral Link
            </HapticButton>
        </GlassCard>
    );
};

export default ReferralCard;