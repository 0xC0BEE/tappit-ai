import * as React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.ts';
import FeatureItem from './FeatureItem.tsx';
import { ZapIcon, NetworkIcon, TrendingUpIcon } from '../icons.tsx';
import GlassCard from '../GlassCard.tsx';

const TheTapSection: React.FC = () => {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

    const getAnimationClass = (delay: string) => {
        return `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;
    };

    return (
        <section ref={ref} id="features" className="py-20 lg:py-32 bg-bamboo-11">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Features */}
                    <div className="space-y-8">
                        <div className={getAnimationClass('')}>
                             <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7 leading-tight">
                                More Than Just a Tap.
                            </h2>
                            <p className="text-gray-300 text-lg mt-4">
                                Every interaction is a data point. Our AI turns simple taps into actionable insights, helping you build stronger relationships, faster.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <FeatureItem
                                icon={ZapIcon}
                                title="Instant Capture"
                                text="One tap is all it takes. Capture contact details, location, and context without lifting a finger."
                                isVisible={isVisible}
                                delay="delay-200"
                            />
                            <FeatureItem
                                icon={NetworkIcon}
                                title="Relationship AI"
                                text="Our AI analyzes your interactions, measures relationship health, and tells you who to talk to next."
                                isVisible={isVisible}
                                delay="delay-300"
                            />
                            <FeatureItem
                                icon={TrendingUpIcon}
                                title="Automated Follow-ups"
                                text="Generate personalized follow-up emails and set reminders so you never drop the ball."
                                isVisible={isVisible}
                                delay="delay-400"
                            />
                        </div>
                    </div>
                    {/* Right Column: Visual */}
                    <div className={`relative h-96 lg:h-[32rem] ${getAnimationClass('delay-500')}`}>
                        <GlassCard className="absolute top-0 left-0 w-64 p-4 animate-float">
                            <p className="text-sm font-semibold text-white">New Contact: Jane Doe</p>
                            <p className="text-xs text-gray-400">Innovate Inc.</p>
                            <div className="mt-2 w-full h-1.5 bg-green-500 rounded-full"></div>
                        </GlassCard>
                         <GlassCard className="absolute bottom-0 right-0 w-72 p-4 animate-float animation-delay-300">
                             <p className="text-sm font-semibold text-white">AI Suggestion</p>
                            <p className="text-xs text-gray-300">"Follow up with Jane about the Q3 funding. Her company was just in the news."</p>
                        </GlassCard>
                        <div className="absolute inset-8 bg-gradient-to-br from-bamboo-8 to-bamboo-10 rounded-full blur-3xl opacity-50"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TheTapSection;
