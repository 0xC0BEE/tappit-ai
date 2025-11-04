import React, { useState } from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { Contact } from '../types.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import GlassCard from './GlassCard.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import MemoryLaneTimeline from './MemoryLaneTimeline.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import HapticButton from './HapticButton.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { ChevronDownIcon, PlusIcon } from './icons.tsx';

interface ContactCardProps {
    contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <GlassCard className="p-4 transition-all duration-300">
            <div className="flex items-center space-x-4">
                <img src={contact.photoUrl} alt={contact.name} className="w-16 h-16 rounded-full border-2 border-bamboo-8/50" />
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                    <p className="text-gray-300">{contact.title} at {contact.company}</p>
                    <p className="text-sm text-gray-400">Last interaction: {contact.lastInteraction}</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-bamboo-7">{contact.leadScore}</div>
                    <div className="text-xs text-gray-400">Lead Score</div>
                </div>
                <HapticButton onClick={() => setIsExpanded(!isExpanded)} className="p-2">
                     <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </HapticButton>
            </div>
            
            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-white">Memory Lane</h4>
                        <HapticButton className="flex items-center space-x-1 text-bamboo-8 font-semibold text-sm">
                            <PlusIcon className="w-4 h-4" />
                            <span>Add</span>
                        </HapticButton>
                    </div>
                    <MemoryLaneTimeline interactions={contact.interactions} />
                </div>
            )}
        </GlassCard>
    );
};

export default ContactCard;