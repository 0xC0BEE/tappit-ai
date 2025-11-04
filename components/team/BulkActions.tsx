import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import HapticButton from '../HapticButton.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { CardIcon, ShareIcon } from '../icons.tsx';

interface BulkActionsProps {
    selectedCount: number;
}

const BulkActions: React.FC<BulkActionsProps> = ({ selectedCount }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="bg-bamboo-8/30 backdrop-blur-md border border-bamboo-7/50 rounded-xl p-4 flex items-center justify-between animate-fadeIn">
            <span className="font-semibold text-white">{selectedCount} member{selectedCount > 1 ? 's' : ''} selected</span>
            <div className="flex items-center space-x-2">
                <HapticButton className="bg-white/10 text-white text-sm font-semibold py-2 px-4 rounded-full flex items-center space-x-2">
                    <CardIcon className="w-4 h-4" />
                    <span>Assign Card</span>
                </HapticButton>
                <HapticButton className="bg-white/10 text-white text-sm font-semibold py-2 px-4 rounded-full flex items-center space-x-2">
                    <ShareIcon className="w-4 h-4" />
                    <span>Export</span>
                </HapticButton>
            </div>
        </div>
    );
};

export default BulkActions;
