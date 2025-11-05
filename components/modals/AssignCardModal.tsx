import React, { useState } from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon, CardIcon } from '../icons.tsx';
import { TeamMember, CardTemplate } from '../../types.ts';
import { templates } from '../../data/templates.ts';
import TemplateCarousel from '../TemplateCarousel.tsx';

interface AssignCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    teamMembers: TeamMember[];
}

const AssignCardModal: React.FC<AssignCardModalProps> = ({ isOpen, onClose, teamMembers }) => {
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>(templates[0]);

    const handleToggleMember = (memberId: string) => {
        setSelectedMembers(prev => 
            prev.includes(memberId) 
                ? prev.filter(id => id !== memberId) 
                : [...prev, memberId]
        );
    };

    const handleAssign = () => {
        if (selectedMembers.length === 0) {
            alert('Please select at least one team member.');
            return;
        }
        alert(`Assigned template "${selectedTemplate.name}" to ${selectedMembers.length} member(s).`);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-lg mx-auto relative p-8 text-white space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Assign Card Template</h2>
                <p className="text-gray-300">
                    Apply a new card design to selected team members in bulk.
                </p>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Select Members</h3>
                        <div className="max-h-40 overflow-y-auto space-y-2 p-2 bg-black/20 rounded-lg">
                            {teamMembers.map(member => (
                                <label key={member.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-white/10 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={selectedMembers.includes(member.id)}
                                        onChange={() => handleToggleMember(member.id)}
                                        className="w-5 h-5 rounded bg-white/20 border-white/30 text-bamboo-8 focus:ring-bamboo-8"
                                    />
                                    <img src={member.avatarUrl} alt={member.name} className="w-8 h-8 rounded-full" />
                                    <span>{member.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <TemplateCarousel 
                        templates={templates}
                        selectedTemplate={selectedTemplate}
                        onSelectTemplate={setSelectedTemplate}
                    />
                </div>

                <HapticButton 
                    onClick={handleAssign}
                    disabled={selectedMembers.length === 0}
                    className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors disabled:opacity-50"
                >
                    <CardIcon className="w-5 h-5" />
                    <span>Assign Template</span>
                </HapticButton>
            </GlassCard>
        </Modal>
    );
};

export default AssignCardModal;
