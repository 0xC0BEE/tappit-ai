import React, { useState } from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon } from '../icons.tsx';
import BrandKitEditor from '../team/BrandKitEditor.tsx';
import BulkActions from '../team/BulkActions.tsx';
import { BrandKit, TeamMember } from '../../types.ts';
import AssignCardModal from './AssignCardModal.tsx';
import ExportModal from './ExportModal.tsx';

interface CustomizeTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    brandKit: BrandKit;
    setBrandKit: React.Dispatch<React.SetStateAction<BrandKit>>;
    teamMembers: TeamMember[];
}

const CustomizeTeamModal: React.FC<CustomizeTeamModalProps> = ({ isOpen, onClose, brandKit, setBrandKit, teamMembers }) => {
    const [isAssignModalOpen, setAssignModalOpen] = useState(false);
    const [isExportModalOpen, setExportModalOpen] = useState(false);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <GlassCard className="w-[calc(100vw-2rem)] max-w-4xl mx-auto relative p-8 text-white">
                    <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </HapticButton>

                    <h2 className="text-3xl font-bold text-white mb-6">Customize Team</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto pr-3">
                        <div className="space-y-6">
                            <BrandKitEditor brandKit={brandKit} setBrandKit={setBrandKit} />
                        </div>
                        <div className="space-y-6">
                            <BulkActions
                                onAssignCard={() => setAssignModalOpen(true)}
                                onExportData={() => setExportModalOpen(true)}
                            />
                        </div>
                    </div>
                </GlassCard>
            </Modal>
            
            {/* Nested Modals */}
            <AssignCardModal 
                isOpen={isAssignModalOpen} 
                onClose={() => setAssignModalOpen(false)} 
                teamMembers={teamMembers} 
            />
            <ExportModal 
                isOpen={isExportModalOpen} 
                onClose={() => setExportModalOpen(false)} 
            />
        </>
    );
};

export default CustomizeTeamModal;