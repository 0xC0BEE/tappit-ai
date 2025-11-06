import React from 'react';
import HapticButton from '../HapticButton.tsx';

interface IntroHeaderProps {
    onLoginClick: () => void;
}

const IntroHeader: React.FC<IntroHeaderProps> = ({ onLoginClick }) => {
    return (
        <header className="absolute top-0 left-0 right-0 p-4 lg:p-8 z-30 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bamboo-7 to-bamboo-9"></div>
                <span className="text-2xl font-bamboo text-white">Tappit AI</span>
            </div>
            <HapticButton 
                onClick={onLoginClick}
                className="bg-white/10 text-white font-semibold py-2 px-4 rounded-full text-sm"
            >
                Log In
            </HapticButton>
        </header>
    );
};

export default IntroHeader;