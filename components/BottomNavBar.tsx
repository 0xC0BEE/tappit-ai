import * as React from 'react';
import { HomeIcon, CardIcon, NetworkIcon, UsersIcon, MoreIcon } from './icons.tsx';
import HapticButton from './HapticButton.tsx';
import { NavItem } from '../types.ts';

interface BottomNavBarProps {
    activeTab: NavItem;
    setActiveTab: (tab: NavItem) => void;
}

const navItems: { id: NavItem; icon: React.ElementType; label: string; }[] = [
    { id: 'Home', icon: HomeIcon, label: 'Home' },
    { id: 'Cards', icon: CardIcon, label: 'Cards' },
    { id: 'Network', icon: NetworkIcon, label: 'Network' },
    { id: 'Team', icon: UsersIcon, label: 'Team' },
    { id: 'More', icon: MoreIcon, label: 'More' },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-bamboo-12/80 backdrop-blur-xl border-t border-white/10 z-30">
            <div className="flex justify-around items-center h-20">
                {navItems.map(({ id, icon: Icon, label }) => (
                    <HapticButton 
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className="flex flex-col items-center justify-center space-y-1 w-1/5"
                    >
                        <Icon className={`w-7 h-7 transition-colors ${activeTab === id ? 'text-bamboo-8' : 'text-gray-400'}`} />
                        <span className={`text-xs font-medium transition-colors ${activeTab === id ? 'text-white' : 'text-gray-400'}`}>
                            {label}
                        </span>
                    </HapticButton>
                ))}
            </div>
        </nav>
    );
};

export default BottomNavBar;