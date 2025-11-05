import React from 'react';
import BambooBackground from '../components/BambooBackground.tsx';
import TiltCardPreview from '../components/TiltCardPreview.tsx';
import HapticButton from '../components/HapticButton.tsx';
import { CardField, FieldType, CardTemplate } from '../types.ts';
import { BriefcaseIcon, EmailIcon, PhoneIcon, LinkIcon, MapPinIcon, PlayIcon } from '../components/icons.tsx';

interface PublicCardScreenProps {
    onBack: () => void;
}

// Mock data for a public card view.
const publicCardFields: CardField[] = [
    { id: 'f1', label: 'Name', value: 'Alex Bamboo', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f2', label: 'Title', value: 'Senior Strategic Advisor', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f3', label: 'Company', value: 'Tappit AI', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f4', label: 'Email', value: 'alex.b@tappit.ai', icon: EmailIcon, fieldType: FieldType.Text },
    { id: 'f5', label: 'Phone', value: '+1 234 567 8900', icon: PhoneIcon, fieldType: FieldType.Text },
    { id: 'f6', label: 'Website', value: 'tappit.ai', icon: LinkIcon, fieldType: FieldType.Text },
    { id: 'f7', label: 'Location', value: 'Bamboo Forest, Bali', icon: MapPinIcon, fieldType: FieldType.Text },
    { id: 'f8', label: 'Intro Video', value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: PlayIcon, fieldType: FieldType.Video },
];

const publicCardTemplate: CardTemplate = {
    id: 't1', 
    name: 'Emerald', 
    className: 'bg-gradient-to-br from-bamboo-9 to-bamboo-11', 
    textColor: 'text-white' 
};


const PublicCardScreen: React.FC<PublicCardScreenProps> = ({ onBack }) => {
    const name = publicCardFields.find(f => f.label.toLowerCase().includes('name'))?.value || 'Your Name';
    const title = publicCardFields.find(f => f.label.toLowerCase().includes('title'))?.value || 'Your Title';
    
    const handleSaveContact = () => {
        const name = publicCardFields.find(f => f.label.toLowerCase() === 'name')?.value || '';
        const title = publicCardFields.find(f => f.label.toLowerCase() === 'title')?.value || '';
        const company = publicCardFields.find(f => f.label.toLowerCase() === 'company')?.value || '';
        const email = publicCardFields.find(f => f.label.toLowerCase() === 'email')?.value || '';
        const phone = publicCardFields.find(f => f.label.toLowerCase() === 'phone')?.value || '';
        const website = publicCardFields.find(f => f.label.toLowerCase() === 'website')?.value || '';

        // Create vCard string
        const vCardString = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${name}`,
            `ORG:${company}`,
            `TITLE:${title}`,
            `TEL;TYPE=WORK,VOICE:${phone}`,
            `EMAIL:${email}`,
            `URL:${website}`,
            'END:VCARD'
        ].join('\n');

        // Create a blob from the vCard string
        const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = url;
        const fileName = `${name.replace(/\s+/g, '-').toLowerCase() || 'contact'}.vcf`;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        
        // Trigger the download and clean up
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-bamboo-12 text-white font-sans min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
            <BambooBackground />
            <header className="absolute top-4 left-4 z-20">
                <HapticButton onClick={onBack} className="bg-black/30 backdrop-blur-md text-white font-bold py-2 px-4 rounded-full">
                    &larr; Back to App
                </HapticButton>
            </header>
            <main className="relative z-10 flex flex-col items-center justify-center space-y-8 w-full">
                <TiltCardPreview 
                    template={publicCardTemplate}
                    fields={publicCardFields}
                    name={name}
                    title={title}
                />
                
                <HapticButton
                    onClick={handleSaveContact}
                    className="w-full max-w-sm bg-bamboo-8 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors text-lg"
                >
                    Save to Contacts
                </HapticButton>

                <footer className="text-center text-gray-400 text-sm">
                    <p>Powered by Tappit AI</p>
                    <a href="#" className="underline">Create your own free card</a>
                </footer>
            </main>
        </div>
    );
};

export default PublicCardScreen;