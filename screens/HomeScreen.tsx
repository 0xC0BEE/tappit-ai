
import React, { useState } from 'react';
import GreenStreakTracker from '../components/delight/GreenStreakTracker.tsx';
import LockScreenWidgetSimulation from '../components/delight/LockScreenWidgetSimulation.tsx';
import ReferralCard from '../components/delight/ReferralCard.tsx';
import PlantTreeCertificate from '../components/delight/PlantTreeCertificate.tsx';
import GlassCard from '../components/GlassCard.tsx';
import HapticButton from '../components/HapticButton.tsx';
import { QRIcon, CardIcon, WandIcon } from '../components/icons.tsx';
import CameraScanModal from '../components/modals/CameraScanModal.tsx';
import MyQRModal from '../components/modals/MyQRModal.tsx';

// New Quick Actions Card Component
const QuickActionsCard: React.FC<{
    onScan: () => void;
    onMyQR: () => void;
    onAINudge: () => void;
}> = ({ onScan, onMyQR, onAINudge }) => {
    return (
        <GlassCard className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
                <HapticButton
                    onClick={onScan}
                    className="w-full flex items-center space-x-3 text-left p-4 bg-white/5 rounded-lg hover:bg-white/10"
                >
                    <QRIcon className="w-7 h-7 text-bamboo-7" />
                    <div>
                        <p className="font-bold text-white">Scan</p>
                        <p className="text-sm text-gray-400">Scan another Tappit card</p>
                    </div>
                </HapticButton>
                <HapticButton
                    onClick={onMyQR}
                    className="w-full flex items-center space-x-3 text-left p-4 bg-white/5 rounded-lg hover:bg-white/10"
                >
                    <CardIcon className="w-7 h-7 text-bamboo-7" />
                    <div>
                        <p className="font-bold text-white">My QR Code</p>
                        <p className="text-sm text-gray-400">Share your card instantly</p>
                    </div>
                </HapticButton>
                <HapticButton
                    onClick={onAINudge}
                    className="w-full flex items-center space-x-3 text-left p-4 bg-white/5 rounded-lg hover:bg-white/10"
                >
                    <WandIcon className="w-7 h-7 text-bamboo-7" />
                    <div>
                        <p className="font-bold text-white">AI Nudge</p>
                        <p className="text-sm text-gray-400">Get a smart follow-up idea</p>
                    </div>
                </HapticButton>
            </div>
        </GlassCard>
    );
};


const HomeScreen: React.FC = () => {
    const [streak, setStreak] = useState(3);
    const [isCertificateOpen, setCertificateOpen] = useState(false);
    const [isCameraScanModalOpen, setCameraScanModalOpen] = useState(false);
    const [isMyQRModalOpen, setIsMyQRModalOpen] = useState(false);

    const handleStreakComplete = () => {
        setStreak(0); // Reset streak
        setCertificateOpen(true); // Show certificate
    };

    return (
        <>
            <div className="animate-scaleIn h-full flex flex-col gap-8">
                <header>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                        Welcome Back
                    </h1>
                    <p className="text-gray-300 text-lg mt-2">Here's what's new for you.</p>
                </header>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow overflow-y-auto pr-2 pb-24">
                    <div className="space-y-8">
                        <GreenStreakTracker 
                            streak={streak} 
                            setStreak={setStreak} 
                            onStreakComplete={handleStreakComplete} 
                        />
                        <ReferralCard />
                    </div>
                    <div className="space-y-8">
                        <LockScreenWidgetSimulation />
                        <QuickActionsCard 
                            onScan={() => setCameraScanModalOpen(true)}
                            onMyQR={() => setIsMyQRModalOpen(true)}
                            onAINudge={() => alert('AI Nudge feature coming soon!')}
                        />
                    </div>
                </div>
            </div>
            <PlantTreeCertificate 
                isOpen={isCertificateOpen}
                onClose={() => setCertificateOpen(false)}
            />
            <CameraScanModal
                isOpen={isCameraScanModalOpen}
                onClose={() => setCameraScanModalOpen(false)}
            />
            <MyQRModal
                isOpen={isMyQRModalOpen}
                onClose={() => setIsMyQRModalOpen(false)}
            />
        </>
    );
};

export default HomeScreen;