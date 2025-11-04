import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="animate-scaleIn"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
            >
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
