
import * as React from 'react';
import { supabase } from '../services/supabase.ts';
import { GoogleGenAI } from "@google/genai";
import { CardField, CardTemplate, FieldType } from '../types.ts';
import { BriefcaseIcon, EmailIcon, PhoneIcon, LinkIcon, MapPinIcon, PlayIcon, ShareIcon, WandIcon } from '../components/icons.tsx';

import TemplateCarousel from '../components/TemplateCarousel.tsx';
import DraggableFieldList from '../components/DraggableFieldList.tsx';
import TiltCardPreview from '../components/TiltCardPreview.tsx';
import AIPolishButton from '../components/AIPolishButton.tsx';
import ShareModal from '../components/ShareModal.tsx';
import HapticButton from '../components/HapticButton.tsx';
import GemSidebar from '../components/GemSidebar.tsx';
import AIStudioSheet from '../components/AIStudioSheet.tsx';

const initialFields: CardField[] = [
    { id: 'f1', label: 'Name', value: 'Alex Bamboo', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f2', label: 'Title', value: 'Senior Strategic Advisor', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f3', label: 'Company', value: 'Tappit AI', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f4', label: 'Email', value: 'alex.b@tappit.ai', icon: EmailIcon, fieldType: FieldType.Text },
    { id: 'f5', label: 'Phone', value: '+1 234 567 8900', icon: PhoneIcon, fieldType: FieldType.Text },
    { id: 'f6', label: 'Website', value: 'tappit.ai', icon: LinkIcon, fieldType: FieldType.Text },
    { id: 'f7', label: 'Location', value: 'Bamboo Forest, Bali', icon: MapPinIcon, fieldType: FieldType.Text },
    { id: 'f8', label: 'Intro Video', value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: PlayIcon, fieldType: FieldType.Video },
];

const CardBuilderScreen: React.FC<{ onPreview: () => void; }> = ({ onPreview }) => {
    const [name, setName] = React.useState('Alex Bamboo');
    const [title, setTitle] = React.useState('Senior Strategic Advisor');
    const [fields, setFields] = React.useState<CardField[]>(initialFields);
    const [templates, setTemplates] = React.useState<CardTemplate[]>([]);
    const [selectedTemplate, setSelectedTemplate] = React.useState<CardTemplate | null>(null);
    const [isShareModalOpen, setShareModalOpen] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);
    const [isAIStudioOpen, setAIStudioOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchTemplates = async () => {
            const { data, error } = await supabase.from('card_templates').select('*');
            if (error) {
                console.error("Error fetching templates:", error);
            } else if (data) {
                setTemplates(data as CardTemplate[]);
                if (data.length > 0) {
                    setSelectedTemplate(data[0]);
                }
            }
        };
        fetchTemplates();
        
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFieldChange = (id: string, value: string) => {
        setFields(prevFields => prevFields.map(f => f.id === id ? { ...f, value } : f));
        if (id === 'f1') setName(value);
        if (id === 'f2') setTitle(value);
    };

    const handleAddField = () => {
        const newField: CardField = {
            id: `f${Date.now()}`,
            label: 'New Field',
            value: '',
            icon: LinkIcon,
            fieldType: FieldType.Text,
        };
        setFields(prev => [...prev, newField]);
    };
    
    const handleRemoveField = (id: string) => {
        setFields(prev => prev.filter(f => f.id !== id));
    };

    const handleAIPolish = async () => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the title "${title}", suggest a more impactful and concise version.`,
            config: { systemInstruction: "You are a professional branding expert. You rewrite job titles to be more impressive. Return only the revised title." }
        });
        const newTitle = response.text.trim();
        handleFieldChange('f2', newTitle);
    };

    if (!selectedTemplate) {
        return <div className="flex items-center justify-center h-full">Loading templates...</div>;
    }

    const editorContent = (
         <div className="space-y-6">
            <TemplateCarousel templates={templates} selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
            <DraggableFieldList fields={fields} onFieldChange={handleFieldChange} onAddField={handleAddField} onRemoveField={handleRemoveField} isMobile={isMobile} />
            {isMobile && <AIPolishButton onClick={handleAIPolish} />}
        </div>
    );
    
    return (
        <>
            <div className="animate-scaleIn h-full lg:grid lg:grid-cols-3 lg:gap-8 flex flex-col">
                {/* Left/Main Column: Editor */}
                <div className="lg:col-span-1 lg:order-1 flex-shrink-0 lg:overflow-y-auto lg:pr-4">
                    {isMobile ? editorContent : (
                        <div className="h-full flex flex-col gap-6">
                            {editorContent}
                            <div className="mt-auto pt-4">
                                <HapticButton onClick={onPreview} className="w-full text-center text-bamboo-7 font-semibold">Preview Public Card</HapticButton>
                            </div>
                        </div>
                    )}
                </div>

                {/* Center Column: Preview */}
                <div className="lg:col-span-1 lg:order-2 flex-grow flex items-center justify-center min-h-0 py-6 lg:py-0">
                    <TiltCardPreview template={selectedTemplate} fields={fields} name={name} title={title} />
                </div>
                
                {/* Right Column: AI Studio (Desktop) */}
                <div className="hidden lg:block lg:col-span-1 lg:order-3">
                     <GemSidebar onAIPolish={handleAIPolish} />
                </div>

                {/* Bottom Bar: Mobile Actions */}
                {isMobile && (
                    <div className="flex-shrink-0 mt-auto p-4 fixed bottom-20 left-0 right-0 bg-bamboo-12/80 backdrop-blur-xl border-t border-white/10 z-20">
                        <div className="flex items-center space-x-3">
                            <HapticButton onClick={() => setAIStudioOpen(true)} className="flex-1 flex items-center justify-center bg-white/10 text-white font-semibold py-3 rounded-full">
                                <WandIcon className="w-5 h-5 mr-2" />
                                AI Studio
                            </HapticButton>
                            <HapticButton onClick={() => setShareModalOpen(true)} className="flex-1 flex items-center justify-center bg-bamboo-8 text-white font-bold py-3 rounded-full">
                                <ShareIcon className="w-5 h-5 mr-2" />
                                Share
                            </HapticButton>
                        </div>
                    </div>
                )}
            </div>

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setShareModalOpen(false)}
                fields={fields}
                template={selectedTemplate}
                onPreviewLink={onPreview}
            />
            
            {isMobile && (
                 <AIStudioSheet isOpen={isAIStudioOpen} onClose={() => setAIStudioOpen(false)}>
                    <div className="p-2">
                        <GemSidebar onAIPolish={handleAIPolish} />
                    </div>
                 </AIStudioSheet>
            )}
        </>
    );
};

export default CardBuilderScreen;
