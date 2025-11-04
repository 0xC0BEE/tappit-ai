import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { Tab } from '../types.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import { HomeIcon, CardIcon, NetworkIcon, AIIcon, TeamIcon } from './icons.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import HapticButton from './HapticButton.tsx';

interface BottomNavBarProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

const navItems = [
    { tab: Tab.Home, icon: HomeIcon },
    { tab: Tab.Cards, icon: CardIcon },
    { tab: Tab.Network, icon: NetworkIcon },
    { tab: Tab.AI, icon: AIIcon },
    { tab: Tab.Team, icon: TeamIcon },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-full p-4 flex-shrink-0">
            <div className="mx-auto w-full max-w-md bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-black/30">
                <div className="flex justify-around items-center p-2">
                    {navItems.map(({ tab, icon: Icon }) => {
                        const isActive = activeTab === tab;
                        return (
                            <HapticButton
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${isActive ? 'text-bamboo-8' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Icon className={`w-7 h-7 transition-all duration-300 ${isActive ? 'text-glow' : ''}`} />
                                <span className={`text-xs mt-1 font-medium transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>{tab}</span>
                            </HapticButton>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BottomNavBar;