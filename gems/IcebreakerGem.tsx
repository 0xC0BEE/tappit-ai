
// Fix: Use namespace import for React to resolve JSX type errors.
import * as React from 'react';
import { GoogleGenAI } from "@google/genai";
import HapticButton from '../components/HapticButton.tsx';

const IcebreakerGem: React.FC = () => {
    // Fix: Use React.useState
    const [icebreaker, setIcebreaker] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        setIcebreaker('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: "Suggest a fun, professional icebreaker question for a digital business card.",
                config: {
                    systemInstruction: "You suggest short, engaging icebreaker questions. Return only the question.",
                }
            });
            // Fix: Use response.text to get the generated content as per coding guidelines.
            setIcebreaker(response.text.trim());
        } catch (error) {
            console.error("Failed to generate icebreaker:", error);
            setIcebreaker("Could not generate an icebreaker. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <p className="text-sm text-gray-300 mb-2">Generate a fun fact or question to add to your card.</p>
            <HapticButton 
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-white/10 text-white font-semibold py-2 rounded-lg text-sm disabled:opacity-50"
            >
                {isLoading ? 'Generating...' : 'Suggest Icebreaker'}
            </HapticButton>
            {icebreaker && (
                <div className="mt-3 p-2 bg-black/20 rounded-md text-sm text-bamboo-7 animate-fadeIn">
                    <p>{icebreaker}</p>
                </div>
            )}
        </div>
    );
};

export default IcebreakerGem;