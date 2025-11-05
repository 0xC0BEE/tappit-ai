import React, { useState } from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon, UploadIcon } from '../icons.tsx';

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
    const [format, setFormat] = useState('CSV');
    const [includeInteractions, setIncludeInteractions] = useState(true);

    const handleExport = () => {
        alert(`Exporting team data as ${format}... ${includeInteractions ? 'with interactions' : 'without interactions'}.`);
        // In a real app, this would trigger a file download.
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-md mx-auto relative p-8 text-white space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Export Team Data</h2>
                <p className="text-gray-300">
                    Download your team's contacts and performance metrics.
                </p>

                <div className="space-y-4 text-left">
                    <div>
                        <label className="text-sm font-semibold text-gray-300">Export Format</label>
                        <div className="flex space-x-2 mt-2">
                            {['CSV', 'JSON', 'PDF'].map(f => (
                                <HapticButton
                                    key={f}
                                    onClick={() => setFormat(f)}
                                    className={`flex-1 py-2 rounded-lg text-sm transition-colors ${format === f ? 'bg-bamboo-8 text-white' : 'bg-white/10 text-gray-300'}`}
                                >
                                    {f}
                                </HapticButton>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center space-x-3 cursor-pointer">
                             <input 
                                type="checkbox"
                                checked={includeInteractions}
                                onChange={() => setIncludeInteractions(!includeInteractions)}
                                className="w-5 h-5 rounded bg-white/20 border-white/30 text-bamboo-8 focus:ring-bamboo-8"
                            />
                            <span className="text-gray-300">Include interaction history</span>
                        </label>
                    </div>
                </div>

                <HapticButton 
                    onClick={handleExport}
                    className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors"
                >
                    <UploadIcon className="w-5 h-5 -rotate-90" />
                    <span>Download Export</span>
                </HapticButton>
            </GlassCard>
        </Modal>
    );
};

export default ExportModal;
