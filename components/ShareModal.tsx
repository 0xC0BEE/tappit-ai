
// Fix: Remove redundant triple-slash directive for React types.
import * as React from 'react';
import Modal from './Modal.tsx';
import GlassCard from './GlassCard.tsx';
import HapticButton from './HapticButton.tsx';
import AnimatedQR from './AnimatedQR.tsx';
import { CloseIcon, LinkIcon } from './icons.tsx';
import { CardField, CardTemplate } from '../types.ts';
import { trackCardShared } from '../services/analytics.ts';
import { useHaptics, HapticPattern } from '../hooks/useHaptics.ts';


interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    fields: CardField[];
    template: CardTemplate;
    onPreviewLink: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, fields, template, onPreviewLink }) => {
    const [copied, setCopied] = React.useState(false);
    const { playHaptic } = useHaptics();
    
    const publicUrl = `https://tappit.ai/card/${fields.find(f => f.label.toLowerCase() === 'name')?.value.replace(' ', '-').toLowerCase() || 'alex-bamboo'}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(publicUrl);
        trackCardShared('copy_link');
        playHaptic(HapticPattern.Success);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const name = fields.find(f => f.label.toLowerCase().includes('name'))?.value || 'Your Name';
    const title = fields.find(f => f.label.toLowerCase().includes('title'))?.value || 'Your Title';


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-md mx-auto relative p-8 text-center space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Share Your Card</h2>
                <p className="text-gray-300">
                    Others can scan this QR code to get your details instantly.
                </p>
                
                <div className="flex justify-center my-4">
                    <div className="p-4 bg-white rounded-2xl">
                        <AnimatedQR value={publicUrl} />
                    </div>
                </div>

                <div className={`w-full h-24 rounded-xl p-4 flex flex-col justify-center text-left shadow-lg ${template.className} ${template.textColor}`}>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p className="opacity-80 text-sm">{title}</p>
                </div>
                
                <HapticButton 
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors">
                    <LinkIcon className="w-5 h-5" />
                    <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </HapticButton>

                <HapticButton
                    onClick={onPreviewLink}
                    className="w-full text-sm text-bamboo-7 font-semibold py-2"
                >
                    Preview Share Link
                </HapticButton>

            </GlassCard>
        </Modal>
    );
};

export default ShareModal;