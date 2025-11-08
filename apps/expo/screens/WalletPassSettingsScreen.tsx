import * as React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../components/GlassCard.tsx';
import HapticButton from '../../../components/HapticButton.tsx';

const WalletPassSettingsScreen: React.FC = () => {
    const [title, setTitle] = React.useState('Senior Strategic Advisor');
    const [status, setStatus] = React.useState<'idle' | 'updating' | 'success'>('idle');

    const handleUpdate = () => {
        setStatus('updating');
        setTimeout(() => {
            setTitle('Chief Visionary Officer');
            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000);
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center h-full text-white p-4">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold">Live Wallet Pass</h1>
                <p className="text-gray-300 mt-2 max-w-md">
                    Update your details here, and they'll instantly sync to your Apple or Google Wallet pass.
                </p>
            </header>

            <div className="mb-8 w-full max-w-sm">
                {/* Simulated Wallet Pass */}
                <GlassCard className="p-6">
                    <p className="text-xs text-gray-400">Tappit AI</p>
                    <p className="text-2xl font-bold">Alex Bamboo</p>
                    <motion.p key={title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-300">
                        {title}
                    </motion.p>
                </GlassCard>
            </div>
            
            <GlassCard className="p-6 w-full max-w-sm">
                 <h3 className="font-bold mb-2">Simulate Promotion</h3>
                 <p className="text-sm text-gray-400 mb-4">Click below to simulate getting a new title and pushing the update to your wallet pass.</p>
                 <HapticButton 
                    onClick={handleUpdate} 
                    disabled={status !== 'idle'}
                    className="w-full bg-bamboo-8 font-bold py-3 rounded-full"
                >
                    {status === 'idle' && 'Get Promoted'}
                    {status === 'updating' && 'Pushing update...'}
                    {status === 'success' && 'Updated!'}
                 </HapticButton>
            </GlassCard>
        </div>
    );
};

export default WalletPassSettingsScreen;
