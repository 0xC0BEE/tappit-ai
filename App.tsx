import React, { useState, useEffect } from 'react';
import { Tab } from './types.ts';
import { useTheme } from './hooks/useTheme.ts';

// Components
import BambooBackground from './components/BambooBackground.tsx';
import BottomNavBar from './components/BottomNavBar.tsx';
import ShakeToReportButton from './components/feedback/ShakeToReportButton.tsx';
import FeedbackModal from './components/feedback/FeedbackModal.tsx';

// Screens
import OnboardingScreen from './screens/OnboardingScreen.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import CardBuilderScreen from './screens/CardBuilderScreen.tsx';
import NetworkScreen from './screens/NetworkScreen.tsx';
import TeamScreen from './screens/TeamScreen.tsx';
import AnalyticsScreen from './screens/AnalyticsScreen.tsx';

const App: React.FC = () => {
    useTheme();
    const [isOnboarding, setIsOnboarding] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

    const handleOnboardingComplete = () => {
        localStorage.setItem('hasOnboarded', 'true'); // Persist onboarding status
        setIsOnboarding(false);
    };

    // Check if user has already onboarded
    useEffect(() => {
        if (localStorage.getItem('hasOnboarded') === 'true') {
            setIsOnboarding(false);
        }
    }, []);

    const renderActiveScreen = () => {
        switch (activeTab) {
            case Tab.Home:
                return <HomeScreen />;
            case Tab.Cards:
                return <CardBuilderScreen />;
            case Tab.Network:
                return <NetworkScreen onOpenFeedback={() => setFeedbackModalOpen(true)} />;
            case Tab.Team:
                return <TeamScreen />;
            case Tab.AI:
                return <AnalyticsScreen />; // Fix: Was PlaceholderScreen
            default:
                return <HomeScreen />;
        }
    };

    return (
        <ShakeToReportButton>
            <div className="bg-bamboo-12 text-white font-sans min-h-screen">
                <BambooBackground />
                <main className="relative z-10 h-screen p-8">
                    {isOnboarding ? (
                        <OnboardingScreen onComplete={handleOnboardingComplete} />
                    ) : (
                        renderActiveScreen()
                    )}
                </main>
                {!isOnboarding && (
                    <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
                )}
                <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
            </div>
        </ShakeToReportButton>
    );
};

export default App;