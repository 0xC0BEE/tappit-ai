import * as React from 'react';
import { Contact } from '../types.ts';
import HapticButton from './HapticButton.tsx';
import GlassCard from './GlassCard.tsx';

interface ContactCardProps {
    contact: Contact;
    onClick: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick }) => {
    return (
        <HapticButton onClick={onClick} className="w-full text-left">
            <GlassCard className="p-4 w-full hover:bg-black/30 transition-colors flex items-center space-x-4">
                <img src={contact.photoUrl} alt={contact.name} className="w-16 h-16 rounded-full border-2 border-white/20" />
                <div className="flex-grow">
                    <p className="font-bold text-white text-lg">{contact.name}</p>
                    <p className="text-sm text-gray-300">{contact.title} at {contact.company}</p>
                    <p className="text-xs text-gray-400 mt-1">Last interaction: {contact.lastInteraction}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400">Lead Score</p>
                    <p className="font-semibold text-white text-2xl">{contact.leadScore}</p>
                </div>
            </GlassCard>
        </HapticButton>
    );
};

export default ContactCard;
