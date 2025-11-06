import React, { useState, useEffect } from 'react';
import { Tab } from './types.ts';
import { useTheme } from './hooks/useTheme.ts';
import { supabase } from './services/supabase.ts';
import { Session } from '@supabase/supabase-js';

// Components
import BambooBackground from './components/BambooBackground.tsx';
import BottomNavBar from './components/BottomNavBar.tsx';
import ShakeToReportButton from './components/feedback/ShakeToReportButton.tsx';
import FeedbackModal from './components/feedback/FeedbackModal.tsx';

// Screens
import IntroScreen from './screens/IntroScreen.tsx';
import OnboardingScreen from './screens/OnboardingScreen.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import CardBuilderScreen from './screens/CardBuilderScreen.tsx';
import NetworkScreen from './screens/NetworkScreen.tsx';
import TeamScreen from './screens/TeamScreen.tsx';
import ShopScreen from './screens/ShopScreen.tsx';

const App: React.FC = () => {
    useTheme();
    const [session, setSession] = useState<Session | null>(null);
    const [isOnboarding, setIsOnboarding] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleOnboardingComplete = () => {
        localStorage.setItem('hasOnboarded', 'true');
        setIsOnboarding(false);
    };

    useEffect(() => {
        if (localStorage.getItem('hasOnboarded') === 'true') {
            setIsOnboarding(false);
        }
    }, [session]);

    const renderActiveScreen = () => {
        switch (activeTab) {
            case Tab.Home:
                return <HomeScreen />;
            case Tab.Cards:
                return <CardBuilderScreen />;
            case Tab.Network:
                return <NetworkScreen onOpenFeedback={() => setFeedbackModalOpen(false)} />;
            case Tab.Shop:
                return <ShopScreen />;
            case Tab.Team:
                return <TeamScreen />;
            default:
                return <HomeScreen />;
        }
    };
    
    return (
        <ShakeToReportButton>
            <main className="h-screen w-screen overflow-hidden bg-bamboo-12 text-white font-sans flex flex-col">
                <BambooBackground />

                {!session && <IntroScreen />}
                
                {session && (
                    <div className="flex-grow flex flex-col overflow-hidden animate-fadeIn">
                        {isOnboarding ? (
                            <OnboardingScreen onComplete={handleOnboardingComplete} />
                        ) : (
                            <>
                                <div className="flex-grow overflow-hidden relative p-4 lg:p-8 pt-0 lg:pt-0">
                                    {renderActiveScreen()}
                                </div>
                                <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
                            </>
                        )}
                    </div>
                )}
                
                <FeedbackModal 
                  isOpen={isFeedbackModalOpen} 
                  onClose={() => setFeedbackModalOpen(false)} 
                />
            </main>
        </ShakeToReportButton>
    );
};

export default App;