import * as React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../../services/supabase.ts';
import GlassCard from '../../../components/GlassCard.tsx';
import HapticButton from '../../../components/HapticButton.tsx';
import { ClipboardIcon } from '../../../components/icons.tsx';

const ReferralGiveawayScreen: React.FC = () => {
    const [referralCount, setReferralCount] = React.useState(0);
    const targetCount = 5;

    React.useEffect(() => {
        const fetchReferrals = async () => {
            // This is a simplified query
            const { data } = await supabase.from('referrals').select('*');
            if (data) {
                setReferralCount((data as any[]).filter(r => r.status === 'completed').length);
            }
        };
        fetchReferrals();
    }, []);

    const progress = (referralCount / targetCount) * 100;
    const isComplete = referralCount >= targetCount;

    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Get a Free Bamboo Card</h1>
            <p className="text-gray-300 mb-8 max-w-sm">
                Successfully refer 5 friends to Tappit AI, and we'll send you a physical bamboo card, on us.
            </p>

            <GlassCard className="p-8 w-full max-w-sm">
                <h3 className="font-bold text-xl">Your Progress</h3>
                <p className="text-5xl font-bold my-4">{referralCount} / {targetCount}</p>

                <div className="w-full bg-black/20 rounded-full h-4 mb-6">
                    <motion.div
                        className="bg-bamboo-8 h-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1 }}
                    />
                </div>
                
                {isComplete ? (
                     <HapticButton className="w-full bg-bamboo-7 font-bold py-3 rounded-full shadow-lg">
                        Claim Your Free Card!
                    </HapticButton>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm font-semibold">Your Referral Link:</p>
                        <div className="flex items-center space-x-2 bg-black/20 p-2 rounded-lg">
                            <input type="text" readOnly value="tappit.ai/invite/alex-b" className="bg-transparent flex-grow text-center text-gray-400" />
                             <HapticButton className="p-2 bg-bamboo-8 rounded-md">
                                <ClipboardIcon className="w-5 h-5"/>
                            </HapticButton>
                        </div>
                    </div>
                )}
            </GlassCard>
        </div>
    );
};

export default ReferralGiveawayScreen;
