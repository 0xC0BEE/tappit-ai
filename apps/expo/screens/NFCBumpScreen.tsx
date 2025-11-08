import * as React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../components/GlassCard.tsx';
import HapticButton from '../../../components/HapticButton.tsx';
import { PhoneIcon, CheckIcon } from '../../../components/icons.tsx';
import { useHaptics, HapticPattern } from '../../../hooks/useHaptics.ts';

const NFCBumpScreen: React.FC = () => {
    const [status, setStatus] = React.useState<'idle' | 'bumping' | 'success'>('idle');
    const { playHaptic } = useHaptics();

    const handleBump = () => {
        setStatus('bumping');
        playHaptic(HapticPattern.Pulse);
        setTimeout(() => {
            setStatus('success');
            playHaptic(HapticPattern.Success);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Live Bump</h1>
            <p className="text-gray-300 mb-8 max-w-sm">
                Hold your phones near each other to instantly exchange contact cards.
                This is a simulation of the native mobile experience.
            </p>

            <div className="relative w-64 h-80 flex items-center justify-center">
                <motion.div
                    animate={status === 'bumping' ? { x: -30 } : { x: -60 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <PhoneIcon className="w-40 h-80 text-bamboo-9" />
                </motion.div>
                <motion.div
                    animate={status === 'bumping' ? { x: 30 } : { x: 60 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <PhoneIcon className="w-40 h-80 text-bamboo-8" />
                </motion.div>

                {status === 'success' && (
                    <motion.div 
                        className="absolute"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <GlassCard className="p-6 flex flex-col items-center">
                            <CheckIcon className="w-12 h-12 text-bamboo-7" />
                            <p className="font-bold mt-2">Contact Exchanged!</p>
                        </GlassCard>
                    </motion.div>
                )}
            </div>

            <HapticButton
                onClick={handleBump}
                disabled={status !== 'idle'}
                className="mt-12 bg-bamboo-8 font-bold py-4 px-10 rounded-full shadow-lg shadow-bamboo-8/30"
            >
                {status === 'idle' ? 'Simulate Bump' : 'Connecting...'}
            </HapticButton>
        </div>
    );
};

export default NFCBumpScreen;
