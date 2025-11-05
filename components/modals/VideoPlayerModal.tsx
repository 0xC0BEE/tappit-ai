import React from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon } from '../icons.tsx';
import VideoEmbed from '../VideoEmbed.tsx';

interface VideoPlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ isOpen, onClose, videoUrl }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-2xl mx-auto relative p-4">
                <HapticButton onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white z-10 bg-black/50 rounded-full p-1">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                <VideoEmbed url={videoUrl} />
            </GlassCard>
        </Modal>
    );
};

export default VideoPlayerModal;
