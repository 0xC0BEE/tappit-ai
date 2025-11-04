import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
// Fix: Add file extension to satisfy bundler/type checker.
import { CardField, CardTemplate, FieldType } from '../types.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import { templates } from '../data/templates.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import TiltCardPreview from '../components/TiltCardPreview.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import DraggableFieldList from '../components/DraggableFieldList.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import TemplateCarousel from '../components/TemplateCarousel.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import AIPolishButton from '../components/AIPolishButton.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import HapticButton from '../components/HapticButton.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import ShareModal from '../components/ShareModal.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { ShareIcon } from '../components/icons.tsx';

// A mock initial state for the card fields
const initialFields: CardField[] = [
    { id: '1', label: 'Full Name', value: 'John Appleseed', placeholder: 'e.g. John Appleseed', type: FieldType.Text },
    { id: '2', label: 'Title / Role', value: 'Creative Director', placeholder: 'e.g. CEO, Founder', type: FieldType.Text },
    { id: '3', label: 'Company', value: 'Tappit', placeholder: 'e.g. Tappit AI', type: FieldType.Text },
    { id: '4', label: 'Email', value: '', placeholder: 'e.g. hello@tappit.ai', type: FieldType.Email },
    { id: '5', label: 'Website', value: '', placeholder: 'e.g. tappit.ai', type: FieldType.URL },
];

const CardBuilderScreen: React.FC = () => {
    const [fields, setFields] = useState<CardField[]>(initialFields);
    const [template, setTemplate] = useState<CardTemplate>(templates[0]);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    
    const handleAIPolish = useCallback(async () => {
        if (!process.env.API_KEY) {
            console.error("API_KEY environment variable not set.");
            alert("AI features are currently unavailable. API key is missing.");
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const currentDetails = fields.map(f => `${f.label}: ${f.value}`).join(', ');
            const prompt = `Given the following business card details, suggest a more concise and impactful version for the "Title / Role". Keep it professional but modern. Details: ${currentDetails}. Return ONLY the improved title text, with no extra formatting or labels.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            // Fix: Correctly access the generated text from the response object.
            const polishedTitle = response.text.trim();

            if (polishedTitle) {
                setFields(prevFields => 
                    prevFields.map(field => 
                        field.label.toLowerCase().includes('title') 
                        ? { ...field, value: polishedTitle } 
                        : field
                    )
                );
            }
        } catch (error) {
            console.error("Error with AI Polish:", error);
            alert("Failed to polish details. Please try again.");
        }
    }, [fields]);

    return (
        <div className="animate-scaleIn h-full flex flex-col lg:flex-row lg:space-x-8">
            {/* Left side: Preview */}
            <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-center justify-center p-4">
                <TiltCardPreview fields={fields} template={template} />
                 <HapticButton 
                    onClick={() => setIsShareModalOpen(true)}
                    className="mt-8 flex items-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors"
                >
                    <ShareIcon className="w-5 h-5" />
                    <span>Share Card</span>
                </HapticButton>
            </div>

            {/* Right side: Editor */}
            <div className="flex-grow lg:w-1/2 flex flex-col space-y-6 overflow-y-auto p-4">
                <TemplateCarousel 
                    templates={templates} 
                    selectedTemplate={template} 
                    onSelectTemplate={setTemplate} 
                />
                
                <DraggableFieldList fields={fields} onFieldsChange={setFields} />

                <AIPolishButton onClick={handleAIPolish} />
            </div>
            
            <ShareModal 
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                fields={fields}
                template={template}
            />
        </div>
    );
};

export default CardBuilderScreen;