
import * as React from 'react';
import { supabase } from '../services/supabase.ts';
import { Contact, Interaction } from '../types.ts';
import ContactCard from '../components/ContactCard.tsx';
import GlassCard from '../components/GlassCard.tsx';
import MemoryLaneTimeline from '../components/MemoryLaneTimeline.tsx';
import HapticButton from '../components/HapticButton.tsx';
import { PlusIcon } from '../components/icons.tsx';
import AddInteractionModal from '../components/modals/AddInteractionModal.tsx';
import LoadingSkeleton from '../components/LoadingSkeleton.tsx';
import FollowUpGem from '../gems/FollowUpGem.tsx';
import MeetingPrepGem from '../gems/MeetingPrepGem.tsx';

const NetworkScreen: React.FC = () => {
    const [contacts, setContacts] = React.useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [isInteractionModalOpen, setInteractionModalOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('contacts').select('*');
            if (error) {
                console.error("Error fetching contacts:", error);
            } else if (data) {
                // Fetch interactions for each contact
                const contactsWithInteractions = await Promise.all(
                    (data as Contact[]).map(async (contact) => {
                        const { data: interactions } = await supabase
                            .from('interactions')
                            .select('*')
                            .eq('contact_id', contact.id);
                        return { ...contact, interactions: interactions || [] };
                    })
                );
                setContacts(contactsWithInteractions);
            }
            setLoading(false);
        };
        fetchContacts();
    }, []);

    const handleAddInteraction = (interaction: Interaction) => {
        if (selectedContact) {
            setSelectedContact(prev => prev ? { ...prev, interactions: [interaction, ...prev.interactions] } : null);
            setContacts(prev => prev.map(c => c.id === selectedContact.id ? { ...c, interactions: [interaction, ...c.interactions] } : c));
        }
    };
    
    if (selectedContact) {
        return (
            <div className="animate-scaleIn h-full flex flex-col">
                <header className="pb-8">
                    <HapticButton onClick={() => setSelectedContact(null)} className="text-bamboo-7 font-semibold mb-4">
                        &larr; Back to Network
                    </HapticButton>
                    <div className="flex items-center space-x-4">
                        <img src={selectedContact.photoUrl} alt={selectedContact.name} className="w-20 h-20 rounded-full border-4 border-bamboo-8" />
                        <div>
                             <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                                {selectedContact.name}
                            </h1>
                            <p className="text-gray-300 text-lg">{selectedContact.title} at {selectedContact.company}</p>
                        </div>
                    </div>
                </header>
                
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto pr-2 pb-24">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Memory Lane</h2>
                            <HapticButton onClick={() => setInteractionModalOpen(true)} className="flex items-center space-x-1 bg-bamboo-8 text-white font-semibold py-2 px-4 rounded-full text-sm">
                                <PlusIcon className="w-4 h-4" />
                                <span>Add</span>
                            </HapticButton>
                        </div>
                        <MemoryLaneTimeline interactions={selectedContact.interactions} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">AI Tools</h2>
                         <GlassCard className="p-4"><MeetingPrepGem /></GlassCard>
                         <GlassCard className="p-4"><FollowUpGem /></GlassCard>
                    </div>
                </div>

                <AddInteractionModal
                    isOpen={isInteractionModalOpen}
                    onClose={() => setInteractionModalOpen(false)}
                    onAddInteraction={handleAddInteraction}
                    contactName={selectedContact.name}
                />
            </div>
        );
    }

    return (
        <div className="animate-scaleIn h-full flex flex-col">
            <header className="pb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    My Network
                </h1>
                <p className="text-gray-300 text-lg mt-2">Your connections, supercharged by AI.</p>
            </header>
            <div className="flex-grow overflow-y-auto pr-2 pb-24 space-y-4">
                {loading ? (
                    Array.from({length: 3}).map((_, i) => <LoadingSkeleton key={i} />)
                ) : (
                    contacts.map(contact => (
                        <ContactCard 
                            key={contact.id} 
                            contact={contact} 
                            onClick={() => setSelectedContact(contact)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default NetworkScreen;
