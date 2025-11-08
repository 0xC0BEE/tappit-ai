
// Fix: Remove redundant triple-slash directive for React types.
import * as React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import LottiePlayer from '../components/LottiePlayer.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import HapticButton from '../components/HapticButton.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import AnimatedQR from '../components/AnimatedQR.tsx';
import { trackOnboardingComplete } from '../services/analytics.ts';

interface OnboardingScreenProps {
    onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
    const [step, setStep] = React.useState(1);

    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
    
    const handleFinish = () => {
        trackOnboardingComplete();
        onComplete();
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="flex flex-col items-center justify-center text-center animate-fadeIn">
                        <LottiePlayer 
                            src="https://lottie.host/8c64c243-1577-4743-8a14-46d2df0f671c/sK4y33a7gT.json" // A growing leaf animation
                            className="w-64 h-64"
                        />
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7 mt-4">
                            Welcome to Tappit AI
                        </h1>
                        <p className="text-gray-300 text-xl mt-4 max-w-md">
                            The future of networking is here. Smart, sustainable, seamless.
                        </p>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col items-center justify-center text-center animate-fadeIn">
                         <div className="w-64 h-64 flex items-center justify-center">
                             <p className="text-5xl font-bold text-white leading-tight">
                                One tap → <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">AI remembers,</span><br/>
                                scores, books.
                             </p>
                         </div>
                    </div>
                );
            case 3:
                return (
                     <div className="flex flex-col items-center justify-center text-center animate-fadeIn">
                        <AnimatedQR value="https://tappit.ai/welcome" />
                        <h2 className="text-3xl font-bold text-white mt-8">Your card is ready to share.</h2>
                        <p className="text-gray-300 text-lg mt-2">Dynamic, intelligent, and always with you.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-between h-full">
            <div className="flex-grow flex items-center justify-center w-full">
                 {renderStepContent()}
            </div>

            <div className="w-full max-w-md flex flex-col items-center p-4">
                <div className="flex space-x-2 my-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-3 h-3 rounded-full transition-colors ${step === i ? 'bg-bamboo-8' : 'bg-white/20'}`}></div>
                    ))}
                </div>

                <div className="flex w-full space-x-4">
                    {step > 1 && (
                        <HapticButton 
                            onClick={handleBack}
                            className="flex-1 bg-white/10 text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 transition-colors"
                        >
                            Back
                        </HapticButton>
                    )}
                    {step < 3 ? (
                        <HapticButton 
                            onClick={handleNext}
                            className="flex-1 bg-bamboo-8 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors text-lg"
                        >
                            Next
                        </HapticButton>
                    ) : (
                        <HapticButton 
                            onClick={handleFinish}
                            className="flex-1 bg-bamboo-8 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors text-lg"
                        >
                            Finish
                        </HapticButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnboardingScreen;