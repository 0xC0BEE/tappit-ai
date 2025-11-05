import React from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import AnimatedQR from '../AnimatedQR.tsx';
import { CloseIcon } from '../icons.tsx';

interface MyQRModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MyQRModal: React.FC<MyQRModalProps> = ({ isOpen, onClose }) => {
    const publicUrl = `https://tappit.ai/card/alex-bamboo`;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-sm mx-auto relative p-8 text-center space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">My QR Code</h2>
                <p className="text-gray-300">
                    Let others scan this to instantly get your card.
                </p>
                
                <div className="flex justify-center my-4">
                    <div className="p-4 bg-white rounded-2xl">
                        <AnimatedQR value={publicUrl} />
                    </div>
                </div>
                
                <HapticButton 
                    onClick={onClose}
                    className="w-full bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors">
                    Done
                </HapticButton>

            </GlassCard>
        </Modal>
    );
};

export default MyQRModal;
