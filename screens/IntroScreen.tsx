import React, { useState } from 'react';
import IntroHeader from '../components/intro/IntroHeader.tsx';
import HeroSection from '../components/intro/HeroSection.tsx';
import FeaturesSection from '../components/intro/FeaturesSection.tsx';
import IntroFooter from '../components/intro/IntroFooter.tsx';
import LoginModal from '../components/modals/LoginModal.tsx';
import SignUpModal from '../components/modals/SignUpModal.tsx';

const IntroScreen: React.FC = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

    return (
        <>
            <div className="w-full h-full flex-grow flex flex-col animate-fadeIn overflow-y-auto">
                <IntroHeader onLoginClick={() => setLoginModalOpen(true)} />
                <main className="flex-grow">
                    <HeroSection onSignUpClick={() => setSignUpModalOpen(true)} />
                    <FeaturesSection />
                </main>
                <IntroFooter />
            </div>
            <LoginModal 
                isOpen={isLoginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            />
            <SignUpModal 
                isOpen={isSignUpModalOpen}
                onClose={() => setSignUpModalOpen(false)}
            />
        </>
    );
};

export default IntroScreen;