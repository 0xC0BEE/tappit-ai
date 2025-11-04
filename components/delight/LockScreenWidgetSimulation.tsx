import React, { useState } from 'react';
import GlassCard from '../GlassCard.tsx';
import AnimatedQR from '../AnimatedQR.tsx';
import HapticButton from '../HapticButton.tsx';
import { useHaptics, HapticPattern } from '../../hooks/useHaptics.ts';

const LockScreenWidgetSimulation: React.FC = () => {
    const [isNearby, setIsNearby] = useState(false);
    const { playHaptic } = useHaptics();

    const handleSimulateNearby = () => {
        setIsNearby(true);
        playHaptic(HapticPattern.Pulse);
        setTimeout(() => setIsNearby(false), 4000); // Pulse for 4 seconds
    };
    
    return (
        <GlassCard className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Live Widget</h2>
            <p className="text-gray-300 mb-4">Simulating your lock-screen widget.</p>
            
            <div className="flex justify-center my-6">
                <div className={`p-4 bg-white/10 rounded-3xl transition-all duration-300 ${isNearby ? 'animate-pulseGreen' : ''}`}>
                    <AnimatedQR value="https://tappit.ai/live-share" />
                </div>
            </div>

            <HapticButton 
                onClick={handleSimulateNearby}
                className="w-full bg-white/20 text-white font-semibold py-3 px-6 rounded-full hover:bg-white/30 transition-colors"
            >
                Simulate Nearby User
            </HapticButton>
        </GlassCard>
    );
};

export default LockScreenWidgetSimulation;
