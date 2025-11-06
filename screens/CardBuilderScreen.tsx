import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { supabase } from '../services/supabase.ts';
import TiltCardPreview from '../components/TiltCardPreview.tsx';
import GemSidebar from '../components/GemSidebar.tsx';
import DraggableFieldList from '../components/DraggableFieldList.tsx';
import TemplateCarousel from '../components/TemplateCarousel.tsx';
import { CardField, CardTemplate } from '../types.ts';
import ShareModal from '../components/ShareModal.tsx';
import HapticButton from '../components/HapticButton.tsx';
import PublicCardScreen from './PublicCardScreen.tsx';
// Fix: Add missing import for ShareIcon.
import { ShareIcon } from '../components/icons.tsx';

const CardBuilderScreen: React.FC = () => {
    const [fields, setFields] = useState<CardField[]>([]);
    const [templates, setTemplates] = useState<CardTemplate[]>([]);
    const [template, setTemplate] = useState<CardTemplate | null>(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Fetch card fields and templates for the current user
            // Fix: Correctly await the mock Supabase query builder.
            const { data: fieldsData, error: fieldsError } = await supabase.from('card_fields').select('*');
            const { data: templatesData, error: templatesError } = await supabase.from('card_templates').select('*');
            
            if (fieldsError || templatesError) {
                console.error(fieldsError || templatesError);
            } else {
                setFields(fieldsData as CardField[]);
                setTemplates(templatesData as CardTemplate[]);
                // Set default template
                if (templatesData.length > 0) {
                    setTemplate(templatesData[0]);
                }
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleUpdateFields = async (newFields: CardField[]) => {
        setFields(newFields);
        // Here you would debounce and update Supabase
        // e.g., await supabase.from('card_fields').upsert(newFields);
    };

    const handleUpdateTemplate = async (newTemplate: CardTemplate) => {
        setTemplate(newTemplate);
        // Here you would update the user's selected template
        // e.g., await supabase.from('profiles').update({ selected_template_id: newTemplate.id });
    };

    const name = fields.find(f => f.label.toLowerCase().includes('name'))?.value || 'Your Name';
    const title = fields.find(f => f.label.toLowerCase().includes('title'))?.value || 'Your Title';
    
    const handleAIPolish = async () => {
        const titleField = fields.find(f => f.label.toLowerCase().includes('title'));
        if (!titleField) return;
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Make this job title more impressive or creative: "${titleField.value}". Return only the new title.`,
                config: { systemInstruction: "You are a professional title enhancer. You only return the enhanced title, with no extra text or quotes." }
            });
            const newTitle = response.text.trim();
            const newFields = fields.map(field => field.id === titleField.id ? { ...field, value: newTitle } : field);
            handleUpdateFields(newFields);
        } catch (error) {
            console.error("AI Polish failed:", error);
            throw error;
        }
    };

    if (isPreviewing) {
        return <PublicCardScreen onBack={() => setIsPreviewing(false)} />;
    }
    
    const EditorView = () => (
         <div className="flex flex-col gap-6">
            <DraggableFieldList fields={fields} setFields={handleUpdateFields} />
            <TemplateCarousel templates={templates} selectedTemplate={template!} onSelectTemplate={handleUpdateTemplate} />
             <HapticButton 
                onClick={() => setIsShareModalOpen(true)}
                className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors">
                <ShareIcon className="w-5 h-5" />
                <span>Share</span>
            </HapticButton>
        </div>
    );

    if (loading || !template) {
        return <div className="text-center p-8">Loading Card Builder...</div>;
    }

    return (
        <>
            <div className="animate-scaleIn h-full flex flex-col">
                <header>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                        Card Builder
                    </h1>
                    <p className="text-gray-300 text-lg mt-2">Design your digital identity.</p>
                </header>

                <div className="lg:hidden flex border-b border-white/10 my-4">
                    <HapticButton onClick={() => setMobileTab('editor')} className={`flex-1 py-2 text-center font-semibold transition-colors relative ${mobileTab === 'editor' ? 'text-bamboo-7' : 'text-gray-400'}`}>
                        Editor
                        {mobileTab === 'editor' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bamboo-7"></div>}
                    </HapticButton>
                    <HapticButton onClick={() => setMobileTab('preview')} className={`flex-1 py-2 text-center font-semibold transition-colors relative ${mobileTab === 'preview' ? 'text-bamboo-7' : 'text-gray-400'}`}>
                        Preview
                         {mobileTab === 'preview' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bamboo-7"></div>}
                    </HapticButton>
                </div>
                
                <div className="hidden lg:grid lg:grid-cols-3 gap-8 flex-grow">
                    <div className="lg:col-span-1 h-full flex flex-col gap-6 overflow-y-auto pr-2 pb-24"><EditorView /></div>
                    <div className="lg:col-span-1 h-full flex items-center justify-center"><TiltCardPreview template={template} fields={fields} name={name} title={title} /></div>
                    <div className="lg:col-span-1 h-full"><GemSidebar onAIPolish={handleAIPolish} /></div>
                </div>

                <div className="lg:hidden flex-grow overflow-y-auto pb-24">
                    <div className={`${mobileTab === 'editor' ? 'space-y-8' : 'hidden'}`}>
                        <EditorView />
                        <GemSidebar onAIPolish={handleAIPolish} />
                    </div>
                    <div className={`${mobileTab === 'preview' ? 'h-full' : 'hidden'}`}><TiltCardPreview template={template} fields={fields} name={name} title={title} /></div>
                </div>
            </div>

            <ShareModal 
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                fields={fields}
                template={template}
                onPreviewLink={() => { setIsShareModalOpen(false); setIsPreviewing(true); }}
            />
        </>
    );
};

export default CardBuilderScreen;