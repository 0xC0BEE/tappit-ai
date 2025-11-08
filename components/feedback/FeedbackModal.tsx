import * as React from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="p-8 text-white">
                <h2 className="text-2xl font-bold">Submit Feedback</h2>
                <p className="text-gray-300 mt-2">We'd love to hear your thoughts!</p>
            </GlassCard>
        </Modal>
    );
};

export default FeedbackModal;