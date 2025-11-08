import * as React from 'react';

interface AIStudioSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const AIStudioSheet: React.FC<AIStudioSheetProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-end"
            onClick={onClose}
        >
            <div
                className={`w-full bg-bamboo-12 border-t border-white/10 rounded-t-2xl p-4 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ maxHeight: '80vh' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4"></div>
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 4rem)' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AIStudioSheet;
