import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import GlassCard from '../GlassCard.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { BrandKit } from '../../types.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import HapticButton from '../HapticButton.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { PaletteIcon, UploadIcon } from '../icons.tsx';

interface BrandKitEditorProps {
    kit: BrandKit;
}

const BrandKitEditor: React.FC<BrandKitEditorProps> = ({ kit }) => {
    return (
        <GlassCard className="p-4">
            <h2 className="text-xl font-bold text-white mb-4">Brand Kit</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-300">Logo</span>
                    <HapticButton className="flex items-center space-x-2 bg-white/10 text-white text-sm font-semibold py-1 px-3 rounded-full">
                        <UploadIcon className="w-4 h-4" />
                        <span>Upload</span>
                    </HapticButton>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-300">Primary Color</span>
                    <div className="flex items-center space-x-2">
                        <span>{kit.primaryColor}</span>
                        <div className="w-6 h-6 rounded-md border border-white/20" style={{ backgroundColor: kit.primaryColor }}></div>
                    </div>
                </div>
                 <div className="flex items-center justify-between">
                    <span className="text-gray-300">Font</span>
                    <span className="font-semibold">{kit.font}</span>
                </div>
                <HapticButton className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-2 px-4 rounded-full">
                    <PaletteIcon className="w-5 h-5" />
                    <span>Customize</span>
                </HapticButton>
            </div>
        </GlassCard>
    );
};

export default BrandKitEditor;
