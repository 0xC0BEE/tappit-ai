import React, { useState, useEffect } from 'react';
import { Contact, Interaction } from '../types.ts';
import { supabase } from '../services/supabase.ts';
import ContactCard from '../components/ContactCard.tsx';
import GlassCard from '../components/GlassCard.tsx';
import MemoryLaneTimeline from '../components/MemoryLaneTimeline.tsx';
import HapticButton from '../components/HapticButton.tsx';
import AddInteractionModal from '../components/modals/AddInteractionModal.tsx';
import { PlusIcon } from '../components/icons.tsx';
import LoadingSkeleton from '../components/LoadingSkeleton.tsx';

interface NetworkScreenProps {
    onOpenFeedback: () => void;
}

const NetworkScreen: React.FC<NetworkScreenProps> = ({ onOpenFeedback }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isInteractionModalOpen, setInteractionModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            // Fix: Correctly await the mock Supabase query builder.
            const { data, error } = await supabase
                .from('contacts')
                .select('*, interactions(*)');
            
            if (error) {
                console.error('Error fetching contacts:', error);
            } else if (data) {
                setContacts(data as Contact[]);
            }
            setLoading(false);
        };

        fetchContacts();
    }, []);

    const handleSelectContact = (contact: Contact) => {
        setSelectedContact(contact);
    };

    const handleAddInteraction = async (interaction: Omit<Interaction, 'id' | 'date'>) => {
        if (!selectedContact) return;

        const newInteraction = {
            ...interaction,
            contact_id: selectedContact.id,
        };

        // Fix: Correctly await the mock Supabase query builder chain.
        const { data, error } = await supabase
            .from('interactions')
            .insert(newInteraction)
            .select()
            .single();

        if (error) {
            console.error('Error adding interaction:', error);
            alert('Failed to add interaction.');
        } else if (data) {
            const updatedContact: Contact = {
                ...selectedContact,
                interactions: [data as Interaction, ...selectedContact.interactions],
                lastInteraction: 'Just now',
            };
            setContacts(prevContacts =>
                prevContacts.map(c => c.id === updatedContact.id ? updatedContact : c)
            );
            setSelectedContact(updatedContact);
        }
    };

    if (selectedContact) {
        return (
            <>
                <div className="animate-scaleIn h-full flex flex-col gap-8">
                    <header className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <HapticButton onClick={() => setSelectedContact(null)} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20">
                                &larr;
                            </HapticButton>
                            <img src={selectedContact.photoUrl} alt={selectedContact.name} className="w-16 h-16 rounded-full" />
                            <div>
                                <h1 className="text-4xl font-bold text-white">{selectedContact.name}</h1>
                                <p className="text-gray-300 text-lg mt-1">{selectedContact.title} at {selectedContact.company}</p>
                            </div>
                        </div>
                        <HapticButton 
                            onClick={() => setInteractionModalOpen(true)}
                            className="flex items-center space-x-2 bg-bamboo-8 text-white font-bold py-3 px-4 rounded-full shadow-lg shadow-bamboo-8/30"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>Log</span>
                        </HapticButton>
                    </header>
                    <div className="flex-grow overflow-y-auto pr-2 pb-24">
                        <GlassCard className="p-4">
                            <h2 className="text-xl font-bold text-white mb-4 px-2">Memory Lane</h2>
                            <MemoryLaneTimeline interactions={selectedContact.interactions} />
                        </GlassCard>
                    </div>
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
        <div className="animate-scaleIn h-full flex flex-col gap-8">
            <header>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    Network
                </h1>
                <p className="text-gray-300 text-lg mt-2">Your connections, supercharged.</p>
            </header>
            <div className="flex-grow overflow-y-auto pr-2 pb-24 space-y-4">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <LoadingSkeleton key={i} />)
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
             <HapticButton onClick={onOpenFeedback} className="fixed bottom-24 right-8 bg-bamboo-8 text-white p-4 rounded-full shadow-lg shadow-bamboo-8/40 z-20">
                <span role="img" aria-label="feedback">💡</span>
            </HapticButton>
        </div>
    );
};

export default NetworkScreen;