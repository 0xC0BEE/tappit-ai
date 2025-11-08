
import * as React from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './services/supabase.ts';
import { useTheme } from './hooks/useTheme.ts';
import { NavItem, Screen } from './types.ts';

import BambooBackground from './components/BambooBackground.tsx';
import BottomNavBar from './components/BottomNavBar.tsx';
import MoreSheet from './components/MoreSheet.tsx';

// Screens
import IntroScreen from './screens/IntroScreen.tsx';
import OnboardingScreen from './screens/OnboardingScreen.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import CardBuilderScreen from './screens/CardBuilderScreen.tsx';
import NetworkScreen from './screens/NetworkScreen.tsx';
import TeamScreen from './screens/TeamScreen.tsx';
import PlaceholderScreen from './screens/PlaceholderScreen.tsx';
import PublicCardScreen from './screens/PublicCardScreen.tsx';
import AnalyticsScreen from './screens/AnalyticsScreen.tsx';
import ShopScreen from './screens/ShopScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';

// 10x Feature Screens
import CalendlyRouletteGem from './apps/expo/screens/CalendlyRouletteGem.tsx';
import ReferralGiveawayScreen from './apps/expo/screens/ReferralGiveawayScreen.tsx';


const App: React.FC = () => {
    useTheme();
    const [session, setSession] = React.useState<Session | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [showOnboarding, setShowOnboarding] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<NavItem>('Home');
    const [isMoreSheetOpen, setMoreSheetOpen] = React.useState(false);
    
    // This state will manage which "More" screen or special screen is active
    const [activeScreen, setActiveScreen] = React.useState<Screen>('Home');

    const [isPreviewMode, setIsPreviewMode] = React.useState(false);

    React.useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            
            // Check if it's the user's first time
            const hasOnboarded = localStorage.getItem('hasOnboarded');
            if (session && !hasOnboarded) {
                setShowOnboarding(true);
            } else {
                setShowOnboarding(false);
            }

            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleOnboardingComplete = () => {
        localStorage.setItem('hasOnboarded', 'true');
        setShowOnboarding(false);
    };

    const handleSetActiveTab = (tab: NavItem) => {
        if (tab === 'More') {
            setMoreSheetOpen(true);
        } else {
            setActiveTab(tab);
            setActiveScreen(tab); // Reset to the main tab's screen
        }
    };
    
    const handleNavigate = (screen: Screen) => {
        setActiveScreen(screen);
        setMoreSheetOpen(false);
        // If the navigated screen corresponds to a main tab, set that tab active
        if (['Home', 'Cards', 'Network', 'Team'].includes(screen)) {
            setActiveTab(screen as NavItem);
        } else {
            // Otherwise, keep the last active tab visually selected
        }
    };

    const renderContent = () => {
        if (loading) {
            return <div className="flex items-center justify-center h-full"><div className="w-16 h-16 bg-white/10 animate-morph rounded-full"></div></div>;
        }

        if (!session) {
            return <IntroScreen />;
        }
        
        if (showOnboarding) {
            return <OnboardingScreen onComplete={handleOnboardingComplete} />;
        }
        
        if (isPreviewMode) {
             return <PublicCardScreen onBack={() => setIsPreviewMode(false)} />;
        }

        let CurrentScreen: React.FC | null = null;
        switch (activeScreen) {
            case 'Home': CurrentScreen = HomeScreen; break;
            case 'Cards': CurrentScreen = () => <CardBuilderScreen onPreview={() => setIsPreviewMode(true)} />; break;
            case 'Network': CurrentScreen = NetworkScreen; break;
            case 'Team': CurrentScreen = TeamScreen; break;
            case 'Analytics': CurrentScreen = AnalyticsScreen; break;
            case 'Shop': CurrentScreen = ShopScreen; break;
            case 'Settings': CurrentScreen = SettingsScreen; break;
            case 'Profile': CurrentScreen = ProfileScreen; break;
            case 'Calendly Roulette': CurrentScreen = CalendlyRouletteGem; break;
            case 'Referral Giveaway': CurrentScreen = ReferralGiveawayScreen; break;
            default: CurrentScreen = () => <PlaceholderScreen title={activeScreen} />;
        }

        return (
             <div className="relative h-full w-full max-w-7xl mx-auto p-4 lg:p-8">
                <CurrentScreen />
            </div>
        );
    };

    const showAppShell = !loading && session && !showOnboarding && !isPreviewMode;

    return (
        <div className="bg-bamboo-12 text-white font-sans min-h-screen h-screen flex flex-col items-center justify-center overflow-hidden">
            <BambooBackground />
            <main className="relative z-10 h-full w-full overflow-y-auto pb-20">
                {renderContent()}
            </main>
            {showAppShell && (
                 <>
                    <BottomNavBar activeTab={activeTab} setActiveTab={handleSetActiveTab} />
                    <MoreSheet isOpen={isMoreSheetOpen} onClose={() => setMoreSheetOpen(false)} onNavigate={handleNavigate} />
                 </>
            )}
        </div>
    );
};

export default App;
