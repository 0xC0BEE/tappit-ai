// Fix: Change to namespace import to ensure JSX types are available globally.
import * as React from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon, ZapIcon, UsersIcon, LeafIcon } from '../icons.tsx';

const WeeklyInsightsModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-lg mx-auto relative p-8 text-white space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Your Weekly Report</h2>
                <p className="text-gray-300">
                    Here's how your networking performed last week, powered by AI.
                </p>

                <div className="space-y-4 text-left pt-4">
                    <InsightItem 
                        icon={ZapIcon} 
                        text="You had a 20% increase in card taps, with a peak on Thursday afternoon. Consider scheduling follow-ups then." 
                    />
                    <InsightItem 
                        icon={UsersIcon}
                        text="Your top new connection is Jane Doe from Innovate Inc. Her company just secured new funding. A great time to reach out!"
                    />
                    <InsightItem 
                        icon={LeafIcon}
                        text="By using your digital card, you saved an estimated 0.5g of CO₂ last week. Keep up the green work!"
                    />
                </div>
                
                 <HapticButton 
                    onClick={onClose}
                    className="w-full mt-4 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg"
                >
                    Got It
                </HapticButton>
            </GlassCard>
        </Modal>
    );
};

interface InsightItemProps {
    icon: React.ElementType;
    text: string;
}

const InsightItem: React.FC<InsightItemProps> = ({ icon: Icon, text }) => (
    <div className="flex items-start space-x-3 bg-black/20 p-3 rounded-lg">
        <Icon className="w-5 h-5 text-bamboo-8 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">{text}</p>
    </div>
);

export default WeeklyInsightsModal;
