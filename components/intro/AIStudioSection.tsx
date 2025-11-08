import * as React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.ts';
import HapticButton from '../HapticButton.tsx';
import { WandIcon } from '../icons.tsx';

const AIStudioSection: React.FC = () => {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

    const getAnimationClass = (delay: string) => {
        return `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;
    };

    return (
        <section ref={ref} className="py-20 lg:py-32">
            <div className="container mx-auto px-4 lg:px-8 text-center">
                <div className={getAnimationClass('')}>
                    <WandIcon className="w-12 h-12 mx-auto text-bamboo-7" />
                    <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7 mt-4">
                        AI Studio
                    </h2>
                    <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
                        Your card is a living document. Use our AI Studio to add dynamic, intelligent "Gems" that update automatically and engage your audience.
                    </p>
                </div>

                <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 ${getAnimationClass('delay-200')}`}>
                    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
                        <h3 className="font-bold text-white">Meeting Prep Gem</h3>
                        <p className="text-sm text-gray-400 mt-1">Get AI-generated talking points before your next meeting.</p>
                    </div>
                    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
                        <h3 className="font-bold text-white">Smart Tags Gem</h3>
                        <p className="text-sm text-gray-400 mt-1">Let AI analyze your title and suggest relevant skill tags.</p>
                    </div>
                     <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
                        <h3 className="font-bold text-white">Create Your Own Gem</h3>
                        <p className="text-sm text-gray-400 mt-1">Describe a component, and our AI will build it for you.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIStudioSection;
