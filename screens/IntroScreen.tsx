// Fix: Remove redundant triple-slash directive for React types.
import * as React from 'react';
import IntroHeader from '../components/intro/IntroHeader.tsx';
import HeroSection from '../components/intro/HeroSection.tsx';
import TheTapSection from '../components/intro/TheTapSection.tsx';
import AIStudioSection from '../components/intro/AIStudioSection.tsx';
import TeamOSSection from '../components/intro/TeamOSSection.tsx';
import PricingSection from '../components/intro/PricingSection.tsx';
import IntroFooter from '../components/intro/IntroFooter.tsx';
import LoginModal from '../components/modals/LoginModal.tsx';
import SignUpModal from '../components/modals/SignUpModal.tsx';

const IntroScreen: React.FC = () => {
    const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = React.useState(false);

    return (
        <div className="bg-bamboo-12 text-white font-sans">
            <IntroHeader 
                onLogin={() => setLoginModalOpen(true)} 
                onSignUp={() => setSignUpModalOpen(true)}
            />
            <main>
                <HeroSection onSignUp={() => setSignUpModalOpen(true)} />
                <TheTapSection />
                <AIStudioSection />
                <TeamOSSection />
                <PricingSection onSignUp={() => setSignUpModalOpen(true)} />
            </main>
            <IntroFooter />

            <LoginModal 
                isOpen={isLoginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            />
            <SignUpModal
                isOpen={isSignUpModalOpen}
                onClose={() => setSignUpModalOpen(false)}
            />
        </div>
    );
};

export default IntroScreen;