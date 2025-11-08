import * as React from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon } from '../icons.tsx';
import { BrandKit } from '../../types.ts';
import TeamCardPreview from '../team/TeamCardPreview.tsx';

interface BrandKitPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    brandKit: BrandKit;
}

const BrandKitPreviewModal: React.FC<BrandKitPreviewModalProps> = ({ isOpen, onClose, brandKit }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-lg mx-auto relative p-8 text-center space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Brand Kit Preview</h2>
                <p className="text-gray-300">
                    This is how your brand will appear on team members' cards.
                </p>

                <div className="flex justify-center my-4 transform scale-150">
                    <TeamCardPreview brandKit={brandKit} />
                </div>
            </GlassCard>
        </Modal>
    );
};

export default BrandKitPreviewModal;