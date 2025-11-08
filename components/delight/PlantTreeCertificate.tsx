import * as React from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import { CertificateIcon, CloseIcon, ShareIcon, TreeIcon } from '../icons.tsx';
import HapticButton from '../HapticButton.tsx';
import { useHaptics, HapticPattern } from '../../hooks/useHaptics.ts';

declare global {
    interface Window {
        confetti?: (options: any) => void;
    }
}

interface PlantTreeCertificateProps {
    isOpen: boolean;
    onClose: () => void;
}

const PlantTreeCertificate: React.FC<PlantTreeCertificateProps> = ({ isOpen, onClose }) => {
    const { playHaptic } = useHaptics();

    React.useEffect(() => {
        if (isOpen) {
            playHaptic(HapticPattern.Success);
            // Trigger confetti when the modal opens
            if (window.confetti) {
                window.confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.5 },
                    colors: ['#33a14d', '#74cb81', '#ffffff', '#cbeacb']
                });
            }
        }
    }, [isOpen, playHaptic]);

    const handleShare = async () => {
        const shareData = {
            title: 'I Planted a Tree with Tappit AI!',
            text: "Thanks to my 7-day connection streak on Tappit AI, a real tree was planted. Join me in making a positive impact!",
            url: 'https://tappit.ai/green',
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                alert("Sharing your impact! (Web Share API not supported)");
            }
        } catch (err) {
            console.error('Error sharing:', err);
            alert("Could not share at this time.");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-md mx-auto relative p-8 text-center space-y-4 bg-gradient-to-br from-bamboo-11 to-bamboo-12 border-bamboo-8">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <div className="w-24 h-24 mx-auto rounded-full bg-bamboo-8 flex items-center justify-center text-white border-4 border-bamboo-9">
                    <TreeIcon className="w-12 h-12" />
                </div>

                <h2 className="text-3xl font-bold text-white">You Planted a Tree!</h2>
                
                <p className="text-gray-300">
                    Thanks to your 7-day connection streak, a real tree will be planted
                    in Madagascar through our partnership with OneTreePlanted.
                </p>

                <div className="border-t border-b border-white/10 py-4">
                    <p className="text-sm text-gray-400">Certificate of Appreciation</p>
                    <p className="text-xl font-semibold text-bamboo-7">Tappit AI Green User</p>
                </div>
                
                <HapticButton 
                    onClick={handleShare}
                    className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                    <span>Share Your Impact</span>
                </HapticButton>
            </GlassCard>
        </Modal>
    );
};

export default PlantTreeCertificate;