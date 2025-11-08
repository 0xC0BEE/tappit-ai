import * as React from 'react';
import HapticButton from '../HapticButton.tsx';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.ts';
import GlassCard from '../GlassCard.tsx';
import { PlayIcon } from '../icons.tsx';

interface HeroSectionProps {
    onSignUp: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSignUp }) => {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.5 });
    
    const getAnimationClass = (delay: string) => {
        return `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'} ${delay}`;
    }

    return (
        <section ref={ref} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-bamboo-12">
                <div className="absolute inset-0 bg-gradient-to-br from-bamboo-12/80 via-bamboo-11 to-bamboo-12"></div>
            </div>
            <div className="container mx-auto px-4 lg:px-8 text-center">
                <h1 className={`text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7 max-w-4xl mx-auto leading-tight ${getAnimationClass('')}`}>
                    The Smart Business Card That Thinks.
                </h1>
                <p className={`text-gray-300 text-lg lg:text-xl mt-6 max-w-2xl mx-auto ${getAnimationClass('delay-200')}`}>
                    Stop collecting cards. Start building relationships. Tappit AI remembers every interaction, preps you for meetings, and helps you close deals faster.
                </p>
                <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 ${getAnimationClass('delay-300')}`}>
                    <HapticButton 
                        onClick={onSignUp}
                        className="w-full sm:w-auto bg-bamboo-8 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors text-lg"
                    >
                        Get Started for Free
                    </HapticButton>
                    <HapticButton className="w-full sm:w-auto flex items-center justify-center space-x-2 text-white font-semibold">
                        <PlayIcon className="w-6 h-6"/>
                        <span>Watch Demo</span>
                    </HapticButton>
                </div>
                <div className={`mt-16 lg:mt-24 ${getAnimationClass('delay-500')}`}>
                    <GlassCard className="max-w-4xl mx-auto p-4">
                        <div className="w-full aspect-video rounded-lg bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop')" }}>
                            {/* Placeholder for a product video or image */}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
