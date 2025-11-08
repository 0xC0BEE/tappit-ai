// Fix: Use namespace import for React to resolve JSX type errors.
import * as React from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon, PlusIcon } from '../icons.tsx';

interface SetReminderModalProps {
    isOpen: boolean;
    onClose: () => void;
    contactName: string;
}

const SetReminderModal: React.FC<SetReminderModalProps> = ({ isOpen, onClose, contactName }) => {
    // Fix: Use React.useState
    const [notes, setNotes] = React.useState('');
    const [date, setDate] = React.useState('');

    const handleSave = () => {
        if (!date || !notes) {
            alert('Please set a date and add a note for the reminder.');
            return;
        }
        alert(`Reminder set for ${contactName} on ${date}: "${notes}"`);
        setNotes('');
        setDate('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-lg mx-auto relative p-8 text-white space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Set Reminder</h2>
                <p className="text-gray-300">
                    Set a reminder to follow up with <span className="font-bold text-bamboo-7">{contactName}</span>.
                </p>

                <div className="space-y-4 text-left">
                     <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-white/5 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bamboo-8"
                    />
                    <textarea
                        placeholder="Reminder notes (e.g., 'Follow up about project X')"
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
                    <span>Set Reminder</span>
                </HapticButton>
            </GlassCard>
        </Modal>
    );
};

export default SetReminderModal;
