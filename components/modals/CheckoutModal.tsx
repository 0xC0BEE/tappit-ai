import React, { useState, useEffect } from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon, CertificateIcon } from '../icons.tsx';
import { Product } from '../../types.ts';
import { useHaptics, HapticPattern } from '../../hooks/useHaptics.ts';

declare global {
    interface Window {
        confetti?: (options: any) => void;
    }
}

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, product }) => {
    const [step, setStep] = useState<CheckoutStep>('shipping');
    const { playHaptic } = useHaptics();

    useEffect(() => {
        if (isOpen) {
            setStep('shipping'); // Reset to first step when opened
        }
    }, [isOpen]);

    const handleNextStep = () => {
        playHaptic(HapticPattern.Click);
        if (step === 'shipping') setStep('payment');
        if (step === 'payment') {
            // Simulate payment processing
            setTimeout(() => {
                setStep('confirmation');
                playHaptic(HapticPattern.Success);
                if (window.confetti) {
                    window.confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
                }
            }, 1000);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 'shipping':
                return (
                    <>
                        <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Full Name" className="w-full bg-white/5 p-2 rounded-md" />
                            <input type="text" placeholder="Address" className="w-full bg-white/5 p-2 rounded-md" />
                            <div className="flex space-x-3">
                                <input type="text" placeholder="City" className="flex-1 bg-white/5 p-2 rounded-md" />
                                <input type="text" placeholder="ZIP Code" className="flex-1 bg-white/5 p-2 rounded-md" />
                            </div>
                        </div>
                        <HapticButton onClick={handleNextStep} className="w-full bg-bamboo-8 text-white font-bold py-3 rounded-full mt-6">Continue to Payment</HapticButton>
                    </>
                );
            case 'payment':
                 return (
                    <>
                        <h3 className="text-xl font-bold mb-4">Payment Details</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Card Number" className="w-full bg-white/5 p-2 rounded-md" />
                            <div className="flex space-x-3">
                                <input type="text" placeholder="MM/YY" className="flex-1 bg-white/5 p-2 rounded-md" />
                                <input type="text" placeholder="CVC" className="flex-1 bg-white/5 p-2 rounded-md" />
                            </div>
                        </div>
                        <HapticButton onClick={handleNextStep} className="w-full bg-bamboo-8 text-white font-bold py-3 rounded-full mt-6">Pay ${product.price.toFixed(2)}</HapticButton>
                    </>
                );
            case 'confirmation':
                return (
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-bamboo-8 flex items-center justify-center text-white border-4 border-bamboo-9 mb-4">
                            <CertificateIcon className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Order Confirmed!</h3>
                        <p className="text-gray-300 mt-2">Your Tappit card is on its way. We've sent a confirmation to your email.</p>
                        <HapticButton onClick={onClose} className="w-full bg-bamboo-8 text-white font-bold py-3 rounded-full mt-6">Done</HapticButton>
                    </div>
                );
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-md mx-auto relative p-8 text-white">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-2xl font-bold text-white mb-2">Checkout</h2>
                <div className="flex items-center space-x-3 bg-black/20 p-2 rounded-lg mb-6">
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                    <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-bamboo-7 font-bold">${product.price.toFixed(2)}</p>
                    </div>
                </div>

                {renderStepContent()}
            </GlassCard>
        </Modal>
    );
};

export default CheckoutModal;