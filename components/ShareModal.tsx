import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { CardField, CardTemplate } from '../types.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import Modal from './Modal.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import GlassCard from './GlassCard.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import HapticButton from './HapticButton.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import AnimatedQR from './AnimatedQR.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { CloseIcon } from './icons.tsx';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    fields: CardField[];
    template: CardTemplate;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, fields }) => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
${fields.map(f => {
    if (f.label.toLowerCase().includes('name')) return `FN:${f.value}\nN:${f.value};;;`;
    if (f.label.toLowerCase().includes('title')) return `TITLE:${f.value}`;
    if (f.label.toLowerCase().includes('company')) return `ORG:${f.value}`;
    if (f.label.toLowerCase().includes('email')) return `EMAIL:${f.value}`;
    if (f.label.toLowerCase().includes('website')) return `URL:${f.value}`;
    return '';
}).filter(Boolean).join('\n')}
END:VCARD`;
    const shareUrl = `https://tappit.ai/card/${fields.find(f => f.value)?.value.replace(/\s+/g, '-').toLowerCase() || 'shared'}`;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-sm mx-auto relative p-8 text-center space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Share Your Card</h2>
                <p className="text-gray-300">
                    Others can scan this QR code to instantly save your contact details.
                </p>

                <div className="flex justify-center my-4">
                    <div className="p-4 bg-white/10 rounded-3xl">
                        <AnimatedQR value={vCardData} />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <input type="text" readOnly value={shareUrl} className="w-full bg-black/20 text-gray-300 rounded-full p-3 border border-white/20 text-sm" />
                    <HapticButton className="bg-bamboo-8 text-white font-bold py-3 px-5 rounded-full">
                        Copy
                    </HapticButton>
                </div>
            </GlassCard>
        </Modal>
    );
};

export default ShareModal;
