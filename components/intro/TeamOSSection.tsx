import * as React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.ts';
import FeatureItem from './FeatureItem.tsx';
import { UsersIcon, LeafIcon, BriefcaseIcon } from '../icons.tsx';
import GlassCard from '../GlassCard.tsx';

const TeamOSSection: React.FC = () => {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });
    const getAnimationClass = (delay: string) => `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;

    return (
        <section ref={ref} id="teams" className="py-20 lg:py-32 bg-bamboo-11">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Visual */}
                     <div className={`relative h-96 lg:h-[32rem] ${getAnimationClass('delay-500')}`}>
                        <GlassCard className="absolute top-1/4 left-0 w-80 p-4 animate-float">
                             <h3 className="text-base font-bold text-white">Team Performance</h3>
                             <p className="text-sm text-gray-300">Lead Score <span className="text-green-400">+12%</span></p>
                            <div className="mt-2 w-full h-2 bg-white/10 rounded-full"><div className="w-3/4 bg-bamboo-8 h-2 rounded-full"></div></div>
                        </GlassCard>
                         <GlassCard className="absolute top-1/2 right-0 w-64 p-4 animate-float animation-delay-300">
                             <h3 className="text-sm font-semibold text-white">Top Performer</h3>
                             <p className="text-xs text-gray-300">Michael Scott</p>
                             <p className="text-xs text-gray-400">45 new connections</p>
                        </GlassCard>
                         <GlassCard className="absolute bottom-10 left-10 w-60 p-3 animate-float animation-delay-500">
                             <h3 className="text-sm font-semibold text-white">Collective Impact</h3>
                             <div className="flex items-center space-x-2 mt-1">
                                <LeafIcon className="w-5 h-5 text-bamboo-7"/>
                                <p className="text-xs text-gray-300">10.8g of CO₂ saved</p>
                             </div>
                        </GlassCard>
                        <div className="absolute inset-8 bg-gradient-to-br from-bamboo-8 to-bamboo-10 rounded-full blur-3xl opacity-50"></div>
                    </div>

                    {/* Right Column: Features */}
                    <div className="space-y-8">
                        <div className={getAnimationClass('')}>
                             <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7 leading-tight">
                                An OS for Your Entire Team.
                            </h2>
                            <p className="text-gray-300 text-lg mt-4">
                                Unify your team's networking efforts with a single platform. Manage branding, track performance, and close deals as one cohesive unit.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <FeatureItem
                                icon={BriefcaseIcon}
                                title="Centralized Brand Kit"
                                text="Ensure brand consistency across all team members' cards with a central logo, color, and font manager."
                                isVisible={isVisible}
                                delay="delay-200"
                            />
                            <FeatureItem
                                icon={UsersIcon}
                                title="Team Analytics"
                                text="Get a bird's-eye view of your team's networking performance and identify your top connectors."
                                isVisible={isVisible}
                                delay="delay-300"
                            />
                            <FeatureItem
                                icon={LeafIcon}
                                title="Collective Impact"
                                text="Track your team's combined environmental impact and celebrate your sustainability milestones together."
                                isVisible={isVisible}
                                delay="delay-400"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamOSSection;