import * as React from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon } from '../icons.tsx';

interface CameraScanModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CameraScanModal: React.FC<CameraScanModalProps> = ({ isOpen, onClose }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const streamRef = React.useRef<MediaStream | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    React.useEffect(() => {
        const startCamera = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    streamRef.current = stream;
                }
            } catch (err) {
                console.error("Camera access denied:", err);
                if (err instanceof Error) {
                    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                        setError('Camera permission denied. Please enable it in your browser settings.');
                    } else {
                        setError('Could not access the camera. Please ensure it is not in use by another application.');
                    }
                } else {
                    setError('An unknown error occurred while accessing the camera.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (isOpen) {
            startCamera();
        } else {
            stopCamera();
        }

        return () => {
            stopCamera();
        };
    }, [isOpen]);

    const handleSimulateScan = () => {
        alert('Scanned QR Code: https://tappit.ai/contact/jane-doe');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-md mx-auto relative p-6 text-center space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-2xl font-bold text-white">Scan QR Code</h2>
                
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    {error ? (
                        <p className="text-red-400 text-sm p-4">{error}</p>
                    ) : (
                        <>
                            <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline 
                                className="absolute inset-0 w-full h-full object-cover"
                                onCanPlay={() => setIsLoading(false)}
                            ></video>
                            
                            {/* Scanner Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 relative">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-bamboo-7 rounded-tl-lg"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-bamboo-7 rounded-tr-lg"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-bamboo-7 rounded-bl-lg"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-bamboo-7 rounded-br-lg"></div>
                                </div>
                            </div>
                            
                            {isLoading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <HapticButton 
                    onClick={handleSimulateScan}
                    className="w-full bg-bamboo-8 text-white font-bold py-3 rounded-full"
                >
                    Simulate Successful Scan
                </HapticButton>
            </GlassCard>
        </Modal>
    );
};

export default CameraScanModal;