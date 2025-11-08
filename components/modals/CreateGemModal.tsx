import * as React from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon, WandIcon } from '../icons.tsx';
import { GemDefinition } from '../../types.ts';

interface CreateGemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGemCreated: (gem: GemDefinition) => void;
}

const CreateGemModal: React.FC<CreateGemModalProps> = ({ isOpen, onClose, onGemCreated }) => {
    const [prompt, setPrompt] = React.useState('');
    const [name, setName] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleCreateGem = async () => {
        if (!prompt || !name) {
            alert("Please provide a name and a description for your gem.");
            return;
        }
        setIsLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro', // Use a powerful model for code generation.
                contents: `Create a single self-contained React functional component using JSX and Tailwind CSS classes based on this prompt: "${prompt}". The component should be simple, for a digital business card. Do not include imports or exports. The root element should be a div. Use placeholder data where necessary. For example, if asked for social links, create a few example links.`,
                config: {
                    systemInstruction: "You are a React component generator. You only output valid JSX code for a single component, without any surrounding text, explanations, or markdown code fences.",
                }
            });
            
            const jsxString = response.text.trim();

            const newGem: GemDefinition = {
                id: `gem-custom-${Date.now()}`,
                name: name,
                description: prompt.substring(0, 50) + '...', // Short description from prompt
                component: () => null, // Placeholder, will be rendered by CustomGemComponent
                isCustom: true,
                customComponentStr: jsxString,
            };

            onGemCreated(newGem);
            setPrompt('');
            setName('');
        } catch (error) {
            console.error("Failed to create gem with AI:", error);
            alert("Sorry, we couldn't create your gem. Please try a different prompt.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-lg mx-auto relative p-8 text-white space-y-4">
                 <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Create a New Gem</h2>
                <p className="text-gray-300">
                    Describe the component you want to add to your card, and our AI will build it for you.
                </p>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Gem Name (e.g., 'My Social Links')"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bamboo-8"
                    />
                    <textarea
                        placeholder="Describe your gem... e.g., 'A row of icons for GitHub, Twitter, and LinkedIn with links.'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full bg-white/5 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bamboo-8 h-32 resize-none"
                    />
                </div>

                <HapticButton 
                    onClick={handleCreateGem}
                    disabled={isLoading || !prompt || !name}
                    className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                            <span>Building...</span>
                        </>
                    ) : (
                        <>
                            <WandIcon className="w-5 h-5" />
                            <span>Create with AI</span>
                        </>
                    )}
                </HapticButton>
            </GlassCard>
        </Modal>
    );
};

export default CreateGemModal;