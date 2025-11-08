
// Fix: Remove redundant triple-slash directive for React types.
// Fix: Provide full content for ContactCard.tsx to make it a valid module.
import * as React from 'react';
import { Contact } from '../types.ts';
import HapticButton from './HapticButton.tsx';
import GlassCard from './GlassCard.tsx';
import { SparklesIcon } from './icons.tsx';
import useColorExtractor from '../hooks/useColorExtractor.ts';

interface ContactCardProps {
    contact: Contact;
    onClick: () => void;
}

const HealthRing: React.FC<{ health: number }> = ({ health }) => {
    const circumference = 2 * Math.PI * 20; // 20 is the radius
    const offset = circumference - health * circumference;

    let colorClass = 'stroke-green-500';
    if (health < 0.7) colorClass = 'stroke-yellow-500';
    if (health < 0.4) colorClass = 'stroke-red-500';

    return (
        <svg className="absolute -inset-1 w-[72px] h-[72px]" viewBox="0 0 44 44">
            <circle
                className="stroke-current text-white/10"
                cx="22"
                cy="22"
                r="20"
                fill="none"
                strokeWidth="3"
            />
            <circle
                className={`stroke-current ${colorClass} transition-all duration-500`}
                cx="22"
                cy="22"
                r="20"
                fill="none"
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
            />
        </svg>
    );
};

const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick }) => {
    const dominantColor = useColorExtractor(contact.photoUrl);
    const needsNudge = contact.relationshipHealth < 0.4;
    
    return (
        <HapticButton onClick={onClick} className="w-full text-left">
            <GlassCard className="p-4 w-full hover:bg-black/30 transition-colors flex items-center space-x-4">
                <div className="relative flex-shrink-0">
                    <img src={contact.photoUrl} alt={contact.name} className="w-16 h-16 rounded-full" />
                    <HealthRing health={contact.relationshipHealth} />
                </div>
                
                <div className="flex-grow overflow-hidden">
                    <div className="flex items-center space-x-2">
                         <p className="font-bold text-white text-lg truncate">{contact.name}</p>
                         {needsNudge && (
                            <div className="animate-pulseGreen rounded-full">
                                <SparklesIcon className="w-5 h-5 text-yellow-400" />
                            </div>
                        )}
                    </div>
                    <p className="text-sm text-gray-300 truncate">{contact.title}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">Last interaction: {contact.lastInteraction}</p>
                </div>
                
                <div 
                    className="flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center transition-colors"
                    style={{ backgroundColor: dominantColor ? `${dominantColor}33` : 'rgba(255,255,255,0.1)' }}
                >
                    <p className="text-xs text-white/70">Health</p>
                    <p 
                        className="font-semibold text-white text-xl"
                        style={{ color: dominantColor || '#FFFFFF' }}
                    >
                        {(contact.relationshipHealth * 100).toFixed(0)}
                    </p>
                </div>
            </GlassCard>
        </HapticButton>
    );
};

export default ContactCard;