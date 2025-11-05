import React, { useState } from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon, PlusIcon } from '../icons.tsx';
import { InteractionType, Interaction } from '../../types.ts';
import CustomSelect from '../CustomSelect.tsx';

interface AddInteractionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddInteraction: (interaction: Interaction) => void;
    contactName: string;
}

const interactionOptions = Object.values(InteractionType).map(type => ({
    value: type,
    label: type,
}));

const AddInteractionModal: React.FC<AddInteractionModalProps> = ({ isOpen, onClose, onAddInteraction, contactName }) => {
    const [type, setType] = useState<InteractionType>(InteractionType.Note);
    const [notes, setNotes] = useState('');
    const [event, setEvent] = useState('');
    const [location, setLocation] = useState('');

    const handleSave = () => {
        if (!notes) {
            alert('Please add some notes for this interaction.');
            return;
        }
        const newInteraction: Interaction = {
            id: `int-${Date.now()}`,
            type,
            notes,
            date: new Date().toISOString().split('T')[0],
            event: event || undefined,
            location: location || undefined,
        };
        onAddInteraction(newInteraction);
        // Reset form and close
        setNotes('');
        setEvent('');
        setLocation('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-lg mx-auto relative p-8 text-white space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Add Interaction</h2>
                <p className="text-gray-300">
                    Log a new interaction with <span className="font-bold text-bamboo-7">{contactName}</span>.
                </p>

                <div className="space-y-4 text-left">
                    <CustomSelect
                        placeholder="Interaction Type"
                        options={interactionOptions}
                        value={type}
                        onChange={(val) => setType(val as InteractionType)}
                    />
                    <input
                        type="text"
                        placeholder="Event (optional, e.g., 'TechCrunch 2024')"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        className="w-full bg-white/5 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bamboo-8"
                    />
                     <input
                        type="text"
                        placeholder="Location (optional, e.g., 'SF Moscone Center')"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-white/5 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bamboo-8"
                    />
                    <textarea
                        placeholder="Add your notes here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-white/5 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bamboo-8 h-24 resize-none"
                    />
                </div>
                
                <HapticButton 
                    onClick={handleSave}
                    className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Save Interaction</span>
                </HapticButton>
            </GlassCard>
        </Modal>
    );
};

export default AddInteractionModal;
