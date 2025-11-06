import React from 'react';
import GlassCard from '../GlassCard.tsx';
import { WandIcon, TeamIcon, LeafIcon } from '../icons.tsx';

const FeatureCard: React.FC<{ icon: React.FC<{className?: string}>, title: string, description: string }> = ({ icon: Icon, title, description }) => (
    <GlassCard className="p-6 text-center h-full">
        <div className="w-16 h-16 mx-auto rounded-full bg-bamboo-10 flex items-center justify-center text-white border-2 border-bamboo-9 mb-4">
            <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </GlassCard>
);

const FeaturesSection: React.FC = () => {
    return (
        <section className="py-20 px-4">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-bold text-white">The Last Business Card You'll Ever Need</h2>
                <p className="text-gray-300 text-lg mt-4">
                    Tappit AI is more than a digital card. It's your personal networking assistant, your team's growth engine, and a commitment to a greener planet.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
                <FeatureCard 
                    icon={WandIcon} 
                    title="AI Studio" 
                    description="Supercharge your card with AI Gems. Generate icebreakers, get follow-up suggestions, and let AI polish your profile."
                />
                <FeatureCard 
                    icon={TeamIcon} 
                    title="Team Collaboration" 
                    description="Manage your team's branding, track performance with AI insights, and see live activity in a shared workspace."
                />
                <FeatureCard 
                    icon={LeafIcon} 
                    title="Green Streak" 
                    description="Make a real-world impact. Maintain a connection streak and we'll plant a tree on your behalf."
                />
            </div>
        </section>
    );
};

export default FeaturesSection;
