import * as React from 'react';
import { GoogleGenAI } from '@google/genai';
import { supabase } from '../services/supabase.ts';
import { Contact, Interaction } from '../types.ts';
import ContactCard from '../components/ContactCard.tsx';
import MemoryLaneTimeline from '../components/MemoryLaneTimeline.tsx';
import GlassCard from '../components/GlassCard.tsx';
import HapticButton from '../components/HapticButton.tsx';
import AddInteractionModal from '../components/modals/AddInteractionModal.tsx';
import { PlusIcon, WandIcon } from '../components/icons.tsx';
import LoadingSkeleton from '../components/LoadingSkeleton.tsx';
import { useHaptics, HapticPattern } from '../hooks/useHaptics.ts';

interface NetworkScreenProps {
    onOpenFeedback: () => void;
}

const NetworkScreen: React.FC<NetworkScreenProps> = ({ onOpenFeedback }) => {
    const [contacts, setContacts] = React.useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [isInteractionModalOpen, setInteractionModalOpen] = React.useState(false);
    const [aiSummary, setAiSummary] = React.useState<string | null>(null);
    const [isSummaryLoading, setIsSummaryLoading] = React.useState(false);
    const { playHaptic } = useHaptics();

    React.useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('contacts').select('*');
            if (error) {
                console.error('Error fetching contacts:', error);
            } else {
                const contactsData = (data as Contact[]).map(c => ({...c, interactions: c.interactions || []}));
                setContacts(contactsData);
            }
            setLoading(false);
        };
        fetchContacts();
    }, []);

    const handleSelectContact = (contact: Contact) => {
        setSelectedContact(contact);
        setAiSummary(null); // Reset summary when changing contacts
        playHaptic(HapticPattern.Click);
    };
    
    const handleAddInteraction = (interaction: Interaction) => {
        if (selectedContact) {
            const updatedContact = {
                ...selectedContact,
                interactions: [interaction, ...selectedContact.interactions],
                lastInteraction: 'Just now',
            };
            setSelectedContact(updatedContact);
            setContacts(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
        }
    };
    
    const handleGenerateSummary = async () => {
        if (!selectedContact || selectedContact.interactions.length === 0) {
            setAiSummary("Not enough interaction history to generate a summary.");
            return;
        }
        setIsSummaryLoading(true);
        setAiSummary(null);
        try {
            const interactionHistory = selectedContact.interactions.map(i => `- On ${i.date}, we had a ${i.type}: ${i.notes}`).join('\n');
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Please provide a brief, one-paragraph summary of my relationship with ${selectedContact.name} based on the following interaction history:\n${interactionHistory}`,
                config: {
                    systemInstruction: "You are a helpful assistant that summarizes relationship histories for a professional networking app. Be concise and insightful.",
                }
            });
            setAiSummary(response.text.trim());
        } catch (error) {
            console.error("AI Summary generation failed:", error);
            setAiSummary("Sorry, the AI couldn't generate a summary right now.");
        } finally {
            setIsSummaryLoading(false);
        }
    };

    if (selectedContact) {
        return (
            <>
                <div className="animate-scaleIn h-full flex flex-col gap-6">
                    <header className="flex items-center space-x-4">
                        <HapticButton onClick={() => setSelectedContact(null)} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20">
                            &larr;
                        </HapticButton>
                        <div className="flex items-center space-x-4">
                            <img src={selectedContact.photoUrl} alt={selectedContact.name} className="w-16 h-16 rounded-full border-2 border-bamboo-8" />
                            <div>
                                <h1 className="text-3xl font-bold text-white">{selectedContact.name}</h1>
                                <p className="text-gray-300 text-lg">{selectedContact.title}</p>
                            </div>
                        </div>
                    </header>

                    <GlassCard className="p-4 flex-grow flex flex-col min-h-0">
                         <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Memory Lane</h2>
                            <div className="flex items-center space-x-2">
                                <HapticButton 
                                    onClick={handleGenerateSummary}
                                    disabled={isSummaryLoading}
                                    className="flex items-center space-x-1 text-bamboo-7 font-semibold text-sm"
                                >
                                    <WandIcon className="w-4 h-4" />
                                    <span>{isSummaryLoading ? 'Analyzing...' : 'AI Summary'}</span>
                                </HapticButton>
                                <HapticButton 
                                    onClick={() => setInteractionModalOpen(true)}
                                    className="flex items-center space-x-1 text-bamboo-8 font-semibold text-sm"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    <span>Add</span>
                                </HapticButton>
                            </div>
                        </div>

                        {(isSummaryLoading || aiSummary) && (
                            <GlassCard className="mb-4 p-3 text-sm animate-fadeIn">
                                {isSummaryLoading && (
                                    <div className="flex items-center space-x-2 text-gray-400">
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-bamboo-7 rounded-full animate-spin"></div>
                                        <span>Generating relationship summary...</span>
                                    </div>
                                )}
                                {aiSummary && <p className="text-gray-300">{aiSummary}</p>}
                            </GlassCard>
                        )}

                        <div className="flex-grow pr-2 min-h-0">
                            <MemoryLaneTimeline interactions={selectedContact.interactions} />
                        </div>
                    </GlassCard>
                </div>
                <AddInteractionModal
                    isOpen={isInteractionModalOpen}
                    onClose={() => setInteractionModalOpen(false)}
                    onAddInteraction={handleAddInteraction}
                    contactName={selectedContact.name}
                />
            </>
        );
    }

    return (
        <div className="animate-scaleIn h-full flex flex-col">
            <header>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    Network
                </h1>
                <p className="text-gray-300 text-lg mt-2">Your connections, supercharged.</p>
            </header>
            
            <div className="mt-6 flex-grow pr-2 space-y-4">
                {loading ? (
                    Array.from({length: 4}).map((_, i) => <LoadingSkeleton key={i} />)
                ) : (
                    contacts.map(contact => (
                        <ContactCard 
                            key={contact.id} 
                            contact={contact} 
                            onClick={() => handleSelectContact(contact)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default NetworkScreen;