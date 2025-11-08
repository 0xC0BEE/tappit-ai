
// Fix: Remove redundant triple-slash directive for React types.
import * as React from 'react';
import { Tab } from '../types.ts';
import HapticButton from './HapticButton.tsx';
import { HomeIcon, CardIcon, NetworkIcon, ShoppingCartIcon, TeamIcon } from './icons.tsx';
import { springTransition } from '../utils/spring.ts';

interface BottomNavBarProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

const navItems = [
    { tab: Tab.Home, Icon: HomeIcon },
    { tab: Tab.Cards, Icon: CardIcon },
    { tab: Tab.Network, Icon: NetworkIcon },
    { tab: Tab.Shop, Icon: ShoppingCartIcon },
    { tab: Tab.Team, Icon: TeamIcon },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="h-20 bg-bamboo-12/50 backdrop-blur-lg border-t border-white/10 z-40 flex justify-around items-center flex-shrink-0">
            {navItems.map(({ tab, Icon }) => {
                const isActive = activeTab === tab;
                return (
                    <HapticButton 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className="relative flex flex-col items-center justify-center w-16 h-16 text-gray-400"
                    >
                        <Icon className={`w-7 h-7 transition-colors ${isActive ? 'text-bamboo-7' : ''}`} />
                        <span className={`text-xs mt-1 transition-opacity ${isActive ? 'opacity-100 text-white' : 'opacity-0'}`}>
                            {tab}
                        </span>
                        {isActive && (
                            <div 
                                style={{ ...springTransition, transform: 'translateY(4px) scale(1)' }}
                                className="absolute -bottom-1 w-8 h-1 bg-bamboo-8 rounded-full"
                            ></div>
                        )}
                    </HapticButton>
                );
            })}
        </nav>
    );
};

export default BottomNavBar;