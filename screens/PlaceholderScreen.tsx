
// Fix: Remove redundant triple-slash directive for React types.
import * as React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import GlassCard from '../components/GlassCard.tsx';

interface PlaceholderScreenProps {
    title: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title }) => {
    return (
        <div className="flex items-center justify-center h-full animate-scaleIn">
            <GlassCard className="p-10 text-center">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="text-gray-300 mt-2">This feature is coming soon!</p>
                <div className="mt-6 w-16 h-16 mx-auto bg-white/10 animate-morph rounded-full"></div>
            </GlassCard>
        </div>
    );
};

export default PlaceholderScreen;