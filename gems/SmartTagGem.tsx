import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import HapticButton from '../components/HapticButton.tsx';

const SmartTagGem: React.FC = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        setTags([]);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: "Based on a user with the title 'Senior Strategic Advisor', suggest 3-5 relevant professional tags for their digital business card.",
                config: {
                    systemInstruction: "You suggest professional tags for business cards. Return a comma-separated list of tags.",
                }
            });
            const tagString = response.text.trim();
            setTags(tagString.split(',').map(tag => tag.trim()));
        } catch (error) {
            console.error("Failed to generate tags:", error);
            setTags(["Error"]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <p className="text-sm text-gray-300 mb-2">Let AI analyze your title and company to suggest relevant tags.</p>
            <HapticButton 
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-white/10 text-white font-semibold py-2 rounded-lg text-sm disabled:opacity-50"
            >
                {isLoading ? 'Analyzing...' : 'Generate Smart Tags'}
            </HapticButton>
            {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 animate-fadeIn">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-bamboo-8/50 text-bamboo-7 text-xs font-semibold px-2 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SmartTagGem;