import React from 'react';
import { Contact } from '../types.ts';
import GlassCard from './GlassCard.tsx';
import useColorExtractor from '../hooks/useColorExtractor.ts';
import HapticButton from './HapticButton.tsx';

interface ContactCardProps {
    contact: Contact;
    onClick: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick }) => {
    const dominantColor = useColorExtractor(contact.photoUrl);

    return (
        <HapticButton onClick={onClick} className="w-full text-left">
            <GlassCard className="p-4 w-full hover:bg-black/30 transition-colors">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <img src={contact.photoUrl} alt={contact.name} className="w-16 h-16 rounded-full" />
                        <div 
                            className="absolute -top-1 -right-1 w-7 h-7 rounded-full border-2 border-bamboo-12 text-white flex items-center justify-center text-xs font-bold shadow-lg"
                            style={{ backgroundColor: dominantColor ?? '#374151' }} // fallback color
                        >
                            {contact.leadScore}
                        </div>
                    </div>
                    <div className="flex-grow">
                        <p className="font-bold text-lg text-white">{contact.name}</p>
                        <p className="text-sm text-gray-300">{contact.title} at {contact.company}</p>
                        <p className="text-xs text-gray-400 mt-1">Last interaction: {contact.lastInteraction}</p>
                    </div>
                </div>
            </GlassCard>
        </HapticButton>
    );
};

export default ContactCard;