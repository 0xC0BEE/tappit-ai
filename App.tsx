import React, { useState, useCallback } from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { Tab } from './types.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import BambooBackground from './components/BambooBackground.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import BottomNavBar from './components/BottomNavBar.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import OnboardingScreen from './screens/OnboardingScreen.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import HomeScreen from './screens/HomeScreen.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import CardBuilderScreen from './screens/CardBuilderScreen.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import NetworkScreen from './screens/NetworkScreen.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import TeamScreen from './screens/TeamScreen.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import PlaceholderScreen from './screens/PlaceholderScreen.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import PlantTreeCertificate from './components/delight/PlantTreeCertificate.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { useTheme } from './hooks/useTheme.ts';

const App: React.FC = () => {
    useTheme();
    const [isOnboarding, setIsOnboarding] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
    const [greenStreak, setGreenStreak] = useState(3);
    const [isCertificateOpen, setIsCertificateOpen] = useState(false);

    const handleOnboardingComplete = () => {
        setIsOnboarding(false);
    };

    const handleStreakComplete = useCallback(() => {
        setGreenStreak(0);
        setIsCertificateOpen(true);
    }, []);

    const renderContent = () => {
        if (isOnboarding) {
            return <OnboardingScreen onComplete={handleOnboardingComplete} />;
        }
        
        switch (activeTab) {
            case Tab.Home:
                return <HomeScreen 
                    greenStreak={greenStreak} 
                    setGreenStreak={setGreenStreak}
                    onStreakComplete={handleStreakComplete} 
                />;
            case Tab.Cards:
                return <CardBuilderScreen />;
            case Tab.Network:
                return <NetworkScreen />;
            case Tab.AI:
                 return <PlaceholderScreen title="AI Insights" />;
            case Tab.Team:
                return <TeamScreen />;
            default:
                return <HomeScreen 
                    greenStreak={greenStreak} 
                    setGreenStreak={setGreenStreak} 
                    onStreakComplete={handleStreakComplete}
                />;
        }
    };

    return (
        <main className="h-screen w-screen bg-bamboo-12 text-white font-sans overflow-hidden flex flex-col">
            <BambooBackground />
            <div className="flex-grow p-6 lg:p-8 overflow-y-auto">
                {renderContent()}
            </div>
            {!isOnboarding && (
                <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
            <PlantTreeCertificate 
                isOpen={isCertificateOpen} 
                onClose={() => setIsCertificateOpen(false)}
            />
        </main>
    );
};

export default App;
