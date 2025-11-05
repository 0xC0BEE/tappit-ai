
import React from 'react';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CardIcon, UploadIcon } from '../icons.tsx';

interface BulkActionsProps {
    onAssignCard: () => void;
    onExportData: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({ onAssignCard, onExportData }) => {
    return (
        <GlassCard className="p-4">
            <h2 className="text-xl font-bold text-white mb-4">Bulk Actions</h2>
            <div className="space-y-3">
                <HapticButton 
                    onClick={onAssignCard}
                    className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white font-semibold py-2 rounded-lg hover:bg-white/20"
                >
                    <CardIcon className="w-5 h-5" />
                    <span>Assign Card Template</span>
                </HapticButton>
                <HapticButton 
                    onClick={onExportData}
                    className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white font-semibold py-2 rounded-lg hover:bg-white/20"
                >
                    <UploadIcon className="w-5 h-5 -rotate-90" />
                    <span>Export Team Data</span>
                </HapticButton>
            </div>
        </GlassCard>
    );
};

export default BulkActions;
