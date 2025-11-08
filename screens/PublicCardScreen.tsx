import * as React from 'react';
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

// Use a glassmorphic style for the public card template
const publicCardTemplate: CardTemplate = {
    id: 't-public', 
    name: 'Public Glass', 
    className: 'bg-black/20 backdrop-blur-2xl border border-white/10', 
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

        const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        const fileName = `${name.replace(/\s+/g, '-').toLowerCase() || 'contact'}.vcf`;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        
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
            <main className="relative z-10 flex flex-col items-center justify-center space-y-6 w-full max-w-sm">
                <TiltCardPreview 
                    template={publicCardTemplate}
                    fields={publicCardFields}
                    name={name}
                    title={title}
                />
                
                <div className="w-full">
                    <HapticButton
                        onClick={handleSaveContact}
                        className="w-full bg-bamboo-8 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors text-lg"
                    >
                        Save to Contacts
                    </HapticButton>
                </div>

                <footer className="text-center text-gray-500 text-sm">
                    <p>Powered by Tappit AI</p>
                    <a href="#" className="underline hover:text-bamboo-7">Create your own free card</a>
                </footer>
            </main>
        </div>
    );
};

export default PublicCardScreen;