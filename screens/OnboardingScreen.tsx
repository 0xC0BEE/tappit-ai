import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import GlassCard from '../components/GlassCard.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import LottiePlayer from '../components/LottiePlayer.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import HapticButton from '../components/HapticButton.tsx';

interface OnboardingScreenProps {
    onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full animate-fadeIn text-center">
            <LottiePlayer 
                src="https://assets3.lottiefiles.com/packages/lf20_v8g0w5rs.json"
                className="w-64 h-64"
            />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7 mt-4">
                Welcome to Tappit AI
            </h1>
            <p className="text-gray-300 text-xl mt-4 max-w-md">
                The future of networking is here. Smart, sustainable, seamless.
            </p>
            <HapticButton 
                onClick={onComplete}
                className="mt-12 bg-bamboo-8 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors text-lg"
            >
                Get Started
            </HapticButton>
        </div>
    );
};

export default OnboardingScreen;
