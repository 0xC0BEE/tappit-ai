import * as React from 'react';
import HapticButton from '../HapticButton.tsx';

interface IntroHeaderProps {
    onLogin: () => void;
    onSignUp: () => void;
}

const IntroHeader: React.FC<IntroHeaderProps> = ({ onLogin, onSignUp }) => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-bamboo-12/50 backdrop-blur-lg">
            <div className="container mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    Tappit AI
                </div>
                <nav className="hidden md:flex items-center space-x-6 text-gray-300">
                    <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="hover:text-white transition-colors">Features</a>
                    <a href="#teams" onClick={(e) => handleScroll(e, 'teams')} className="hover:text-white transition-colors">Teams</a>
                    <a href="#pricing" onClick={(e) => handleScroll(e, 'pricing')} className="hover:text-white transition-colors">Pricing</a>
                </nav>
                <div className="flex items-center space-x-4">
                    <HapticButton onClick={onLogin} className="text-gray-300 hover:text-white font-semibold transition-colors">
                        Log In
                    </HapticButton>
                    <HapticButton 
                        onClick={onSignUp}
                        className="bg-bamboo-8 text-white font-bold py-2 px-5 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors"
                    >
                        Sign Up
                    </HapticButton>
                </div>
            </div>
        </header>
    );
};

export default IntroHeader;