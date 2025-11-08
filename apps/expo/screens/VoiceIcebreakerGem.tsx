import * as React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../components/GlassCard.tsx';
import HapticButton from '../../../components/HapticButton.tsx';
import { SparklesIcon } from '../../../components/icons.tsx';

const VoiceIcebreakerGem: React.FC = () => {
    const [isRecording, setIsRecording] = React.useState(false);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const [icebreakers, setIcebreakers] = React.useState<string[]>([]);

    const handleRecord = () => {
        setIsRecording(true);
        setTimeout(() => {
            setIsRecording(false);
            setIsAnalyzing(true);
            // Simulate AI analysis
            setTimeout(() => {
                setIcebreakers([
                    "What's the most interesting project you've worked on?",
                    "If you could have any superpower for a day, what would it be and why?",
                    "What's a skill you'd love to learn?"
                ]);
                setIsAnalyzing(false);
            }, 2500);
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-white p-4">
            <h1 className="text-4xl font-bold mb-4">AI Voice Icebreaker</h1>
            <p className="text-gray-300 mb-8 max-w-sm">
                Record a 10-second voice intro, and our AI will generate personalized icebreaker questions for your card.
            </p>

            <GlassCard className="p-8 w-full max-w-sm">
                <div className="flex justify-center mb-6">
                    <HapticButton onClick={handleRecord} disabled={isRecording || isAnalyzing} className="relative w-24 h-24 bg-red-500 rounded-full flex items-center justify-center">
                        {isRecording && <motion.div className="absolute inset-0 bg-red-400 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />}
                        <div className="w-10 h-10 bg-red-700 rounded-md" />
                    </HapticButton>
                </div>
                
                {isRecording && <p>Recording... tell us about yourself!</p>}
                {isAnalyzing && <p>AI is analyzing your voice...</p>}

                {icebreakers.length > 0 && (
                    <div className="space-y-3 text-left">
                        <h3 className="font-bold flex items-center"><SparklesIcon className="w-5 h-5 mr-2 text-bamboo-7" /> Your Icebreakers:</h3>
                        {icebreakers.map((q, i) => (
                            <p key={i} className="bg-black/20 p-2 rounded-md text-sm">"{q}"</p>
                        ))}
                    </div>
                )}
            </GlassCard>
        </div>
    );
};

export default VoiceIcebreakerGem;
