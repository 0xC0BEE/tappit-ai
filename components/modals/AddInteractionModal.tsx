import * as React from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon, PlusIcon, WandIcon } from '../icons.tsx';
import { InteractionType, Interaction } from '../../types.ts';

interface AddInteractionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddInteraction: (interaction: Interaction) => void;
    contactName: string;
}

const AddInteractionModal: React.FC<AddInteractionModalProps> = ({ isOpen, onClose, onAddInteraction, contactName }) => {
    const [step, setStep] = React.useState<'input' | 'confirm'>('input');
    const [naturalInput, setNaturalInput] = React.useState('');
    const [parsedInteraction, setParsedInteraction] = React.useState<Partial<Interaction> | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleParse = async () => {
        if (!naturalInput) {
            alert('Please describe your interaction.');
            return;
        }
        setIsLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: `Parse the following sentence into a structured interaction object: "${naturalInput}"`,
                config: {
                    systemInstruction: `You are an API that parses natural language into a structured JSON object for a networking app. The user is logging an interaction with a contact. Today's date is ${new Date().toLocaleDateString()}. You must infer the 'type', 'notes', and optionally 'event' and 'location'. Possible types are: ${Object.values(InteractionType).join(', ')}.`,
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING, enum: Object.values(InteractionType), description: "The type of interaction." },
                            notes: { type: Type.STRING, description: "A summary of what was discussed." },
                            event: { type: Type.STRING, description: "The name of the event where the interaction took place, if mentioned." },
                            location: { type: Type.STRING, description: "The physical or virtual location of the interaction, if mentioned." },
                        },
                        required: ["type", "notes"]
                    }
                }
            });
            
            const parsedJson = JSON.parse(response.text);
            setParsedInteraction(parsedJson);
            setStep('confirm');

        } catch (error) {
            console.error("AI parsing failed:", error);
            alert("Sorry, the AI couldn't understand that. Please try rephrasing.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSave = () => {
        const finalInteraction: Interaction = {
            id: `int-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            ...parsedInteraction,
        } as Interaction;
        
        onAddInteraction(finalInteraction);
        resetAndClose();
    };
    
    const resetAndClose = () => {
        setNaturalInput('');
        setParsedInteraction(null);
        setStep('input');
        onClose();
    };

    const renderInputStep = () => (
        <>
            <textarea
                placeholder={`Describe your interaction...\ne.g., "Met ${contactName} at TechCrunch in SF, we talked about the new API."`}
                value={naturalInput}
                onChange={(e) => setNaturalInput(e.target.value)}
                className="w-full bg-white/5 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bamboo-8 h-32 resize-none"
            />
            <HapticButton 
                onClick={handleParse}
                disabled={isLoading || !naturalInput}
                className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors disabled:opacity-50"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                        <span>Parsing...</span>
                    </>
                ) : (
                    <>
                        <WandIcon className="w-5 h-5" />
                        <span>Log with AI</span>
                    </>
                )}
            </HapticButton>
        </>
    );

    const renderConfirmStep = () => (
        <div className="text-left space-y-4">
            <div>
                <h4 className="font-bold text-white">Confirm Details</h4>
                <p className="text-sm text-gray-400">The AI has parsed your entry. Please confirm before saving.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg space-y-2 text-sm">
                <p><span className="font-semibold text-gray-300">Type:</span> <span className="text-bamboo-7">{parsedInteraction?.type}</span></p>
                <p><span className="font-semibold text-gray-300">Event:</span> {parsedInteraction?.event || 'N/A'}</p>
                <p><span className="font-semibold text-gray-300">Location:</span> {parsedInteraction?.location || 'N/A'}</p>
                <p><span className="font-semibold text-gray-300">Notes:</span> {parsedInteraction?.notes}</p>
            </div>
             <HapticButton 
                onClick={handleSave}
                className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors"
            >
                <PlusIcon className="w-5 h-5" />
                <span>Save Interaction</span>
            </HapticButton>
             <HapticButton 
                onClick={() => setStep('input')}
                className="w-full text-center text-sm text-gray-400 hover:text-white"
            >
                Go Back & Edit
            </HapticButton>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={resetAndClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-lg mx-auto relative p-8 text-white space-y-4">
                <HapticButton onClick={resetAndClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Add Interaction</h2>
                <p className="text-gray-300">
                    Log an interaction with <span className="font-bold text-bamboo-7">{contactName}</span>.
                </p>

                {step === 'input' ? renderInputStep() : renderConfirmStep()}
            </GlassCard>
        </Modal>
    );
};

export default AddInteractionModal;