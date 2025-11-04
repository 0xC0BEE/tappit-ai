import React, { useState } from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { contacts } from '../data/contacts.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import ContactCard from '../components/ContactCard.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { Contact } from '../types.ts';

const NetworkScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-scaleIn h-full flex flex-col">
            <header className="flex-shrink-0">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    Network
                </h1>
                <p className="text-gray-300 text-lg mt-2">Manage your connections.</p>
            </header>
            
            <div className="my-6 flex-shrink-0">
                <input
                    type="text"
                    placeholder="Search by name, company, title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder-gray-400 rounded-full py-3 px-6 border-2 border-transparent focus:border-bamboo-8 focus:ring-0 focus:outline-none transition-colors"
                />
            </div>
            
            <div className="flex-grow overflow-y-auto space-y-4 -mx-6 px-6">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map(contact => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-400">No contacts found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NetworkScreen;