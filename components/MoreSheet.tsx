import * as React from 'react';
import HapticButton from './HapticButton.tsx';
import { SettingsIcon, UserIcon, CalendarIcon, GiftIcon } from './icons.tsx';
import { Screen } from '../types.ts';

interface MoreSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (screen: Screen) => void;
}

// FIX: Update MoreSheet to align with the new 5-tab mobile navigation strategy.
// It now only contains core utility and profile-related screens. Analytics and Shop
// are now accessed from the Home screen to reduce clutter.
const moreSheetItems: { id: Screen; icon: React.ElementType; label: string; }[] = [
    { id: 'Settings', icon: SettingsIcon, label: 'Settings' },
    { id: 'Profile', icon: UserIcon, label: 'Profile' },
    { id: 'Calendly Roulette', icon: CalendarIcon, label: 'Calendly' },
    { id: 'Referral Giveaway', icon: GiftIcon, label: 'Referral' },
];

const MoreSheet: React.FC<MoreSheetProps> = ({ isOpen, onClose, onNavigate }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 flex items-end"
            onClick={onClose}
        >
            <div
                className="w-full bg-bamboo-12 border-t border-white/10 rounded-t-2xl p-4 animate-slideInUp"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-6"></div>
                <div className="grid grid-cols-4 gap-4 text-center">
                    {moreSheetItems.map(item => (
                        <MoreSheetItem 
                            key={item.id}
                            icon={item.icon} 
                            label={item.label}
                            onClick={() => onNavigate(item.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const MoreSheetItem: React.FC<{ icon: React.ElementType; label: string; onClick: () => void; }> = ({ icon: Icon, label, onClick }) => (
    <HapticButton 
        onClick={onClick}
        className="flex flex-col items-center justify-center space-y-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10"
    >
        <Icon className="w-8 h-8 text-bamboo-7" />
        <span className="text-sm font-semibold text-white">{label}</span>
    </HapticButton>
);


export default MoreSheet;
