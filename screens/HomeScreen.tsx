// Fix: Remove redundant triple-slash directive for React types.
import * as React from 'react';
import { supabase } from '../services/supabase.ts';
import HapticButton from '../components/HapticButton.tsx';
import { CameraIcon, QrCodeIcon } from '../components/icons.tsx';
import GreenStreakTracker from '../components/delight/GreenStreakTracker.tsx';
import PlantTreeCertificate from '../components/delight/PlantTreeCertificate.tsx';
import LockScreenWidgetSimulation from '../components/delight/LockScreenWidgetSimulation.tsx';
import MyQRModal from '../components/modals/MyQRModal.tsx';
import CameraScanModal from '../components/modals/CameraScanModal.tsx';
import WeeklyInsightsCard from '../components/delight/WeeklyInsightsCard.tsx';
import GiveawayCard from '../components/giveaway/GiveawayCard.tsx';

const HomeScreen: React.FC = () => {
    const [streak, setStreak] = React.useState(3);
    const [isCertificateOpen, setCertificateOpen] = React.useState(false);
    const [isMyQRModalOpen, setMyQRModalOpen] = React.useState(false);
    const [isCameraScanModalOpen, setCameraScanModalOpen] = React.useState(false);
    const [userName, setUserName] = React.useState('Alex');

    React.useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.email) {
                const namePart = session.user.email.split('@')[0];
                const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
                setUserName(capitalizedName);
            }
        };
        fetchUser();
    }, []);

    const handleStreakComplete = () => {
        setCertificateOpen(true);
        setStreak(0); // Reset streak
    };

    return (
        <>
            <div className="animate-scaleIn h-full flex flex-col">
                <header className="pb-8">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                        Welcome Back, {userName}
                    </h1>
                    <p className="text-gray-300 text-lg mt-2">Ready to make new connections?</p>
                </header>

                <div className="flex-grow pr-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <HapticButton 
                            onClick={() => setCameraScanModalOpen(true)}
                            className="w-full h-24 bg-bamboo-8 rounded-2xl flex items-center justify-center space-x-3 text-white font-bold text-lg shadow-lg shadow-bamboo-8/30"
                        >
                            <CameraIcon className="w-8 h-8" />
                            <span>Scan Card</span>
                        </HapticButton>
                        <HapticButton 
                            onClick={() => setMyQRModalOpen(true)}
                            className="w-full h-24 bg-white/10 rounded-2xl flex items-center justify-center space-x-3 text-white font-bold text-lg"
                        >
                            <QrCodeIcon className="w-8 h-8" />
                            <span>My QR Code</span>
                        </HapticButton>
                    </div>

                    <GreenStreakTracker 
                        streak={streak} 
                        setStreak={setStreak}
                        onStreakComplete={handleStreakComplete}
                    />

                    <WeeklyInsightsCard />
                    <GiveawayCard />
                    <LockScreenWidgetSimulation />
                </div>
            </div>

            <PlantTreeCertificate isOpen={isCertificateOpen} onClose={() => setCertificateOpen(false)} />
            <MyQRModal isOpen={isMyQRModalOpen} onClose={() => setMyQRModalOpen(false)} />
            <CameraScanModal isOpen={isCameraScanModalOpen} onClose={() => setCameraScanModalOpen(false)} />
        </>
    );
};

export default HomeScreen;