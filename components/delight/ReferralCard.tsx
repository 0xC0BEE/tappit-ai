import React, { useState } from 'react';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { GiftIcon } from '../icons.tsx';
import { useHaptics, HapticPattern } from '../../hooks/useHaptics.ts';

const ReferralCard: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const { playHaptic } = useHaptics();
    const referralLink = 'https://tappit.ai/join?ref=user123';

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        playHaptic(HapticPattern.Success);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <GlassCard className="p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 border-2 border-yellow-500/30 mb-4">
                <GiftIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Get a Free Bamboo Card</h2>
            <p className="text-gray-300 my-2">Invite 3 friends to Tappit AI and we'll ship you a physical NFC-enabled bamboo card, on us.</p>
            <HapticButton 
                onClick={handleCopy}
                className="w-full bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg shadow-yellow-500/30 hover:bg-yellow-600 transition-colors"
            >
                {copied ? 'Link Copied!' : 'Copy Referral Link'}
            </HapticButton>
        </GlassCard>
    );
};

export default ReferralCard;
