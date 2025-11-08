// Fix: Remove redundant triple-slash directive for React types.
import * as React from 'react';
import { GoogleGenAI } from '@google/genai';
import { supabase } from '../services/supabase.ts';
import TiltCardPreview from '../components/TiltCardPreview.tsx';
import GemSidebar from '../components/GemSidebar.tsx';
import DraggableFieldList from '../components/DraggableFieldList.tsx';
import { CardField, CardTemplate, FieldType } from '../types.ts';
import ShareModal from '../components/ShareModal.tsx';
import HapticButton from '../components/HapticButton.tsx';
import PublicCardScreen from './PublicCardScreen.tsx';
import { LinkIcon, PlusIcon, ShareIcon, WandIcon } from '../components/icons.tsx';
import AIStudioSheet from '../components/AIStudioSheet.tsx';
import TemplateBar from '../components/TemplateBar.tsx';
import LoadingSkeleton from '../components/LoadingSkeleton.tsx';

const CardBuilderScreen: React.FC = () => {
    const [fields, setFields] = React.useState<CardField[]>([]);
    const [templates, setTemplates] = React.useState<CardTemplate[]>([]);
    const [template, setTemplate] = React.useState<CardTemplate | null>(null);
    const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
    const [isPreviewing, setIsPreviewing] = React.useState(false);
    const [isAiSheetOpen, setIsAiSheetOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data: fieldsData, error: fieldsError } = await supabase.from('card_fields').select('*');
            const { data: templatesData, error: templatesError } = await supabase.from('card_templates').select('*');
            
            if (fieldsError || templatesError) {
                console.error(fieldsError || templatesError);
            } else {
                setFields(fieldsData as CardField[]);
                setTemplates(templatesData as CardTemplate[]);
                if (templatesData && templatesData.length > 0) {
                    setTemplate(templatesData[0]);
                }
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    
    // Fix: Wrap all state handlers in useCallback to prevent unnecessary re-renders in child components,
    // which was the root cause of the input focus and dropdown selection bugs.
    const handleUpdateField = React.useCallback((id: string, value: string) => {
        setFields(prevFields => 
            prevFields.map(field => field.id === id ? { ...field, value } : field)
        );
    }, []);

    const handleAddField = React.useCallback(() => {
        const newField: CardField = {
            id: `field-${Date.now()}`,
            label: 'New Field',
            value: '',
            icon: LinkIcon,
            fieldType: FieldType.Text,
        };
        setFields(prevFields => [...prevFields, newField]);
    }, []);

    const handleRemoveField = React.useCallback((id: string) => {
        setFields(prevFields => prevFields.filter(field => field.id !== id));
    }, []);

    const handleUpdateTemplate = (newTemplate: CardTemplate) => {
        setTemplate(newTemplate);
    };

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
            handleUpdateField(titleField.id, newTitle);
        } catch (error) {
            console.error("AI Polish failed:", error);
            throw error;
        }
    };

    if (isPreviewing) {
        return <PublicCardScreen onBack={() => setIsPreviewing(false)} />;
    }

    const name = fields.find(f => f.label.toLowerCase().includes('name'))?.value || 'Your Name';
    const title = fields.find(f => f.label.toLowerCase().includes('title'))?.value || 'Your Title';

    if (loading || !template) {
        return (
            <div className="p-4 space-y-4">
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
            </div>
        );
    }
    
    return (
        <>
            <div className="animate-scaleIn h-full w-full flex flex-col">
                {/* --- DESKTOP 3-COLUMN LAYOUT --- */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8 h-full">
                    {/* Left Column: Editor */}
                    <div className="lg:col-span-1 h-full flex flex-col gap-6 pr-2 overflow-y-auto">
                        <header>
                            <h1 className="text-4xl">Card Builder</h1>
                            <p className="text-gray-300 text-lg mt-2">Design your digital identity.</p>
                        </header>
                        <DraggableFieldList 
                            fields={fields} 
                            onAddField={handleAddField}
                            onRemoveField={handleRemoveField}
                            onFieldChange={handleUpdateField}
                        />
                    </div>
                    {/* Center Column: Preview */}
                    <div className="lg:col-span-1 h-full flex flex-col items-center justify-center gap-6">
                        <TiltCardPreview template={template} fields={fields} name={name} title={title} />
                        <TemplateBar templates={templates} selectedTemplate={template} onSelectTemplate={handleUpdateTemplate} />
                         <HapticButton 
                            onClick={() => setIsShareModalOpen(true)}
                            className="w-full max-w-sm flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors">
                            <ShareIcon className="w-5 h-5" />
                            <span>Share</span>
                        </HapticButton>
                    </div>
                    {/* Right Column: AI Studio */}
                    <div className="lg:col-span-1 h-full overflow-y-auto">
                        <GemSidebar onAIPolish={handleAIPolish} />
                    </div>
                </div>

                {/* --- MOBILE LAYOUT --- */}
                <div className="lg:hidden h-full flex flex-col">
                    <div className="p-4 sticky top-0 bg-bamboo-12/80 backdrop-blur-md z-10">
                         <TiltCardPreview template={template} fields={fields} name={name} title={title} />
                    </div>
                    <div className="flex-grow overflow-y-auto p-4 space-y-6">
                        <DraggableFieldList 
                            fields={fields} 
                            onAddField={() => {}} // FAB handles this on mobile
                            onRemoveField={handleRemoveField}
                            onFieldChange={handleUpdateField}
                            isMobile
                        />
                         <TemplateBar templates={templates} selectedTemplate={template} onSelectTemplate={handleUpdateTemplate} />
                    </div>
                    {/* Mobile Floating Buttons & Sticky Bar */}
                    <HapticButton onClick={handleAddField} className="absolute bottom-24 right-6 bg-bamboo-8 rounded-full p-4 shadow-lg z-20">
                        <PlusIcon className="w-6 h-6 text-white" />
                    </HapticButton>
                    <div className="sticky bottom-0 bg-bamboo-12/80 backdrop-blur-md p-4 border-t border-white/10 z-10 grid grid-cols-2 gap-4">
                        <HapticButton onClick={() => setIsAiSheetOpen(true)} className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white font-bold py-3 px-6 rounded-full">
                            <WandIcon className="w-5 h-5" />
                            <span>AI Studio</span>
                        </HapticButton>
                         <HapticButton onClick={() => setIsShareModalOpen(true)} className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full">
                            <ShareIcon className="w-5 h-5" />
                            <span>Share</span>
                        </HapticButton>
                    </div>
                </div>
            </div>

            <ShareModal 
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                fields={fields}
                template={template}
                onPreviewLink={() => { setIsShareModalOpen(false); setIsPreviewing(true); }}
            />
            <AIStudioSheet isOpen={isAiSheetOpen} onClose={() => setIsAiSheetOpen(false)}>
                <GemSidebar onAIPolish={handleAIPolish} />
            </AIStudioSheet>
        </>
    );
};

export default CardBuilderScreen;
