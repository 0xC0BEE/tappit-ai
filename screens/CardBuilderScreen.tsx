import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import TiltCardPreview from '../components/TiltCardPreview.tsx';
import GemSidebar from '../components/GemSidebar.tsx';
import DraggableFieldList from '../components/DraggableFieldList.tsx';
import TemplateCarousel from '../components/TemplateCarousel.tsx';
import { CardField, CardTemplate, FieldType } from '../types.ts';
import { templates } from '../data/templates.ts';
import { BriefcaseIcon, EmailIcon, PhoneIcon, LinkIcon, MapPinIcon, PlayIcon, ShareIcon } from '../components/icons.tsx';
import ShareModal from '../components/ShareModal.tsx';
import HapticButton from '../components/HapticButton.tsx';
import PublicCardScreen from './PublicCardScreen.tsx';

// Initial state for the card fields
const initialFields: CardField[] = [
    { id: 'f1', label: 'Name', value: 'Alex Bamboo', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f2', label: 'Title', value: 'Senior Strategic Advisor', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f3', label: 'Company', value: 'Tappit AI', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f4', label: 'Email', value: 'alex.b@tappit.ai', icon: EmailIcon, fieldType: FieldType.Text },
    { id: 'f5', label: 'Phone', value: '+1 234 567 8900', icon: PhoneIcon, fieldType: FieldType.Text },
    { id: 'f6', label: 'Website', value: 'tappit.ai', icon: LinkIcon, fieldType: FieldType.Text },
    { id: 'f7', label: 'Location', value: 'Bamboo Forest, Bali', icon: MapPinIcon, fieldType: FieldType.Text },
    { id: 'f8', label: 'Intro Video', value: '', icon: PlayIcon, fieldType: FieldType.Video },
];

const CardBuilderScreen: React.FC = () => {
    const [fields, setFields] = useState<CardField[]>(initialFields);
    const [template, setTemplate] = useState<CardTemplate>(templates[0]);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

    const name = fields.find(f => f.label.toLowerCase().includes('name'))?.value || 'Your Name';
    const title = fields.find(f => f.label.toLowerCase().includes('title'))?.value || 'Your Title';
    
    const handleAIPolish = async () => {
        // This function demonstrates polishing a single field, e.g., the title.
        const titleField = fields.find(f => f.label.toLowerCase().includes('title'));
        if (!titleField) return;

        try {
            // Fix: Initialize GoogleGenAI with named apiKey parameter as per coding guidelines.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Make this job title more impressive or creative: "${titleField.value}". Return only the new title.`,
                config: {
                    systemInstruction: "You are a professional title enhancer. You only return the enhanced title, with no extra text or quotes.",
                }
            });
            // Fix: Use response.text to get the generated content as per coding guidelines.
            const newTitle = response.text.trim();
            setFields(prevFields => 
                prevFields.map(field => field.id === titleField.id ? { ...field, value: newTitle } : field)
            );
        } catch (error) {
            console.error("AI Polish failed:", error);
            throw error; // Re-throw to be caught by the button's error handler
        }
    };

    if (isPreviewing) {
        return <PublicCardScreen onBack={() => setIsPreviewing(false)} />;
    }
    
    const EditorView = () => (
         <div className="flex flex-col gap-6">
            <DraggableFieldList fields={fields} setFields={setFields} />
            <TemplateCarousel templates={templates} selectedTemplate={template} onSelectTemplate={setTemplate} />
             <HapticButton 
                onClick={() => setIsShareModalOpen(true)}
                className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors">
                <ShareIcon className="w-5 h-5" />
                <span>Share</span>
            </HapticButton>
        </div>
    );

    return (
        <>
            <div className="animate-scaleIn h-full flex flex-col">
                <header>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                        Card Builder
                    </h1>
                    <p className="text-gray-300 text-lg mt-2">Design your digital identity.</p>
                </header>

                {/* Mobile Tab Switcher */}
                <div className="lg:hidden flex border-b border-white/10 my-4">
                    <HapticButton 
                        onClick={() => setMobileTab('editor')} 
                        className={`flex-1 py-2 text-center font-semibold transition-colors relative ${mobileTab === 'editor' ? 'text-bamboo-7' : 'text-gray-400'}`}
                    >
                        Editor
                        {mobileTab === 'editor' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bamboo-7"></div>}
                    </HapticButton>
                    <HapticButton 
                        onClick={() => setMobileTab('preview')} 
                        className={`flex-1 py-2 text-center font-semibold transition-colors relative ${mobileTab === 'preview' ? 'text-bamboo-7' : 'text-gray-400'}`}
                    >
                        Preview
                         {mobileTab === 'preview' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bamboo-7"></div>}
                    </HapticButton>
                </div>
                
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8 flex-grow">
                    <div className="lg:col-span-1 h-full flex flex-col gap-6 overflow-y-auto pr-2 pb-24">
                        <EditorView />
                    </div>
                    <div className="lg:col-span-1 h-full">
                        <TiltCardPreview template={template} fields={fields} name={name} title={title} />
                    </div>
                    <div className="lg:col-span-1 h-full">
                        <GemSidebar onAIPolish={handleAIPolish} />
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden flex-grow overflow-y-auto pb-24">
                    <div className={`${mobileTab === 'editor' ? 'space-y-8' : 'hidden'}`}>
                        <EditorView />
                        <GemSidebar onAIPolish={handleAIPolish} />
                    </div>
                    <div className={`${mobileTab === 'preview' ? 'h-full' : 'hidden'}`}>
                        <TiltCardPreview template={template} fields={fields} name={name} title={title} />
                    </div>
                </div>
            </div>

            <ShareModal 
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                fields={fields}
                template={template}
                onPreviewLink={() => {
                    setIsShareModalOpen(false);
                    setIsPreviewing(true);
                }}
            />
        </>
    );
};

export default CardBuilderScreen;