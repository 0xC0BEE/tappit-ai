import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import HapticButton from '../components/HapticButton.tsx';

const FollowUpGem: React.FC = () => {
    const [template, setTemplate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: "Draft a friendly but professional follow-up email template for a digital business card. The user will have just met someone at an event. Include placeholders like [Event] and [Name].",
                config: {
                    systemInstruction: "You are a helpful assistant that writes email templates. Return only the email body text.",
                }
            });
            setTemplate(response.text.trim());
        } catch (error) {
            console.error("Failed to generate follow-up:", error);
            setTemplate("Could not generate a template. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <p className="text-sm text-gray-300 mb-2">Create a template for quick follow-ups after you tap with someone.</p>
            <textarea 
                placeholder="e.g., Great connecting at [Event]! Let's chat more about..."
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full bg-black/20 text-white text-sm p-2 rounded-md h-24 resize-none"
            ></textarea>
            <div className="flex space-x-2 mt-2">
                <HapticButton 
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="flex-1 bg-white/10 text-white font-semibold py-2 rounded-lg text-sm disabled:opacity-50"
                >
                    {isLoading ? 'Drafting...' : 'Draft with AI'}
                </HapticButton>
                <HapticButton 
                    onClick={() => alert('Follow-up template saved!')}
                    className="flex-1 bg-bamboo-8 text-white font-semibold py-2 rounded-lg text-sm"
                >
                    Save
                </HapticButton>
            </div>
        </div>
    );
};

export default FollowUpGem;