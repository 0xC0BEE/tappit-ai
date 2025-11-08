// Fix: Use namespace import for React to resolve JSX type errors.
import * as React from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon } from '../icons.tsx';

interface InviteTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InviteTeamModal: React.FC<InviteTeamModalProps> = ({ isOpen, onClose }) => {
    // Fix: Use React.useState
    const [email, setEmail] = React.useState('');

    const handleSendInvite = () => {
        if (!email) {
            alert('Please enter an email address.');
            return;
        }
        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        alert(`Invitation sent to ${email}!`);
        setEmail('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-md mx-auto relative p-8 text-white space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Invite Team Member</h2>
                <p className="text-gray-300">
                    Enter the email address of the person you want to invite to your team.
                </p>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="e.g., dwight.schrute@dundermifflin.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bamboo-8"
                    />
                </div>
                
                <HapticButton 
                    onClick={handleSendInvite}
                    disabled={!email}
                    className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors disabled:opacity-50"
                >
                    <span>Send Invite</span>
                </HapticButton>
            </GlassCard>
        </Modal>
    );
};

export default InviteTeamModal;
